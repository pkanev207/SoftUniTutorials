const express = require('express');

const expressConfig = require('./config/express');
const dataBaseConfig = require('./config/database');
const routesConfig = require('./config/routes');


start();

async function start() {
    const app = express();

    expressConfig(app);
    await dataBaseConfig(app);
    routesConfig(app);


    app.get('*', (req, res) => {
        res.render('404', { title: 'Page Not Found' });
    });

    app.listen(3000, () => console.log('Server listening on port 3000'));
}
