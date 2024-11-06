# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# import json
# import os
# from appwrite import AppwriteClient

# client = AppwriteClient(os.getenv('APPWRITE_URL'), os.get('APPWRITE_PROJECT'), os.get('APPWRITE_API_KEY'))


# @csrf_exempt
# def process_post_request(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)
#             file_id = data.get('file_id')

#             if not document_id:
#                 return JsonResponse({"error": "document_id is required"}, status=400)

#             client.get_file(os.get('APPWRITE_BUCKET_ID'), )

#             response_data = {
#                 "document_id": document_id,
#                 "message": "File processed successfully"
#             }
#             return JsonResponse(response_data, status=200)

#         except json.JSONDecodeError:
#             return JsonResponse({"error": "Invalid JSON format"}, status=400)

#     return JsonResponse({"error": "POST method required"}, status=405)



from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import os
from appwrite.client import Client
from appwrite.services.storage import Storage
from io import BytesIO

# Initialize the Appwrite client
client = Client()
client.set_endpoint(os.getenv('APPWRITE_URL'))
client.set_project(os.getenv('APPWRITE_PROJECT'))
client.set_key(os.getenv('APPWRITE_API_KEY'))

storage = Storage(client)

@csrf_exempt
def process_post_request(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            document_id = '672a48f3000999f148ff'

            if not document_id:
                return JsonResponse({"error": "file_id is required"}, status=400)

            # Retrieve the file from Appwrite
            result = storage.get_file_download(os.getenv('APPWRITE_BUCKET_ID'), document_id)

            # Convert the downloaded file to text
            file_content = BytesIO(result).read().decode('utf-8')

            response_data = {
                "document_id": document_id,
                "file_text": file_content
            }
            return JsonResponse(response_data, status=200)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "POST method required"}, status=405)
