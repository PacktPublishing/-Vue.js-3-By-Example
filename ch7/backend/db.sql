DROP TABLE IF EXISTS order_shop_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS shop_items;

CREATE TABLE shop_items (
  shop_item_id INTEGER NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMBER NOT NULL,
  image_url TEXT NOT NULL
);

CREATE TABLE orders (
  order_id INTEGER NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT NOT NULL
);

CREATE TABLE order_shop_items (
  order_id INTEGER NOT NULL,
  shop_item_id INTEGER NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(order_id)
  FOREIGN KEY (shop_item_id) REFERENCES shop_items(shop_item_id)
);

