// authRouter.js

const { Router } = require('express');
const bcrypt = require('bcrypt');
const generateTokens = require('../utils/generateTokens');
const cookiesConfig = require('../config/cookiesConfig');
const db = require('./db');
require('dotenv').config();

const router = Router();

const usersRef = db.ref('Users');

router.get('/', async (req, res) => {
  usersRef.once('value', (snapshot) => res.json(snapshot.val()));
});

router.route('/signup').post(async (req, res) => {
  const { name, email, password } = req.body;

  if (!(name && email && password)) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  let user = await usersRef
    .orderByChild('email')
    .equalTo(email)
    .limitToFirst(1)
    .once('value');

  let newUser;
  if (!user.val()) {
    user = { name, email, password: await bcrypt.hash(password, 10) };
    newUser = await usersRef.push(user);
  } else {
    return res
      .status(402)
      .json({ message: 'User with this email already exists' });
  }

  const plainUser = { ...user, key: newUser.key };
  delete plainUser.password;

  const { accessToken, refreshToken } = generateTokens({ user: plainUser });

  return res
    .cookie('refreshToken', refreshToken, cookiesConfig.refresh)
    .json({ user: plainUser, accessToken });
});

router.route('/login').post(async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const user = await usersRef
    .orderByChild('email')
    .equalTo(email)
    .limitToFirst(1)
    .once('value');

  if (!user) {
    return res
      .status(404)
      .json({ message: 'User with this email does not exists' });
  }

  const verified = await bcrypt.compare(password, user.password);
  if (!verified) {
    return res.status(401).json({ message: 'Incorrect user or password' });
  }

  const plainUser = { ...user.val() };
  delete plainUser.password;

  const { accessToken, refreshToken } = generateTokens({ user: plainUser });

  return res
    .cookie('refreshToken', refreshToken, cookiesConfig.refresh)
    .json({ user: plainUser, accessToken });
});

router.route('/logout').get((req, res) => {
  res.clearCookie('refreshToken');
  res.status(200).send({ message: 'Logged out successfully' });
});

module.exports = router;
