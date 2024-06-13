// src/routes/entriesRouter.js

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
