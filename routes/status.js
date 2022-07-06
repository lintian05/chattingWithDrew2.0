const {
  checkStatus,
  open,
  close,
} = require("../controllers/openStatusController");

const router = require("express").Router();

router.get("/", checkStatus);
router.post("/open", open);
router.post("/close", close);

module.exports = router;
