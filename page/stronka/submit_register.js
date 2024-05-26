const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Ustawienie parsera dla danych z formularza
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Po��czenie z baz� danych MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password', // Zmie� na swoje has�o
    database: 'mydatabase'
});

// Nawi�zanie po��czenia
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database as ID ' + connection.threadId);
});

// Obs�uga ��dania POST dla formularza rejestracyjnego
app.post('/submit_register', (req, res) => {
    // Pobranie danych z formularza
    const { username, email, password } = req.body;

    // Sprawdzenie czy wszystkie pola zosta�y wype�nione
    if (!username || !email || !password) {
        return res.status(400).send('All fields are required');
    }

    // Sprawdzenie czy u�ytkownik ju� istnieje w bazie danych
    connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
        if (error) {
            console.error('Error checking if user exists: ' + error.stack);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length > 0) {
            return res.status(400).send('User with this email already exists');
        }

        // Dodanie nowego u�ytkownika do bazy danych
        connection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password], (error, results) => {
            if (error) {
                console.error('Error inserting new user: ' + error.stack);
                return res.status(500).send('Internal Server Error');
            }

            // Zwr�cenie odpowiedzi
            res.status(200).send('Registration successful!');
        });
    });
});

// Nas�uchiwanie na okre�lonym porcie
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
