import os


from appwrite.client import Client
from appwrite.services.storage import Storage

class AppwriteClient:
    def __init__(self, endpoint, project_id, api_key=None, session_token=None):
        self.client = Client()
        self.client.set_endpoint(endpoint) 
        self.client.set_project(project_id)  

        if api_key:
            self.client.set_key(api_key)
        elif session_token:
            self.client.set_session(session_token)
        
        self.storage = Storage(self.client)  

    def get_file(self, bucket_id, file_id):
        return self.storage.get_file(bucket_id=bucket_id, file_id=file_id)



