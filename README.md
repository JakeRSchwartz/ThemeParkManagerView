# Project Setup Instructions

## Overview

Due to cost constraints, this project is no longer hosted online. This README provides detailed instructions on how to set up and run this project locally for development and testing purposes.

## Archived Project

This project is now archived and viewable to the public. This is not the original repository with commit history hidden due to data integrity. 

## Demo Video
[![Demo Video](https://img.youtube.com/vi/Jk1ggN0rqkE/maxresdefault.jpg)](https://youtu.be/Jk1ggN0rqkE)


## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Git - [Download & Install Git](https://git-scm.com/downloads) for version control.

## Installation

Follow these steps to get your development environment set up:

### 1. Clone the Repository

If applicable, clone the repository to get a local copy on your machine:

git clone https://yourrepositorylink.com
cd your-project-folder

### 2. Set Up the DB
Download Dumpfile: scp username@remote_host:/path/to/database_dump.sql /local/path/to/database_dump.sql

Import dumpfile into MySQL: mysql -u [username] -p[password] [database_name] < database_dump.sql

Don't forget- Use "Name of DB" to top of dump file when importing into local db. 

Configure Your Local Environment
Update database connection settings:
Ensure your local web application is configured to connect to the local database. Update your application's configuration files with the local database credentials.

In src/backend/db.js
 DATABASE_CONFIG = {
'host': 'localhost',
'user': 'your_local_username',
'password': 'your_local_password',
'database': 'your_local_database_name'
}


### 3. Set Up the Frontend

cd path/to/src/frontend
npm install
Start the development server: npm run dev


### 4. Set up the Backend

cd path/to/src/backend
npm install
Start the backend server with Nodemon to enable hot reloading: npm run dev-node


# COSC 3380 THEME PARK MANAGER
This website, a collaborative creation by the students of COSC 3380, serves as an integral component of a theme park management system. It is designed to cater to various user categories—including Administrators, Customers, Attendants, and Maintenance personnel—each of whom is required to establish an account prior to authentication. Upon successful login, the system dynamically directs users to interfaces specific to their designated roles: Customers are navigated to consumer-oriented pages, while Administrators access control-centric interfaces. Depending on their user classification, individuals are presented with a bespoke array of functionalities tailored to facilitate distinct operations such as transaction processing, personnel management, and ride oversight, thereby enhancing the operational efficacy and user experience offered by the website

# Project Overview
The "Theme Park Manager" project is hosted on an AWS server and utilizes Node.js for the backend and React.js for the frontend. The system includes four different user roles:

### Login pages
The login page is the entry point to our theme park management system, designed to authenticate and direct users to appropriate pages based on their roles. Users must log in to access personalized features of the system. New users fill out a form to create an account, providing their first and last names, email, password(1 capital, 1 lowercase, 1 special symbol at least 8 length), date of birth, height, phone number, and address. This information is stored securely in our database, with sensitive data appropriately protected. After creating account, users enter their email and password, which the system checks to ensure validity before granting access. Successful login redirects users to use customer system.

### Customer Pages
The customer page allows users to buy tickets for rides, items, and games. Before they can use any rides, users must first purchase an entry pass. After buying the pass, they can choose any ride they want to try. Each ride has specific height restrictions for safety reasons; if a user is below the minimum height, they can't go on the ride to prevent accidents. The system also includes a feature that lets users check if rides, games, or attractions are closed due to bad weather like rain. When users buy items, these are added directly to the shopping cart, and the total price is shown. To complete the purchase, users just need to choose a payment method, and the transaction is processed immediately.

### Admin Pages
The admin page is designed to provide comprehensive control over park operations, employee management, and financial reporting. It allows administrators to add, update, and delete employee records, manage detailed aspects of park attraction including rides,games, and other facilities, and generate detailed reports on revenue, maintenance, and activity report. Also this system features layout where administrators can schedule shifts,assgin takss, and ensure optimal operational workflows. Each component, from employee profiles to attraction updates, is interconnected, providing a experience for managing both personnel and customer engagement data.

Next there is the report form page. Admin page contians all of the three data report for project to manage our data between customer and employee. The admin can look at treports for Revenue, Activity, Maintenance.

   **1. Revenue Reports**: Generates financial reports based on ticket sales, concession sales, or other revenue streams. It allows admins to select date ranges and view corresponding revenue details 
    graphically and in chart forms.
    
   **2. Activity Reports**: Provides insights into the usage statistics of games and rides, showing data like ticket purchases and visitor counts over selected periods.
   
   **3. Maintenance Reports**: Offers a detailed look at maintenance activities, including breakdowns and repair statuses, sorted by rides, games, or attractions.

Maintainer Pages: Submits maintenance and fixed ride requests.
Attendant Pages: Handles customer interactions within the park.

The project structure is organized into two main folders within the src directory:
backend: Contains the backend code written in Node.js, which includes API endpoints and database interactions.
frontend: Contains the frontend code written in React.js, which includes components for user interfaces and interactions.
