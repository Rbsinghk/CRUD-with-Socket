const jwt = require("jsonwebtoken");
const register = require('../models/user');

// const verifytoken = async function checkUserOrAdmin(req, res, next) {
//   try {
//     const token = socket.handshake.query.token('Authorization');
//     const verifyUser = jwt.verify(token, "process.env.TOKEN_CODE");
//     const user = await register.findOne({ _id: verifyUser.data._id });
//     req.user = user;
//     next();
//   } catch (error) {
//     io.emit({ message: "Invalid Token", isSuccess: false });
//   }
// }


module.exports = verifytoken;