// const objectId=mongoose.Types.ObjectId
const mongoose= require('mongoose')

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
  };

const isValidRequestBody = function(requestBody){
    return Object.keys(requestBody).length > 0
  }

const validateObjectId= function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}

const isValidFormatDate=function (releasedAt) {
    return /((\d{4}[\/-])(\d{2}[\/-])(\d{2}))/.test(releasedAt)
}
  module.exports={isValid,isValidRequestBody,validateObjectId,isValidFormatDate}