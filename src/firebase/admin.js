import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();

const serviceAccount = JSON.parse(Buffer.from(process.env.GCLOUD_CREDENTIALS, "base64"));
if (admin.apps.length < 1) {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
		storageBucket: "ytdl-nullstack.appspot.com",
	});
}

export default { storage: admin.storage };
