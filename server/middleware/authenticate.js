// const jwt = require('jsonwebtoken')
// const User = require('../model/userSchema')

// const Authenticate = async(req,res,next) => {
//     try{
//         const token = req.body.token || req.query.token|| req.headers["x-access-token"];;
//         const verifyToken = jwt.verify(token,process.env.SECRET_KEY)

//         const rootUser = await User.findOne({_id:verifyToken._id,"tokens.token":token})

//         if(!rootUser){
//             throw new Error('User not Found')
//         }
//         req.token = token
//         req.rootUser = rootUser
//         req.userID =rootUser._id

//         next();

//     }catch(err){
//         res.status(401).send('Unauthorised:No token Provided')
//         console.log(err)
//     }

// }




// module.exports = Authenticate
const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
//   const token =
//     req.body.token || req.query.token || req.headers["x-access-token"];

//   if (!token) {
//     return res.status(403).send("A token is required for authentication");
//   }
//   try {
//     const decoded = jwt.verify(token, config.TOKEN_KEY);
//     req.user = decoded;
//   } catch (err) {
//     return res.status(401).send("Invalid Token");
//   }
//   return next();
var isNode = typeof module !== 'undefined'
if(!isNode){
   //use the local storage
//    var myItem = localStorage.getItem(itemTitle)
const usertoken = localStorage.getItem('token');
const token = usertoken.split(' ');
const decoded = jwt.verify(token[1], 'SECRET_KEY');
console.log(decoded);
}

next();
};

module.exports = verifyToken;
