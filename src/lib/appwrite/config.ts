import { Client, Account, Databases, Storage, Avatars } from "appwrite";


export const appwriteConfig = {
    url: 'https://cloud.appwrite.io/v1',
    projectId: '6660a018001bb6f8edee',
    databaseId:'66623140001dbe7247d3',
    storageId: '6662311a001402228811',
    userCollectionId: '666231f4002adcfb9d75',
    postCollectionId: '6662319d001444b2e5e8',
    savesCollectionId: '666232380013a5de97ba',
  };
  
  export const client = new Client();
  
  client.setEndpoint(appwriteConfig.url);
  client.setProject(appwriteConfig.projectId);
  
  export const account = new Account(client);
  export const databases = new Databases(client);
  export const storage = new Storage(client);
  export const avatars = new Avatars(client);