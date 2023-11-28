
const express = require('express');
const itemController = require('../controllers/itemController');
const router = express.Router();

router.get('/get-items', itemController.getItems);
// router.put('/edit-item/:id', itemController.editItem);
router.post('/create-item', itemController.createItem);
// router.delete('/delete-item/:id', itemController.deleteItem);

module.exports = router;
