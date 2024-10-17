## Project Title

Contact-Us

## Description

This project is a Contact Us API built with Node.js and MySQL to handle form submissions, allowing users to submit contact details which are stored in a database. It supports full CRUD operations for managing contact submissions.

## Installation

1. Clone the repository:
   git clone https://github.com/simranbeig-work/contact-us.git

2. Navigate into the project folder:
   cd contact-us

3. Install dependencies:
   npm i --save

4. Set up environment variables:
   Create a .env file based on .env-dev.
   Set up database credentials and configurations.

5. Run the application:
   npm run start:dev _/for development environment_/

## API Endpoints

- `/contactus` (POST): Submit contact information
- `/contactus/:id` (GET): Fetch contact details by ID
- `/contactus/:id` (PUT): Fetch contact details by ID
- `/contactus/:id` (DELETE): Fetch contact details by ID

## Configuration

- The configuration files are located in the `config/` folder.
- You can modify the database connection in `config/db.js`.

## Database Set up

This project uses MySQL as the database. The database will be automatically created once the project is run.

1. Prerequisites

- Install MySQL.
- Ensure you have a MySQL user with sufficient privileges to create and manage databases and tables.
- Set up the following environment variables in your .env file:
  DB_HOST: MySQL host (e.g., localhost)
  DB_USER: MySQL username
  DB_PASSWORD: MySQL password
  DB_NAME: The name of the database (e.g., ContactUsDBDev)

2. Automatic Database Creation:
   When you run the project, the database and tables will be automatically created based on the DDL script located in the ddl/filename.sql file.

3. Run the Application:
   After setting up the environment and the database, run the application:
   npm run start:dev

The application will connect to the MySQL database and automatically create the necessary tables for storing contact submissions.

Database Schema
The table ContactSubmissions will be created based on the DDL script located in ddl/contact-us.sql. This table stores user contact submissions, including full name, email, phone number, message, and submission date.
