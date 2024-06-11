var express = require('express');
var router = express.Router();
const authenticateToken  = require("../middleware/jwt")

const blog_controller = require('../controllers/blogController')
const comment_controller = require('../controllers/commentController')


/* GET latest 4 blogs. */
router.get('/', blog_controller.blog_get_four);

// Get all blogs

router.get('/allBlogs', blog_controller.blog_get_all)

//create
router.get('/createblog', authenticateToken, blog_controller.blog_create_get)

router.post('/createblog', authenticateToken,blog_controller.blog_create_post)

//read blog detail
router.get('/:blogId', blog_controller.blog_detail_get)

//delete blog
router.post('/:blogId/delete', blog_controller.blog_delete)

// update blog
router.post('/:blogId/update', blog_controller.blog_update_post)


/*      Comment     */
router.get('/', comment_controller.comment_get);

//create
router.post('/:blogId/comment', comment_controller.comment_create_post)

//read
router.get('/:commentId', comment_controller.comment_detail_get)

//delete
router.delete('/comment/:commentId/delete', comment_controller.comment_delete)

//update
router.post('/:commentId/update', comment_controller.comment_update_post)

module.exports = router;