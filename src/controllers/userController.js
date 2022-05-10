const userModel = require("../Models/userModel")

const createUser = async function (req, res) {
  try {
    let data = req.body;
    if (!data) {
      return res
        .status(400)
        .send({ status: false, message: "plz enter a valid data" });
    }
    if (["Mr", "Mrs", "Miss"].indexOf(data.title) == -1) {
      return res.status(400).send({
        status: false,
        message: "Enter a valid title Mr or Mrs or Miss ",
      });
    }
    if (!data.name) {
      return res
         .status(400)
         .send({ status: false, message: "Name is required" });
    }
    //console.log(data.name)
    if (!/^([a-zA-Z]+)$/.test(data.name)) {
        return res.status(400).send({ status: false, message: "plz enter name" });
      }
    if (!data.phone) {
        return res
          .status(400)
          .send({ status: false, message: "phone No. is required" });
      }
      if (
        !/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(data.phone)
      ) {
        return res
          .status(400)
          .send({ status: false, message: "Plz enter valid phone no." });
      }
      let checkphone = await userModel.find({phone:data.phone});
      if (checkphone.length !=0){
          return res.status(409).send({status:false,message:"phone no. already exsit"})
      }
    if (!data.email) {
      return res
        .status(400)
        .send({ status: false, message: "EmailId is required" });
    }
    if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(data.email)) {
      return res
        .status(400)
        .send({ status: false, message: "plz enter a valid Email" });
    }
    let checkIfemailExist = await userModel.find({ email: data.email });
    if (checkIfemailExist.length != 0) {
      return res
        .status(409)
        .send({ status: false, message: "email already exist" });
     }
    if (!data.password) {
      return res
        .status(400)
        .send({ status: false, message: "password is required" });
    }
    if(!/^([a-zA-Z0-9!@#$%^&*_\-+=><]{8,16})$/.test(data.password.trim())){
        return res.status(400).send({status: false, message: "Plz enter valid Password"})
    }
    let address = data.address;
    if(!address){
        return res.status(400).send({status:false, message:"plz enter address"})
    }
    if(Object.keys(address).length < 3){
        return res.status(400).send({status:false, message:"address is required"})
    }
    if (!/^([a-zA-Z0-9#, ]+)$/.test(address.street)) {
        return res.status(400).send({ status: false, message: "plz enter valid street" });
      }
    if (!/^([a-zA-Z]+)$/.test(address.city)) {
        return res.status(400).send({ status: false, message: "plz enter valid city" });
      }
    if (!/^([0-9]{6})$/.test(address.pincode)) {
        return res.status(400).send({ status: false, message: "plz enter valid pincode" });
      }
     let saved = await userModel.create(data);
    res.status(201).send({ status: true,message:'Success', data: saved });
  } catch (err) {
    console.log("This is the err", err.message);
    res.status(500).send({ status: false, message: err.message });
  }
};

module.exports.createUser = createUser;
