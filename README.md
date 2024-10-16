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
