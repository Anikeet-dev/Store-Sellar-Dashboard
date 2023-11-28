const Item = require('../models/item');

exports.createItem = async (req, res, next) => {
    try {
        if (!req.body.itemName) {
            throw new Error('Item Name is mandatory!');
        }

        const { itemName, description, price, quantity } = req.body;

        const newItem = await Item.create({
            itemName,
            description,
            price,
            quantity
        });

        res.status(201).json({ newItemDetails: newItem });
    } catch (err) {
        console.error('Error creating item:', err);
        res.status(500).json({ error: err.message });
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
