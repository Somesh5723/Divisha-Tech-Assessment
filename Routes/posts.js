const express=require('express');
const router=express.Router();
const postController=require('../Controllers/post_controller');
router.get('/posts',postController.post);


module.exports=router;