//jshint escersion:6
const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    const firstName=req.body.fName;
    const lastName=req.body.lName;``
    const email=req.body.email;
    
    const data ={
       members :[
        {
        email_address: email,
        status:"subscribed",
        merge_fields:{
            FNAME:firstName,
            LNAME:lastName
        }
    }
    ]
    };


const jsonData = JSON.stringify(data);

const url ="https://us21.api.mailchimp.com/3.0/lists/0dda88d03a" ;

const options={
    method:"POST",
    auth:"ritika:75f2d807740f003b1dfdf077a3d4cb4c-us21"
}

const requests=https.request(url,options,function(response){

    if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html");
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }

    response.on("data",function(data){
        console.log(JSON.parse(data));
    })
});

requests.write(jsonData);
requests.end();

 
});

app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000 ,function(){
    console.log("Server is running on port 3000");
});

//API Key
// 75f2d807740f003b1dfdf077a3d4cb4c-us21

//Audience ID
//0dda88d03a