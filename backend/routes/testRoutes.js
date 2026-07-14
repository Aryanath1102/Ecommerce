const express = require("express");
const app = express();

const router = express.Router();
router.get("/test-user", (req, res) => {
  res.status(200).send("Welcome to ECommerce");
});
module.exports = router;
