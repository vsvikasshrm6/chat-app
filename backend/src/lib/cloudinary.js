import {v2 as cloudinary} from "cloudinary"
import { config } from "dotenv"

config();

cloudinary.config({
  cloud_name:"dntvkwmud",
  api_key: "916826785941833",
  api_secret : "SlCMn0B7T8Cy235mUaiYvhp0iG4"
})

export default cloudinary;