const express = require('express');
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'classicmodels'
});

const app = express();
const PORT = 3000;

// 1
app.get('/question1', async (req, res) => {
    try{
        const [rows] = await pool.query(
            `SELECT COUNT(*) AS total FROM customers WHERE country = 'France' `
        )
        res.json(rows[0])
    }
    catch (error){
        res.status(500).json({ error: error.message })
    }
})

// 2
app.get('/question2', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT firstName, lastName FROM employees WHERE reportsTo = 1143`
        );

        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3
app.get('/question3', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT SUM(quantityInStock) FROM products WHERE productLine = 'Classic Cars' `
        );

        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// בונוס1 


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Connected to MySQL successfully!');
        connection.release();
    }
    catch (error) {
        console.error('MySQL connection failed:', error.message);
    }
}

testConnection();