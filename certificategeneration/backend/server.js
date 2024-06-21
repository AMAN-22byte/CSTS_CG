const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const crypto = require("crypto");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "userdetails"
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to database.");
});

function hashPassword(password) {
    return String(crypto.createHash('md5').update(password).digest('hex'));
}

app.post('/', (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = hashPassword(password);

    const sql = "INSERT INTO logindetails (name, email, password) VALUES (?, ?, ?)";
    const values = [name, email, hashedPassword];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error("Error occurred: ", err);
            return res.status(500).json({ success: false, message: "Error occurred" });
        }
        return res.status(201).json({ success: true, data });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = hashPassword(password);

    const sql = "SELECT * FROM logindetails WHERE email = ? AND password = ?";
    db.query(sql, [email, hashedPassword], (err, data) => {
        if (err) {
            console.error("Error occurred: ", err);
            return res.status(500).json({ success: false, message: "Error occurred" });
        }
        if (data.length > 0) {
            return res.status(200).json({ success: true, message: "Login successful" });
        } else {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
    });
});

app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});
