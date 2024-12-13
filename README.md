# NetBankers International Payments Portal

## Project Overview

NetBankers is a state-of-the-art international payment platform designed to streamline global financial transactions securely and efficiently. This web application includes features for both administrative and user roles, allowing users to send payments, view financial statements, and manage their accounts while providing admins with tools to manage payments and oversee operations.

---

## Features

### User Features:
1. **Secure Login and Registration**:
   - Users can log in with their credentials or create an account securely.
   - Passwords are hashed and salted for security.

2. **Send Payments**:
   - Initiate payments by providing recipient details, amount, and SWIFT code.
   - Real-time currency conversion for supported currencies (USD, EUR, GBP, ZAR).

3. **View Financial Insights**:
   - Visual representation of transactions (money in vs. money out) via interactive charts.
   - Comprehensive transaction history, including statuses and timestamps.

4. **Account Management**:
   - View balance and account number.
   - View transaction history and statements.

### Admin Features:
1. **Admin Dashboard**:
   - View pending payments with options to approve or reject.
   - Manage user accounts and monitor payment activities.

2. **Add New Admins**:
   - Create additional admin accounts directly from the dashboard.

3. **Audit and Oversight**:
   - Monitor and manage all transactions and user activities for compliance and accuracy.

---

## Tech Stack

- **Frontend**:
  - React
  - Tailwind CSS
  - Chart.js

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (via Mongoose)
  - JWT for authentication

- **Development Tools**:
  - ESLint for code linting
  - Prettier for code formatting
  - SonarQube for code quality checks

---

## Installation and Setup

### Prerequisites:
1. Node.js installed on your machine.
2. MongoDB Atlas database connection string.
3. mkcert or equivalent for setting up SSL certificates.

### Steps:
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repository/netbankers.git
   cd netbankers
   ```

2. **Set up the backend**:
   ```bash
   cd backend
   npm install
   ```
   - Configure the `.env` file:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     ```

3. **Set up the frontend**:
   ```bash
   cd ../frontend
   npm install
   ```
   - Configure the `.env` file:
     ```
     REACT_APP_API_URL=https://localhost:5000
     ```

4. **Generate SSL Certificates**:
   ```bash
   mkcert -install
   mkcert localhost
   ```
   Move the generated `.pem` files to the appropriate backend folder and update `server.js`.

5. **Run the application**:
   - Start the backend server:
     ```bash
     cd backend
     npm start
     ```
   - Start the frontend server:
     ```bash
     cd ../frontend
     npm start
     ```

6. Open the application in your browser at `https://localhost:3000`.

---

## Project Structure

```
/backend
  ├── config/           # Database configuration
  ├── middleware/       # Middleware for authentication and error handling
  ├── models/           # MongoDB schemas
  ├── routes/           # API routes
  ├── server.js         # Entry point of the backend

/frontend
  ├── public/           # Static files
  ├── src/              # React source code
      ├── components/   # React components
      ├── api.js        # Axios setup for API requests
      ├── App.js        # Main application file
      ├── index.js      # Entry point of the frontend
  ├── .env              # Environment variables for React
```

---

## Security Features

1. **Authentication**:
   - Password hashing with bcrypt.
   - JSON Web Tokens (JWT) for session management.

2. **Input Validation**:
   - RegEx patterns for whitelisting input fields.
   - Server-side validation.

3. **Traffic Security**:
   - HTTPS enforced via SSL certificates.

4. **Protection Against Common Attacks**:
   - SQL injection: Using Mongoose ORM for safe database queries.
   - Cross-Site Scripting (XSS): Input sanitization and React's built-in escaping mechanisms.
   - CSRF Protection: Cookies with `SameSite` policies.

---

## Usage Guide

1. **Users**:
   - Register or log in to access your account.
   - Use the "Make Payment" feature to send funds internationally.
   - View your financial insights and transaction history.

2. **Admins**:
   - Log in to the admin dashboard.
   - Manage pending payments by approving or rejecting them.
   - Add new admin users from the "Add Admin" section.

---

## Testing and Quality Assurance

- **Unit Testing**:
  - Mocha and Chai for backend.
  - Jest for frontend components.

- **Code Quality**:
  - ESLint and Prettier for consistent code style.
  - SonarQube for analyzing code smells and vulnerabilities.

---

## References

1. **MongoDB Documentation**:
   - [Mongoose Guide](https://mongoosejs.com/docs/guide.html)
   - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

2. **React Documentation**:
   - [React Official Docs](https://reactjs.org/docs/getting-started.html)
   - [React Router](https://reactrouter.com/)

3. **Node.js and Express**:
   - [Node.js Official Docs](https://nodejs.org/en/docs/)
   - [Express.js Guide](https://expressjs.com/)

4. **Chart.js for Financial Insights**:
   - [Chart.js Documentation](https://www.chartjs.org/docs/latest/)

5. **Authentication and Security**:
   - [JSON Web Tokens (JWT)](https://jwt.io/)
   - [bcrypt.js](https://github.com/dcodeIO/bcrypt.js/)

6. **Styling and Design**:
   - [Tailwind CSS Documentation](https://tailwindcss.com/docs)

7. **Testing Tools**:
   - [Mocha](https://mochajs.org/)
   - [Jest](https://jestjs.io/)

---

## Contribution

1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push to your fork.
4. Submit a pull request for review.

---

## License

This project is licensed under the MIT License. See `LICENSE` for details.

