const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const reviewSchema = new mongoose.Schema( {
    bookId: {
        type:ObjectId,
        ref:"Book",
        required:true
    },
    reviewedBy:{
        type:String,
        required:true,
<<<<<<< HEAD
        default:'Guest'
=======
        default:'Guest' 
>>>>>>> b57feecdf395b9c696184b1ef1964bd626b6a9b1
    },
    reviewedAt:{
        type:Date,
        required:true
    },
    rating: {
        type: Number,
        min:1,
        max:5,
        required:true,
    },
    review:{
        type:String,
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
},  {timestamps});

module.exports = mongoose.model('Review', reviewSchema)