var express = require('express');
var router = express.Router();
const authenticateToken  = require("../middleware/jwt")

const blog_controller = require('../controllers/blogController')
const comment_controller = require('../controllers/commentController')
const admin_controller = require('../controllers/adminController')


// Get blog
router.get('/', authenticateToken, admin_controller.admin_blog_get )

router.post('/signup', admin_controller.admin_signup_post)

router.post('/login', admin_controller.admin_login_post)

router.post('/create', authenticateToken, admin_controller.admin_blog_create_post )

// update blog
router.post('/:blogId/update', authenticateToken, admin_controller.admin_update_post)

// delete blog
router.post('/:blogId/delete', authenticateToken, admin_controller.admin_blog_delete_post)

// delete comment
router.post('/:commentId/delete', authenticateToken, admin_controller.admin_comment_delete_post)
// 



module.exports = router;