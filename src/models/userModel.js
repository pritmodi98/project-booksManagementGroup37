const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      enum:['Mr', 'Mrs','Miss']
    },
    name:{
      type:String,
      required:[true, "Name is required"]
    },
    phone: {
      type: Number,
      trim: true,
      unique: true,
      required: [true, "mobile number is required"],    
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email address is required"],
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email",
      },
    },
    password:{
      type:String,
      minlength:8,
      maxlength:15
    },
    address: {
      street:{type:String},
      city:{type:String},
      pinCode:{type:String}
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

