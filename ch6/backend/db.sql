DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS catalog_items;

CREATE TABLE catalog_items (
  id INTEGER NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL
);

CREATE TABLE bookings (
  id INTEGER NOT NULL PRIMARY KEY,
  catalog_item_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  FOREIGN KEY (catalog_item_id) REFERENCES catalog_items(id)
);

