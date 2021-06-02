const User = require("./../model/user");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: user,
  });
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //1) Check if email and password exist
    if (!email || !password) {
      return res.status(400).send("Please provide email and password");
    }

    //2) Check if user exist and password is correct
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({
        status: "failed",
        data: "Email or Password is wrong",
      });
    }

    //3) If everything ok, send token to client
    createSendToken(user, 200, res);
  } catch (err) {
    res.status(500).json({
      status: "failed",
      data: err,
    });
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ status: "success" });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      data: err,
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    // 1) Getting token at check if it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return res.status(401).json({
          status: "failed",
          data: "You are not logged in. Please login to get access."
      });
    }

    // 2) Verification token
    let decoded; 

    jwt.verify(token, process.env.JWT_SECRET, function(err, decode) {
        if(err)
            return res.status(401).json({
                status: "failed",
                data: "Please Login again.",
              });
        decoded = decode;
    });

    // 3) Check if user still exist
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return res.status(401).json({
            status: "failed",
            data: "User belong to this token no longer exist."
        });
    }

    // 4) Check if user has changed password after the token was issued
    // if (currentUser.changedPasswordAfter(decoded.iat)) {
    //   return next(
    //     new AppError("User recently changed password! Please log in again", 401)
    //   );
    // }

    // GRAND ACCESS TO PROTEECTED ROUTE
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  } catch (err) {
    res.status(500).json({
      status: "failed",
      data: err,
    });
  }
};
