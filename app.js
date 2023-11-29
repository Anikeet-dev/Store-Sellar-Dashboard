const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./util/database');
const rootDir = require('./util/path');
const port = 9000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(rootDir, 'views'));

const itemRoutes = require('./routes/item');

app.use(express.json());
app.use(express.static('views'));
app.use(itemRoutes);

sequelize
    .sync()
    .then(result => {
        app.listen(port, () => {
            console.log(`Server is running on ${port}`);
        });
    })
    .catch(err => {
        console.log(err);
    });

