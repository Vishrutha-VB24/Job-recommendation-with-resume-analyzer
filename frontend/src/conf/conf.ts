const conf = {
  appWriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appWriteProjectID: String(import.meta.env.VITE_APPWRITE_PROJECT),
  appWriteDbId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appWriteUserCollectionId: String(import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID),
  appWriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),

}

console.log(conf);

export default conf;