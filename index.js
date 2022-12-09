var express= require('express') // Express import
var multer=require('multer') //Multer Import

app=express(); //Application Create

//Simple body
app.post("/",function(req,res){
    res.end("Hi there!! You Can upload & Download your files now!!")
})

// Url Query
app.post("/",function(req,res){
    let firstName = req.query.firstName;
    res.send(firstName);
})

//Storage Create
var storage = multer.diskStorage(
    {
        destination:function(req,file,callback){
            callback(null,'./Uploads')
        },
        filename:function(req,file,callback){
            callback(null,file.originalname)
        }
    
    }
)
// create Upload
var upload = multer( {storage:storage,     
    fileFilter:function(req,file,callback){
    if(file.mimetype === "image/png" || file.mimetype === "image/jpg"){
        callback(null,true)
    }
    else{
        callback(null,false);
        return callback(new Error('Only JPG & PNG format allowed, File Upload Failed'));
    }
} 
}).single('Picture')

//Upload Post method
app.post("/Up",function(req,res){
    upload(req,res,function(error){
        if(error){
            res.send(error.message)
        }
        else{
            res.end("File Upload Success")
        }
    })
})

//Response Download
app.get("/Down",function(req,res){
    res.download("./Uploads/brazil.png");
})

//Response Redirect
app.get("/Dog",function(req,res){
    res.redirect("http://localhost:8000/Tiger");
})
app.get("/Tiger",function(req,res){
    res.download("./Uploads/tiger.jpg");
})

//Response Header manipulate
app.post("/Head",function(req,res){
    res.append("Name","Ahnaf");
    res.end();
})


app.listen(8000,function(error){
    if(error){
        console.log("Server run failed")
    }
    else{
        console.log("Server is Running")  
    }
});
