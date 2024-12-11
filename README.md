# React SPA Disney Dashboard

## 1. How to set up and run the project locally

To run the project locally, follow these steps:

1. **Clone the repository:**
```bash
git clone https://github.com/chrismarkoulis/disney-dashboard.git
```

2. **Navigate to the project directory:**
```bash
cd disney-dashboard
```

3. **Install dependencies:** 
Ensure that you have Node.js and npm installed. Then, run the following command to install all necessary dependencies:
```bash
npm install
```

4. **Start the development server:**
```bash
npm start
```

5. **Run tests:**
```bash
npm test
```
## 2. Libraries & Tools Used in the Project

- **React**: JavaScript library for building user interfaces.
- **React DOM**: Provides DOM-specific methods for rendering React components.
- **Material-UI** (`@mui/material`): A popular React UI framework that offers a wide range of customizable UI components.
- **Material-UI Icons** (`@mui/icons-material`): A package providing Material Design icons as React components.
- **Axios**: A promise-based HTTP client for making HTTP requests, used to interact with the Disney API and other endpoints.
- **Redux Toolkit** (`@reduxjs/toolkit`): A library that simplifies Redux state management, providing a set of tools for efficient Redux development.
- **React Redux** (`react-redux`): A library to connect React components with the Redux store.
- **Highcharts**: A popular JavaScript charting library for building interactive charts, used to display data visually.
- **Highcharts React** (`highcharts-react-official`): A React wrapper for integrating Highcharts into React components.
- **XLSX**: A library used for parsing and writing Excel files, utilized for exporting data to Excel.
- **Jest**: A JavaScript testing framework used for unit testing the app components.
- **React Testing Library**: A testing utility that helps in testing React components by interacting with the DOM as a user would.
- **Jest DOM** (`@testing-library/jest-dom`): Provides custom Jest matchers to test the DOM elements.
- **Create React App** (`cra-template`): A tool for setting up a React project with a predefined configuration, used to quickly start the project.

### Disney API
- **Disney API**: An API that provides data on Disney characters, their appearances in TV shows and films, and more. You can find the documentation and usage details at [Disney API Documentation](https://disneyapi.dev/).


## 3. Technical Approach

In this application, we fetch Disney character data from the Disney API and display it through different components like tables, modals, and charts.

### Data Fetching

- **Incremental Fetching**: 
  - The data is fetched incrementally based on pagination. We only request the specific set of characters corresponding to the current page and page size, reducing the amount of data loaded at once. This is achieved using the `fetchCharacters` Redux action.
  - The API call to `https://api.disneyapi.dev/character?page={page}&pageSize={pageSize}` is triggered each time the user changes the page or updates the number of rows per page.
  
- **Redux State Management**:
  - The data for each page is stored in the Redux store in a **mapped object** format, where the key is the `page` number and the value is the array of character data for that page. This allows us to avoid redundant API calls and ensures that data for previously loaded pages is available without re-fetching.
  - We store the `totalPages` in the Redux state to manage pagination in the table.

### Caching and Performance Optimization

- **Page-Level Data Caching**: Instead of using **localStorage**, we cache the fetched character data in the Redux store. When the user navigates between pages, the app checks if the data for that page is already available in the store and uses it. If not, a new request is made to the API for that specific page.
  
- **Data Handling**: When the data for a new page is fetched, the characters are added to the `characters` object in the Redux store, where each page is stored as a key with an array of character objects as its value. This structure allows us to efficiently access and display data based on the current page.

### Data Display

- **Character Table**: 
  - The characters are displayed in a paginated **Material-UI Table**. The table allows users to search for characters by name, sort the data, and view the number of TV shows and video games each character is associated with. 
  - The table also supports pagination, with the number of rows per page and the current page being adjustable.

- **Character Modal**: When a user clicks on a row in the table, a **modal** is displayed with detailed information about the selected character, including their TV shows, video games, and more.

- **Pie Chart**: A **Highcharts pie chart** visualizes the distribution of characters' film appearances, based on the data fetched from the API.

