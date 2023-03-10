const express = require('express');
const router = express.Router();

router.get('/ping', (req, res)=>{
    res.json({response: "pong", details: {project_name: "Zapit", version: "0.0.1", tag: "demo", description: "Zapit assesment ..." } });
});

// if no url matched
router.get('/*', (req, res) => {
    return res.json({status: false, message: "wrong url..."});
});


module.exports = router;