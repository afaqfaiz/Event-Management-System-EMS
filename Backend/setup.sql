CREATE TABLE Company (
    Company_ID INT PRIMARY KEY,
    Company_Name VARCHAR(100),
    Company_Contact VARCHAR(15),
    Company_Email VARCHAR(100),
    Company_Address VARCHAR(255),
    Company_Owner VARCHAR(100)
);

CREATE TABLE Hall (
    Hall_ID INT PRIMARY KEY,
    Company_ID INT,
    Hall_name VARCHAR(100),
    Hall_Capacity INT,
    Hall_location VARCHAR(255),
    Price_per_Hour DECIMAL(10, 2),
    FOREIGN KEY (Company_ID) REFERENCES Company(Company_ID)
);

CREATE TABLE Events (
    Event_ID INT PRIMARY KEY,
    Hall_ID INT,
    Event_name VARCHAR(100),
    Event_Description TEXT,
    Event_type VARCHAR(50),
    Event_date_time DATETIME,
    Event_Duration TIME,
    Event_OrganizerName VARCHAR(100),
    Event_Attenders INT,
    FOREIGN KEY (Hall_ID) REFERENCES Hall(Hall_ID)
);
CREATE TABLE Bookings (
    Booking_ID INT PRIMARY KEY,
    Event_ID INT,
    Hall_ID INT,
    Client_ID INT,
    Booking_Date DATE,
    Booking_StartDateTime DATETIME,
    Booking_EndDateTime DATETIME,
    Company_ID INT,
    Total_Cost DECIMAL(10, 2),
    FOREIGN KEY (Event_ID) REFERENCES Events(Event_ID),
    FOREIGN KEY (Hall_ID) REFERENCES Hall(Hall_ID),
    FOREIGN KEY (Company_ID) REFERENCES Company(Company_ID)
);
CREATE TABLE Clients (
    Client_ID INT PRIMARY KEY,
    Client_Name VARCHAR(100),
    Client_ContactNumber VARCHAR(15),
    Client_Email VARCHAR(100),
    Client_Address VARCHAR(255)
);
CREATE TABLE Payment (
    Payment_ID INT PRIMARY KEY,
    Booking_ID INT,
    Client_ID INT,
    Amount DECIMAL(10, 2),
    Payment_Date DATE,
    Payment_Method VARCHAR(50),
    FOREIGN KEY (Booking_ID) REFERENCES Bookings(Booking_ID),
    FOREIGN KEY (Client_ID) REFERENCES Clients(Client_ID)
);
