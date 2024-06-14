// displays public pages:
const templates = require('../templates.js');

const router = require('express').Router();

//frontpage:
router.get('/', async (req,res)=>{
  try {
    let data = "";
    response = templates.buildPage('frontpage',data);
    res.send(response);
  } catch (e) {
    console.warn(e);
    res.status(400).send('oops, something went wrong del public');
  }
});

module.exports = router;
