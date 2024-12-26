# blogsy-mern

#Blog Application

A Blog Application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). This application allows users to create, read, update, and delete blogs. Additional features include user authentication, commenting, liking blogs, and image handling via AWS S3.

#Features

Create, Read, Update, Delete (CRUD) Blogs: Users can manage their blogs efficiently.

User Authentication: Secure login and signup functionality using JWT.

Tagging: Add relevant tags to categorize blogs.

Responsive Design: Optimized for all devices.

Image Handling: Upload images and validate URLs, stored securely on AWS S3.

#Tech Stack

Frontend: React.js with Tailwind CSS for styling.

Backend: Node.js and Express.js for API development.

Database: MongoDB for data storage.

Cloud Storage: AWS S3 for image handling.

#Installation

Clone the repository:

git clone https://github.com/avinashkumar99/blog_project_MERN.git

cd blog-application

Install dependencies for the backend:

cd ./server
npm install

Install dependencies for the frontend:

cd ../client
npm install

#Configure environment variables:

Create a .env file in the backend folder and add:

MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
S3_BUCKET_NAME=your-s3-bucket-name

#Start the development servers:

Backend:

cd ./server
node main.js

Frontend:

cd ../client
npm run dev

Open your browser and navigate to:

http://localhost:5173/home

#API Endpoints

User Authentication

POST /api/user/create: Register a new user

POST /api/user/login: Log in an existing user

Blog Management

GET /api/posts: Fetch all blogs

POST /api/post/create: Create a new blog

PUT /api/post/update/:id: Update an existing blog

DELETE /api/post/delete/:id: Delete a blog

#Demo

Live Demo

#Contributing

Fork the repository.

Create your feature branch:

git checkout -b feature-name

Commit your changes:

git commit -m "Add feature-name"

Push to the branch:

git push origin feature-name

Open a pull request.

#Contact

Author: Avinash Kumar

Email: avinashhkumar99@gmail.com

GitHub: https://github.com/avinashkumar99

Feel free to reach out for any questions or contributions!
