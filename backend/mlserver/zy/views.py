from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import os
from io import BytesIO  # Importing BytesIO to handle binary data
from .services.appwrite_api import AppwriteClient  # Make sure the path to AppwriteClient is correct

# Initialize the Appwrite client with environment variables
client = AppwriteClient(
    os.getenv('APPWRITE_URL'),
    os.getenv('APPWRITE_PROJECT'),
    os.getenv('APPWRITE_API_KEY')
)

@csrf_exempt
def file_to_text(request):
    if request.method == 'POST':
        try:
            # data = json.loads(request.body)
            document_id = '672a48f3000999f148ff'

            if not document_id:
                return JsonResponse({"error": "file_id is required"}, status=400)

            # Retrieve the file from Appwrite
            result = client.get_file(os.getenv('APPWRITE_BUCKET_ID'), document_id)
            print("retervied")

            print(result)

            # # Convert the downloaded file to text
            # file_content = BytesIO(result).read().decode('utf-8')

            # response_data = {
            #     "document_id": document_id,
            #     "file_text": file_content
            # }
            # return JsonResponse(response_data, status=200)
             # Load the PDF content into PyMuPDF
            pdf_data = BytesIO(result)
            pdf_text = ""
            with fitz.open(stream=pdf_data, filetype="pdf") as pdf_document:
                for page in pdf_document:
                    pdf_text += page.get_text()

            response_data = {
                "document_id": document_id,
                "file_text": pdf_text
            }
            return JsonResponse(response_data, status=200)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "POST method required"}, status=405)

