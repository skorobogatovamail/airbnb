const multer = require('multer');

const uploadPhoto = multer({ dest: 'uploads' });

module.exports = uploadPhoto;
