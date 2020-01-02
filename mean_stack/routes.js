const express=require('express');
const route=express.Router();
const MenuItem=require('./menuitem');
const mongoose=require('mongoose');
const multer=require('multer');
const upload=multer({dest:'images/'});


//Get all elements
route.get('/',(req,res)=>{    
    MenuItem.find().exec()
    .then((doc)=>{
        res.status(200).json(doc);
    })    
    .catch((err)=>{
        res.status(500);
        console.log(err);
    });
});

//Get element by id
route.get('/:id',(req,res)=>{
    MenuItem.findById({_id:req.param('id')}).exec()
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>{
        res.status(500);
        console.log(err);
    });
});


//Remove element


route.delete('/:id',(req,res)=>{
    MenuItem.remove({_id:req.params.id}).exec()
    .then((doc)=>res.status(200).json({message:'Removed'}))
    .catch((err)=>{
        res.status(500).json({message:'Failed to remove'});
        
    });
});




//Update element
route.put('/:id',(req,res)=>{
    MenuItem.updateOne({_id:req.params.id},{$set:{price:req.body.price,isactive:req.body.isactive}}).exec()
    .then((result)=>{
        res.status(200).json({message:'Updated'});
        console.log(result);
    })
    .catch((err)=>{
        res.status(500).json({message:'Failed to update'});
        console.log(err);
    })
})                        


//Insert element
route.post('/',upload.single('photo'),(req,res)=>{    
    console.log(req.file);    
    if(req.file.mimetype!='image/jpeg'){
        res.status(500).json({message:'Only png files are accepted'});        
    }
    const menuitem=new MenuItem({        
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price,
        category:req.body.category,
        isactive:req.body.isactive,
        photopath:req.file.destination+req.file.originalname
    })
    menuitem.save()
    .then(()=>{
        console.log('Inserted');
        res.json({message:'Inserted'});
    })
    .catch((err)=>{
        console.log(err);
        res.json({message:'Insertion failed'});
    });
})

module.exports=route;