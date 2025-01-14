
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authMiddleware = (req, res, next) => {
  // Kiểm tra sự tồn tại của token trong headers
  const authHeader = req.headers.token;
  if (!authHeader) {
    return res.status(401).json({
      message: "Token is required",
      status: "ERR",
    });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "Token is required",
      status: "ERR",
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      return res.status(401).json({
        message: "Authentication failed",
        status: "ERR",
      });
    }

    if (user?.isAdmin) {
      next();
    } else {
      return res.status(403).json({
        message: "Access denied",
        status: "ERR",
      });
    }
  });
};

const authUserMiddleware = (req, res, next) => {
  const authHeader = req.headers.token;
  if (!authHeader) {
    return res.status(401).json({
      message: "Token is required",
      status: "ERR",
    });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "Token is required",
      status: "ERR",
    });
  }

  const userId = req.params.id; // Lấy userId từ URL params
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    
    if (err) {
      console.error("JWT verification failed:", err);
      return res.status(401).json({
        message: "Authentication failed",
        status: "ERR",
      })
    }
    console.log("Decoded user from token:", user);
    if (user?.isAdmin || user?.id === userId) {
      next();
    } else {
      console.log(
        `Access denied for user: ${user.id}, required userId: ${userId}`
      );
      return res.status(403).json({
        message: "Access denied",
        status: "ERR",
      });
    }
  });
};




module.exports = {
  authMiddleware,
  authUserMiddleware,
};




