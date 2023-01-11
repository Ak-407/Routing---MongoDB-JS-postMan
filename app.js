const express = require("express");
const bodyParser = require("body-parser");
const mongoose =  require("mongoose");
const ejs = require("ejs");
const app= express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser:true} );

const articles = mongoose.Schema({
    title:String,
    content:String
});


const article = mongoose.model("article", articles);

app.route("/articles")

.get(function(req,res){
    article.find({ }, function(err,founditems){
        if(!err){
            res.send(founditems);
        }else{
            res.send(err);
        }
    })
})

.post(function(req,res){
    
    const article1 = new article({
        title:req.body.title,
        content:req.body.content
    });
    article1.save(function(err){
        if(!err){
            console.log("The Work Is Saved Sucessfully.");
        }else{
            console.log(err);
        }
    });
})




app.route("/articles/:articleTitle")

.get(function(req, res){
    article.findOne({title: req.params.articleTitle}, function(err, foundItem){
        console.log(foundItem);
        if(foundItem){
            res.send(foundItem);
        }else{
            res.send("Not Found");
        }
    });
})

.put(function(req,res){
    article.update({title: req.params.articleTitle},{title:req.body.title, content:req.body.content},{multi: true},
         function(err){
            if(!err){
                console.log("All work is Saved");
                res.send("All work is Saved");
            }
            else{
                console.log(err);
            }

    })
})


// app
// app



app.listen("3000", function(res,req){
    console.log("It is running on Port 30000");
})