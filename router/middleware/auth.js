const jwt = require("jsonwebtoken");

let auth = (req, res, next) => {
  // 인증 처리

  // 클라이언트 쿠키에서 토큰 가져오기
  let token = req.cookies.user;
  try{
    const decode = jwt.verify(token, "secretToken");
    req.token = token;
    req.user = decode
    next();
  }
  catch {
    return res.json({
      isAuth: false,
      error: true,
      cookie: req.cookies.user
    })
  }
}

module.exports = { auth };