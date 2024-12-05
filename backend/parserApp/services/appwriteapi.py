from appwrite.client import Client
from appwrite.services.databases import Databases
from appwrite.services.storage import Storage
from appwrite.query import Query
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

    def add_domain(self, data):
        domain = data['name']
        if not domain:
            raise ValueError("Domain is required in data.")

        print('hi')
        existing_domains = self.database.list_documents(
            database_id=os.getenv("APPWRITE_DATABASE_ID"),
            collection_id=os.getenv("APPWRITE_DOMAIN_COLLECTION"),
        )

        for doc in existing_domains.get('documents', []):
            if doc.get('name') == domain:
                return {"message": "Domain already exists.", "status": "exists"}

        return self.database.create_document(
            database_id=os.getenv("APPWRITE_DATABASE_ID"),
            collection_id=os.getenv("APPWRITE_DOMAIN_COLLECTION"),
            document_id="unique()",
            data=data
        )
    def get_user_info(self, user_id):
        try:
            documents = self.database.list_documents(
                database_id=os.getenv("APPWRITE_DATABASE_ID"),
                collection_id=os.getenv("APPWRITE_USER_COLLECTION_ID"),
                queries=[Query.equal('userId', user_id), Query.select(['skills', 'exp', 'type'])]
            )
            if documents.get('total', 0) > 0:
                return documents['documents'][0]  # Return the first matching document
            else:
                return {"message": "User not found."}
        except Exception as e:
            return {"error": str(e)}

    def list_all_jobs(self):
        try:
            documents =  self.database.list_documents(
                database_id=os.getenv("APPWRITE_DATABASE_ID"),
                collection_id=os.getenv("APPWRITE_JOB_COLLECTION"),
            )
            if documents.get('total', 0) > 0:
                return documents['documents']  # Return the first matching document
            else:
                return {"message": "User not found."}

        except Exception as e:
            return {"error": str(e)}
