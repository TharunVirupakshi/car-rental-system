// Example using Express.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
app.use(cors()); // Enable CORS for all routes

const mysql = require('mysql');
const { json } = require('express');


var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootpass",
    database: 'CarRentalDB',
});

db.connect(function (err) {
    if (err) throw err;
    console.log("DB Connected!");
});

// Parse incoming JSON data
app.use(bodyParser.json());

app.get('/', (req, res)=>{
    res.send('Hello...!')
})

// API endpoint to receive user details and store in SQL
app.post('/api/store-user', (req, res) => {
  const {custID, name, contactNum, email, address } = req.body;

  // SQL query to insert user details into the 'customer' table
  const sql = 'INSERT INTO customer (custID, name, contactNum, email, address) VALUES (?, ?, ?, ?, ?)';
  const values = [custID ,name, contactNum, email, address];

  // Perform SQL database insertion
  db.query(sql, values, (err, result) => {
      if (err) {
          console.error('Error inserting user details into MySQL:', err.message);
          res.status(500).json({ error: 'Internal Server Error' });
      } else {
          console.log('User details inserted into MySQL:', result);
          res.json({ message: 'User details stored successfully' });
      }
  });
});

// API endpoint to fetch cars from the 'car' table
app.get('/api/getCars', (req, res) => {
  // SQL query to select all cars from the 'car' table
  const sql = 'SELECT * FROM car, location WHERE car.locationID = location.locationID';

  // Perform SQL database query
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching cars from MySQL:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Cars fetched from MySQL:', result);
      res.json(result);
    }
  });
});


app.get('/api/getCar', (req, res)=>{
    
    const vehicleNo = req.query.vehicleNo;

    const sql = `SELECT * FROM car, location WHERE car.vehicleNo = '${vehicleNo}' AND car.locationID = location.locationID`


    // Perform SQL database query
    db.query(sql, (err, result) => {
        if (err) {
        console.error(`Error fetching car with ID ${vehicleNo}  from MySQL:`, err.message);
        res.status(500).json({ error: 'Internal Server Error' });
        } else {
        console.log('Cars fetched from MySQL:', result);
        res.json(result);
        }
    });
})


app.post('/api/createOrder', async(req, res)=>{
    try {
        const { carID, custID, discountID, totCost } = req.body;

        const sql = 'INSERT INTO rentalOrder (carID, custID, asstID, discountID, totCost, orderDate) VALUES(?,?,?,?,?,?)'
       
        // Assign tripAsst
          // Fetch a random assistant from the tripAsst table
        const assignAsst = 'SELECT * FROM tripAsst ORDER BY RAND() LIMIT 1';

        db.query(assignAsst, (err, result) => {
            if (err) {
                console.error('Error assigning trip assistant:', err.message);
                    res.status(500).json({ success: false, error: 'Internal Server Error' });
                } else {
                    const assistant = result[0]; // Assuming the result is an array, and you want the first assistant
                    const asstID = assistant ? assistant.asstID : null;
                    console.log('Assigned asst: ', asstID)
                    if(asstID){
                       // Generate current timestamp formatted for SQL date type
                    const orderDate = new Date().toISOString().split('T')[0];
                    const values = [carID, custID, asstID, discountID, totCost, orderDate]
                    db.query(sql,values , (err, result) => {
                        if (err) {
                        console.error('Error creating order:', err.message);
                        res.status(500).json({ success: false, error: 'Internal Server Error' });
                        } else {
                        res.status(201).json({ success: true, order: result });
                        }
                    });
                    }else{
                       res.status(500).json({ success: false, error: 'Internal Server Error' }); 
                    }

                } 
        }
        )

       
     
      } catch (error) {
        console.error('Error creating order:', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }

})


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
