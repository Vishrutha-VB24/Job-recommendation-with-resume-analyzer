from appwrite.client import Client
from appwrite.services.databases import Databases
from appwrite.exception import AppwriteException
import os

class AppwriteClient:
    def _init_(self, endpoint, project_id, api_key=None, session_token=None):
        """
        Initializes the Appwrite client with endpoint, project ID, and either an API key or a session token.
        """
        self.client = Client()
        self.client.set_endpoint(endpoint)  # Set your API endpoint
        self.client.set_project(project_id)  # Set your project ID

        if api_key:
            self.client.set_key(api_key)  # Use API key for server-side operations
        elif session_token:
            self.client.set_session(session_token)  # Use session token for user-specific operations

        self.databases = Databases(self.client)

    def get_document(self, database_id, collection_id, document_id):
        """
        Retrieves a document from the specified database and collection.
        """
        try:
            document = self.databases.get_document(
                database_id=database_id,
                collection_id=collection_id,
                document_id=document_id
            )
            return document
        except AppwriteException as e:
            print(f"Failed to retrieve document: {e.message}")
            return None

# Example usage:
# Initialize the Appwrite client with your endpoint, project ID, and API key
appwrite_client = AppwriteClient(
    endpoint='https://cloud.appwrite.io/v1',
    project_id=os.getenv('APPWRITE_PROJECT'),
    api_key=os.getenv('APPWRITE_API_KEY')  # For server-side use
)

# Retrieve a document
document = appwrite_client.get_document(
    database_id='DATABASE_ID',
    collection_id='COLLECTION_ID',
    document_id='DOCUMENT_ID'
)

if document:
    print("Document retrieved successfully:", document)
else:
    print("Document retrieval failed.")