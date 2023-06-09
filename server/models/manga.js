const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mangaSchema = new Schema(
  {
    title: { type: String, required: true },
    pfp: { type: String, required: true },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
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
