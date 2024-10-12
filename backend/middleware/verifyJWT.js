// const jwt = require("jsonwebtoken");

// const verifyJWT = (req, res, next) => {
//   // console.log(req.headers, "req headers from verifyJWT");

//   console.log(req.headers.authorization, "verifyJWT file");

//   const authHeader = req.headers.authorization || req.headers.Authorization;
//   if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
//   const token = authHeader.split(" ")[1];
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//     console.log(err, "err in verifyjwt");

//     if (err) return res.sendStatus(403); //invalid token

//     // console.log(decoded, "req.decoded");
//     req.user = decoded.UserInfo.username;
//     console.log(decoded, "decoded");

//     req.roles = decoded.UserInfo.roles;

//     console.log(decoded.UserInfo.username);

//     next();
//   });
// };

// module.exports = verifyJWT;

// middleware/verifyJWT.js

const jwt = require("jsonwebtoken");
const User = require("../model/User");

const verifyJWT = async (req, res, next) => {
  console.log("inside verify jwt");

  const authHeader = req.headers.authorization || req.headers.Authorization;
  console.log(req.headers.auth, "req.heder.auth");

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      console.log(decoded, "decoded");
      const user = await User.findById(decoded.userInfo._id).select(
        "-password -refreshToken"
      );
      console.log(user);

      if (!user) {
        return res
          .status(401)
          .json({ message: "Unauthorized: User not found" });
      }
      req.user = user; // Attach user to request

      //     console.log(decoded, "decoded");

      req.roles = decoded.userInfo.roles;
      next();
    } catch (error) {
      console.log("error in verify jwt", error);

      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized: No token provided" });
  }
};

module.exports = verifyJWT;
