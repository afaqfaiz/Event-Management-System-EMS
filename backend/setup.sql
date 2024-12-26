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
