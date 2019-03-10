var express = require('express');
var router = express.Router();
var Task = require("../models/task");

// Task Index Page
router.get('/', function(req, res, next) {
  // var taskMap = [];
  Task.find({}, function(err, tasks){
  //   tasks.forEach(function(task){
  //     taskMap.push(task);
  //   });
    res.render('taskIndex', {taskviews : tasks});
  });
});

/* Task ADD */
router.get('/add', function(req, res, next) {
  res.render('add');
});

// Task ADD Post
router.post('/add', function(req, res){
    var taskTitle = req.body.title;
    var taskDescription = req.body.description;
    var taskEndDate = req.body.endDate;
    
    var task = new Task({
      title : taskTitle,
      description : taskDescription,
      endDate : taskEndDate,
    });
    
    console.log(task);
    task.save();
    res.redirect('/tasks/');
});

// Task Edit
router.get('/edit/:id', function(req, res, next) {
  Task.findOne({_id:req.params.id}, function(err, task){
    res.render('edit', {task : task});
  });
});

// Task Edit Post
router.post('/edit/:id', function(req, res){
  var taskTitle = req.body.title;
  var taskDescription = req.body.description;
  var taskEndDate = req.body.endDate;
    
    Task.findOne({_id:req.params.id}, function(err, task){
      task.title = taskTitle;
      task.description = taskDescription;
      task.endDate = taskEndDate;
      task.save();
      res.redirect('/tasks/');
      // res.render('edit', {taskedits : task});
    });
});

// Task Approve
router.get('/approve/:id', function(req, res, next){
  Task.findOneAndRemove({_id:req.params.id}, function(err, res){});
res.redirect('/tasks/');
});


module.exports = router;