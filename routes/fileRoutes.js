const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();
const fileController = require('../controllers/fileController')
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.single('file'),fileController.filePost)
router.get('/one/:id', fileController.fileGetOne)
router.get('/getone/:id', fileController.fileGetMetadata)
router.get('/all', fileController.fileGetAll)
router.get('/type', fileController.fileGetType)
router.get('/search', fileController.fileGetSearch)
router.get('/five', fileController.fileGet5)
router.put('/edit', upload.single('file'), fileController.filePut)
router.delete('/delete', fileController.fileDelete)


module.exports = router;