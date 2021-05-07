const express = require("express");
const router = express.Router();
const emp = require("./emp");
const sign = require("./sign/");
const datacontroll = require("./datacontroll/");
const app = express();


app.get("/", (req, res) => {
  return res.json({hell0 : "hello"});
});

//url Routing
router.use("/api/emp", emp);
router.use("/api/sign", sign);
router.use("/api/data", datacontroll);

module.exports = router;
