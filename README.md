# Book Note App

Book Note App is a web application built with Next.js and Tailwind CSS that allows users to search for books using the Google Books API, add them to their library, and add notes for future reference.

## Features

- User authentication with NextAuth
- Book search using the Google Books API
- Add books to the user's library
- Add and manage notes for each book
- Edit and delete notes
- Delete books from the library

## Technologies Used

- Next.js
- Tailwind CSS
- Mongo DB
- NextAuth
- Google Books API

## Getting Started

### Prerequisites

- Node.js (v14 or above)
- npm package manager

### Installation

1. Clone the repository:

2. Navigate to the project directory:

3. Install dependencies:

4. Set up environment variables:

- Create a `.env` file in the root of the project.
- Add the following environment variables to the `.env.local` file:

  ```
  GOOGLE_CLIENT_ID=your-google-client-id
  GOOGLE_CLIENT_SECRET=your-google-client-secret
  JWT_SECRET=your-jwt-secret
  ```

Replace `your-google-client-id`, `your-google-client-secret`, and `your-jwt-secret` with your actual values. You can obtain the Google client ID and client secret by creating a project in the Google Developers Console.

5. Start the development server:

6. Open your web browser and visit `http://localhost:3000` to access the application.

## Contributing

Contributions are welcome! If you have any suggestions or improvements, feel free to submit a pull request.
