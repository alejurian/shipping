const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');

const graphQlSchemas = require('./graphql/schemas');
const graphQlResolvers = require('./graphql/resolvers');
const isAuth = require('./middlewares/isAuth');

const app = express();

mongoose.set('useCreateIndex', true);
mongoose.connect(
  'mongodb://localhost:27017/shipping', {
    useNewUrlParser: true,
  },
);
mongoose.connection.on(
  'error',
  // eslint-disable-next-line no-console
  console.error.bind(console, 'connection error:'),
);
// eslint-disable-next-line no-console
mongoose.connection.once('open', () => console.log('Connected DB.'));

app.use(bodyParser.json());

app.use(isAuth);

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchemas,
    rootValue: graphQlResolvers,
    graphiql: true,
  }),
);

const listener = app.listen(3001, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on http://localhost:${listener.address().port}`);
});
