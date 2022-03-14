var express = require('express')
var mongoose = require('mongoose')
var app = express()
var path = require('path')
var bodyparser = require("body-parser");

// Sets up Middleware to use in app
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended : true}))
app.use(express.json())

app.use(bodyparser.json());
//Connect to Mongo DB using mongoose
mongoose.connect('mongodb://localhost:27017/employee', {
    useNewUrlParser: true
}).then(function(){
    console.log('Connected to Database');
}).catch(function(err){
    console.log(err);
})

//Load db template
require('./models/Employee')
// variable to reference to model
var Employee = mongoose.model('employee')

//Saves the data
app.post('/saveEmplEntry', (req,res) =>{
    console.log(req.body)

    //create new entry for food
    new Employee(req.body).save().then( ()=>{
        console.log("Data Saved!")
        res.redirect("view.html")
    })
})

//Gets the data
app.get('/getData', (req,res)=>{
    Employee.find().then((employee)=>{
        console.log(employee)
        res.json({employee})
    })
})

//Deletes The data
app.post('/deleteEmpl', (req,res)=>{
    console.log("Employee deleted. id: " + req.body._id)
    Employee.findByIdAndDelete(req.body._id).exec()
    res.redirect('delete.html')
})

//Update The data
var employeeId = ""
app.post('/updateID', function(req,res){
    employeeId = req.body._id;
})


app.post('/updateEmpl', function(req, res){
    
    Employee.findByIdAndUpdate(employeeId, 
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

