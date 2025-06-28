import app from "./app.js";
import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config(); // Ensure .env is loaded here too

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_COULD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});
const PORT = process.env.PORT || 8000;

app.listen( PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
});
