📖 Overview

This backend application manages users and clothing items.
It provides a RESTful API built with Node.js, Express, and MongoDB, supporting full CRUD operations, like/unlike functionality, and centralized error handling.

Frontend repository: se_project_react

⚡ Features

REST API using Express.js with modular routing and controllers

MongoDB with Mongoose models for users and clothing items

Password hashing and user authentication with bcryptjs and JWT

Input validation using validator

Centralized error handling with proper HTTP status codes

Development workflow with nodemon (hot reload)

Code style enforcement with ESLint and Prettier

🗂 Project Structure
se_project_express/
├─ controllers/       # Route handlers
│  ├─ clothingItems.js
│  └─ users.js
├─ middlewares/       # Authorization & error handling
│  └─ auth.js
├─ models/            # Mongoose schemas
│  ├─ clothingItem.js
│  └─ user.js
├─ routes/            # API routes
│  ├─ clothingItems.js
│  ├─ index.js
│  └─ users.js
├─ utils/             # Configuration & constants
│  ├─ config.js
│  ├─ errors.js
│  └─ successStatuses.js
├─ app.js             # Entry point
├─ package.json
└─ README.md
🛠 Tech Stack

Runtime: Node.js

Web Framework: Express.js

Database: MongoDB (local or Atlas) with Mongoose

Authentication: bcryptjs + JWT

Validation: validator

Dev Tools: nodemon, ESLint, Prettier

🚀 Getting Started
Prerequisites

Node.js (LTS ≥ 18)

MongoDB running locally or via Atlas

Installation
git clone https://github.com/hungergames1412/se_project_express.git
cd se_project_express
npm install
Running the Server

Development (hot reload):

npm run dev

Production:

npm run start

Default URL: http://localhost:3001

🧩 API Endpoints
Users

POST /users – Create a new user

GET /users – Get all users

GET /users/:id – Get a user by ID

Clothing Items

GET /items – Retrieve all clothing items

POST /items – Create a new clothing item

DELETE /items/:id – Delete a clothing item (owner only)

PUT /items/:id/likes – Like a clothing item

DELETE /items/:id/likes – Remove like from an item

All endpoints return proper HTTP status codes for success and errors (400, 401, 403, 404, 500).

Video to project: https://www.loom.com/embed/35bbd55e72e543a19144260dd1637be5

📝 Author

Susan Hofmann
