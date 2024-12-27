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