const express=require('express');
var router=express.Router();


var task=require('../controller/task');

router.post('/add',task.add);
router.post('/update',task.update);
router.post('/allTask',task.alltask);
router.post('/byId',task.taskById);
router.post('/delete',task.remove);


module.exports=router;
