const express = require("express");
const router = express.Router();
const emp = require("./emp");
const sign = require("./sign/");
const datacontroll = require("./datacontroll/");
const project = require("./project");
const empInProject = require("./emp_in_project");
const req06 = require("./req06");
const req01 = require("./req01");
const req02 = require("./req02");
const app = express();

app.get("/", (req, res) => {
  return res.json({ hell0: "hello" });
});

//url Routing
router.use("/api/emp", emp);
router.use("/api/sign", sign);
router.use("/api/data", datacontroll);
router.use("/api/project", project);
router.use("/api/employee_in_project", empInProject);
router.use("/api/req01", req01);
router.use("/api/req02", req02);
router.use("/api/req06", req06);

module.exports = router;
