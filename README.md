# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Database migrations

Before starting the application for the first time, execute the database migrations.

```
npm run migration:migrate
```

If you change some fields in DB, run generation migration and after run prev command.
Migration generation will create new migration file, based on current state of your DB.

```
npm run migration:generate
```

## Running application

```
npm start
```

## Docker

Run application

```
docker compose up
```

Scan docker images for vulnerabilities

```
npm run scan
```

### Swagger docs

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/api/docs.

To open docs from local files, follow this link http://localhost:4000/api/docs-my
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```

npm run test

```

To run only one of all test suites

```

npm run test -- <path to suite>

```

To run all test with authorization

```

npm run test:auth

```

To run only specific test suite with authorization

```

npm run test:auth -- <path to suite>

```

### Auto-fix and format

```

npm run lint

```

```

npm run format

```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

```

```
