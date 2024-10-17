CREATE DATABASE IF NOT EXISTS ContactUsDBDev;

USE ContactUsDBDev;

CREATE TABLE ContactSubmissions (
    id INT AUTO_INCREMENT PRIMARY KEY,    -- Primary Key
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,   -- Unique Key on the 'email' field
    phone_number VARCHAR(20),
    message TEXT NOT NULL,
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
