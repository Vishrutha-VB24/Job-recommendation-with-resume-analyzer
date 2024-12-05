import io
from django.http import JsonResponse
from .services.appwriteapi import AppwriteClient
from .services.mistralapi import get_chat_response
import os
from PyPDF2 import PdfReader
import json
from django.views.decorators.csrf import csrf_exempt
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def calculate_similarity(dict1, dict2, weights=None):
    # Default weights for skills, experience, and type
    if weights is None:
        weights = {
            'skills': 0.5,
            'experience': 0.3,
            'type': 0.2
        }

    # Extract attributes
    skills1 = " ".join(dict1.get('skills', []))
    skills2 = " ".join(dict2.get('skills', []))


    exp1 = int(dict1.get('exp', ''))
    exp2 = int(dict2.get('exp', ''))
    print(exp1)
    print(exp2)

    type1 = str(dict1.get('type', ''))
    type2 = str(dict2.get('type', ''))

    vectorizer = TfidfVectorizer()

    skills_matrix = vectorizer.fit_transform([skills1, skills2])
    skills_similarity = cosine_similarity(skills_matrix[0], skills_matrix[1])[0, 0]

    # Calculate similarity for experience
    max_exp = max(exp1, exp2, 1)  # Avoid division by zero
    exp_similarity = 1 - abs(exp1 - exp2) / max_exp

    # Calculate similarity for type
    type_matrix = vectorizer.fit_transform([type1, type2])
    type_similarity = cosine_similarity(type_matrix[0], type_matrix[1])[0, 0]

    # Weighted sum of similarities
    similarity = (
            weights['skills'] * skills_similarity +
            weights['experience'] * exp_similarity +
            weights['type'] * type_similarity
    )

    # Convert to percentage
    similarity_percentage = similarity * 100

    return similarity_percentage



appwrite_client = AppwriteClient()

@csrf_exempt
def recommend(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user_id = data.get('user_id')  # Extract the user_id from the JSON

            if not user_id:
                return JsonResponse({'error': 'user_id is required'}, status=400)

            user_info = appwrite_client.get_user_info(user_id)
            all_jobs = appwrite_client.list_all_jobs()
            similarities = []

            for job in all_jobs:
                similarity = calculate_similarity(user_info, {'skills': job.get('skills'), 'exp': job.get('exp'), 'type': job.get('type')})
                similarities.append({
                    'job_id': job.get('$id'),
                    'title': job.get('title'),
                    'similarity': similarity,
                    'company': job.get('company')
                })

            similarities = sorted(similarities, key=lambda x: x['similarity'], reverse=True)

            return JsonResponse({"recommendations": similarities})

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def parse_resume(request):
    print("hi")
    if request.method == "POST":
        data = json.loads(request.body)

        file_id = data.get("file_id")
        print(file_id)

        if not file_id:
            return JsonResponse({"error": "file_id is required"}, status=400)

        bucket_id = os.getenv("APPWRITE_BUCKET_ID")

        if not bucket_id:
            return JsonResponse({"error": "APPWRITE_BUCKET_ID is not set in environment variables"}, status=500)

        try:
            file = appwrite_client.get_file(bucket_id=bucket_id, file_id=file_id)

            file_content = file

            reader = PdfReader(io.BytesIO(file_content))
            text = ""
            for page in reader.pages:
                text += page.extract_text()

            print(text)
            response = get_chat_response(os.getenv("MISTRAL_RESUME_PARSER_ID"), text)
            return JsonResponse(json.loads(response), status=200)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid HTTP method"}, status=405)



@csrf_exempt
def create_job_posting(request):
    if request.method == "POST":
        try:

            data = json.loads(request.body)
            title = data.get('title')
            description = data.get('description')
            company = data.get('company')
            if not title or not description:
                return JsonResponse({"error": "Title and description are required"}, status=400)

            # Get required environment variables
            mistral_job_parser_id = os.getenv("MISTRAL_JOB_PARSER_ID")

            if not mistral_job_parser_id:
                return JsonResponse({"error": "MISTRAL_JOB_PARSER_ID is not set in environment variables"}, status=500)

            # Use Mistral API to analyze the job description
            response = get_chat_response(mistral_job_parser_id, description)
            parsed_data = json.loads(response)
            print("---------------------")
            print(parsed_data)
            print(parsed_data['skills'])
            print("---------------------")
            # Prepare data for Appwrite collection
            job_posting_data = {
                "company": company,
                "title": title,
                "description": description,
                "skills": parsed_data["skills"],
                "exp": parsed_data["experience_req"],
                "type": parsed_data["type"],
                "domain": parsed_data["domain"]
            }

            document = appwrite_client.create_job(
                data=job_posting_data
            )
            domain = appwrite_client.add_domain({"name": parsed_data["domain"]})

            return JsonResponse({"message": "Job posting created successfully", "document": document}, status=201)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid HTTP method"}, status=405)

