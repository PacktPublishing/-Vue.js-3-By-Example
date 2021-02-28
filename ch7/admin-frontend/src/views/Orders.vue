<template>
  <TopBar />
  <h1>Orders</h1>
  <div v-for="order of orders" :key="order.order_id">
    <h2>Order ID: {{ order.order_id }}</h2>
    <p>Name: {{ order.name }}</p>
    <p>Address: {{ order.address }}</p>
    <p>Phone: {{ order.phone }}</p>
    <div>
      <h3>Ordered Items</h3>
      <div
        v-for="orderedItems of order.ordered_items"
        :key="orderedItems.shop_item_id"
      >
        <h4>Name: {{ orderedItems.name }}</h4>
        <p>Description: {{ orderedItems.description }}</p>
        <p>Price: ${{ orderedItems.price }}</p>
      </div>
    </div>
    <p>
      <b>Total: ${{ calcTotal(order.ordered_items) }}</b>
    </p>
    <button type="button" @click="deleteOrder(order)">Delete Order</button>
  </div>
</template>

<script>
import { GraphQLClient, gql } from "graphql-request";
import TopBar from '@/components/TopBar'
const APIURL = "http://localhost:3000/graphql";
const graphQLClient = new GraphQLClient(APIURL, {
  headers: {
    authorization: localStorage.getItem("token"),
  },
});

export default {
  name: "Orders",
  components: {
    TopBar
  },
  data() {
    return {
      orders: [],
    };
  },
  beforeMount() {
    this.getOrders();
  },
  methods: {
    calcTotal(orderedItems) {
      return orderedItems.map((o) => o.price).reduce((a, b) => a + b, 0);
    },
    async getOrders() {
      const query = gql`
        {
          getOrders {
            order_id
            name
            address
            phone
            ordered_items {
              shop_item_id
              name
              description
              image_url
              price
            }
          }
        }
      `;
      const { getOrders: data } = await graphQLClient.request(query);
      this.orders = data;
    },
    async deleteOrder({ order_id: orderId }) {
      const mutation = gql`
        mutation removeOrder($orderId: Int) {
          removeOrder(orderId: $orderId) {
            status
          }
        }
      `;
      const variables = {
        orderId,
      };
      await graphQLClient.request(mutation, variables);
      await this.getOrders();
    },
  },
};
</script>
