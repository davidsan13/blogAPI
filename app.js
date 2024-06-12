var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors')

const mongoose = require("mongoose");
const User = require("./models/user");

 
var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');
var blogRouter = require('./routes/blogs');
var adminRouter = require('./routes/admin')


require('dotenv').config()
// Import the mongoose module

// mongoose.set("strictQuery", false);

// Define the database URL to connect to.
const mongoDb = process.env.MONGO_URL;
mongoose.connect(mongoDb)
const db = mongoose.connection
db.on("error", console.error.bind(console, "mongo connection error"));

var app = express();

app.use(express.urlencoded({ extended: false }));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(
//   jwt({
//     secret: process.env.secretKey,
//     access_token: req => req.cookies.token
//   })
// );

var corsoption={
  origin:"https://blog-production-c0ef.up.railway.app", //origin from where you requesting
  credentials: true,
  methods: ["GET", "POST"]
}


// app.set("trust proxy", 1)
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Credentials', 'true');
//   next();
// });
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsoption))

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "session",
  })
)

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/blog', blogRouter);
app.use('/admin', adminRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
