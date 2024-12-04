import io
from django.http import JsonResponse
from .services.appwriteapi import AppwriteClient
from .services.mistralapi import get_chat_response
import os
from PyPDF2 import PdfReader
import json
from django.views.decorators.csrf import csrf_exempt

appwrite_client = AppwriteClient()

@csrf_exempt
def parse_resume(request):
    if request.method == "POST":
        data = json.loads(request.body)

        file_id = data.get("file_id")

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
            # Parse form data
            title = request.POST.get("title")
            description = request.POST.get("description")
            company = request.POST.get("company")

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
                "type": parsed_data["type"]
            }

            document = appwrite_client.create_job(
                data=job_posting_data
            )

            return JsonResponse({"message": "Job posting created successfully", "document": document}, status=201)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid HTTP method"}, status=405)

