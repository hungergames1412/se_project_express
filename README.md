# se_project_express — Node.js + Express.js Server

## 📌 Overview

This backend application powers the WTWR full-stack project. It provides a REST API for managing users and clothing items, including authentication, like/unlike functionality, and centralized error handling.

Frontend repository: https://github.com/hungergames1412/se_project_react  
Live Application: https://t10hungergames.verymad.net/

---

## 🚀 Project Features and Technologies

- Express.js REST API with modular routing and controllers
- MongoDB + Mongoose data models
- User authentication with bcryptjs and JWT
- Input validation using Joi, Celebrate, and Validator
- Centralized error handling with consistent HTTP status codes
- Request and error logging middleware using Winston
- Environment-based configuration using `.env`
- Deployment with PM2 and Nginx on a remote server

---

## 🗂️ Project Structure

se_project_express/
├─ controllers/
│ ├─ clothingItems.js
│ └─ users.js
├─ middlewares/
│ ├─ auth.js
│ ├─ errors.js
│ ├─ logger.js
│ └─ validation.js
├─ models/
│ ├─ clothingItem.js
│ └─ user.js
├─ routes/
│ ├─ clothingItems.js
│ ├─ index.js
│ └─ users.js
├─ utils/
│ ├─ config.js
│ ├─ errors.js
│ └─ successStatuses.js
├─ app.js
├─ package.json
└─ README.md

---

## 🔧 Tech Stack

- Runtime: Node.js
- Web Framework: Express.js
- Database: MongoDB (local or Atlas) with Mongoose
- Authentication: bcryptjs + JWT
- Validation: Joi, Celebrate, Validator
- Logging: Winston
- Dev Tools: nodemon, ESLint, Prettier

---

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS ≥ 18)
- MongoDB (local or Atlas)

### Installation

```bash
git clone https://github.com/hungergames1412/se_project_express.git
cd se_project_express
npm install
Running the Server

Development (hot reload):

npm run dev

Production:

npm run start

Default URL:
http://localhost:3001

🧩 API Overview

Base URL:
http://localhost:3001

Users
POST /signup — Register a user
POST /signin — Log in a user
GET /users — Get all users
GET /users/:userId — Get user by ID
Clothing Items
GET /items — Get all items
POST /items — Create item
DELETE /items/:itemId — Delete item (owner only)
PUT /items/:itemId/likes — Like item
DELETE /items/:itemId/likes — Remove like

All endpoints return appropriate HTTP status codes (400, 401, 403, 404, 500).

🧪 Testing

Example request:

curl http://localhost:3001/items
⚙️ Deployment
Deployed on a Google Cloud virtual machine
Connected via SSH
Node.js application managed with PM2 (auto-restart on crash)
Nginx configured to route public requests to the backend
SSL certificate enabled for secure HTTPS
Environment variables stored in a .env file on the server
📽️ Project Pitch Video

Check out my project pitch video here:

Video #1: https://www.loom.com/embed/35bbd55e72e543a19144260dd1637be5

Video #2: https://www.loom.com/share/786f8703eaec4ef9af849243138289b0

🛠️ Future Improvements
Improve frontend UI/UX
Add additional validation layers
Implement rate limiting and enhanced security
Expand features and user interactions
📝 Author

Susan Hofmann


```
