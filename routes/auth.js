const {
  login,
  register,
  getAllUsers,
  getDrew,
  setAvatar,
  logOut,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/", login);
router.post("/login", login);
router.post("/register", register);
router.get("/drew", getDrew);
router.get("/allusers/:id", getAllUsers);
router.post("/setavatar/:id", setAvatar);
router.get("/logout/:id", logOut);

module.exports = router;
