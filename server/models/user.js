const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "READER",
    },
    fav: [
      {
        type: Schema.Types.ObjectId,
        ref: "Manga",
      },
    ],
    mangas: [
      {
        type: Schema.Types.ObjectId,
        ref: "Manga",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
