const mongoose = require('mongoose');
const validator = require("../utils/validator");
const bookModel = require('../models/bookModel');
const reviewModel = require('../models/reviewModel');
const objectId=mongoose.Types.ObjectId

const createReview=async function (req,res) {
    try {
      const data =req.body
      const bookId=req.params.bookId
      const {rating,review,reviewedBy}=data
      if (!validator.validateObjectId(objectId)) {
        return res.status(400).send({ status: false, message: "booKid is invalid" })
      }
      const checkBookId= await bookModel.findById(bookId)
      if (!checkBookId) {
        return res.status(404).send({status:false,message:'book not found'})
      }
      if (checkBookId.isDeleted===true) {
        return res.status(400).send({status:false,message:'book is deleted already'})
      }
      if (!validator.isValidRequestBody(data)) {
        return res.status(400).send({status:false,message:'no input provided'}) 
      }
    //   if (Object.keys(data).length===0) {
    //     return res.status(400).send({status:false,message:'No input provided'})  
    //   }
      if (review.trim()==='') {
        return res.status(400).send({status:false,message:'review can not be empty'}) 
      }
      if (reviewedBy.trim()==='') {
        return res.status(400).send({status:false,message:'enter reviewer name'}) 
      }
      if (!validator.isValid(rating)) {
        return res.status(400).send({status:false,message:'rating is required'})  
      }
      if (rating<1 || rating>5) {
        return res.status(400).send({status:false,message:'rating msust be minimum 1 and maximum 5'})  
      }
      data['bookId']=checkBookId._id
      data['reviewedAt']=new Date.now()
      const updatedReviewCount=await bookModel.findOneAndUpdate({_id:bookId},{$inc:{reviews:1}},{new:true})
      const createdData=await reviewModel.create(data)
      return res.status(201).send({status:true,message:'count updated',data:updatedReviewCount,data2:createdData})  
    } catch (error) {
       return res.status(500).send({ status: false, message: error.message })
    }
}

const updateReview=async function (req,res) {
    try {
       const data=req.body
       const {review,rating,reviewedBy}=data 
       const bookId=req.params.bookId
       const reviewId=req.params.reviewId
       if (!validator.validateObjectId(objectId)) {
         return res.status(400).send({ status: false, message: "booKid is invalid" })
       }
       if (!validator.validateObjectId(objectId)) {
         return res.status(400).send({ status: false, message: "reviewid is invalid" })  
       }
       if (!validator.isValidRequestBody(data)) {
         return res.status(400).send({ status: false, message: "provide the details for updating the data" })   
       }
       const checkbookId=await bookModel.findById(bookId)
       const checkReviewId=await reviewModel.findById(reviewId)
       if (!checkbookId) {
         return res.status(404).send({ status: false, message: "book not found" })  
       }
       if (!checkReviewId) {
         return res.status(404).send({ status: false, message: "review not found" })  
       }
       if (checkbookId.isDeleted===true && checkReviewId.isDeleted===true) {
         return res.status(400).send({ status: false, message: "book and review are already deleted" })   
       }
       if (checkbookId.isDeleted===true) {
         return res.status(400).send({ status: false, message: "book is already deleted" })     
       }
       if (checkReviewId.isDeleted===true) {
         return res.status(400).send({ status: false, message: "review is already deleted" })       
       }
       if (validator.isValid(review)) {
         await reviewModel.findOneAndUpdate({_id:reviewId},{$set:{review:review}})       
       }
       if (rating>1 && rating<5) {
         return res.status(400).send({ status: false, message: "rating must be minimun 1 and maximum 5" })        
       }
       if (validator.isValid(reviewedBy)) {
         await reviewModel.findOneAndUpdate({_id:reviewId},{$set:{reviewedBy:reviewedBy}})       
       }
       const updatedData=await reviewModel.findById({_id:reviewId})
       return res.status(200).send({ status: true, message:"review updated successfully",data:updatedData})       
    } catch (error) {
       return res.status(500).send({ status: false, message: error.message })
    }
}

const deleteReview=async function (req,res) {
  try {
       const bookId=req.params.bookId
       const reviewId=req.params.reviewId
       if (!validator.validateObjectId(objectId)) {
        return res.status(400).send({ status: false, message: "booKid is invalid" })
      }
      if (!validator.validateObjectId(objectId)) {
        return res.status(400).send({ status: false, message: "reviewid is invalid" })  
      }
      const checkbookId=await bookModel.findById(bookId)
      const checkReviewId=await reviewModel.findById(reviewId)
       if (!checkbookId) {
         return res.status(404).send({ status: false, message: "book not found" })  
       }
       if (!checkReviewId) {
         return res.status(404).send({ status: false, message: "review not found" })  
       }
       if (checkbookId.isDeleted===true && checkReviewId.isDeleted===true) {
        return res.status(400).send({ status: false, message: "book and review are already deleted" })   
      }
      if (checkbookId.isDeleted===true) {
        return res.status(400).send({ status: false, message: "book is already deleted" })     
      }
      if (checkReviewId.isDeleted===true) {
        return res.status(400).send({ status: false, message: "review is already deleted" })       
      }
      if (checkReviewId.bookId===bookId) {
          if (checkbookId.reviews!=0) {
            const deletedReview=await reviewModel.findOneAndUpdate({_id:reviewId},{isDeleted:true,deletedAt:new Date.now()},{new:true})
            const updatedCount=await bookModel.findOneAndUpdate({_id:bookId},{$inc:{reviews:-1}},{new:true})
            return res.status(200).send({ status: true, message: "Review deleted successfully & review count decreased", data: deletedReview,data2:updatedCount })
          }
      }
     
      await bookModel
      await reviewModel.findOneAndUpdate({_id:reviewId},{isDeleted:true},{new:true})
      return res.status(400).send({ status: false, message: "review is already deleted" })       

  } catch (error) {
       return res.status(500).send({ status: false, message: error.message })
  }
  
}

module.exports={createReview,updateReview,deleteReview}