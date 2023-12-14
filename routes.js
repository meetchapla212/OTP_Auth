const Express = require("express");
const { register, login } = require("./controllers/usercontroller");
const { auth } = require("./middleware/auth");
const router = Express.Router();

// Register api to create a user.
router.post("/register", (req, res, next) => {
  try {
    res.send(register(req.body));
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
});

// Login api for authentication.
router.post("/login", auth, async (req, res, next) => {
  try {
    res.send(await login(req.body));
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
});

module.exports = router;
