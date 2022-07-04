import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

const GalleryPhotosSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    photoId: {
      type: String,
      required: true,
    },
    photoDescription: {
      type: String,
      required: true,
    },
    privatePhoto: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

GalleryPhotosSchema.plugin(mongoosePaginate);

mongoose.models = {};

export default mongoose.model("gallery_photos", GalleryPhotosSchema);
