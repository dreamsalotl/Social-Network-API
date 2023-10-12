# Social Network API

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

## Description

The Social Network API is a backend application that serves as the foundation for a social networking web platform. It allows users to perform various actions, such as creating thoughts, reacting to thoughts, and managing their friends. This application is built using JavaScript, npm packages, Express.js for routing, MongoDB for data storage, and Mongoose for interacting with the MongoDB database. The API also provides endpoints for users and thoughts, enabling users to manage their data efficiently.

## Table of Contents

- [Social Network API](#social-network-api)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Routes](#routes)
  - [Contributing](#contributing)
  - [License](#license)

## Installation

To set up the Social Network API on your local machine, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project's root directory in your terminal.
3. Run the following command to install the required dependencies:

```
npm install
```

## Usage

To start the server, run the following command:

```
npm start
```

This command will initiate the server, making it available at `http://localhost:3001`. You can use a tool like [Postman](https://www.postman.com/) to make HTTP requests to the API.

## Routes

The Social Network API provides the following routes:

- `GET /api/users`: Retrieve a list of all users.
- `GET /api/users/:userId`: Retrieve a single user by their ID.
- `POST /api/users`: Create a new user.
- `PUT /api/users/:userId`: Update a user by their ID.
- `DELETE /api/users/:userId`: Delete a user by their ID.
- `POST /api/users/:userId/friends/:friendId`: Add a friend to a user's friend list.
- `DELETE /api/users/:userId/friends/:friendId`: Remove a friend from a user's friend list.
- `GET /api/thoughts`: Retrieve a list of all thoughts.
- `GET /api/thoughts/:thoughtId`: Retrieve a single thought by its ID.
- `POST /api/thoughts`: Create a new thought.
- `PUT /api/thoughts/:thoughtId`: Update a thought by its ID.
- `DELETE /api/thoughts/:thoughtId`: Delete a thought by its ID.
- `POST /api/thoughts/:thoughtId/reactions`: Create a new reaction for a thought.
- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId`: Delete a reaction for a thought.

## Contributing

Contributions to this project are welcome. To contribute, please fork this repository, make your changes, and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).