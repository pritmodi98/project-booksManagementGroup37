const express = require('express');
const { default: mongoose } = require('mongoose');
const bodyparser = require("body-parser")

const router = require('./routes/route');
const app = express();
const multer=require('multer')
const {AppConfig}=require('aws-sdk')

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(multer().any())


mongoose.connect("mongodb+srv://Prit:1XW7ojhyQOrwisLq@pritcluster.dgvbr.mongodb.net/group37?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', router);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
