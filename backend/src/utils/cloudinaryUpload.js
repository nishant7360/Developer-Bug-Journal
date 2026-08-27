import { Readable } from "stream";
import cloudinary from "../config/cloudinary.js";

export const uploadOnCloudinary = (
  buffer,
  folder = "developer-bug-journal",
) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      },
    );
    const readableStream = new Readable();

    readableStream.push(buffer);
    readableStream.push(null);

    readableStream.pipe(uploadStream);
  });
};

export const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return;

  await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
  });
};
