import express from 'express';
import authRouter from './auth.mjs';
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});

/* GET about page */
router.get('/about', (req, res) => {
  res.render('about.html')
})

/* Mount "/auth" router */
router.use('/auth', authRouter);

export default router;
