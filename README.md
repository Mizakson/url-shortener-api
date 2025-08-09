## url-shortener-api

A simple and robust URL shortener built as a RESTful API

## Table of Contents
* [Project Overview](#project-overview)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [API Usage](#api-usage)
* [Setup and Installation](#setup-and-installation)
* [Testing](#testing)
* [License](#license)

### Project Overview
This project is a RESTful back-end API designed to shorten URLs into unique short-codes. This service is intended for direct usage via its API endpoints. The API includes thorough collision handling and is built to be anonymous, requiring no API keys for usage. All core functionalities have been thoroughly tested using Jest and Supertest to ensure reliability and performance.

### Features
* __URL Shortening__: Converts long URLs into unique, 8-character shortcodes.
  
* __Redirection__: Redirects users from the shortcode URL to the original URL.
  
* __Collision Handling__: Automatically retries generating a new shortcode if a collision with an existing code is detected.
  
* __Database Integration__: Persists URL data using a database.

### Tech Stack
* __Node.js & Express__: Core back-end framework for the API server.

* __Prisma__: ORM (Object-Relational Mapper) used for database interactions.

* __Neon__: Serverless Postgres database solution for storing URL data.

* __Jest & Supertest__: Testing framework and HTTP assertion library used for API endpoint testing.

* `express-rate-limit`: Middleware to protect the API from spam and abuse.

* `cors`: Middleware to enable cross-origin requests.

### API Usage
The API has two primary endpoints for creating and retrieving URLs.
1. __Create a New Short URL (POST)__

    * __Endpoint__: `/api/shorten`

    * __Method__: `POST`

    * __Description__: Creates a new short URL from a provided long URL. The API generates a unique shortcode and saves the entry to the database.
  
    * Request Body:
     ``` bash
     {
        "longUrl": "https://www.example.com/a-very-long-url-that-needs-to-be-shortened"
     }
     ```

    * CURL Example:
    ``` bash
    curl --request POST \
     --header "Content-Type: application/json" \
     --data '{ "longUrl": "https://www.example.com/a-very-long-url-that-needs-to-be-shortened" }' \
     https://url-shortener-api-5mtj.onrender.com/api/shorten
    ```
    
    * Response Body:
    ``` bash
    {
   "message": "URL created successfully",
    "entry": {
      "id": "clb5h081z000008ld22j35q1a",
      "shortCode": "abCde1",
      "originalUrl": "https://www.example.com/a-very-long-url-that-needs-to-be-shortened",
      "timesClicked": 0,
      "createdAt": "2023-10-27T10:00:00.000Z"
      }
    }
    ```
    
3. __Redirect to Original URL (GET)__
  * __Endpoint__: `/api/:shortCode`

  * __Method__: `GET`

  * __Description__: Redirects the user to the original URL associated with the short-code

  * CURL Example
  ``` bash
    # the --location flag will show the html for the desired url
    # if run without the location flag, there will only be a 302 status and the originalUrl
    curl --request GET --location https://url-shortener-api-5mtj.onrender.com/api/SHORT_CODE_HERE
  ```

  * __Success Response (302 Found)__: The server will send a redirect header, and your browser will navigate to the `originalUrl`.

### Setup and Installation
To run this project locally or make your own version of it, follow these steps:
  1. __Clone the repository__: 
  ``` bash
  git clone https://github.com/Mizakson/url-shortener-api.git
  cd url-shortener-api
  ```
  
  2. __Install dependencies__:
  ``` bash
  npm install
  ```

  3. __Set up environment variables__:
  ``` bash
  DATABASE_URL="postgresql://[user]:[password]@[host]:[port]/[database]"
  ```
  
  4. __Run database schema migrations__:  
  ``` bash
  npx prisma migrate dev
  ```

  5. __Start the server__:
  ``` bash
  npm start
  ```
  The server will run on the port specified in your `server.js` file.

### Testing
  To run the test suite, run the following command
  ``` bash
  npm test
  ```

### License
This project is licensed under the MIT License. See the `LICENSE` file for details.
