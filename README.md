# Wanderlust
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/Neyolim/wanderlust)

Wanderlust is a full-stack, server-rendered web application built with Node.js, Express, and MongoDB. It serves as a comprehensive platform for browsing, creating, and reviewing rental property listings, similar to Airbnb. The application features a complete user authentication system, RESTful architecture, cloud-based image storage, and server-side data validation.

## Key Features

*   **User Authentication**: Secure user registration, login, and logout functionality powered by Passport.js.
*   **CRUD for Listings**: Registered users can create, read, update, and delete their own rental listings.
*   **Cloud Image Uploads**: Seamless image uploads for listings are handled by Multer and stored on Cloudinary.
*   **Review System**: Authenticated users can post star-rated reviews with comments on listings.
*   **Authorization**: Robust middleware ensures that only listing owners can edit or delete their properties, and only review authors can delete their reviews.
*   **Data Validation**: Server-side validation using Joi prevents invalid data from being submitted for listings and reviews.
*   **RESTful Architecture**: The application follows a logical, RESTful routing structure for predictable and clean API design.
*   **Persistent Sessions**: User sessions are stored in MongoDB using `connect-mongo` for a persistent login experience.
*   **Dynamic UI**: The frontend is built with EJS templating and styled with Bootstrap, featuring flash messages for user feedback and client-side form validation.
*   **Graceful Error Handling**: A centralized error handler and an async wrapper utility provide consistent error management across the application.

## Tech Stack

*   **Backend**: Node.js, Express.js
*   **Database**: MongoDB with Mongoose
*   **View Engine**: EJS, EJS-Mate
*   **Authentication**: Passport.js, Passport-Local, Passport-Local-Mongoose
*   **Image Handling**: Cloudinary, Multer, multer-storage-cloudinary
*   **Session Management**: express-session, connect-mongo, connect-flash
*   **Validation**: Joi
*   **Frontend**: Bootstrap 5, Custom CSS & JS

## Project Structure

The project follows a modular structure inspired by the Model-View-Controller (MVC) pattern to ensure a clean separation of concerns:

-   `app.js`: The main entry point, configuring the Express server, middleware, and routes.
-   `/models`: Contains Mongoose schemas (`user.js`, `listing.js`, `review.js`) that define the data structure.
-   `/views`: EJS templates for server-side rendering of the UI.
-   `/routes`: Defines the application's endpoints (`/listings`, `/reviews`, `/users`) and maps them to controller functions.
-   `/controllers`: Handles the business logic for each route.
-   `/middleware`: Custom middleware for authentication (`isLoggedIn`), authorization (`isOwner`, `isReviewAuthor`), and validation (`validateListing`).
-   `/public`: Static assets like CSS stylesheets and client-side JavaScript.
-   `/utils`: Helper functions and classes, such as `wrapAsync` for error handling and `ExpressError` for custom errors.
-   `/cloudConfig.js`: Centralized configuration for Cloudinary storage.

## Getting Started

### Prerequisites

*   Node.js and npm
*   MongoDB (local installation or a cloud service like MongoDB Atlas)
*   A Cloudinary account for image storage

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/neyolim/wanderlust.git
    cd wanderlust
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the following configuration. Replace the placeholder values with your actual credentials.
    ```env
    CONNECTION_STRING=<YOUR_MONGODB_CONNECTION_STRING>
    CLOUD_NAME=<YOUR_CLOUDINARY_CLOUD_NAME>
    CLOUD_API_KEY=<YOUR_CLOUDINARY_API_KEY>
    CLOUD_API_SECRET=<YOUR_CLOUDINARY_API_SECRET>
    SECRET=<YOUR_SESSION_SECRET_KEY>
    ```

4.  **Seed the database (Optional):**
    To populate the database with initial sample data, run the initialization script. This will delete all existing listings.
    ```sh
    node init/index.js
    ```

5.  **Start the server:**
    ```sh
    node app.js
    ```
    The application will be available at `http://localhost:8080`.

## API Routes

The core functionality of the application is exposed through the following RESTful routes:

| Method         | Endpoint                            | Description                               |
| -------------- | ----------------------------------- | ----------------------------------------- |
| `GET`          | `/listings`                         | Display all listings.                     |
| `GET`          | `/listings/new`                     | Show form to create a new listing.        |
| `POST`         | `/listings`                         | Create a new listing.                     |
| `GET`          | `/listings/:id`                     | Show details for a specific listing.      |
| `GET`          | `/listings/:id/edit`                | Show form to edit a listing.              |
| `PUT`          | `/listings/:id`                     | Update a specific listing.                |
| `DELETE`       | `/listings/:id`                     | Delete a specific listing.                |
| `POST`         | `/listings/:id/reviews`             | Create a new review for a listing.        |
| `DELETE`       | `/listings/:id/reviews/:reviewId`   | Delete a review from a listing.           |
| `GET` / `POST` | `/signup`                           | Render signup form & register a new user. |
| `GET` / `POST` | `/login`                            | Render login form & authenticate a user.  |
| `GET`          | `/logout`                           | Log out the current user.                 |
