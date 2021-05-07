const express = require("express");
const router = express.Router();
const emp = require("./emp");

//url Routing
router.use("/api/emp", emp);

module.exports = router;
