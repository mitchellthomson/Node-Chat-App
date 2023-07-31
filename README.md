# Node-Chat-App

## Installation

run `npm install`

navigate to the frontend folder run `npm start`

navigate to the root run `npm start`

this ensures both the client and server are running and will let you have access to the application and the database.

## Project

This is a chatting application made using Nodejs with a Mongodb Database.

The goal of the project was to create a messaging application for users to be able to talk 1 on 1 or within a group setting. My goal was to learn first more about webapp development especially from a more responsive front end. As well how is security done on something we use every day (messaging applications). While this is a beginner approach there are several security methods in place and still being implemented.

## Threat Model

#### This threat model was done following the PASTA framework

## 1. Preparation Phase:

#### Identified assets:

User data, chat messages, JWT tokens, MongoDB database, server infrastructure.

#### Actors:

End-users, administrators, potential attackers.

## 2. Elicitation Phase:

#### Use cases identified:

User registration and login

chat message submission and retrieval

admin functions

#### Threats and vulnerabilities identified:

Cross-Site Scripting (XSS) attacks on chat messages and user inputs.

Cross-Site Request Forgery (CSRF) attacks on sensitive operations.

Brute force attacks on user passwords.

Insider threats or unauthorized access by authenticated users.

Data leakage through insecure logging and error handling.

Denial-of-Service (DoS) attacks on the server infrastructure.

## 3. Analysis Phase:

Impact and likelihood of threats assessed to determine risk ratings.

High-risk threats: XSS, CSRF.

Medium-risk threats: Brute force attacks, insider threats, DoS attacks.

Low-risk threats: Data leakage, insecure JWT storage.

## 4. Plan Phase:

Risk mitigation strategies identified:

Implement parameterized queries and input validation to prevent injection attacks.

Use Content Security Policy (CSP) to mitigate XSS vulnerabilities.

Implement CSRF tokens to protect against CSRF attacks.

Enforce strong password policies and implement account lockouts for brute force protection.

Securely store JWT tokens on the client-side with HttpOnly and Secure flags for cookies.

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
