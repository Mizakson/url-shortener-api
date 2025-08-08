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
### Setup and Installation
### Testing
### License
