const userModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");

const userLogin = async function (req, res) {
  try {
    let userEmail = req.body.email;
    if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(req.body.email)) {
      return res
        .status(400)
        .send({ status: false, data: "plz enter the valid Email" });
    }
    let userPassword = req.body.password;
    if (
      !/^([a-zA-Z0-9!@#$%^&*_\-+=><]{8,16})$/.test(req.body.password.trim())
    ) {
      return res
        .status(400)
        .send({ status: false, massege: "Plz enter valid Password" });
    }
    let isUser = await userModel.findOne({
      email: userEmail,
      password: userPassword,
    });
    if (!isUser) {
      return res
        .status(404)
        .send({ status: false, data: "No such author exists" });
    }
    let token = jwt.sign(
      {
        UserId: isUser._id.toString(),
      },
      "project-3/group-37" , {expiresIn:'500s'}
    );

    // res.setHeader("x-api-key",token)
    res
      .status(201)
      .send({ status: true, massege: "Success", data: { token: token } });
  } catch (err) {
    res.status(500).send({ status: false, data: err.message });
  }
};

module.exports.userLogin = userLogin;
