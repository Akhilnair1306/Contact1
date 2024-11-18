# Contact Management Application

## Description
This is a contact management web application that allows users to create, edit, delete, and view contact information. It features a user-friendly interface built with React, and the backend is powered by Node.js, Express, and MongoDB. The app provides functionalities like form validation, sorting contacts alphabetically, and managing contact information, including first name, last name, email, phone number, job title, and company name.

## Features
- **Create Contact**: Add new contacts to the database with information such as name, email, phone number, and job title.
- **Edit Contact**: Update existing contact information.
- **Delete Contact**: Remove contacts from the database.
- **Sort Contacts**: View contacts sorted alphabetically by first name.

## Tech Stack
- **Frontend**: React.js, Material UI
- **Backend**: Node.js, Express
- **Database**: MongoDB (NoSQL)
- **Form Validation**: Regular expressions for validating email and phone numbers.

## Project Setup

### Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (v12 or above)
- **MongoDB Compass** 

### Frontend Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/new-repository-name.git
    cd new-repository-name
    ```

2. Install frontend dependencies:
    ```bash
    cd client
    npm install
    ```

3. Run the React development server:
    ```bash
    npm start
    ```

   This will start the React application on `http://localhost:3000`.

### Backend Setup
1. Navigate to the backend folder:
    ```bash
    cd backend
    ```

2. Install backend dependencies:
    ```bash
    npm install
    ```

3. Setup environment variables:
   - Create a `.env` file in the root of the backend folder and add the following:
     ```
     MONGODB_URI=mongodb://localhost:27017/contactdb
     PORT=5000
     ```

4. Run the server:
    ```bash
    npm start
    ```

   The backend server will run on `http://localhost:5000`.

    **Note:** I have used MongoDb Compass for data storing Atlas could also be used.

### Database Schema

In MongoDB, we store contact information using a `Contact` schema.

```js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: 'Please enter a valid email address',
    },
  },
  contactnumber: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(value);
      },
      message: 'Mobile number must be 10 digits long',
    },
  },
  jobTitle: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Contact', contactSchema);
```
### Backend API Endpoints

-**GET /api/contact:** Fetch all contacts

-**POST /api/contact:** Add a new contact

-**PUT /api/contact/:** Update an existing contact

-**DELETE /api/contact/:** Delete a contact by ID

### How the App Works
**Frontend (React):** The frontend sends HTTP requests (GET, POST, PUT, DELETE) to the backend API to interact with the contact data. It uses React state to render contact details dynamically.

**Backend (Node.js/Express):** The backend provides API endpoints for CRUD operations and communicates with MongoDB using Mongoose to store and retrieve contact data.

**MongoDB:** The database stores the contact information, ensuring that the app is able to persist data even after the app is closed or refreshed.

### Troubleshooting
**Cannot Connect to MongoDB:** Ensure MongoDB is running locally or use a service like MongoDB Atlas. Check your .env configuration.

**Form Validation Issues:** If you are getting errors on the form, ensure that the email and phone number fields match the specified patterns.
