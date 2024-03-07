// Example using Express.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
app.use(cors()); // Enable CORS for all routes

const mysql = require('mysql');
const { json, application } = require('express');


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


app.post('/api/createPayment', async(req, res)=>{
    try {
        const { orderID, custID, totCost, paymentMethod } = req.body; 

        const transaction_query = "INSERT INTO transaction (transcName, amount) VALUES(? ,? )"
        
        const sql = 'INSERT INTO payment (amount, payment_method, date, orderID, transactionID, payerID, isSuccess) VALUES(?, ?, ?, ?, ?, ?, ?)'
        const orderDate = new Date();
        
        db.query(transaction_query,['cust_payment', totCost], (err, result)=>{
            if(err){
                const values = [totCost, paymentMethod, orderDate, orderID, null, custID, false]
                db.query(sql, values, (err, result) => {
                    if(err){
                        console.error('Error processing payment', err.message);
                        res.status(500).json({ success: false, error: 'Internal Server Error' });
                    }
                })

                console.error('Error processing payment, transaction failure:', err.message);
                res.status(500).json({ success: false, error: 'Internal Server Error' });
            }else{
                const tran_ID = result.insertId
                const values = [totCost, paymentMethod, orderDate, orderID, tran_ID, custID, true]
                db.query(sql, values, (err, result) => {
                    if(err){
                        console.error('Error processing payment', err.message);
                        res.status(500).json({ success: false, error: 'Internal Server Error' });
                    }else{
                        res.status(201).json({ success: true, payment: result }); 
                    }
                })
            }
        } )

    } catch (error) {
        console.error('Error processing payment:', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
})

//Create Trip
app.post('/api/createTrip', (req, res) => {
    const { orderID } = req.body;
  
    // Step 1: Fetch the most recent payment for the given orderID
    const fetchPaymentSQL = `
      SELECT * FROM payment
      WHERE orderID = ? 
      ORDER BY date DESC
      LIMIT 1
    `;
  
    db.query(fetchPaymentSQL, [orderID], (fetchErr, paymentResult) => {
      if (fetchErr) {
        console.error('Error fetching payment:', fetchErr.message);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      // Step 2: Check if the fetched payment has isSuccess true
      const mostRecentPayment = paymentResult[0];
      console.log('payment stats ', mostRecentPayment)
      if (!mostRecentPayment || mostRecentPayment.isSuccess !== 1) {
        return res.status(400).json({ error: 'Payment was not successful for this order' });
      }
  
      // Step 3: get details
      const getDetailsQuery = 'SELECT * FROM rentalOrder WHERE orderID = ?'
      var details
      db.query(getDetailsQuery, [orderID], (err, result)=>{
        if(err){
            console.error('Error fetching order details while creating trip:', result.message);
            return res.status(500).json({ error: 'Internal Server Error' }); 
        }
        console.log('order details ', result[0])

        const orderDetails = result[0]

        const insertTripSQL = `
        INSERT INTO getsRented (carID, orderID, rentalStartDate, rentalEndDate)
        VALUES (?, ?, ?, ?)
      `;

      db.query(insertTripSQL, [orderDetails.carID, orderID, null, null], (insertErr, insertResult) => {
        if (insertErr) {
          console.error('Error creating trip:', insertErr.message);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        res.status(201).json({ success: true, tripID: insertResult.insertId });
      });
        // details = result[0]

      })


    //   const { carID } = details; // Adjust these based on your input


      
    });
  });
  

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
