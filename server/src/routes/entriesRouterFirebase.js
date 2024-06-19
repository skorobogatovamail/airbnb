// src/routes/entriesRouter.js
const { Router } = require('express');
const path = require('path');
const imageDownloader = require('image-downloader');
const { verifyAccessToken } = require('../middleware/verifyTokens');
const db = require('./db');
const uploadPhoto = require('../middleware/uploadPhoto');

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
      const newEntry = await entriesRef.push(req.body);
      const defaultImage =
        'https://images.bubbleup.com/width1920/quality35/mville2017/1-brand/1-margaritaville.com/gallery-media/220803-compasshotel-medford-pool-73868-1677873697-78625-1694019828.jpg';
      if (!req.body.image) {
        res.json({ ...req.body, key: newEntry.key, image: defaultImage });
      } else {
        res.json({ ...req.body, key: newEntry.key });
      }
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

router.route('/upload_image_link').post(async (req, res) => {
  try {
    const { link } = req.body;
    const newName = `${Date.now()}.jpg`;

    const options = {
      url: link,
      dest: path.join(__dirname, '..', '..', 'uploads', newName),
    };

    await imageDownloader.image(options);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

router
  .route('/upload_image')
  .post(uploadPhoto.array('photo', 10), async (req, res) => {
    try {
      console.log(req.body);
      res.json(req.files);
      // const { link } = req.body;
      // const newName = `${Date.now()}.jpg`;

      // const options = {
      //   url: link,
      //   dest: path.join(__dirname, '..', '..', 'uploads', newName),
      // };

      // await imageDownloader.image(options);
      // res.sendStatus(200);
    } catch (error) {
      console.log(error);
    }
  });
module.exports = router;
