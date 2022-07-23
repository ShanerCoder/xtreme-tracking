import { dbConnect } from "../../../../lib/db-connect";
import {
  errorHandler,
  responseHandler,
  validateAllFields,
} from "../../../../utils/common";
import GalleryPhotos from "../../../../models/accountProfile/galleryPhotos";
import { getSession } from "next-auth/client";

async function handler(req, res) {
  // Checks for active session
  const session = await getSession({ req });
  if (!session) {
    errorHandler("Session does not exist", res);
    return null;
  }
  if (req.method === "POST") {
    // Post Request
    try {
      // Username of session check
      if (session.user.username != req.body.username) {
        errorHandler("Username does not match with Session", res);
        return null;
      }

      const { username, photoId, photoDescription, privatePhoto } = req.body;
      validateAllFields(req.body);
      await dbConnect();

      // Creates new GalleryPhotos
      const galleryPhotos = new GalleryPhotos({
        username,
        photoId,
        photoDescription,
        privatePhoto,
      });

      // Saves new GalleryPhotos
      const galleryPhotoResult = await galleryPhotos.save();

      if (galleryPhotoResult) {
        responseHandler(galleryPhotoResult, res, 201);
      } else {
        errorHandler("Photo Failed to save to Gallery", res);
      }
    } catch (error) {
      errorHandler("An error has occurred. Please try again later!", res);
    }
  } else if (req.method === "PUT") {
    // Put Request
    try {
      // Username Session Check
      if (session.user.username != req.body.username) {
        errorHandler("Username does not match with Session", res);
        return null;
      }
      await dbConnect();

      // Updates existing GalleryPhoto entry
      const galleryPhotoResult = await GalleryPhotos.findOneAndUpdate(
        {
          _id: req.body.galleryPhotoId,
          usernameToReceive: session.user.username,
        },
        { privatePhoto: req.body.privatePhoto }
      );
      if (galleryPhotoResult) responseHandler(galleryPhotoResult, res, 200);
    } catch (error) {
      errorHandler("Failed to update the privacy of this Photo", res);
    }
  } else if (req.method === "DELETE") {
    // Delete request
    try {
      // Session username check
      if (session.user.username != req.body.username) {
        errorHandler("Username does not match with Session", res);
        return null;
      }
      await dbConnect();

      // Removes GalleryPhotos entry
      const galleryPhotoResult = await GalleryPhotos.deleteOne({
        _id: req.body.galleryPhotoId,
        usernameToReceive: session.user.username,
      });
      if (galleryPhotoResult) responseHandler(galleryPhotoResult, res, 200);
    } catch (error) {
      errorHandler("Failed to delete this Photo", res);
    }
  } else errorHandler("Invalid Request Type", res);
}

export default handler;
