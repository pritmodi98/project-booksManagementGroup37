const mongoose= require('mongoose')
const bookModel = require("../models/bookModel")
const userModel = require("../models/userModel")
const ObjectId= mongoose.Types.ObjectId

const createBook = async function (req, res) {
  try {
    let requestBody = req.body;

    //if anything is passed in body part by client
    if (!validator.isValidRequestBody(requestBody)) {
      res.status(400).send({ status: false, message: `please provide book details` });
      return;
    }

    //Extract params
    const {
      title,
      excerpt,
      userId,
      ISBN,
      category,
      subCategory,
      reviews,
      releasedAt,
      isDeleted,
      deletedAt,
    } = requestBody;

    //validation on title
    if (!validator.isValid(title)) {
      res.status(400).send({ status: false, message: "Title is required" });
      return;
    }
    //validation on excerpt
    if (!validator.isValid(excerpt)) {
      res.status(400).send({ status: false, message: "Excerpt is required" });
      return;
    }

    //userId is a valid object ID
    if (!validator.isValidObjectid(userId)) {
      res.status(400).send({ status: false, message: `${userId} is not a valid user id` });
      return;
    }
    let userExist = await userModel.findOne({ _id: userId });
    if (!userExist) {
      res.status(400).send({ status: false, message: `User does not exit` });
      return;
    }
    if (!validator.isValid(ISBN)) {
      res.status(400).send({ status: false, message: "13 digit ISBN is required" });
      return;
    }

    if (!/^([0-9]{3}-[0-9]{10})$/.test(ISBN)) {
      res.status(400).send({ status: false, message: "Enter a valid ISBN number" });
      return;
    }

    //to check category is not empty
    if (!validator.isValid(category)) {
      res.status(400).send({ status: false, message: "category is required" });
      return;
    }

    if (!validator.isValid(subCategory)) {
      res.status(400).send({ status: false, message: "subcategory is required" });
      return;
    }

    // validation on ISBN
    
    if (!/^([0-9]{3}-[0-9]{10})$/.test(ISBN)) {
      res.status(400).send({ status: false, message: "Enter a legit ISBN number" });
      return;
    }

    //validation that review is only a number and that to less than 11
    if (!/^([0-9]|10)$/.test(reviews)) {
      res.status(400).send({status: false,message: "enter a number,that should be between 0-10"});
      return;
    }
    if (!validator.isValid(releasedAt)) {
      res.status(400).send({status: false,message: "released date is required"});
      return
    }
    if (!validator.isValidFormatDate(data.releasedAt)) { 
      return res.status(400).send({ status: false, message: 'Please provide a valid released date in format YYYY/MM/DD ' }) 
    }
    const checkTitle =await bookModel.findOne({title:title})
    if (checkTitle) {
      return res.status(400).send({ status: false, message: 'title already exist' }) 
    }
    const checkISBN=await bookModel.findOne({ISBN:ISBN})
    if (checkISBN) {
      return res.status(400).send({ status: false, message: 'ISBN no. already exist' }) 
    }

    //so that isDeleted is allways set to false at beginning and deletedAt set to null
    if (isDeleted) {
      isDeleted = false;
    }
    deletedAt = null;

    //new object after running all the validations
    let validatedBookData = {
      title,
      excerpt,
      userId,
      ISBN,
      category,
      reviews,
      releasedAt,
      isDeleted,
      deletedAt,
    };

    //to convert a string to array for the subcategory
    if (subCategory) {
      if (Array.isArray(subCategory)) {
        validatedBookData["subCategory"] = [...subCategory];
      }
      if (Object.prototype.toString.call(subCategory) === "[object String]") {
        validatedBookData["subCategory"] = [subCategory];
      }
    }

    let bookDoc = await bookModel.create(validatedBookData);
    res
      .status(201)
      .send({
        status: true,
        message: "New book created successfully",
        data: bookDoc,
      });
  } catch (err) {
    // console.log("This is the error 1", err.message)
    res.status(500).send({ status: false, data: err.message });
  }
};

const getBook = async function (req, res) {
  try {
    //If there is no addtional parameters
    const filterQuery = { isDeleted: false, deletedAt: null };

    //if there are additional parameters
    let queryParams = req.query;

    if (isValidRequestBody(queryParams)) {
      //extracting parameters
      const { userId, category, subcategory } = queryParams;

      //running validations
      if (isValid(userId) && isValidObjectid(userId)) {
        filterQuery["userId"] = userId;
      }

      if (isValid(category)) {
        filterQuery["category"] = category.trim();
      }

      //we are supposing client is giving a string of subcategories
      if (isValid(subcategory)) {
        const subcatArr = subcategory
          .trim()
          .split(",")
          .map((subcat) => subcat.trim());
        filterQuery["subcategory"] = { $all: subcatArr };
      }
    }
    //if all good find elements and sort them extract selected param
    const result = await bookModel.find(filterQuery).sort({ title: 1 }).select({
      _id: 1,
      title: 1,
      excerpt: 1,
      userId: 1,
      category: 1,
      reviews: 1,
      releasedAt: 1,
    });

    //return error if no books found
    if (result.length == 0) {
      res
        .status(404)
        .send({ status: false, message: `No such books in our Records` });
      return;
    }

    //if we got what we were looking for
    res.status(200).send({ status: true, message: "Books List", data: result });
  } catch (err) {
    // console.log("This is the error 1", err.message)
    res.status(500).send({ status: false, data: err.message });
  }
};

const updateBookById=async function (req,res) {
  try {
      const bookId=req.params.bookId
      const data =req.body
      const isValidId=ObjectId.isValid(bookId)
      if (!isValidId) {
          return res.status(400).send({status:false,msg:'bookid is not valid'})
      }
      const checkId=await bookModel.findOne({_id:bookId,isDeleted:false})
      if (!checkId) {
          return res.status(404).send({status:false,msg:'book not found'})
      }
      const isUniqueTitle=await bookModel.findOne({title:data.title})
      if (Object.keys(isUniqueTitle).length!==0) {
          return res.status(400).send({status:false,msg:'this title already exist,provide unique title'})
      }
      const isUniqueISBN=await bookModel.findOne({ISBN:data.ISBN})
      if (Object.keys(isUniqueISBN).length!==0) {
          return res.status(400).send({status:false,msg:'this ISBN already exist,provide unique ISBN'})
      }
      const updatedBook=await bookModel.findOneAndUpdate({_id:bookId},{...data},{new:true})
      return res.status(200).send({status:true,msg:'updated successfully',data:updatedBook})
  } catch (error) {
      return res.status(500).send({ status: false, message: error.message })
  }
  
}

module.exports={createBook,getBook,updateBookById}
