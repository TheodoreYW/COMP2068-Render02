const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");
const userSchemaDefinition = {
    username:{
        type:String
    },
    password:{
        type:String
    }
};

var userSchema = new mongoose.Schema(userSchemaDefinition);

userSchema.plugin(plm);

module.exports = new mongoose.model("User", userSchema)