const express = require("express"),
app = express();
bodyParser = require("body-parser");
const {Contact}=require('./models/product');
//const path = require('path');
methodOverride = require("method-override");
mongoose = require("mongoose");

//app.use('/view',express.static(path.join(__dirname,'index.ejs')));

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());
    
mongoose.connect("mongodb://localhost/PROJECT",{
useNewUrlParser:true,
useUnifiedTopology:true}).then(()=>{
console.log("connection successful")

    }).catch((err)=>console.log('no connection',err))
    

app.set('view engine',"ejs");
app.use(bodyParser.urlencoded({ extended:true }));
app.use(methodOverride("_method"));
//Show product and homepage
// app.get("/",(req, res)=>{
//     Contact.find({},(err,Contact)=>{
//         if (err) {console.log(err);
//         }else{
//             res.render("index",{Contacts: Contacts});
//         }
//     })
    
// })
app.get('/index',(req,res)=>{
    res.render('pages/index');
})

app.get('/',(req,res)=>{
    // const data=Contact.find({})
    
    res.status(200).send('hi')
});
app.post('/',async(req,res)=>{
    const contact= await Contact.create(req.body)
    res.status(200).send(contact)
})

//add Contact
app.post("/add",(req,res)=>{
    var name = req.body.name;
    var surname = req.body.surname;
    var phone_no = req.body.phone_no;
    var email= req.body.email;
    var newContact = {name:name,surname:surname,phone_no:phone_no,email:email};
    Contact.create(newContact,(err,data)=>{
        if(err){
            console.log(err);
        }else {
            console.log(data);
            res.redirect("/");
        }
    })
})
//Get EditForm
app.get("/:id/edit",(req,res)=>{
    Contact.findById(req.params.id,function (err, contact){
        if(err){
            console.log(err);
            res.redirect("/");
        }else{
            res.render("edit",{contacts: contact});
        }
    })
})
//Edit Put request
app.put("/:id/edit",(req, res)=>{
    Contact.findByIdAndUpdate(req.params.id,req.body.contact,function(err,updatedata){
        if(err){
            console.log(err);
            res.redirect("/");
        }else{
            res.redirect("/");
        }
    })
})
//Delete the product
app.delete("/:id",(req,res)=>{
    Contact.findByIdAndRemove(req.params.id,function (err){
        if(err){
            console.log(err);
            res.redirect("/");
        }else {
            res.redirect("/");
            }
    })
})

    



app.listen(process.env.PORT || 8000,process.env.IP,function(err){
    if(err){
        console.log(err);
    }else{ 
    console.log("Server Started at 8000");
   }
})