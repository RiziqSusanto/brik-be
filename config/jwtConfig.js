const crypto = require("crypto");
const secretKey = crypto.randomBytes(64).toString("hex");

module.exports = {
    secretKey: secretKey,
    expiresIn: "1h", // Token expiration time
};
