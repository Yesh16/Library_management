# Library Management API

This is a RESTful API for managing a library system, built with Node.js, Express, and SQLite. The API supports functionality for librarians and users to manage books and borrow requests.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/yourusername/library-management.git
    cd library-management
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the root of your project and add the following:
    ```env
    PORT=3000
    JWT_SECRET=your_secret_key
    ```

4. **Start the server:**
    ```sh
    node server.js
    ```

The server should now be running at `http://localhost:3000`.

## Usage

You can use tools like Postman to test the API endpoints. Below are the available endpoints.

## API Endpoints

### Librarian APIs

- **Create a new library user**
  - **URL:** `/api/users`
  - **Method:** `POST`
  - **Body:**
    ```json
    {
        "email": "user@example.com",
        "password": "password123",
        "role": "User"
    }
    ```
  - **Success Response:**
    - **Code:** `201 CREATED`
    - **Content:**
      ```json
      {
          "id": 1
      }
      ```

- **View all book borrow requests**
  - **URL:** `/api/borrow-requests`
  - **Method:** `GET`
  - **Success Response:**
    - **Code:** `200 OK`
    - **Content:**
      ```json
      [
          {
              "id": 1,
              "user_id": 1,
              "book_id": 1,
              "start_date": "2024-01-01",
              "end_date": "2024-01-10",
              "status": "Pending"
          }
      ]
      ```

- **Approve a borrow request**
  - **URL:** `/api/borrow-requests/:id/approve`
  - **Method:** `PUT`
  - **Success Response:**
    - **Code:** `200 OK`
    - **Content:**
      ```json
      {
          "message": "Borrow request approved"
      }
      ```

- **Deny a borrow request**
  - **URL:** `/api/borrow-requests/:id/deny`
  - **Method:** `PUT`
  - **Success Response:**
    - **Code:** `200 OK`
    - **Content:**
      ```json
      {
          "message": "Borrow request denied"
      }
      ```

- **View a user's borrow history**
  - **URL:** `/api/users/:id/history`
  - **Method:** `GET`
  - **Success Response:**
    - **Code:** `200 OK`
    - **Content:**
      ```json
      [
          {
              "id": 1,
              "user_id": 1,
              "book_id": 1,
              "borrowed_on": "2024-01-01",
              "returned_on": "2024-01-10",
              "title": "Book Title",
              "author": "Author Name"
          }
      ]
      ```

### Library User APIs

- **Get list of all available books**
  - **URL:** `/api/books`
  - **Method:** `GET`
  - **Success Response:**
    - **Code:** `200 OK`
    - **Content:**
      ```json
      [
          {
              "id": 1,
              "title": "Book Title",
              "author": "Author Name",
              "quantity": 5
          }
      ]
      ```

- **Submit a request to borrow a book**
  - **URL:** `/api/borrow-requests`
  - **Method:** `POST`
  - **Body:**
    ```json
    {
        "user_id": 1,
        "book_id": 1,
        "start_date": "2024-01-01",
        "end_date": "2024-01-10"
    }
    ```
  - **Success Response:**
    - **Code:** `201 CREATED`
    - **Content:**
      ```json
      {
          "id": 1
      }
      ```

- **View the user's borrow history**
  - **URL:** `/api/users/:id/history`
  - **Method:** `GET`
  - **Success Response:**
    - **Code:** `200 OK`
    - **Content:**
      ```json
      [
          {
              "id": 1,
              "user_id": 1,
              "book_id": 1,
              "borrowed_on": "2024-01-01",
              "returned_on": "2024-01-10",
              "title": "Book Title",
              "author": "Author Name"
          }
      ]
      ```

## Authentication

### Basic Authentication
Use Basic Authentication for all APIs. Include the `Authorization` header with your requests:

