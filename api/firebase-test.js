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
  "type": "service_account",
  "project_id": "verbi-dabf2",
  "private_key_id": "1503a57dacb10ade4a74a7ec0792cd694d533da9",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCwAcadLkbG1POh\nGL/10gGgx1GhoRWU5kSjUpsbWqcv75hqUZAQtJHoEsdQtxrem5ZLGqN+3ebV8QUd\nDgrcwr7LDGyM+JwJMkrqFPMLky6XzBf8PGBE6hzEZWSAQX+JJMKfv6v1eRGI5ba+\nhGoKjRXE5+d7eG4D51rSd8+mh6hq077WEMiV6UXqrdz9Haz2WrnjaX6ZJ9Ye94TD\nfKEpGbwprHUWK8IY+NtJlzoHRiUqu+9rT/fMQsiM4fgKJaVVp9vWygoIHXznnI2D\nav7KtywD555acWHunARTBKUArBxleCX1RHLaPmMOULDWaiZXvlFPu7/rAKzF58cc\nyShoSdZ9AgMBAAECggEAUD33BVkANo0Gp6bneVRtnpXQfx43/yL+HvG9ujpZp46V\nz77wrdUNAh9xlDhufRe07Pevm1ribx5LhQQOarg0kNDQunJrfPvbUJ4NcnT/FICd\nXMdP4otTYyyQpbJ2yRkjy/3wEWFJX77O0kv/JmFND/DkRZPRoGD9NKAf4N3PKCgw\njmTR3UTv38qdvqNam18zXOyp2gGPkkp/UE7mpduLWf3u9LzsAWacDIr2U/WSnIt8\nf2YnYHFIJhwZuaXVgT8INn7EcRZ7JRsxNTfmThUCI5oeARe1EbmJOlfSOGHzj0AI\nD0gWFcjzISd0qGQ23A9FwHzJoQ+IE0v2cleOmNp5FwKBgQDdF2sVbEOhStZ2Muas\nbW9ivFl5uC2GODj6N0Apa4n/M2GI1wEosKNY8DhaPLRozdrp6L/i+6GAa6Ng4xLV\nPRp/qRRsa0N5z3VvZWTq57bCz6Tt3kQbPtgjOxypjiqWIjp8R+GE/tZPo9Y1qKuN\nxLs1x+INBkOJYx9Zz4Dyx9d1twKBgQDLzAb98H7klTIaODBirgMQNUxSovV1KSRF\n2dkP0QslYWHQEtYhE0hOZ3KiF/KzGqJn7X6vkwHhmw7x7K6MZjDsl7AHpLNZ40W1\nBcVgP94quriDBXKjIuFMSxqiya4Q3bNIOMdOBpkDTYfWB/ky/lwio9DslD/UXl/U\nolDD4wl1awKBgBb+eISh3ebIgcWJRbRpLUx3ila+cP2km0hqtqGYLaH9FgfFVLmG\npXZ6hWHdLmY4AqyRKGPTB9jzWOqaszq6QCdGznj4LuxcRzpusTA9KSTZs62JkEvF\nHXWMkE6SGpvCs5J5Z1sNpfxibcTm5fC4pT/Sqg/wttVzGa+dhSu63Q3BAoGBAJuo\n3dpOPA3J6zfdnQ9yTAKwQviHYaY4Y2065LFRAQtvIy+zg3xF5x+Doiou0oB8onlx\nDCd8yJ4SOksMdZHlaA7+GUTtRtQsZIzMuKI4hi/q6I2itpnmRWFpqBGYq+xT+eD7\nBTgSkALW0B7pfiy13ZfTuftJjKtf3iBiTgAgxJO7AoGAdtzTRh3wC6Do9ldELUKr\nRub0ix+VHOF+949E0WamDg4hJUGYHD244hirCyiAAvMThm8IiPZxhk334c9JcH/V\nc5C4knmUwmPH7vnlxzjZewFXdqiphb+RozbvdJttRDZ5sOExaI1VRjH50xBc/Kzv\nzPmraNjfrhIdslAXjY399Jc=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xg88v@verbi-dabf2.iam.gserviceaccount.com",
  "client_id": "113812115859964666714",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xg88v%40verbi-dabf2.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
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