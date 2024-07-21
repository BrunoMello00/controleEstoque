const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Root@1234',
    database: 'consultaLojav1'
});

app.use(cors());

// Adicione esta linha para analisar o corpo das solicitações como JSON
app.use(express.json());

// Aplicar o middleware CORS antes das rotas
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/shirtSizes', (req, res) => {
    db.query('SELECT * FROM ShirtSizes', (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/shirtPrices', (req, res) => {
    db.query('SELECT * FROM ShirtPrices', (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.post('/statistics', (req, res) => {
    const { topSellingShirt, topSellingSize, totalExchanges, mostExchangedShirts, mostUsedPaymentMethod, totalProfit } = req.body;
    const sql = `INSERT INTO Statistics (topSellingShirt, topSellingSize, totalExchanges, mostExchangedShirts, mostUsedPaymentMethod, totalProfit) VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(sql, [JSON.stringify(topSellingShirt), JSON.stringify(topSellingSize), totalExchanges, JSON.stringify(mostExchangedShirts), JSON.stringify(mostUsedPaymentMethod), totalProfit], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.put('/shirtSizes/:id', (req, res) => {
    const id = req.params.id;
    const count = req.body.count;
    const sql = `UPDATE ShirtSizes SET count = ? WHERE id = ?`;

    db.query(sql, [count, id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});