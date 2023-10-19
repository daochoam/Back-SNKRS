const { User } = require("../../schemas/index");
const sendMail = require("../../services/sendMail");
const config = require("../../config/config");
const path = require("path");
const fs = require("fs");

const changeStatusByUserId = async (req, res) => {
  try {
    const { id: User_id } = req.params;
    const { status } = req.body;
    const user = await User.findOneAndUpdate(
      { _id: User_id },
      { status },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    const bodyMail = path.join(config.MAIL_ROUTE, "bannedEmail.html");
    const readMail = fs.readFileSync(bodyMail, "utf8");
    const reactivatedBodyMail = path.join(
      config.MAIL_ROUTE,
      "reactivatedMail.html"
    );
    const reactivatedReadMail = fs.readFileSync(reactivatedBodyMail, "utf-8");
    if (user.status === "banned") {
      sendMail(
        config.MAIL_SNKRS,
        "SNKRS",
        user.email,
        "Account Banned",
        readMail
      );
    } else if (user.status === "active") {
      sendMail(
        config.MAIL_SNKRS,
        "SNKR",
        user.email,
        "Account Reactivated",
        reactivatedReadMail
      );
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = changeStatusByUserId;
