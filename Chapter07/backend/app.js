const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors')
const shopItemResolvers = require('./resolvers/shopItems')
const orderResolvers = require('./resolvers/orders')
const authResolvers = require('./resolvers/auth')
const jwt = require('jsonwebtoken');

const schema = buildSchema(`
  type Response {
    status: String
  }

  type Token {
    token: String
  }

  input User {
    username: String
    password: String
    token: String
  }

  input ShopItem {
    shop_item_id: Int
    name: String
    description: String
    image_url: String
    price: Float
  }

  type ShopItemOutput {
    shop_item_id: Int
    name: String
    description: String
    image_url: String
    price: Float
  }

  type OrderOutput {
    order_id: Int
    name: String
    address: String
    phone: String
    ordered_items: [ShopItemOutput]
  }

  input Order {
    order_id: Int
    name: String
    address: String
    phone: String
    ordered_items: [ShopItem]
  }

  type Query {
    getShopItems: [ShopItemOutput],
    getOrders: [OrderOutput]
  }

  type Mutation {
    addShopItem(shopItem: ShopItem): Response
    removeShopItem(shopItemId: Int): Response
    addOrder(order: Order): Response
    removeOrder(orderId: Int): Response
    login(user: User): Token
  }
`);

const root = {
  ...shopItemResolvers,
  ...orderResolvers,
  ...authResolvers
}

const authMiddleware = (req, res, next) => {
  const { query = '' } = req.body
  const token = req.get('authorization')
  const requiresAuth = query.includes('removeOrder') ||
    query.includes('removeShopItem') ||
    query.includes('addShopItem')
  if (requiresAuth) {
    try {
      jwt.verify(token, 'secret');
      next()
      return
    } catch (error) {
      res.status(401).json({})
      return
    }
  }
  next();
}

const app = express();
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authMiddleware)
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
