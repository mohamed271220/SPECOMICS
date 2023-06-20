const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
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
        type: mongoose.Types.ObjectId,
        ref: "Manga",
      },
    ],
    mangas: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Manga",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
