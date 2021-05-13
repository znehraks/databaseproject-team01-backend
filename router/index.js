const express = require("express");
const router = express.Router();
const emp = require("./emp");
const sign = require("./sign/");
const datacontroll = require("./datacontroll/");
const project = require("./project");
const empInProject = require("./emp_in_project");
const department = require("./department");
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
router.use("/api/department", department);

module.exports = router;
