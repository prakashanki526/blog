//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "Hello!! Thank you for coming. My name is Ankit Prakash, and I'm a under-graduate from Sant Longowal Institute of Engineering and Technology. Currently I am in third year of my ongoing degree. During my two years of study, I learned to build front-end and back-end of websites using MERN stack. I am also interested in problem solving and I solved approximately 1000 DSA problems on various platforms like Leetcode, GFG etc. I also completed four-week training at AspireVisiontech pvt. ltd. where I learned to build attractive websites.";
const aboutContent = "My name is Ankit Prakash, and I'm a under-graduate from Sant Longowal Institute of Engineering and Technology. This is my daily bolg website. I created this website as a minor project to enhance my skills in front-end as well as backend development. I am very greatfull to Dr. Angela Yu for her proper guidence throught my web development journey";
const contactContent = "You can contact me through my email : prakashankit526@gmail.com";
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://prakashankit526:AnkitPrakash@cluster0.qmiocbo.mongodb.net/blogDB",{useNewUrlParser:true});

const postSchema = {
  title : String,
  content : String 
};

const Post = mongoose.model("Post",postSchema); 

app.get("/",function(req,res){
  Post.find({},function(err,posts){
    res.render("home",{
      startingContent:homeStartingContent,
      postss:posts
    });
  });
});

app.get("/about",function(req,res){
  res.render("about",{abouttContent: aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{contacttContent: contactContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
});

app.post("/compose",function(req,res){

  const post = new Post({
    title : req.body.posttitle,
    content : req.body.postbody
  });

  post.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });
});


app.get("/posts/:postId",function(req,res){
  var requestedPostId = req.params.postId;
  Post.findOne({_id:requestedPostId},function(err,post){
    res.render("post",{title: post.title, content: post.content});
  });
});

let port = process.env.PORT;
if(port==null || port==""){
  port = 3000;
}

app.listen(port, function(req,res) {
  console.log("Server started.");
});
