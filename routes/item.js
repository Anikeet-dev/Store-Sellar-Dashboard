
const express = require('express');
const itemController = require('../controllers/itemController');
const router = express.Router();

router.post('/create-item', itemController.createItem);
router.put('/update-quantity/:id', itemController.updateQuantity);
router.get('/get-items', itemController.getItems);
router.get('/', itemController.getStore);


module.exports = router;
