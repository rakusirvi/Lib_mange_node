## Library System API backend For the Management of USERS and BOOKS.

# Routes and the End Points

## /users

GET:this is used inorder to get all the books in the system
POST:Register a new user

## /users/:id

GET:Get user by their ID
PUT:Updating a User by their ID
DELETE:Deleting a User by their ID (Check if the user STILL has an issued book) && (is there is any FINE to be collected)

## /users/subscription_details/:id

GET:Get a user Subscription details by their ID

> > date of Subscription
> > Valid Till ?
> > fine is Any

## /bools

GET:Get all the books in the System
POST:Add a new book to the System

## /books/:id

GET:Get a book by their ID
PUT:Update a Book by their ID
DELETE: Delete a Book by their ID

## /books/Isued

GET:Get all the Issued Books

## /books/issued/withfile

GET:get all issued books with their Amount

### Subscription type

    >> basic ( 3 month)
    >>Standerd (6 month)
    >> Premium (1 Year)

> > If user missed the renewal date, then user should be collectd with hundered rs
> > If a user misses his Subcription and then user is fined 100rs
> > if both (200 fine)

## Commands

npm init
npm i express
npm i nodemon --save-dev
add >>

"scripts": {
"start": "node index.js",
"dev": "nodemon index.js"
},

npm i
npm run dev
