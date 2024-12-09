import conf from '../conf/conf.js';
import {Client, Databases} from "appwrite";

export class DBService {
  client = new Client();
  database;
  databaseId = conf.appWriteDbId; // Retrieve database ID from conf

  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectID);
    this.database = new Databases(this.client);
  }

  async getDocument(collectionId:string, documentId:string) {
    try {
      return await this.database.getDocument(this.databaseId, collectionId, documentId);
    } catch (error) {
      console.error("Error fetching document:", error);
      throw error;
    }
  }
  async deleteDocument(collectionId:string, documentId:string) {
    try {
      return await this.database.deleteDocument(this.databaseId, collectionId, documentId);
    } catch (error) {
      console.error("Error fetching document:", error);
      throw error;
    }
  }

  async listAllDocuments(collectionId:string) {
    try {
      return await this.database.listDocuments(this.databaseId, collectionId);
    } catch (error) {
      console.error("Error listing documents:", error);
      throw error;
    }
  }

  async listDocumentsWithQuery(collectionId:string, queries:string[]) {
    try {
      return await this.database.listDocuments(this.databaseId, collectionId, queries);
    } catch (error) {
      console.error("Error listing documents with query:", error);
      throw error;
    }
  }

  async createDocument(collectionId: string, data: object, documentId?: string) {
    try {
      return await this.database.createDocument(
        this.databaseId,
        collectionId,
        documentId || 'unique()', // Use 'unique()' for auto-generating document IDs if not provided
        data
      );
    } catch (error) {
      console.error('Error creating document:', error);
      throw error;
    }
  }
}

const dbService = new DBService();
export default dbService;
