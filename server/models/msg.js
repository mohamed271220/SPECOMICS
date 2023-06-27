const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const msgSchema = new Schema({
    email:{
        type:String,
        
    },
    message :{
        type:String,
  
    },
    contactNumber:{
        type:String,
      
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    }
})

module.exports = mongoose.model("Msg", msgSchema);
