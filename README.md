# Saboo's Retreat 🏖️

**Saboo's Retreat** is a premium, fully responsive staycation booking and booking management platform. It offers a elegant frontend for users to browse villa destinations, check available package options, calculate pricing, and book their stay. The app is integrated with a secure Node.js Express API backend and a PostgreSQL database to manage user authentication, inquiries, and bookings.

---

## ✨ Features

- **Luxury Responsive Design**: Adapts dynamically across phone, tablet, and widescreen desktop displays using CSS Grid, Flexbox, and fluid fluid layout rules.
- **Dynamic JWT Authentication**: Secure user registration and login forms with custom client-side validation, storing sessions locally in `localStorage` for cross-page persistence.
- **Staycation Category Filters**: Dynamically filter staycations by destination directly in the browser.
- **Dynamic Pricing Calculator**: Instant cost computation on booking forms based on packages and duration.
- **Interactive Multimedia**: Looping video headers, responsive sliders, and periodic photo banners.
- **Database Backend**: Secure storage of customer data, inquiries, and booking logs in a relational PostgreSQL schema.
- **Micro-Animations & Smooth Motion**: Elevating cards on hover, rotating text overlays, and sliding modal dialogs.

---

## 📁 Repository Structure

```text
CSSMP/
├── Assests/                      # Static client assets
│   ├── CSS/                      # Modular Vanilla CSS stylesheets
│   ├── JS/                       # Client controllers (auth.js, sc.js, alibaug.js)
│   └── Images/                   # Image assets and looping background MP4s
├── .env                          # App port, PostgreSQL connection strings, & JWT keys
├── database.js                   # Schema migration & PG connection pooling logic
├── server.js                     # Main Express server and REST API routing handlers
├── package.json                  # Node dependency packages manifest
├── project_documentation.md      # Detailed engineering & layout document
└── README.md                     # Project quickstart guide (this file)
```

---

## 🛠️ Installation & Setup

To run this project locally, ensure you have **Node.js (v16+)** and **PostgreSQL** installed.

### 1. Database Configuration
1. Open your PostgreSQL console or client (e.g. pgAdmin, `psql`).
2. Create a new database named `VillaBooking`:
   ```sql
   CREATE DATABASE "VillaBooking";
   ```

### 2. Configure Environment Variables
Create a file named `.env` in the root folder of the project (if not already present) and insert the following parameters (adjust username `postgres` and password `your_password` to match your local PostgreSQL credentials):

```env
PORT=3000
DATABASE_URL=postgres://postgres:your_password@localhost:5432/VillaBooking
JWT_SECRET=super_secret_retreat_key
```

### 3. Install Dependencies
Navigate to the project directory in your terminal and install packages:
```bash
npm install
```

### 4. Run the Server
Launch the development server with hot-reloading (via nodemon):
```bash
npm run dev
```

Alternatively, start the server in production mode:
```bash
npm start
```

Your terminal will log:
```text
Server is running at http://localhost:3000
Connected to the PostgreSQL database successfully.
Initializing database schema...
Database tables verified/created successfully.
```

Open `http://localhost:3000` in your web browser to view the application.

---

## 🚀 Technologies Used

- **Frontend**: HTML5, Vanilla CSS3, Javascript (ES6), FontAwesome Icons, Google Fonts (Poppins & Great Vibes)
- **Backend Node Server**: Express.js, CORS, JSON Web Token (JWT) authorization, dotenv
- **Security**: Cryptographic password salting & hashing via `bcryptjs`
- **Database Engine**: PostgreSQL client pool adapter (`pg`)
- **Development Tooling**: Nodemon hot-reloading
