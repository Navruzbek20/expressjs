const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { connect } = require('./routes/books');
const app = express();

// body parser vazifasini bajaradi
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// books modeli apilari
app.use('/api/books', require('./routes/books'))

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`${port} ishga tushdi`);
});

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs_beers'
})

app.get('/api/get', (req, res) => {
    pool.getConnection((err, connect)=>{
        console.log('bazaga ulanmadi')

        connection.query('SELECT * from beers', (err,rows)=>{
            connection.release()

            if(!err){
                res.send(rows);
            }else{
                console.log(err)
            }
        })
    })
});