#  Job Mate - Full Stack Job Portal (MERN)

Job Mate is a fully-featured job portal web application built using the **MERN** (MongoDB, Express.js, React.js, Node.js) stack. It allows users to browse and apply for job openings while enabling companies to post and manage job listings efficiently.

---

##  Features

*  **Authentication & Authorization** for job seekers and recruiters (JWT-based)
*  **Job Posting and Management** for employers
*  **Job Application Tracking** for candidates
*  **Responsive Design** for all screen sizes
*  **Cloud-based Image Uploads** via Cloudinary
*  **Environment-based Configuration** for scalable deployment

---

##  Tech Stack

### Frontend:

* React.js + Vite
* React Router DOM
* Axios
* Tailwind CSS / Bootstrap (choose one)

### Backend:

* Node.js + Express.js
* MongoDB with Mongoose
* Cloudinary SDK
* JSON Web Token (JWT), Bcrypt

### Deployment:

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

##  Folder Structure

```
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── utils
│   └── server.js
│
├── frontend
│   ├── public
│   └── src
│       ├── components
│       ├── pages
│       └── App.jsx
```

---

##  Getting Started

Follow these instructions to run the app locally.

###  Prerequisites

* Node.js >= 18
* MongoDB Atlas account (or local MongoDB setup)
* Cloudinary account (for media uploads)

###  Installation

```bash
# 1. Clone the repository
https://github.com/mohul3404/job-mate-portal.git

# 2. Backend setup
cd job-mate-portal/backend
npm install

# 3. Frontend setup
cd ../frontend
npm install
```

###  Environment Setup

Create a `.env` file inside the `/backend` directory:

```env
PORT=5000
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
FRONTEND_URL=http://localhost:5173
DB_URL=your_mongodb_connection_string
JWT_SECRET_KEY=your_secure_jwt_key
JWT_EXPIRE=7d
COOKIE_EXPIRE=7
NODE_ENV=development
```

>  A sample `.env.example` file is included for reference.

---

##  Running the App

### Backend:

```bash
cd backend
node server.js
```

### Frontend:

```bash
cd frontend
npm run dev
```

Open `http://localhost:5173` to view the application.

---

##  Future Enhancements

* Resume upload & parsing
* Search with filters (location, experience)
* Admin dashboard for platform overview
* Notification system for application updates

---

##  Author

**Mohul** [**@mohul3404**](https://github.com/mohul3404)

If this project helped you learn or build your own, consider ⭐ starring it!

> **Disclaimer:** This project is built for educational and portfolio purposes only.

---

##  Contact

For queries, suggestions, or collaborations:

* GitHub: [https://github.com/mohul3404](https://github.com/mohul3404)
* Email: [bansalmohul@gmail.com](mailto:bansalmohul@gmail.com)

---
