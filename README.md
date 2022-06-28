# dwitter
![dwitter](https://user-images.githubusercontent.com/90359267/176277429-e6a94459-0db0-4375-9fe9-ca829af193d1.gif)

# Website
https://dwitterclone.netlify.app

# Skills
- Languages: JavaScript  
- Backend: nodeJs, express, RestAPIs, session&cookies, JWT, Bcrypt, Configuration, Validation, Socket
- Database: MySQL, Sequelize, MongoDB, Mongoose
- Deploy: Netlify, Heroku

# Description
- Twitter clone coding (Live chat application)

# API spec

## Tweets

- `TWEET` Schema  

    ```
    {
      id: string,  // tweet id
      text: string,  // tweet text
      createdAt: Date, // created date
      userId: string // user id
    }
    ```
    
### `GET` /tweets

- get all tweets   

    Response `200`
    
    ```
    {
       [tweet, tweet ....] 
    }
    ```
    

### `GET` /tweets?username=:username

- get all tweets for user's username
    
    Response `200`
    
    ```
    {
       [tweet, tweet ....] 
    }
    ```
    

### `GET` /tweets/:id

- get tweet by id
    
    Response `200`
    
    ```
    {
       tweet
    }
    ```
    

### `POST` /tweets

- creating new tweet
    
    Request 
    
    ```
    {
       text,
       userId
    }
    ```
    
    Response `201`
    
    ```
    {
       tweet
    }
    ```
    

### `PUT` /tweets/:id

- updating tweet
    
    Request
    
    ```
    {
       text
    }
    ```
    
    Response `200`
    
    ```
    {
       tweet
    }
    ```
    

### `DELETE` /tweets/:id

- updating tweet



## Auth

- `USER` Schema
    
    ```
    {
      id: string // user id
      username: string,  // user username
      password: string,  // user password
      name: string,  // user name
      email: string,  // user email
      url: string (optional) // user profile email
    }
    ```

### `POST`/auth/signup

- creating new account

    Reqeust
    
    ```
    {
      username,
      password,
      name,
      email,
      url
    }
    ```

    Response `201`
    
    ```
    {
	    token,
	    username
    }
    ```

### `POST`/auth/login

- user login

    Reqeust
    
    ```
    {
	    username,
	    password
    }
    ```

    Response `200`
    
    ```
    {
	    token,
	    username
    }
    ```

### `GET` /auth/me

- checking token validation

    Response `200`
    
    ```
    {
	    token,
	    username
    }
    ```
