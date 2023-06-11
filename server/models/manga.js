const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mangaSchema = new Schema(
  {
    title: { type: String, required: true },
    pfp: { type: String, required: true },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    description: { type: String, required: true },
    tags: [{ type: String }],
    chapters: [
      {
        type: Schema.Types.ObjectId,
        ref: "Chapter",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Manga", mangaSchema);
