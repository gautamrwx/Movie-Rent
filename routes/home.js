const express = require('express');
const router = express.Router();

// Read Resource
router.get('/',(req,res) => {
    res.send("Welcome To Homepage : Please visit /api/genres");
})

module.exports = router;