# 🛒 E-Commerce Store

A full-stack MERN (MongoDB, Express, React, Node.js) e-commerce application where users can browse, search, and manage products. Users can edit and delete products directly through a simple and cleanly put together UI.

## 🚀 Features

- Browse products with images, names, and prices
- Admin modal for editing product details
- Product validation (e.g., image URL checking)
- Chakra UI for styling and responsive components
- State management via Zustand

## 🧰 Tech Stack

- **Frontend**: React, Chakra UI, Zustand
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Image Validation**: Custom API endpoint

## 🖥️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Dagger42/e-commerce-store.git
cd e-commerce-store

# 2. Install all dependencies
npm install

# 3. Create a .env file in the root with the following:

PORT=5000
MONGO_URI=your_mongodb_connection_string

# 4. Run the app (server) from root directory to establish DB connection
npm run dev

# 5. Run the app from frontend dir to initialize the frontend UI
cd frontend
npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:5000
