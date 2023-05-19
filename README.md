# 🌿 Kipos
Digital tool for Research management and "gardening".

Kipos is a web application built with React, utilizing the Ant Design system for a visually appealing and responsive user interface. The project incorporates GraphQL (Apollo), implementing a local link architecture where all external HTTP API calls are wrapped behind a local GraphQL schema. This approach provides a unified data layer for seamless integration and manipulation of data within the client-side application.

https://github.com/dmtrs/kipos/assets/290646/f67e4551-3342-45b3-bbad-1eeeb4301b2a

![Screenshot](./screenshot.png)

Kipos also aims to deliver an offline-first experience by leveraging local storage capabilities. By utilizing local storage, the application ensures that users can continue to interact with the app even in scenarios with limited or no internet connectivity. In addition, the project has future plans to integrate web3 tools, such as IPFS (InterPlanetary File System), for decentralized storage and synchronization of states, providing enhanced data resilience and availability.

## Getting Started

To clone and run the Kipos project locally, follow these steps:

```bash
# Clone the repository
git clone https://github.com/dmtsr/kipos.git

# Navigate to the project directory
cd kipos

# Install dependencies
yarn install

# Start the development server
yarn start
```

Ensure you have [Node.js](https://nodejs.org) and [Yarn](https://yarnpkg.com) installed on your machine before running the above commands. Once the development server starts, you can access the application at `http://localhost:3000` in your browser.

### Development

Note that the npx graphql-codegen command should be run whenever there are updates to your GraphQL schema (`*.graphql|gql` files). It generates TypeScript typings based on your schema, which helps with type safety and autocompletion when writing GraphQL queries in our code.
