// Import the functions you need from the SDKs you need
const firebase = require("firebase/app"); // Firebase


// Initialize the FirebaseUI Widget using Firebase.
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDQ7Oy1_2yFJlK1Ue4Jbvb1OygLzoJyy8",
  authDomain: "verbi-dabf2.firebaseapp.com",
  projectId: "verbi-dabf2",
  storageBucket: "verbi-dabf2.appspot.com",
  messagingSenderId: "279166192167",
  appId: "1:279166192167:web:bd4a953aaa64b7bb05dc02",
  measurementId: "G-0B0QL94MQN"
};

// important variables
const   getAppCheck  = require("firebase-admin/app-check");

const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
  ref,
} = require("firebase-admin/firestore");
// firebase storage
const {
  getStorage,
  uploadBytes,
  getDownloadURL,
} = require("firebase-admin/storage");
// Certifcations
    
const serviceAccount = {
  type: "service_account",
  project_id: "matthew-internet-radio",
  private_key_id: process.env.SERVICE_ACCOUNT_PRIVATE_KEY_ID,
  private_key:  process.env.SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\NEWLINE/g, '\n'),
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.SERVICE_ACCOUNT_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url:
process.env.CLIENT_X509_CERT_URL,
  universe_domain: "googleapis.com",
};
// Initialize Firebase
const app = initializeApp({
  credential: cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET_NAME,
});

const storage = getStorage(app);
async function getStorageFile(file, callback = () => {}) {
  const fileRef = getStorage()
    .bucket(process.env.FIREBASE_STORAGE_BUCKET_NAME)
    .file(file);
  const downloadURL = await getDownloadURL(fileRef);
  callback(file);
  return await downloadURL;
}

async function uploadStorageFile(
  fileName,
  filePath="/",
  file,
  callback = () => {}
) {
  return getStorage()
    .bucket()
    .upload(file, {
      destination: `${filePath}+${fileName}`,
      uploadType: "media",
      metadata: {
        contentType: "text",
      },
    })
    .then((data) => {
      let file = data[0];
      callback(data);
       console.log(`⬆️ | Uploading ${filePath}/${fileName} to storage`)
      return Promise.resolve(
        "https://firebasestorage.googleapis.com/v0/b/" +
          getStorage().bucket().name +
          "/o/" +
          encodeURIComponent(file.name)
      );
    });
}
async function deleteStorageFile(filePath, callback = () => {}) {
  return storage
    .bucket()
    .file(filePath)
    .delete()
    .then((data) => {
      callback(data);
    });
}

export function GET(request) {
  uploadStorageFile('crap.json','/',"STOP YAPPING")
    return new Response("test")
}