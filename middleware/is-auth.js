const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHandler = req.get("Authorization");
  if (!authHandler) {
    return res.status(422).json({ message: "error" });
  }

  const token = authHandler.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.ADD_YOUR_TOOKEN_SECRET);
  } catch (err) {
    return res
      .status(422)
      .json({ message: "please try to login again lololo" });
  }

  if (!decodedToken) {
    return res.status(422).json({ message: "please try to login again" });
  }
  req.userId = decodedToken.userid;

  next();
};
