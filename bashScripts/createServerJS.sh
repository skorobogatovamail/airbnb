cd server/src

touch server.js
echo "const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRouter');
const tokensRouter = require('./routes/tokensRouter');
const entriesRouter = require('./routes/entriesRouter');

const app = express();
const PORT = 3000;

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/tokens', tokensRouter);
app.use('/api/entries', entriesRouter);

app.listen(PORT, () => console.log());

" > server.js

echo "// src/routes/entriesRouter.js

const { Router } = require('express');
const { Entry } = require('../../db/models');
const { verifyAccessToken } = require('../middleware/verifyTokens');

const router = Router();

router
  .route('/')
  .get(async (req, res) => {
    try {
      const entries = await Entry.findAll({
        order: [['createdAt', 'DESC']],
      });
      res.json(entries);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Failed to get entries' });
    }
  })
  .post(verifyAccessToken, async (req, res) => {
    try {
      const entry = await Entry.create(req.body);
      res.json(entry);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Failed to create entry' });
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      const oneEntry = await Entry.findByPk(req.params.id);
      res.json(oneEntry);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Failed to get entry' });
    }
  })
  .put(verifyAccessToken, async (req, res) => {
    try {
      await Entry.update(req.body, { where: { id: req.params.id } });
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Failed to update entry' });
    }
  })
  .delete(verifyAccessToken, async (req, res) => {
    try {
      await Entry.destroy({ where: { id: req.params.id } });
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Failed to delete entry' });
    }
  });
module.exports = router;
" > routes/entriesRouter.js