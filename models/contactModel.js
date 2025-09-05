const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  first_name: {
    type: String,
    require:true
  }


});


const connect=mongoose.model("contact",contactSchema)
module.exports=connect;