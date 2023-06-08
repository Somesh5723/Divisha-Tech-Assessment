// new way of config  {promise way}

const mongoose=require('mongoose');
mongoose.connect("mongodb://127.0.0.1/test")
.then(()=>{console.log("succesfully connected to database")})
.catch((err)=>{if(err){
    console.log("error in Connection::DB",err);
}})





