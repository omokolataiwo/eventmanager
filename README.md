[![Build Status](https://travis-ci.org/omokolataiwo/eventmanager.svg?branch=develop)](https://travis-ci.org/omokolataiwo/eventmanager)
[![Coverage Status](https://coveralls.io/repos/github/omokolataiwo/eventmanager/badge.svg?branch=develop)](https://coveralls.io/github/omokolataiwo/eventmanager?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/c777965ceb99782c5981/maintainability)](https://codeclimate.com/github/omokolataiwo/eventmanager/maintainability)
[![codecov](https://codecov.io/gh/omokolataiwo/eventmanager/branch/develop/graph/badge.svg)](https://codecov.io/gh/omokolataiwo/eventmanager)

# Event Manager

Event Manager is an application that manages event centers by giving a platform where center owners can register their centers and manage them all in one place.

## Table of Contents

- [Features](#features)
- [Technologies](#technology)
- [Installation and Setup](#installation-and-setup)
- [Limitations](#limitations)
- [How to Contribute](#how-to-contribute)
- [API Endpoints](#api-endpoints)
- [Questions and Support](#questions-and-support)
- [License](#license)

## Features

Event Manager has the following features:

### Center Administration

> The application allows center owners to create event centers at various locations across the country. Once a center is created, it is subject to approval from the super admin. Event Manager allows center owner to edit the details of a center including setting the availability of the center.

### Booking Information

> The center owners can view the booking information of their centers. Center owners are allowed to declined an event provided it has not already taken place.

### Center Booking

> User registered on the platform can book for any center of their choice. Currently, user have the ability to create an event, delete an event, and update an event. User can not book a center that has already been booked for that day.

### Search

> Currently, users are allowed to search for centers by name and location. User can view the details of a center from the search page and book center.

## Technology

Event Manager is built majorly with Model-View-Controller and Middleware patterns and architecture. It is built with the following technologies and tools:

1.  Event Manager is built with **JavaScript es6**
2.  **Express.js**: Express.js is a web application framework for Node.js. It provides various features that make web application development fast and easy.
3.  **ReactJS**: React is a front-end library that is used for handling the view layer of web and mobile applications.
4.  **Redux**: Redux is a predictable state container for JavaScript apps. It helps applications that behave consistently.
5.  **PostgreSQL**: PostgreSQL is a powerful, open source object-relational database system that uses and extends the SQL language combined with many features that safely store and scale the most complicated data workloads.
6.  **Sequelize ORM**: Sequelize is an ORM which is designed to work with Node.JS. It supports many major database engines.

## Installation and Setup

EventMan is built on [nodejs](https://nodejs.org/) before following these step, you need to have installed node v8.11.2 or greater on your system.

1.  Clone the repository:

```
git clone  https://github.com/omokolataiwo/eventmanager.git
```

2.  Navigate into the cloned repository directory using:

```
cd eventmanger  
```

3.  Install dependencies:

```
npm install  
```

4.  Install PostgreSql username and database. [Getting Started with PostgreSQL](https://www.codementor.io/engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb).
5.  Rename **.env-example** to **.env** and modify appropriately.
6.  Install **sequelize-cli** globally and run migrations

```
npm install -g seqeulize-cli  
&& sequelize db:migrate  
```

9.  **To start the application for development, run**

```
npm run start:dev:server  -To start node application server.
npm run build:dev:client  -To Frontend development server.
```

**Note:**  
On production environment, run  
`npm run build && npm start`

## Testing

To run the automated test for the project. Run either of the commands below in your terminal for either backend test or frontend test.

For backend test, run `npm run server:test` on the terminal.
For frontend test run `npm run client:test` on the terminal.

## Limitations

This is an open source project that is open to your contribution. Currently, the following limitation exist within the application:

- Signup email verification: The application does not verify the email address provided the user on sign up.

- Payment System: The application does not have any means of collecting funds on behalf of the center owner.

## How to Contribute

You can contribute to this project by:

1.  **Fork** this repository.
2.  Follow [Installation and Setup](#installation-and-setup) steps.
3.  Create a your **_feature branch_** off the **_master branch_**.
4.  Make changes and Commit following this recommended commit message format.
5.  Raise a pull request against **_develop branch_**.


**Note:** It is recommended to use [airbnb style guide](https://github.com/airbnb/javascript) coding convention when contributing to this codebase.


## API Endpoints

See [API Documentation](http://eventmanng.herokuapp.com/api/doc)

## Questions and Support

> This project has been developed in highly modularized fashion. Thus, each components can be broken down and tested separately.  
> For questions and support, you can contact the author @[Taiwo Kolawole](<mailto:[kolawole.taiwo@andela.com](mailto:kolawole.taiwo@andela.com)>)

## License

[MIT License](./LICENSE)
Copyright (c) 2018 omokolataiwo
