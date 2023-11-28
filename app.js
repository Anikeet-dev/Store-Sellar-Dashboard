const express = require('express');
const bodyParser = require('body-parser');
const itemRoutes = require('./routes/itemRoutes');
const sequelize = require('./util/database');

const app = express();

app.use(bodyParser.json({ extended: false }));
app.use(itemRoutes);

sequelize
    .sync()
    .then(result => {
        app.listen(6000, () => {
            console.log('Server is running on port 6000');
        });
    })
    .catch(err => {
        console.log(err);
    });

