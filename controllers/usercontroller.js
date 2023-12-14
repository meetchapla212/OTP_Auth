const Speakeasy = require("speakeasy");
const UUID = require("uuid");
const { JsonDB } = require("node-json-db");
const { Config } = require("node-json-db/dist/lib/JsonDBConfig");

// Json Database
const db = new JsonDB(new Config("Database", true, true, "/"));

// User Registration.
const register = (data) => {
  try {
    if (data.username && data.email) {
      const id = UUID.v4();
      const path = `/user/${id}`;
      // Key for OTP auth enable
      data.auth_enabled = data.auth_enabled ? data.auth_enabled : false;
      // Create Secret Key
      const secret = Speakeasy.generateSecret();
      // Store in DB
      db.push(path, { id, secret, ...data });
      return {
        status: true,
        message: "User Registered Successfully!",
        data: { userid: id, ...data, secret: secret.base32, otpUrl: secret.otpauth_url },
      };
    } else {
      return {
        status: false,
        message: "Please provide username and email to register.",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
};

// OTP-based Authentication Verification
const login = async (data) => {
  try {
    const otp = data.otp;
    if (otp) {
      const user = data.user;
      // Base32 Secret Key for OTP verification.
      const { base32: secret } = user.secret;
      // OTP verification.
      const verified = await Speakeasy.totp.verify({
        secret,
        encoding: "base32",
        token: otp,
        window: 1,
      });
      if (verified) {
        return {
          status: true,
          message: "User Verified Successfully!",
          data: {
            auth_verified: true,
          },
        };
      } else {
        return {
          status: false,
          message: "Verification Failed: Please provide latest or valid OTP!",
          data: {
            auth_verified: false,
          },
        };
      }
    } else {
      return {
        status: false,
        message: "Please provide 6-digit OTP.",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
};

module.exports = {
  register: register,
  login: login,
};
