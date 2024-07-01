import { Client, Account, Databases, Storage, Avatars } from "appwrite";


export const appwriteConfig = {
    url: 'https://cloud.appwrite.io/v1',
    projectId: '6660a018001bb6f8edee',
    databaseId:'66830b770005d87452ae',
    storageId: '6662311a001402228811',
    userCollectionId: '66830bf9003093eebe16',
    postCollectionId: '66830ba4002f31929f30',
    savesCollectionId: '66830be10007b661b982',
  };
  
  export const client = new Client();
  
  client.setEndpoint(appwriteConfig.url);
  client.setProject(appwriteConfig.projectId);
  
  export const account = new Account(client);
  export const databases = new Databases(client);
  export const storage = new Storage(client);
  export const avatars = new Avatars(client);