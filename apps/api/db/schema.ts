import { boolean, integer, pgTable, text } from "drizzle-orm/pg-core";

export const address = pgTable("address", {
  id: text("id").primaryKey().notNull(),
  street: text("street").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zip: text("zip").notNull(),
  country: text("country").notNull(),
  userId: text("user_id")
    .references(() => user.id)
    .notNull(),
});

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  hashedPassword: text("hashed_password").notNull(),
  fullName: text("full_name").notNull(),
  stripeAccountId: text("stripe_account_id").notNull().default(""),
});

export const product = pgTable("product", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  price: integer("price").notNull(),
  description: text("description"),
  image: text("image"),
  stock: integer("stock").notNull(),
  creator: text("creator")
    .references(() => user.id)
    .notNull(),
});

export const cart = pgTable("cart", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .references(() => user.id)
    .notNull(),
  active: boolean("active").notNull().default(true),
});

export const cartItem = pgTable("cart_item", {
  id: text("id").primaryKey(),
  cartId: text("cart_id")
    .references(() => cart.id)
    .notNull(),
  productId: text("product_id")
    .references(() => product.id)
    .notNull(),
  quantity: text("quantity").notNull(),
});

export const order = pgTable("order", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .references(() => user.id)
    .notNull(),
  addressId: text("address_id")
    .references(() => address.id)
    .notNull(),
  total: integer("total").notNull(),
  paymentStatus: text("payment_status").notNull().default("not_paid"),
});
