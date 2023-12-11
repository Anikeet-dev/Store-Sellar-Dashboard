const Item = require('../models/item');
const path = require('path');

exports.getStore = (req, res) => {

        res.sendFile(path.join(__dirname, '..', 'views', 'store.html'));
};

exports.getItems = async (req, res) => {
    try {
        const items = await Item.findAll();
        res.json(items);
    } catch (err) {
        console.error('Error fetching items:', err);
        res.status(500).json({ error: err.message });
    }
};

exports.createItem = async (req, res) => {
    try {
      const itemName = req.body.itemName;
      const description = req.body.description;
      const price = req.body.price;
      const quantity = req.body.quantity;

      const newItem = await Item.create({
        itemName: itemName,
        description: description,
        price: price,
        quantity: quantity,
      });

        res.status(201).json({ newItemDetails: newItem });

    } catch (err) {
        console.error('Error creating item:', err);
        res.status(500).json({ error: err.message });
    }
};

exports.updateQuantity = async (req, res) => {
    try{
        const itemId = req.params.id;
        const item = await Item.findByPk(itemId);

        if(!item){
            res.status(404).json({message: 'Item not found'});
        }else{
            const quantityToBuy = req.body.quantityToBuy;
            if(item.quantity >= quantityToBuy){
                item.quantity -= quantityToBuy;
                await item.save();

                res.json({message: 'Quantity updated successfully!',updatedItem: item});
            }
            else{
                res.status(400).json({message: 'Not enough quantity available.'});
            }
        }
    }
    catch(err){
        console.error('Error updating quantity:', err);
    }
};


