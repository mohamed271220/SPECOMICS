const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
  mangas: [
    {
      type: Schema.Types.ObjectId,
      ref: "Manga",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
