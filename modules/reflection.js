const mongoose = require("mongoose");
const schemaDefinition = {
    title:{
        type:String,
        required: true
    },
    works:{
        type:String,
        required: true
    },
    type:{
        type:String,
        required: true
    },
    content:{
        type:String,
        required: true
    }
};

var mongooseSchema = new mongoose.Schema(schemaDefinition);

module.exports = mongoose.model("Reflection", mongooseSchema)