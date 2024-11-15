const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const path = require('path');

// Configurar multer para almacenar las fotos
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/profile-photos/');
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Solo se permiten imágenes'));
  }
});

// router.post('/register', userController.register);
// router.post('/login', userController.login);

router.get('/:id/favoritos', userController.obtenerFavoritos);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.post('/:id/favorites/:productId', userController.addFavorite);
router.delete('/:id/favorites/:productId', userController.removeFavorite);
router.post('/:id/workshops/:workshopId', userController.addWorkshop);
router.delete('/:id/workshops/:workshopId', userController.removeWorkshop);
router.delete('/:id', userController.deleteUserById);
router.put('/:id/photo', upload.single('fotoPerfil'), userController.updateUserPhoto);

module.exports = router;
