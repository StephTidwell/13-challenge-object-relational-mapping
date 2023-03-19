# E-Commerce ORM

## Description

This is the back end application for e-commerce site. The application allow to store, view, create, update and delete data about Products, Categories and Product Tags.

## Installation

To be able to use the application you need to install the necessary `npm modules`. You can do this by running the command

```bash
npm install
```

in the root folder of the project.

The application used MySQL database. You can found a [schema.sql](./db/schema.sql) file in project folder for database creation example and [application models](./models) are represent database tables.

You should add configuration data `.env` file about your database connection to run application localy. File structure:

```
DB_USER='username'
DB_PW=""
DB_NAME='ecommerce_db'
```

For adding test data to database you can run the command:

```bash
npm run seed
```

## Usage

To run application use this command from root folder:

```bash
npm start
```

## Credits

Packages used:

- [Express.js](https://www.npmjs.com/package/express)
- [Mysql2](https://www.npmjs.com/package/mysql2)
- [Sequelize](https://www.npmjs.com/package/sequelize)
- [Dotenv](https://www.npmjs.com/package/dotenv)
