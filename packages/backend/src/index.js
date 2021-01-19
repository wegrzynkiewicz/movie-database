const express = require('express');

const app = express();

app.get('/api', (req, res) => {
    res.end();
});

app.listen(3000, '0.0.0.0', () => {
    console.log('Server started listening...');
});
