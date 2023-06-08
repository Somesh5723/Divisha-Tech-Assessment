const express=require("express");
const port=5000;
const path=require('path');

const cookies=require('cookie-parser');
const app=express();
const expressLayouts=require('express-ejs-layouts');
const db=require('./Config/mongoose');

app.set('view engine','ejs');
app.set('Views',path.join(__dirname,'Views'));
app.use(express.static('./Assets'));
app.use(expressLayouts);
app.use(cookies());
app.use(express.urlencoded());

//extract styles and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.get('/home',function(req,res){
    res.send('<h1>Hello Somesh!!</h1>');
})

// app.get('/item',function(req,res){
//     res.render('index');
// })

// to use express router
app.use('/',require('./Routes/index'));
// app.use('/log',require('./Routes/users'));


app.listen(port,function(err){
    if(err){
        console.log(`err in running on server: ${err}`);
        return;
    }
    console.log(`port is running on: ${port}`);
})