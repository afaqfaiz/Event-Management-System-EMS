CREATE TABLE Company (
    Company_ID INT PRIMARY KEY AUTO_INCREMENT,
    Company_Name VARCHAR(100)  UNIQUE NOT NULL,
    Company_Contact VARCHAR(15),
    Company_Email VARCHAR(100),
    Company_Address VARCHAR(255),
    Company_Owner VARCHAR(100),
    Company_img_url VARCHAR(10000),
    Company_password VARCHAR(100)
);

CREATE TABLE Hall (
    Hall_ID INT PRIMARY KEY AUTO_INCREMENT,
    Company_ID INT NOT NULL,
    Hall_name VARCHAR(100),
    Hall_Capacity INT,
    Hall_location VARCHAR(255),
    Price_per_Hour DECIMAL(10, 2),
    Hall_Rating  DECIMAL(3, 2)
    FOREIGN KEY (Company_ID) REFERENCES Company(Company_ID) ON DELETE CASCADE
);

CREATE TABLE Client (
    Client_ID INT PRIMARY KEY AUTO_INCREMENT,
    Client_Name VARCHAR(100) UNIQUE NOT NULL,
    Client_ContactNumber VARCHAR(15),
    Client_Email VARCHAR(100),
    Client_Address VARCHAR(255),
    Client_img_url vARCHAR(1000),
    Client_Password VARCHAR(255)

);

CREATE TABLE Bookings (
    Booking_ID INT PRIMARY KEY AUTO_INCREMENT, 
    Hall_ID INT NOT NULL,
    Client_ID INT NOT NULL,
    Company_ID INT NOT NULL,
    Booking_Date DATE DEFAULT CURRENT_DATE, -- Defaults to today's date
    Event_Date DATE NOT NULL, 
    Event_Start_Time TIME NOT NULL,
    Booking_Hours INT CHECK (Booking_Hours > 0), -- Must be positive
    Total_Cost DECIMAL(10, 2) CHECK (Total_Cost >= 0), -- Must be non-negative
    Booking_Status ENUM('Pending', 'Confirmed', 'Cancelled') DEFAULT 'Pending', -- Status of the booking
    Payment_Status ENUM('Pending', 'Paid') DEFAULT 'Pending', -- Status of payment
    FOREIGN KEY (Hall_ID) REFERENCES Hall(Hall_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Client_ID) REFERENCES Client(Client_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Company_ID) REFERENCES Company(Company_ID) ON DELETE CASCADE ON UPDATE CASCADE,
);


CREATE TABLE Payment (
    Payment_ID INT PRIMARY KEY AUTO_INCREMENT,
    Booking_ID INT,
    Client_ID INT,
    Amount DECIMAL(10, 2),
    Payment_Date DATE,
    Payment_Method VARCHAR(50),
    FOREIGN KEY (Booking_ID) REFERENCES Bookings(Booking_ID)  ON DELETE CASCADE,
    FOREIGN KEY (Client_ID) REFERENCES Client(Client_ID)  ON DELETE CASCADE
);
