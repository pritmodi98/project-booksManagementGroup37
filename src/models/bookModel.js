const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const bookSchema = new mongoose.Schema( {
    title: {
        type:String,
        unique:true,
        required:true
    },
    excerpt:{
        type:String,
        required:true
    },
    userId:{
        type:ObjectId,
        ref:"User",
        required:true
    },
    ISBN: {
        type: String,
        unique:true,
        required:true,
    },
    category:{
        type:String,
        required:true
    },
    subCategory:{
        type:String,
        required:true
    },
    reviews:{
        type:Number,
        default:0,
    },
    deletedAt: {
        type: Date,
        default: null,
      },
    isDeleted:{
        type:Boolean,
        default:false
    },
    releasedAt: {
        type: Date,
        required:true,
        default: null,
      },
},{timestamps:true});

module.exports = mongoose.model('Book', bookSchema)