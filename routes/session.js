let express = require('express');
let router = express.Router();
let sessionController = require('../controllers/session');

router.post('/signIn', sessionController.signIn);

router.get('/welcome', sessionController.welcome);



module.exports = router;