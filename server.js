const express = require('express');

const routes = require('./routes')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use(routes);

app.listen(PORT, () => {
    console.log(`Express server running on PORT ${PORT}`)
})
