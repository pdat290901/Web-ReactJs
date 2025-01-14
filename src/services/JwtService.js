// const jwt = require('jsonwebtoken')
// const dotenv = require('dotenv');
// dotenv.config()

// const generateAccessToken = (payload) =>{
//     console.log('payload',payload)
//     const access_token = jwt.sign({
//         payload
//     },process.env.ACCESS_TOKEN,{expiresIn: '30s'})
//     return access_token
// }

// const generateRefreshToken = (payload) =>{

//     const refresh_token = jwt.sign({
//         payload
//     },process.env.REFRESH_TOKEN,{expiresIn: '365d'})
//     return refresh_token
// }

// const refreshTokenJwtService =  (token) => {
//     return new Promise((resolve, reject) => {
//         try {
//             console.log("token", token);
//             jwt.verify(token, process.env.REFRESH_TOKEN, async(err, user) => {
//                 if (err) {
//                     console.log('err', err);
//                     return resolve({
//                         status: 'ERR',
//                         message: 'Authentication failed'
//                     })
//                 }
//                 const { payload} = user
//                 const access_token = await generateAccessToken({
//                     id: payload?.id,
//                     isAdmin: payload?.isAdmin
//                 })

//                 resolve({
//                     status: 'SUCCESS',
//                     message: 'Successfully authenticated!',
//                     access_token
//                 })
//             })

//         } catch (e) {
//             reject(e)
//         }
//     })
// }

// module.exports = {
//     generateAccessToken,
//     generateRefreshToken,
//     refreshTokenJwtService
//     }

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generateAccessToken = (payload) => {
  const access_token = jwt.sign({ ...payload }, process.env.ACCESS_TOKEN, {
    expiresIn: "30s",
  });
  return access_token;
};

const generateRefreshToken = (payload) => {
  const refresh_token = jwt.sign(
    {
      ...payload,
    },
    process.env.REFRESH_TOKEN,
    {
      expiresIn: "365d",
    }
  );
  return refresh_token;
};

const refreshTokenJwtService = (token) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
        if (err) {
          console.log("err", err);
          resolve({
            status: "ERR",
            message: "Authentication failed",
          });
        }
        const access_token = await generateAccessToken({
          id: user?.id,
          isAdmin: user?.isAdmin,
        });

        resolve({
          status: "SUCCESS",
          message: "Successfully authenticated!",
          access_token,
        });
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  refreshTokenJwtService,
};
