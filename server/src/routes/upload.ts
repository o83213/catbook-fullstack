import { storage } from "@lib/firebase";
import { Router } from "express";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import multer from "multer";
import { v4 as uuid } from "uuid";
const router = Router();

const uploadImageHandler = async (imageFile: Express.Multer.File) => {
  const imageRef = ref(storage, `covers/${imageFile.originalname + uuid()}`);
  const snapshot = await uploadBytes(imageRef, imageFile.buffer);
  const downloadURL = await getDownloadURL(imageRef);
  const refUrl = await getDownloadURL(snapshot.ref);
  return downloadURL;
};

router.post("/image", multer().single("image"), async (req, res, next) => {
  const uploadImage = req.file;
  const downloadURL = await uploadImageHandler(uploadImage);
  return res.send(downloadURL);
});

export default router;
