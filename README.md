# UnNamedChatApp

## Installation

run `npm install`

navigate to the frontend folder run `npm start`

navigate to the root run `npm start`

this ensures both the client and server are running and will let you have access to the application and the database.

# Project

This is a chatting application made using Nodejs with a Mongodb Database.

The goal of the project was to create a messaging application for users to be able to talk 1 on 1 or within a group setting. My goal was to learn first more about webapp development especially from a more responsive front end. As well how is security done on something we use every day (messaging applications). While this is a beginner approach there are several security methods in place and still being implemented. This project was done while going through 2 different security courses each with a slightly different pace.

# Threat Model

#### This threat model was done following the PASTA framework

## 1. Preparation Phase:

#### Identified assets:

User data, chat messages, JWT tokens, MongoDB database

#### Actors:

End-users, potential attackers.

## 2. Elicitation Phase:

#### Use cases identified:

User registration and login

chat message submission and retrieval

#### Threats and vulnerabilities identified:

Cross-Site Scripting (XSS) attacks on chat messages and user inputs.

Cross-Site Request Forgery (CSRF) attacks on sensitive operations.

Insider threats or unauthorized access by authenticated users.

Data leakage through insecure logging and error handling.

## 3. Analysis Phase:

Impact and likelihood of threats assessed to determine risk ratings.

High-risk threats: XSS, CSRF.

Medium-risk threats: DoS attacks.

Low-risk threats: Data leakage, insecure JWT storage, Brute force attacks, insider threats

## 4. Plan Phase:

Risk mitigation strategies identified:

Implement parameterized queries and input validation to prevent injection attacks.

Use Content Security Policy (CSP) to mitigate XSS vulnerabilities.

Enforce strong password policies and implement account lockouts for brute force protection.

Use rate limiting and DoS protection mechanisms to mitigate DoS attacks.

Regularly update dependencies to avoid known vulnerabilities.

Properly log and handle errors to avoid data leakage.

## 5. Tracking Phase:

Actions taken to address identified threats and vulnerabilities.

Incident response plan prepared to handle security breaches.

## 6. Attack Phase:

Threat agents launch attacks based on identified vulnerabilities.

Security measures are in place help resist or mitigate attacks.

## 7. Adaptation Phase:

Continuous review and update of the threat model.

Address new threats and evolving risks.

# Security Implementations

I wanted to focus on primarily the OWASP top 10 as my introduction to this I have added some security measures for these (with some still being implemented/fixed) as well as other small security measures I think may be important.

#### Sanitization

This project is using MongoDB as the database, so my chat application is vulnerable to nosql injection attacks. I sanitize the user inputs at any entry point they have in my application, for now mainly when querying the db (searching messages and sending messages). It can defend in situations where attackers manipulate queries to gain unauthorized access to data. By sanitizing the inputs it allows the user submitted text to have escapes for certain characters or if there could be harmful content (HTML tags for example) then the harmful content will be outright removed, this has the added benefit of being helpful in defending against xss attacks as well. Sanitization also has a benefit of helping with data corruption due to improper formatting or a malicious input.

### Proper Auth and Data Exposure

I have two methods for what I consider a proper auth in my app, both help prevent against "Broken Auth" vulnerability. Using hashing for user password storage, never wanting to store the users passwords in plaintext in the db as they can be easily read if there was a breach. I have implemented bcrypt hashing with a salt (salting is an extra layer of security in the hashing process), it is also quite slow but dependant on what you set its "work force" to be, so it will take a signifigant amount of time to brute force this.

The second piece is implementing JWT tokens(JSON web tokens). JWT tokens are stateless, so the server does not need to store session information. This reduces the risk of session-related vulnerabilities, such as session fixation and session hijacking. Also with JWT I was able to set a shorter expiration time to help try to close the window of time for attackers. A helpful tool but for better security especially against csrf I have some other implementations to go along side.

For validating my tokens I am using auth middleware, adding an extra layer that helps make sure only authorized users are interacting with sensitive information, by essentially having a central location where these checks happen as well as helping me learn better security practices.

### Extra Pieces

The chat app also has other inclusions for Data integrity including the two above, HTTPS is implemented (_currently issues but will fix_) to help ensure better data integrity as well as an extra layer for man in the middle attacks. I have implemented error handling that does not expose extra information or overly specific error codes to the user. I also tried my best to follow the idea of Flat Promise Chains, to help with the readability, error handling but most importantly useful for asynch programming which can be a useful tool against dos attacks since it will avoid blocking threads. This app used mainly very popular very well maintained libraries, so it is rather helpful that if a vulnerability does come it will be quickly maintained and fixes will be put in place.

I am aware that all these pieces together still leave gaps, but as a learning project there was lots of different choices made and changed constantly and some are still being changed now. Its also important to note that none of these individually will solve any of the one attack they help with, it is a required effort from all the implementations plus new ones that are added as the project shifts.
