const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bp = require('body-parser')
const bodyParser = require('body-parser')
const path = require('path')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/foodEntries',{
    useNewURLParser:true
}).then( () => {
    console.log("Success! Connected to database")
}).catch((err) =>{
    console.log(err)
})

require('./models/Food')

var Food = mongoose.model('food')

//Saves the data
app.post('/saveFoodEntry', (req,res) =>{
    console.log(req.body)

    //create new entry for food
    new Food(req.body).save().then( ()=>{
        console.log("Data Saved!")
        res.redirect("foodlist.html")
    })
})

//Gets the data
app.get('/getData', (req,res)=>{
    Food.find().then((food)=>{
        res.json({food})
    })
})

//Deletes The data
app.post('/deleteFood', (req,res)=>{
    console.log("Food deleted. id: " + req.body._id)
    Food.findByIdAndDelete(req.body._id).exec()
    res.redirect('foodlist.html')
})

/*
//Basic code for saving some data
var Food = mongoose.model('Food', {typeOfFood:String})

//New instance of Food
var food = new Food({typeOfFood:"Pizza"})

food.save().then( () => {
    console.log("Food was saved")
})*/

app.use(express.static(__dirname+"/views"))
app.listen(3000,()=>{
    console.log("Listening on port 3000")
})

