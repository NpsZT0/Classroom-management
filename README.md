# NestJS + TypeORM + GraphQL + MySQL (Classroom Management Project)

Call API from cloud server: https://classroom-management-87wk.onrender.com/graphql

This project is a boilerplate for creating a backend application using NestJS with TypeORM, GraphQL, and MySQL.

## Prerequisites

- Node.js
- npm
- MySQL

## Getting Started

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/NpsZT0/Classroom-management-project.git
    cd Classroom-management-project
    ```

2.  Install the dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3.  Create a .env file in the root directory and configure your database connection:

    ```text
    # .env file

    DB_HOST=localhost
    DB_PORT=3306
    DB_USERNAME=root
    DB_PASSWORD=yourpassword
    DB_NAME=yourdatabase
    ```

### Running the Application
1. Run the application in development mode:

    ```bash
    npm run start:dev
    # or
    yarn start:dev
    ```

2. The server will be running on http://localhost:3000.

### GraphQL Playground
You can access the GraphQL playground at http://localhost:3000/graphql.

path to schema.gql is: ```root/src/schema.gql```

## Backend Structure

    src/
    |-- __mocks__/
    |-- classroom_members/
    |-- classrooms/
    |-- graphql/
    |-- users/
    |-- app.module.ts
    |-- main.ts
    |-- schema.gql

## Cloud server

- MySQL: Clever Cloud - https://www.clever-cloud.com/
- NestJS: Render - https://render.com/
