const express=require('express');
const router=express.Router();


const task=require('../controller/task');

router.post('/add',task.add);
router.post('/update',task.update);
router.post('/allTask',task.alltask);
router.post('/byId',task.taskById);
router.post('/delete',task.remove);


module.exports=router;
