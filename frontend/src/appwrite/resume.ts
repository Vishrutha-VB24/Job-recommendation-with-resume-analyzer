import conf from '../conf/conf.js';
import { Client, ID, Storage } from "appwrite";

export class BucketService {
  client = new Client();
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectID);
    this.bucket = new Storage(this.client);
  }

  async uploadResume(file: File) {
    try {
      return await this.bucket.createFile(
        conf.appWriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("uploadResume :: error", error);
      return false;
    }
  }

  async updateResume(fileId: string, file: File) {
    try {
      await this.deleteFile(fileId);
      return await this.uploadResume(file);
    } catch (error) {
      console.log(" updateResume :: error", error);
      return false;
    }
  }

  async deleteFile(fileId: string) {
    try {
      await this.bucket.deleteFile(
        conf.appWriteBucketId,
        fileId
      );
      return true;
    } catch (error) {
      console.log("deleteFile :: error", error);
      return false;
    }
  }
}

const bucketService = new BucketService();
export default bucketService;
