const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mangaSchema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    author: {
      type: String,
      required: true,
    },
    addedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: false,
    },
    description: { type: String, required: true },
    tags: [{ type: String }],
    chapters: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Chapter",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Manga", mangaSchema);
