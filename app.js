const { log } = require("console");
const bodyParser=require("body-parser");
const express=require("express");
const app=express();
const https=require("https");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html");
    
});

app.post("/",function(req,res){
    var loc=req.body.cityName;
    const url="https://api.weatherapi.com/v1/current.json?key=9df39dfa84154272b81235240220611&q="+loc+"&aqi=yes";
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            console.log(weatherData);
            const location=weatherData.location;
            const weatherdesc=weatherData.current.temp_c;
            const windspeed=weatherData.current.wind_kph;
            const icon=weatherData.current.condition.icon;
        
            res.write("<h1>"+"The current wind speed in "+loc+" is "+windspeed+" kmph"+"</h1>");
            res.write("<h1>Current temperature in "+loc+" is "+weatherdesc+" degree celsius</h1>");
            res.write("<img src="+icon+">")
            res.send();
        })
    });
});




app.listen(3000,function(){
    console.log("Server online");
});