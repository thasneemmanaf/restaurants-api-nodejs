const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const data = {
  users: [],
};
// To generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// To sign up a new user and create token
exports.signupUser = (req, res) => {
  try {
    const { body } = req;
    body._id = data.users.length + 1;
    data.users.push(body);
    const token = generateToken(data.users[0]._id);
    res.status(201).json({
      status: "success",
      token,
      data,
    });
  } catch (err) {
    console.log(err);
  }
};

// To delete user
exports.deleteUser = (req, res) => {
  const { userId } = req.params;
  const newUsers = data.users.filter((user) => user._id !== +userId);
  data.users = [...newUsers];

  res.status(200).json({
    status: "success",
    data,
  });
};

/**
 To authenticate user
 1. Check if token is supplied in the request
 2. Check if token is valid
 3. Check if user still exist. Possible that user account is deleted after token is issued
 4. Check if user changed password after token is issued
 */

// To authenticate user login
exports.authenticateUser = async (req, res, next) => {
  let token;

  // 1. To check if there is a token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    res.status(401).json({
      status: "unauthorized",
    });
  } else {
    // 2. Token Verification
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3. Check if user still exists
    const currentUser = data.users.find((user) => {
      return user._id === decoded.id;
    });

    if (currentUser) {
      next();
    } else {
      res.status(401).json({
        status: "unauthorized",
        message: "User doesn't exist! Unauthorized access",
      });
    }
  }
};
