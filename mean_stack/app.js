const mongoose=require('mongoose');
const express=require('express');


const app=express();


//Middlewares
app.use(express.json())

const PORT=4000;
//RouteHandlers

app.use('/menuitems',require('./routes'))

//DbConnection
const url='mongodb+srv://nanduSRaj:mongodb@samplemongoapp-jjmuf.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(url,{useNewUrlParser:true}).then(
 ()=>{console.log('DB Connected')})




app.listen(PORT,()=>{console.log("Listening to port no "+PORT);});