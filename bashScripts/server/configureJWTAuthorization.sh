cd server

mkdir src
cd src

mkdir routes middleware config utils

touch config/cookiesConfig.js config/jwtConfig.js
echo "// jwtConfig.js

module.exports = {
  access: {
    expiresIn: 1000 * 5,
  },
  refresh: {
    expiresIn: 1000 * 60 * 60 * 12,
  },
};" > config/jwtConfig.js

echo "// cookiesConfig.js

const jwtConfig = require('./jwtConfig');

module.exports = {
  access: {
    maxAge: jwtConfig.access.expiresIn,
    httpOnly: true,
  },
  refresh: {
    maxAge: jwtConfig.refresh.expiresIn,
    httpOnly: true,
    // sameSite: 'none',
    // secure: true,
  },
};" > config/cookiesConfig.js


touch middleware/verifyTokens.js
echo "// verifyTokens.js

const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyAccessToken = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1]; // Bearer <token>
    const { user } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    res.locals.user = user;

    return next();
  } catch (error) {
    console.log('Invalid access token');
    return res.sendStatus(403);
  }
};

const verifyRefreshToken = (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const { user } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    res.locals.user = user;

    return next();
  } catch (error) {
    console.log('Invalid refresh token');
    return res.clearCookie('refreshToken').sendStatus(401);
  }
};

module.exports = { verifyAccessToken, verifyRefreshToken };
" > middleware/verifyTokens.js


touch routes/authRouter.js routes/tokensRouter.js
echo "// authRouter.js

const { Router } = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');
const generateTokens = require('../utils/generateTokens');
const cookiesConfig = require('../config/cookiesConfig');

const router = Router();

router.route('/signup').post(async (req, res) => {
  console.log('req.body: ', req.body);
  const { name, email, password } = req.body;

  if (!(name && email && password)) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      name,
      password: await bcrypt.hash(password, 10),
    },
  });

  if (!created) return res.status(403).json({ message: 'User already exists' });

  const plainUser = user.get();
  delete plainUser.password;

  const { accessToken, refreshToken } = generateTokens({ user: plainUser });

  return res
    .cookie('refreshToken', refreshToken, cookiesConfig.refresh)
    .json({ user: plainUser, accessToken });
});

router.route('/login').post(async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (!(email && password)) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: 'Incorrect user or password' });
  }

  const verified = await bcrypt.compare(password, user.password);
  if (!verified) {
    return res.status(401).json({ message: 'Incorrect user or password' });
  }

  const plainUser = user.get();
  delete plainUser.password;

  const { accessToken, refreshToken } = generateTokens({ user: plainUser });

  return res
    .cookie('refreshToken', refreshToken, cookiesConfig.refresh)
    .json({ user: plainUser, accessToken });
});

router.route('/logout').get((req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.status(200).send({ message: 'Logged out successfully' });
});

module.exports = router;
" > routes/authRouter.js

echo "// tokensRouter.js 

const { Router } = require('express');
const generateTokens = require('../utils/generateTokens');
const { verifyRefreshToken } = require('../middleware/verifyTokens');
const cookiesConfig = require('../config/cookiesConfig');

const router = Router();

router.get('/refresh', verifyRefreshToken, (req, res) => {
  const { accessToken, refreshToken } = generateTokens({
    user: res.locals.user,
  });

  return res
    .cookie('refreshToken', refreshToken, cookiesConfig.refresh)
    .json({ user: res.locals.user, accessToken });
});

module.exports = router;
" > routes/tokensRouter.js 


touch utils/generateTokens.js
echo "// generateTokens.js 

const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');
require('dotenv').config();

module.exports = (payload) => ({
  accessToken: jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET,
    jwtConfig.access,
  ),
  refreshToken: jwt.sign(
    payload,
    process.env.REFRESH_TOKEN_SECRET,
    jwtConfig.refresh,
  ),
});
" > utils/generateTokens.js