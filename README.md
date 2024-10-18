## XML to JSON Service Documentation

### Project Overview

The XML to JSON Service fetches vehicle data from the National Highway Traffic Safety Administration (NHTSA) API, parses the XML response, and converts it into a structured JSON format. The service stores this data in a MongoDB database and exposes it through a GraphQL API, allowing clients to easily access vehicle make information.

### Features

- **XML Parsing**: Retrieves vehicle makes and their types from the NHTSA API in XML format.
- **Data Transformation**: Converts XML data into a well-defined JSON structure for easy consumption.
- **Data Persistence**: Saves the transformed data in a MongoDB database for persistent storage.
- **GraphQL API**: Provides a flexible API for querying vehicle makes and types, supporting pagination.
- **Cron Job**: Automatically updates the data by fetching and transforming the XML periodically.

### Prerequisites

To run the service, ensure you have the following installed:

- Docker
- Docker Compose
- Node

### Getting Started

1. **Clone the Repository**: Download the project files from the repository.

2. **Navigate to the Project Directory**: Open a terminal and change to the directory containing the `docker-compose.yml` file.

   ```bash
   cd path/to/your/project/dev
   ```

3. **Build and Run the Application**: Use Docker Compose to build and start the services.

   ```bash
   docker-compose up --build
   ```

4. **Access the API**: Once the services are running, you can access the GraphQL API at `http://localhost:3000/graphql`. Use a GraphQL client or a web interface to query the available endpoints.

### GraphQL API

The API provides the following queries:

1.  **`makes(page: Int, limit: Int)`**:

    - **Description**: Retrieves a paginated list of vehicle makes.
    - **Arguments**:
      - `page` (optional, default: 1): The page number for pagination.
      - `limit` (optional, default: 10): The number of items per page.
    - **Response**: Returns an object containing:

      - `items`: An array of vehicle makes.
      - `totalCount`: The total number of vehicle makes available.
      - `totalPages`: The total number of pages based on the limit.
      - `currentPage`: The current page number.
      - `Example`:

        ```graphql
        query {
          makes(page: 2, limit: 19) {
            items {
              makeId
              makeName
              vehicleTypes {
                typeId
                typeName
              }
            }
            totalCount
            totalPages
            currentPage
          }
        }
        ```

2.  **`make(id: String)`**:

    - **Description**: Retrieves details of a specific vehicle make by its ID.
    - **Arguments**:
      - `id`: The unique identifier of the vehicle make.
    - **Response**: Returns the details of the specified vehicle make or `null` if not found.
    - `Example`:

      ```graphql
      query {
        make(id: "12488") {
          makeId
          makeName
          vehicleTypes {
            typeId
            typeName
          }
        }
      }
      ```

### Running Tests

To run tests for the service, first install the node modules:

```bash
npm install
```

After you can execute the tests:

```bash
npm run test
```

This command will run all the defined tests in the application.

### Conclusion

This service provides a robust solution for transforming XML data into JSON, making it accessible via a GraphQL API.
