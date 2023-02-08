const express = require('express');
const router = express.Router();

// SHOW -  HOMEPAGE
router.get('/', (req, res) => {
    res.render('home');
});

module.exports = router;