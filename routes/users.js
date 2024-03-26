var express = require('express');
var router = express.Router();
const authenticateToken  = require("../middleware/jwt")

const user_controller = require('../controllers/userController')


/* GET users listing. */

router.post('/signup', user_controller.user_create_post)

router.get('/login', user_controller.user_login_get)

router.post('/login', user_controller.user_login_post)

router.get('/post', authenticateToken, user_controller.user_post_get)

module.exports = router;
