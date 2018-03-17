# Swagger Demo in Nodejs

### Getting Started

Requirements:
  - node
  - docker

1. From the root folder `swagger-node/`, run `npm run setup`
2. Start database and server with `npm run start`
3. Open `http://localhost:3000/api-docs` to see the Swagger-UI interface. `/api/v1` is the API endpoint, You can interact with it via any API service such as Postman

![npm start](/assets/npm_start.gif)

### Editor

If you would like to edit the `swagger-node/api/swagger.yml` file, you can either:

1. Copy and paste the file into the [online editor](https://editor.swagger.io/)
2. Run a local dockerized version of the editor `docker run -d -p 3001:8080 swaggerapi/swagger-editor` and opening the editor at `localhost:3001`
