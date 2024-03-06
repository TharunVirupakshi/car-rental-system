
-- Inserting data into 'location' table
INSERT INTO location (locationID, branchName, address) VALUES
(1, 'Koramangala Branch', '123 MG Road, Koramangala'),
(2, 'Indiranagar Branch', '456 100 Feet Road, Indiranagar'),
(3, 'Whitefield Branch', '789 ITPL Road, Whitefield');



-- Additional cars for each branch with Indian car models
INSERT INTO car (vehicleNo, carType, model, locationID) VALUES
-- For Koramangala Branch
('KA06ABC', 'Sedan', 'Maruti Suzuki Dzire', 1),
('KA07XYZ', 'SUV', 'Mahindra XUV500', 1),
('KA08MNO', 'Hatchback', 'Tata Tiago', 1),
('KA09PQR', 'Coupe', 'Hyundai Grand i10', 1),
('KA10XYZ', 'Sedan', 'Honda Amaze', 1),
('KA11ABC', 'SUV', 'Honda City', 1),
('KA12XYZ', 'Hatchback', 'Toyota Innova Crysta', 1),
('KA13MNO', 'Coupe', 'Volkswagen Polo', 1),
('KA14PQR', 'Sedan', 'Ford EcoSport', 1),
('KA15XYZ', 'SUV', 'Hyundai Verna', 1),

-- For Indiranagar Branch
('KA16ABC', 'Sedan', 'Maruti Suzuki Ciaz', 2),
('KA17XYZ', 'SUV', 'Kia Seltos', 2),
('KA18MNO', 'Hatchback', 'Tata Altroz', 2),
('KA19PQR', 'Coupe', 'Mercedes-Benz A-Class', 2),
('KA20XYZ', 'Sedan', 'Toyota Fortuner', 2),
('KA21ABC', 'SUV', 'Skoda Rapid', 2),
('KA22XYZ', 'Hatchback', 'Renault Duster', 2),
('KA23MNO', 'Coupe', 'Ford Figo', 2),
('KA24PQR', 'Sedan', 'Nissan Kicks', 2),
('KA25XYZ', 'SUV', 'Tesla Model S', 2),

-- For Whitefield Branch
('KA26ABC', 'Sedan', 'Hyundai Elite i20', 3),
('KA27XYZ', 'SUV', 'Audi Q7', 3),
('KA28MNO', 'Hatchback', 'Maruti Suzuki Baleno', 3),
('KA29PQR', 'Coupe', 'Chevrolet Beat', 3),
('KA30XYZ', 'Sedan', 'Volvo XC40', 3),
('KA31ABC', 'SUV', 'Honda Civic', 3),
('KA32XYZ', 'Hatchback', 'Jeep Compass', 3),
('KA33MNO', 'Coupe', 'Ford Aspire', 3),
('KA34PQR', 'Sedan', 'BMW X3', 3),
('KA35XYZ', 'SUV', 'Tata Harrier', 3);
