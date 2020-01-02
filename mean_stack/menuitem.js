const mongoose=require('mongoose');

const menuItemSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    price:Number,
    category:String,
    isactive:Boolean,
    photopath:String
})

module.exports= mongoose.model('MenuItem',menuItemSchema)
