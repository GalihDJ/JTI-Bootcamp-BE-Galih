const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next){
    res.send('I like food')
});

module.exports = router;