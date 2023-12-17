![Pointer](https://res.cloudinary.com/bandmsociety/image/upload/v1702817433/pointer/store/aqusmbg8oubtydepy3hw.png)

# Pointer

Welcome to the Pointer web applicationr, an open platform where you can easily generate images based on prompt descriptions. This web application allows you to generate images using the OpenAI API, save them, and explore the generated images on the home page.

## Features

- **Image Generation:** Create unique images by providing prompt descriptions to the OpenAI API.
- **Save Images:** Save your generated images for future reference.
- **Image Explorer:** Explore a collection of previously generated images on the home page.

## Technology Stack

### Backend

- **Express.js:** The backend is built using Express.js, a fast and minimalistic web framework for Node.js.
- **MongoDB:** Store and retrieve generated images and user data in a MongoDB database.
- **OpenAI API:** Leverage the power of the OpenAI API for image generation based on prompts.
- **Cloudinary CDN:** Store and serve images efficiently using the Cloudinary Content Delivery Network.

### Frontend

- **React:** The frontend is developed using React, a popular JavaScript library for building user interfaces.
- **TypeScript:** Enhance code quality and maintainability with TypeScript.
- **SCSS:** Use SCSS for styling, providing a more maintainable and modular approach.
- **React Query:** Manage and fetch data efficiently with React Query.
- **File saver:** Save files in different formats as well.
- **React-hook-form:** Performant, flexible and extensible forms with easy-to-use validation.

### Node.js Version

- **Node.js v20.0.0:** Ensure compatibility with the specified Node.js version.

## Getting Started

1. Clone the repository: `git clone https://github.com/Maxim-Sverlovych/pointer_2_client.git`
2. Install dependencies:
   ```bash
   cd pointer_2_client
   npm install or npm install --legacy-peer-deps
3. Configure environment variables. Create a .env file in the root directory with the following variables:
- **VITE_BASE_URL_DEV=** http://localhost:3000/api/v1
4. Run application:
   ```bash 
   npm run dev
  
