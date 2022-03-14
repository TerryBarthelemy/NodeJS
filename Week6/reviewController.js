var Employee = require('./models/Employee')
var debug = require('debug')('demo:review')

function sendJSONresponse(res, status, content){
    res.status(status)
    res.json(content)
}

module.exports.emplReadAll = function(req,res){
    debug('Getting all records')

    Employee.find().exec().then(function(results){
        sendJSONresponse(res,200,results)
    })
    .catch(function(err){
        sendJSONresponse(res,404,err)
    })
}

module.exports.emplReadAllBySort = function(req,res){
    debug('Getting all sorted')

    Employee.find({}).sort(req.params.column).exec().then(function(results){
        sendJSONresponse(res,200,results)
    })
    .catch(function(err){
        sendJSONresponse(res,404,err)
    })
}

module.exports.searchByColumn = function(req,res){
    debug('By Columns')
 
 Employee.find({}).where(req.params.column).equals(req.params.value).exec().then(function(results){
         sendJSONresponse(res,200,results)
     })

    .catch(function(err){
        sendJSONresponse(res,404,err)
    })

}