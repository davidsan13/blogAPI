const jwt = require('jsonwebtoken')


function authenicateToken(req, res, next) {
    // const authHeader = req.headers['authorization']
    
    // const token = authHeader && authHeader.split(' ')[1]
    // console.log(req.cookies)
    const token = req.cookies.access_token
    console.log(token)
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.secretKey, (err, user) => {
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }

module.exports = authenicateToken