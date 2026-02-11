Project Goals:
- Build a robust backend to replace simulated front-end data.
- Store and manage employee information securely in a SQL database.
- Provide reliable payroll and leave management functionality.
- Enable seamless integration with the existing front-end application.
- Ensure data integrity, validation, and scalability for future growth.

Technologies used:
- Node.js for server-side JavaScript execution.
- Express.js for building RESTful APIs.
- MySQL for relational database storage.
- mysql2 for promise-based database queries and connection pooling.
- dotenv for environment variable management.
- CORS for cross-origin frontend-backend communication.
- Git & GitHub for version control and documentation.

System Features
- Employee CRUD (Create, Read, Update, Delete) operations.
- Payroll data management linked to employees.
- Leave request management per employee.
- Server-side validation for IDs, required fields, salary formats, and departments.
- Persistent SQL-based data storage.
- RESTful API architecture with JSON responses.
- Centralized database connection pooling.
- Consistent error handling with meaningful HTTP status codes.



## Project Structure
- **controllers/**
  Contains business logic for employees, payroll, and leave requests.
- **routes/**
  Defines API endpoints and maps them to controller functions.
- **models/**
  Handles database connection pooling using MySQL.
- **server.js**
  Entry point of the application.
- **.env**
  Stores environment variables securely.





Validation
- Input validation to prevent invalid IDs and missing fields.
- Use of environment variables for sensitive credentials.
- Database access managed through pooled connections.
- Proper error handling to avoid exposing sensitive information.

Database Design
The system uses a relational MySQL database with the following tables:
- employees – stores core employee information.
- leave_requests – tracks leave requests per employee.
- payrolldata – stores payroll-related data linked to employees.
- attendance - tracks the employee's work days

Relationships are maintained using foreign keys to ensure data integrity across all HR operations.





API Endpoints

Employee Endpoints
- `GET /api/employees` – Retrieve all employees.
- `GET /api/employees/:id` – Retrieve a single employee by ID.
- `POST /api/employees` – Add a new employee.
- `PATCH /api/employees/:id` – Update employee details.
- `DELETE /api/employees/:id` – Delete an employee.

Payroll Endpoints
- `GET /api/payroll` – Retrieve all payroll records.
- `GET /api/payroll/:employee_id` – Retrieve payroll data for a specific employee.
- `POST /api/payroll` – Add payroll data.
- `PUT /api/payroll/:payroll_id` – Update payroll data.

Leave Endpoints
- `GET /api/leaves` – Retrieve all leave requests.
- `GET /api/leaves/:employee_id` – Retrieve leave requests for a specific employee.
- `POST /api/leaves` – Add a leave request.
- `PUT /api/leaves/:employee_id/:date` – Update a leave request.





Installation and Setup
- Clone the repository from GitHub.
- Install dependencies using `npm install`.
- Create a `.env` file and configure the following variables:
  - `PORT=8000`
  - `DATABASE=modern_tech_solutions`
  - `USER=root`
  - `PASSWORD=Ccpho@18`
  - `HOST=localhost`
- Start the server using `node server.js`.
- Access the API at `http://localhost:8000`. (port no. may change upon running)



Frontend Integration
The backend is designed to integrate with a Vue.js front-end using RESTful APIs.
All responses are returned in JSON format, and CORS is enabled to allow secure cross-origin communication between the frontend and backend.

Alignment With Project Brief
This project meets the brief by:
- Implementing a SQL database with proper relationships.
- Providing secure and persistent data storage.
- Using server-side validation and error handling.
- Following scalable backend architecture principles.

install in terminal (git bash):
- npm install
-npm install mysql2
-npm install cors
-npm install axios
-npm install express
-npm i nodemon
cd FRONTEND and npm run dev
cd BACKEND and nodemon

mySQL
-You would have take the database from BACKEND/Moule2_backend/db.sql and manually upload it to your mysql and run the tables.





PORT= 8000
DATABASE=modern_tech_solutions
USER=root
PASSWORD=Ccpho@18
HOST=localhost
