Project Info:
This project is a ReactJS CRUD (Create, Read, Update, Delete) application with a JSON server. It allows users to perform basic CRUD operations on a collection of users. The application uses React Router for navigation and routing, Axios for making HTTP requests to interact with the JSON server, and Joi for basic form validation. It features a user-friendly interface with form input fields for adding and editing user data, and a table to display the list of users with options to view, edit, and delete individual users.

Running the Project:
To run the project, follow these steps:

1. Make sure you have Node.js and npm (Node Package Manager) installed on your system.
2. Clone the project or download the project files to your local machine.
3. Open a terminal or command prompt and navigate to the project directory.
4. Run the command `npm install` to install the project dependencies.
5. Once the installation is complete, run the command `npm run start:dev`. This command will start both the React development server and the JSON server concurrently.
6. The React application will be accessible at `http://localhost:3000`, and the JSON server will be accessible at `http://localhost:3002`.
7. You can now interact with the CRUD application in your web browser.

Explanation for Two Ports:
In this project, two ports are used to run the frontend (React application) and the backend (JSON server) independently within a single development environment. The React development server runs on port 3000, while the JSON server runs on port 3002. This separation allows the frontend and backend to communicate with each other as they would in a real client-server architecture. The React application makes HTTP requests to the JSON server using the specified port, simulating the interaction between the client-side and server-side components of a web application.
