const { JsonDB } = require("node-json-db");
const { Config } = require("node-json-db/dist/lib/JsonDBConfig");
const db = new JsonDB(new Config("Database", true, true, "/"));

// Auth Middleware for distinguish user for 'Claim-based Authorization'.
const authentication = async (req, res, next) => {
  try {
    const userid = req.body.userid;
    if (userid) {
      const path = `/user/${req.body.userid}`;
      const user = await db.getData(path);
      if (user) {
        if (user.auth_enabled) {
          req.body.user = user;
          next();
        } else {
          res.status(200).send({
            status: true,
            message: "Authentication Successfull!",
          });
        }
      }
    } else {
      res.status(200).send({
        status: false,
        message: "Invalid User ID: User Not Found.",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

module.exports = { auth: authentication };
