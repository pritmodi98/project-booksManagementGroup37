const mongoose = require('mongoose');

// const collegeSchema = new mongoose.Schema( {
//     name: {
//         type:String,
//         unique:true,
//         required:true
//     },
//     fullName:{
//         type:String,
//         required:true
//     },
//     logoLink: {
//         type: String,
//         // validate: {
//         //     validator: value => validator.isURL(value, { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true }),
//         //     message: 'Must be a Valid URL'
//         // },
//         required:true
//     },
//     isDeleted:{
//         type:Boolean,
//         default:false
//     }
    
// });

module.exports = mongoose.model('newCollege', collegeSchema)