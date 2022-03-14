const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bp = require('body-parser')
const path = require('path')

app.use(bp.json())
app.use(bp.urlencoded({extended:true}))
app.use(express.json())

// Sets up Middleware to use in app
app.use(bp.json())
app.use(bp.urlencoded({extended : true}))
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/emplEntries',{
    useNewURLParser:true
}).then( () => {
    console.log("Success! Connected to database")
}).catch((err) =>{
    console.log(err)
})

var ctrlReviews = require('./reviewController')
app.get('/api/v1/employees/?sort=:column&col=:value', ctrlReviews.searchByColumn) 
app.get('/api/v1/employees/', ctrlReviews.emplReadAll)
app.get('/api/v1/employees/?sort=:column', ctrlReviews.emplReadAllBySort) 

require('./models/Employee')

var Empl = mongoose.model('employee')

//Saves the data
app.post('/saveEmplEntry', (req,res) =>{
    console.log(req.body)

    //create new entry for food
    new Empl(req.body).save().then( ()=>{
        console.log("Data Saved!")
        res.redirect("view.html")
    })
})

//Gets the data
app.get('/getData', (req,res)=>{
    Empl.find().then((employee)=>{
        console.log(employee)
        res.json({employee})
    })
})

//Deletes The data
app.post('/deleteEmpl', (req,res)=>{
    console.log("Employee deleted. id: " + req.body._id)
    Empl.findByIdAndDelete(req.body._id).exec()
    res.redirect('delete.html')
})

//Update The data
var employeeId = ""
app.post('/updateID', function(req,res){
    employeeId = req.body._id;
})


app.post('/updateEmpl', function(req, res){
    
    Empl.findByIdAndUpdate(employeeId, 
        {
            fname: req.body.fname, 
            lname: req.body.lname,
            department: req.body.department,
            startDate: req.body.startDate,
            jobTitle: req.body.jobTitle,
            salary: req.body.salary
        }, function (err, docs) { 
            if (err){ 
            console.log(err) 
            } 
            else{ 
            res.redirect("view.html")
            } 
            
            })
        })

app.use(express.static(__dirname+"/views"))
app.listen(3000,()=>{
    console.log("Listening on port 3000")
})

