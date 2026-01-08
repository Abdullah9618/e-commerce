const admin = require("firebase-admin");
const serviceAccount = require("../ecommerce-defab-firebase-adminsdk-fbsvc-969fdddaff.json"); // Path relative to this script

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const uid = "5jxGFz0jzIM1y6oFBJTh9z0Zybj1"; // TODO: Replace with your Firebase Auth UID

admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log("Custom claim set for user:", uid);
    process.exit(0);
  })
  .catch(error => {
    console.error("Error setting custom claim:", error);
    process.exit(1);
  });
