import express from 'express';
var router = express.Router();

router.get('/', (req, res) => {
  // TODO: Need logic to handle whether user is logged in via Firebase Auth
  //        just default to sign-in
  res.render('sign-in.html')
})

export default router;