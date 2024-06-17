// authRouter.js

const admin = require('firebase-admin');
const { Router } = require('express');
const bcrypt = require('bcrypt');
const generateTokens = require('../utils/generateTokens');
const cookiesConfig = require('../config/cookiesConfig');
require('dotenv').config();

const router = Router();

const serviceAccount = require('../airbnc-c67fa-firebase-adminsdk-6s2om-d52206a8a8.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    'https://airbnc-c67fa-default-rtdb.europe-west1.firebasedatabase.app',
});
const db = admin.database();
const usersRef = db.ref('Users');

// const { FIREBASE_DATABASE_URL } = process.env;
// router.route('/signup').post(async (req, res) => {
//   const fireResponse = await axios.post(`${FIREBASE_DATABASE_URL}/Users.json`, {
//     name,
//     email,
//     password,
//   });
//   console.log('fireResponse:', fireResponse);
// res.sendStatus(200);
// });

router.get('/', async (req, res) => {
  // Read data
  usersRef.once('value', (snapshot) => res.json(snapshot.val()));
});

router.route('/signup').post(async (req, res) => {
  const { name, email, password } = req.body;

  if (!(name && email && password)) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const user = await usersRef
    .orderByChild('email')
    .equalTo('test@example.com')
    .limitToFirst(1)
    .once('value');

  if (!user) {
    // Write data
    usersRef.set({ name, email, password: bcrypt.hash(password, 10) });
  } else {
    return res
      .status(402)
      .json({ message: 'User with this email already exists' });
  }

  const plainUser = user.value();
  delete plainUser.password();

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
    .equalTo('test@example.com')
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

  const plainUser = user.value();
  delete plainUser.password();

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
