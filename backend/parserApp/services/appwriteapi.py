from appwrite.client import Client
from appwrite.services.databases import Databases
from appwrite.services.storage import Storage
import os

class AppwriteClient:
    def __init__(self):
        self.client = Client()
        self.client.set_endpoint(os.getenv("APPWRITE_URL"))
        self.client.set_project(os.getenv("APPWRITE_PROJECT"))
        self.client.set_key(os.getenv("APPWRITE_API_KEY"))

        self.storage = Storage(self.client)
        self.database = Databases(self.client)

    def get_file(self, bucket_id, file_id):
        return self.storage.get_file_download(bucket_id=bucket_id, file_id=file_id)

    def create_job(self, data):
        return self.database.create_document(os.getenv("APPWRITE_DATABASE_ID"), os.getenv("APPWRITE_JOB_COLLECTION"), document_id="unique()" ,data=data)