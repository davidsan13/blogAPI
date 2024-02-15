var express = require('express');
var router = express.Router();

const blog_controller = require('../controllers/blogController')


/* GET all published blog listing. */
router.get('/', blog_controller.blog_get);

//create
router.get('/createBlog', blog_controller.blog_create_get)

router.post('/createBlog', blog_controller.blog_create_post)

//read
router.get('/:id', blog_controller.blog_detail)

//delete
router.get('/:id/delete', blog_controller.blog_delete_get)

router.post('/:id/delete', blog_controller.blog_delete_post)

//update 
router.get('/:id/update', blog_controller.blog_update_get)

router.post('/:id/update', blog_controller.blog_update_post)

module.exports = router;