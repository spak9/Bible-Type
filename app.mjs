// Imported Node modules
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import nunjucks from 'nunjucks';
import { fileURLToPath } from 'url';

// Imported Express Routers
import indexRouter from './routes/index.mjs';

// Firebase imports
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Constants
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const firebaseApp = setupFirebase();

// Express Application
const app = express();

// Mounts "express-generator" default middleware functions
// TODO: Explore each one to understand functionality
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup - using Nunjucks for Jinja syntax
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// Mount our "/" router
app.use('/', indexRouter);


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


/* 
  A function that initializes all the Firebase stuff - should be called
  first thing in application.

  Returns the "App" instance
*/
function setupFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyBmt5qcXF4_H1d058oo2d7TZZHrN5EJS7A",
    authDomain: "bible-type.firebaseapp.com",
    projectId: "bible-type",
    storageBucket: "bible-type.appspot.com",
    messagingSenderId: "459689184734",
    appId: "1:459689184734:web:91de9da31231d39c33614f",
    measurementId: "G-G4EQMJ7M8L"
  };
  const app = initializeApp(firebaseConfig);
  return app;
}

// module.exports = app;
export { app };
