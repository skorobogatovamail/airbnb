// src/routes/entriesRouter.js
const { Router } = require('express');
const { verifyAccessToken } = require('../middleware/verifyTokens');
const db = require('./db');

const router = Router();

const entriesRef = db.ref('Entries');

router
  .route('/')
  .get(async (req, res) => {
    entriesRef.once('value', (snapshot) => {
      const keys = Object.keys(snapshot.val());
      const values = Object.values(snapshot.val());
      values.forEach((key, i) => {
        values[i].key = keys[i];
      });
      res.json(values);
    });
  })
  .post(verifyAccessToken, async (req, res) => {
    try {
      const newUser = await entriesRef.push(req.body);
      res.json({ ...req.body, key: newUser.key });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create entry' });
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      const { id } = req.params;
      const entry = await entriesRef.child(id).once('value', (snapshot) => {
        res.json({ ...snapshot.val(), key: snapshot.key });
      });
      res.json(entry);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Failed to get entry' });
    }
  })
  .put(verifyAccessToken, async (req, res) => {
    try {
      const { id } = req.params;
      await entriesRef.child(id).update(req.body);
      const updatedEntry = await entriesRef
        .child(id)
        .once('value', (snapshot) => res.json(snapshot.val()));
      res.json(updatedEntry);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Failed to update entry' });
    }
  })
  .delete(verifyAccessToken, async (req, res) => {
    try {
      const { id } = req.params;
      await entriesRef.child(id).remove();
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Failed to delete entry' });
    }
  });
module.exports = router;
