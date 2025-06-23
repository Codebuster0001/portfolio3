import app from "./app.js";
import cloudinary from "cloudinary";


cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_COULD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SERCET_KEY,
});

app.listen(process.env.PORT,()=>{
  console.log(`server lsiting at port ${process.env.PORT}`);
  
})