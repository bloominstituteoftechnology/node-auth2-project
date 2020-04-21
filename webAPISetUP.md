## Steps to Set Up Web API and Backend Program

1) Install dependencies
- npm i
- npm init -y 
- npm i -D nodemon
- npm i express
- npm i knex sqlite3
- npx knex init

2) Set up relevant folders and files

3) Set up migrations
- npx knex migrate:make *file name goes here*
- format migration
- npx knex migrate:latest

4) Set up seeds
- npx seed:run
- npm i knex-cleaner