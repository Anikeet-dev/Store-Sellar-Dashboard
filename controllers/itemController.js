const Item = require('../models/item');

exports.getStore = async (req, res, next) => {
    try {
        const items = await Item.findAll();
        res.render('store', { items });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getItems = async (req, res, next) => {
    try {
        const items = await Item.findAll();
        res.json(items);
    } catch (err) {
        console.error('Error fetching items:', err);
        res.status(500).json({ error: err.message });
    }
};

exports.createItem = async (req, res, next) => {
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

exports.updateQuantity = async (req, res, next) => {
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
        console.log('Error updating quantity:', err);
    }
};


