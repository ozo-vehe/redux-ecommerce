# STOREDUX

## Overview

**STOREDUX** is a fully-featured eCommerce platform built to allow users to register as an admin, seller, or shopper. The platform provides role-based functionalities, where admins can manage users, sellers can manage their inventory and post products, and shoppers can browse products and make purchases. The project leverages Supabase for backend operations, including authentication and database management, and uses React and Redux Toolkit for state management on the frontend. The user interface is styled using TailwindCSS for a modern, responsive design.

This project aims to create a scalable, performant, and easy-to-use eCommerce system that supports multiple user roles and offers seamless product management and purchasing capabilities.

## Demo

- Video: [Video](https://www.loom.com/share/9b5711ecf89e4060a10277d2ff57f9b8?sid=29d11325-20fb-41e6-bf42-df306dcf7b2c)
- Website: [StoRedux](https://storedux-ten.vercel.app/)

## Features

1. **User Registration & Role Assignment**  
   - Register new users and assign them roles (Admin, Seller, Shopper).
   - Users can securely log in and out.

2. **Role-Based Access Control**
   - **Admin Role:**
     - Can manage the user base by adding or deleting users.
     - Full access to the list of all users in the system.
   - **Seller Role:**
     - Can post new products for sale, including specifying product prices and available quantities.
     - Manage their inventory, including updating product details.
   - **Shopper Role:**
     - Browse through available products listed by various sellers.
     - Add products to the shopping cart and proceed with purchases.

3. **Product Management**
   - Sellers can add new products, update existing ones, and delete products from their inventory.
   - Products are displayed to shoppers based on availability.
   - Shoppers can browse products, add them to the cart, and purchase them.

4. **Supabase-Handled CRUD Operations**
   - User registration, login, product management, and order management operations are handled through Supabase’s database.
   - Full CRUD support for managing users, products, and orders.


## Technologies Used

- **Frontend**: React, Redux, Redux Toolkit, ViteJS
  - **React**: Component-based architecture for building the user interface.
  - **Redux Toolkit**: Centralized state management for handling global state across the application.
  - **ViteJS**: Fast development build tool for React with better integration with Redux.
  
- **Backend**: Supabase
  - **Supabase**: Handles user registration, and login.
  - **Supabase Database**: PostgreSQL database for managing users, products, and orders/carts.

- **Styling**: TailwindCSS
  - Utility-first CSS framework for creating responsive, modern designs.
  - Easily customizable for a clean and consistent UI.
  
- **Routing**: React Router
  - Used for seamless page navigation between different components such as login, dashboard, product listings, and cart.

## State Management

**Redux Toolkit** is used for handling global state. The state is divided into slices for each key area of the application:
- **User Slice**: Manages user registration and role data.
- **Product Slice**: Handles product-related state (listings, details, etc.).
- **Cart Slice**: Tracks user's carts.


## Styling

The user interface is designed using **TailwindCSS**, which offers flexibility in customizing the design through utility classes. The clean, minimalist design ensures that users experience an intuitive and responsive across devices.

Key styling features:
- Minimalist design focusing on usability and product browsing.
- Easy-to-read typography and color contrast for better accessibility.


## Installation and Setup

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd redux-ecommerce
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173` to view the application.

5. Either signup up as a shopper or seller, or login as an admin using the admin details below.
   > admin details => email: ozovehe@gmail.com, password: ozovehe

   > NOTE: The project should be run on a laptop and mobile view has not yet been implemented.


## Conclusion

**STOREDUX** is a robust and scalable eCommerce platform that efficiently manages different user roles and provides seamless product management and purchasing experiences. With a modern frontend built using React, Redux, and TailwindCSS, and a powerful backend powered by Supabase, this project is designed to be both user-friendly and developer-friendly, ensuring ease of use and extensibility for future enhancements.
