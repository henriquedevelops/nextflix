# [**Nextflix**](https://app.nextflix.com) 🔴

Your next type of movie streaming platform.

## Requirements 📝

- Docker
- Docker Compose

## Installation 🔌

- Create an .env file in the root folder with the variables: JWT_SECRET, SERVER_PORT, ADMIN_PASSWORD, DATABASE_URL, POSTGRES_USER, POSTGRES_PASSWORD, and POSTGRES_DB.
- Docker compose up.
- Create the tables in the database by running "npx prisma migrate deploy" inside the API container.

## Features 💡

- Secure and stateless JWT authentication
- SSL termination
- Role-based authorization
- Intuitive and easy-to-use admin interface
- Image uploading with validation and automatic cropping
- Optimistic UI rendering
- Full responsiveness in all pages and dialogs
- "My list" functionality
- Filter movies by genre
- Automatic loading
- Automatic searching
- Proper REST API error handling
- Type safety on both client and server side
- SSR and CSR combination
- Lazy loading
- Reverse proxy
- And more

## Future Implementations 🌱

- Payments with Stripe
- Movie ratings
