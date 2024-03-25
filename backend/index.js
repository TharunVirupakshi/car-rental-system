// Example using Express.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const bcrypt = require('bcrypt')

// const CURRENT_DATE = new Date()
//Manipulate date for testing purpose
const CURRENT_DATE = new Date('2024-03-27T12:00:00Z')


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
          console.error(`Error inserting user ${contactNum} details into MySQL:`, err.message);
          res.status(500).json({ error: 'Internal Server Error' });
      } else {
          console.log('User details inserted into MySQL:', result);
          res.json({ message: 'User details stored successfully' });
      }
  });
});


//Cars endpoints
app.post('/api/addCar', async(req, res)=>{
    const {vehicleNo, carType, model, locationID } = req.body
    
    console.log('add car', req.body)
     // Check if any of the values are empty strings
     if (!vehicleNo || !carType || !model || !locationID) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    if(vehicleNo === '' || carType === '' || model === ''){
       return res.status(400).json({ error: 'Missing required fields' }); 
    }

    const sql = 'INSERT INTO car (vehicleNo, carType, model, locationID) VALUES(?,?,?,?)'

  
    

    // Perform SQL database insertion
    db.query(sql,[vehicleNo, carType, model, locationID] , (err, result) => {
        if (err) {
            console.error(`Error adding car`, err.message);
            res.status(500).json({ error: err.message });
        } else {
            console.log('added car!', result);
            res.json({ message: 'Added car!' });
        }
    }); 
})

app.put('/api/updateCar', async(req, res) =>{
    const {vehicleNo, carType, model, locationID } = req.body

     // Check if any fields are sent in the request body
     if (!carType && !model && !locationID) {
        return res.status(400).json({ error: 'No fields to update' });
    }

      // Validate that none of the fields are empty
      if ((carType && carType.trim() === '') ||
          (model && model.trim() === '') ||
          (locationID && locationID.trim() === '')) {
              return res.status(400).json({
                  error: 'Fields cannot be empty'
              });
      }

    // Construct the SQL query dynamically based on the fields sent
    let sql = 'UPDATE car SET ';
    const values = [];


    if (carType) {
        sql += 'carType=?, ';
        values.push(carType);
    }
    if (model) {
        sql += 'model=?, ';
        values.push(model);
    }
    if (locationID) {
        sql += 'locationID=?, ';
        values.push(locationID);
    }

    // Remove the trailing comma and space
    sql = sql.slice(0, -2);

    // Add the WHERE clause
    sql += ' WHERE vehicleNo=? AND car.deleted_at IS NULL;';
    values.push(vehicleNo);


    // Perform the database update
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating car:', err.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log('Updated car:', result);
        res.json({ message: 'Car updated successfully' });
    });

})

app.delete('/api/deleteCar', (req, res) => {
    const { vehicleNo } = req.query;
    console.log('Deleting car ', vehicleNo)
    const softDeleteCarSQL = `
        UPDATE car
        SET deleted_at = NOW()
        WHERE vehicleNo = ? AND car.deleted_at IS NULL;
    `;

    db.query(softDeleteCarSQL, [vehicleNo], (err, result) => {
        if (err) {
            console.error('Error deleting car:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (result.affectedRows === 0) {
                console.log('No car found with the specified vehicle number:', vehicleNo);
                res.status(404).json({ error: 'No car found with the specified vehicle number' });
            } else {
                console.log('Car deleted successfully:', vehicleNo);
                res.json({ message: 'Car deleted successfully' });
            }
        }
    });
});


app.get('/api/getCars', (req, res) => {
    // SQL query to select all cars from the 'car' table
    const sql = 'SELECT * FROM car, location WHERE car.locationID = location.locationID AND car.deleted_at IS NULL';
  
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

    const sql = `SELECT * FROM car, location WHERE car.vehicleNo = ? AND car.locationID = location.locationID AND car.deleted_at IS NULL`


    // Perform SQL database query
    db.query(sql,[vehicleNo] ,(err, result) => {
        if (err) {
        console.error(`Error fetching car with ID ${vehicleNo}  from MySQL:`, err.message);
        res.status(500).json({ error: 'Internal Server Error' });
        } else {
        if (result.length == 0) {
            console.log('No car found with the specified vehicle number:', vehicleNo);
            res.status(404).json({ error: 'No car found with the specified vehicle number' });
        } else {
            console.log('Cars fetched from MySQL:', result);
            res.json(result);
        }
        
        }
    });
})




app.get('/api/getUser', (req, res)=>{
    const custID = req.query.custID

    const sql = 'SELECT * FROM customer WHERE customer.custID = ?'

    db.query(sql, [custID], (err, result)=>{
        if (err) {
            console.error(`Error getting user ${contactNum}:`, err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log('User details:', result);
            res.json(result);
        } 
    })
})

app.post('/api/loginAdmin', (req, res) => {
    const {email, password} = req.body
    const sql = "SELECT * FROM admin WHERE email = ?"

    db.query(sql, [email], async(err, result)=>{
        if (err) {
            console.error(`Error getting logging in admin ${email}:`, err.message);
            res.status(500).json({ error: 'Internal Server Error'});
            return
        }

        if (result.length === 0) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const user = result[0];

        try{
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                res.status(401).json({ error: 'Password did not match!' });
                return;
            }
            // Authentication successful
            res.status(200).json({ success: true,  message: 'Authentication successful' });
        }catch(error){
            console.error('Error comparing admin passwords:', error);
            res.status(500).json({ error: 'Internal server error' });
        }

    })
})

app.post('/api/updateUser', (req, res)=>{
    const {custID, name, contactNum, address} = req.body

     // Assuming you have a 'users' table in your database
     const sql = `
     UPDATE customer
     SET name = ?, contactNum = ?, address = ?
     WHERE custID = ?
    `;

    const fetchUser = 'SELECT * FROM customer WHERE customer.custID = ?'

    db.query(fetchUser, [custID], (err, result)=>{
        if (err) {
            console.error(`Error getting user ${custID}:`, err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log('User details:', result);
            const user = result[0]
            const values = [name ?? user.name, contactNum ?? user.contactNum, address ?? user.address, custID]

            db.query(sql, values, (err, result) => {
                if (err) {
                    console.error(`Error updateing user ${custID}:`, err.message);
                    res.status(500).json({ error: 'Internal Server Error' });
                } else { 
                    console.log('Updated!')  
                    res.status(201).json({ success: true, result});    
                }
            })
            
        } 
    })

   



})



app.get('/api/checkAvailability', (req, res)=>{
    const carID = req.query.carID

    const sql = `
    SELECT 
        rentalEndDate
    FROM 
        getsRented 
    WHERE 
        carID = ? 
    ORDER BY 
        rentalEndDate DESC
    LIMIT 1;
    `;


    db.query(sql, [carID], (err, result) => {
        if (err) {
            console.error(`Error checking availability for carID ${carID}:`, err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            const latestRentalEndDate = result[0]?.rentalEndDate;
           
             // Convert UTC to local timezone
             const localLatestRentalEndDate = new Date(latestRentalEndDate + 'Z');

            

             console.log('Fetched end date:', localLatestRentalEndDate)
             console.log('Curent date:', CURRENT_DATE)

             const isAvailable = !latestRentalEndDate || new Date(localLatestRentalEndDate).toLocaleDateString() < CURRENT_DATE.toLocaleDateString();
 
             res.json({ carID,etrDate : localLatestRentalEndDate, isAvailable });
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


// Coupons endpoints
app.get('/api/getCoupon', (req, res)=>{
    const couponCode = req.query.couponCode

    const sql = 'SELECT * FROM discount WHERE couponCode = ? AND discount.deleted_at IS NULL'

    db.query(sql, [couponCode], (err, result)=>{
        if (err) {
            console.error(`Error fetching coupon with code ${couponCode} from MySQL:`, err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (result.length === 0) {
                // Coupon does not exist
                console.log('Coupon not found.');
                res.status(404).json({ error: 'Coupon not found' });
            } else {
                // Coupon exists
                console.log('Coupon fetched from MySQL:', result);
                res.json(result);
            }
        }
    })
})
app.get('/api/getCoupons', (req, res)=>{

    const sql = 'SELECT * FROM discount WHERE discount.deleted_at IS NULL'

    db.query(sql, (err, result)=>{
        if (err) {
            console.error(`Error fetching coupon with code ${couponCode} from MySQL:`, err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (result.length === 0) {
                // Coupon does not exist
                console.log('Coupons not found.');
                res.status(404).json({ error: 'Coupons not found' });
            } else {
                // Coupon exists
                console.log('Coupons fetched from MySQL:', result);
                res.json(result);
            }
        }
    })
})

app.post('/api/createCoupon', (req, res) => {
    const {couponCode, discountPercent} = req.body

    const checkCouponCode = 'SELECT COUNT(*) AS count FROM discount WHERE discount.couponCode = ? AND discount.deleted_at IS NULL' 


    db.query(checkCouponCode, [couponCode], (err, result) => {
        if (err) {
            console.error(`Error checking coupon code`, err.message);
            res.status(500).json({ error: 'Error checking coupon code' });
        } else {
            const count = result[0].count;
            if (count > 0) {
                // Coupon code already exists
                res.status(400).json({ error: 'Coupon code already exists' });
            } else {
                // Coupon code does not exist, proceed with creation
                const createCouponSQL = 'INSERT INTO discount (couponCode, discountPercent) VALUES (?, ?)';
                db.query(createCouponSQL, [couponCode, discountPercent], (err, result) => {
                    if (err) {
                        console.error(`Error creating coupon`, err.message);
                        res.status(500).json({ error: 'Error creating coupon' });
                    } else {
                        console.log('Coupon created!');
                        res.json({ success: true, message: 'Coupon created!' });
                    }
                });
            }
        }
    });
})

app.delete('/api/deleteCoupon', (req, res) => {
    const discountID = req.query.discountID

    const softDelete = `
        UPDATE discount
        SET deleted_at = NOW()
        WHERE discountID = ? AND discount.deleted_at IS NULL;
    `; 


    db.query(softDelete, [discountID], (err, result) => {
        if (err) {
            console.error('Error deleting discount:', err.message);
            res.status(500).json({ error: 'Error deleting discount' });
        } else {
            if (result.affectedRows === 0) {
                console.log('No discount found with id ', discountID);
                res.status(404).json({ error: 'No discount found with that id' });
            } else {
                console.log('Discount deleted successfully:', discountID);
                res.json({ message: 'Discount deleted successfully' });
            }
        }
    });

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
app.post('/api/createTrip', async(req, res) => {
    try {
    const { orderID, rentalStartDate, rentalEndDate } = req.body;
  
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

      db.query(insertTripSQL, [orderDetails.carID, orderID, new Date(rentalStartDate),new Date(rentalEndDate)], (insertErr, insertResult) => {
        if (insertErr) {
          console.error('Error creating trip:', insertErr.message);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        res.status(201).json({ success: true, result: insertResult });
      });
        // details = result[0]

      })


    //   const { carID } = details; // Adjust these based on your input


    
    });
    }catch(error){
        console.error('Error creating trip:', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }

});

//fetch trips
app.get('/api/getAllTrips',async(req, res)=>{
    try {
        const custID = req.query.custID
        const formattedCurrentDate = CURRENT_DATE.toISOString().split('T')[0];
        console.log('CurDate formatted', formattedCurrentDate)
        console.log('Fetching trip for...', custID)
          // Fetch trips based on custID
        const fetchTripsSQL =  `
        SELECT getsRented.*, car.*,
               DATE_FORMAT(getsRented.rentalStartDate, '%d-%m-%Y') AS startDate,
               DATE_FORMAT(getsRented.rentalEndDate, '%d-%m-%Y') AS endDate,
               CASE 
               WHEN getsRented.rentalEndDate >= '${formattedCurrentDate}' THEN 1
               ELSE 0
           END AS status
        FROM getsRented
        INNER JOIN rentalOrder ON getsRented.orderID = rentalOrder.orderID
        INNER JOIN car ON getsRented.carID = car.vehicleNo
        WHERE rentalOrder.custID = ?
    `;

    db.query(fetchTripsSQL, [custID], (fetchErr, result) => {
        if (fetchErr) {
          console.error('Error fetching trips:', fetchErr.message);
          return res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
        console.log('Fetched trips..', result)


        res.status(200).json({ success: true, trips: result });
      });

    } catch (error) {
        console.error('Error fetching trips:', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
})



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
