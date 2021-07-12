# Using JSON Web Tokens
changes
## Introduction

Use `Node.js`, `Express` and `Knex` to build an API with authentication and authorization using JSON Web Tokens.

## Instructions

### Task 1: Project Setup

There are two possible ways to submit your project. Your instructor should have communicated which method to use for this project during the Guided Project and in your cohort's Slack channel. If you are still unsure, reach out to Lambda Staff.

#### Option A - Codegrade

- [ ] Fork and clone the repository.
- [ ] Open the assignment in Canvas and click on the "Set up git" option.
- [ ] Follow instructions to set up Codegrade's Webhook and Deploy Key.
- [ ] Push your first commit: `git commit --allow-empty -m "first commit" && git push`.
- [ ] Check to see that Codegrade has accepted your git submission.

#### Option B - Pull Request

- [ ] Fork and clone the repository.
- [ ] Implement your project in a `firstname-lastname` branch.
- [ ] Create a pull request of `firstname-lastname` against your `main` branch.
- [ ] Open the assignment in Canvas and submit your pull request.

### Task 2: Minimum Viable Product

You will complete the following tasks and do any extra wiring and package installation necessary for the app to compile and pass all tests.

#### 2A - Database Access Functions

Write the following user access functions inside `api/users/users-model.js`:

- [ ] `find`
- [ ] `findBy`
- [ ] `findById`

#### 2B - Middleware Functions

Write the following auth middlewares inside `api/auth/auth-middleware.js`:

- [ ] `restricted`
- [ ] `only`
- [ ] `checkUsernameExists`
- [ ] `validateRoleName`

#### 2C - Endpoints

Authentication will be implemented using JSON Web Tokens.

Write the following endpoints inside `api/auth/auth-router.js`:

- [ ] `[POST] /api/auth/register`
- [ ] `[POST] /api/auth/login`

The endpoints inside `api/users/users-router.js` are built already but check them out:

- [ ] `[GET] /api/users` - only users with a valid token can access
- [ ] `[GET] /api/users/:user_id` - only users with a valid token AND a role of 'admin' can access

#### 2D - Secrets File

Complete the `secrets/index.js` file.

#### Users Schema

| field    | data type        | metadata                                      |
| :------- | :--------------- | :-------------------------------------------- |
| user_id  | unsigned integer | primary key, auto-increments, generated by db |
| username | string           | required, unique                              |
| password | string           | required                                      |
| role_id  | unsigned integer | foreign key, required                         |

#### Roles Schema

| field     | data type        | metadata                                      |
| :-------- | :--------------- | :-------------------------------------------- |
| role_id   | unsigned integer | primary key, auto-increments, generated by db |
| role_name | string           | required, unique                              |

#### Notes

- Run tests locally executing `npm test`.
- The project comes with `migrate`, `rollback` and `seed` scripts in case you need to reset the database.
- You are welcome to create additional files but **do not move or rename existing files** or folders.
- Do not alter your `package.json` file except to install extra libraries or add extra scripts.
- In your solution, it is essential that you follow best practices and produce clean and professional results.
- Schedule time to review, refine, and assess your work.
- Perform basic professional polishing including spell-checking and grammar-checking on your work.

### Task 3: Stretch Goals

- Build a React application that implements components to register, login and view a list of users. Gotta keep sharpening your React skills.
