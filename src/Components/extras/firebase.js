import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC8GW0uSQyTrUpV41SqtH3Iefa_ERjWq1s",
  projectId: "clothesfriends-8b835",
  storageBucket: "clothesfriends-8b835.appspot.com",
  appId: "clothesfriends-8b835"
};

const firebaseApp = initializeApp(firebaseConfig);

export const storage = getStorage(firebaseApp);