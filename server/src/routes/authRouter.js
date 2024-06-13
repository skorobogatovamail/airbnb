// authRouter.js

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
