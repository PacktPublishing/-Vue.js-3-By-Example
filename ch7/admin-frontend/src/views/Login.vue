<template>
  <h1>Admin Login</h1>
  <Form :validationSchema="schema" @submit="submitForm">
    <div>
      <label for="name">Username</label>
      <br />
      <Field name="username" type="text" placeholder="Username" />
      <ErrorMessage name="username" />
    </div>
    <br />
    <div>
      <label for="password">Password</label>
      <br />
      <Field name="password" placeholder="Password" type="password" />
      <ErrorMessage name="password" />
    </div>
    <input type="submit" />
  </Form>
</template>

<script>
import { GraphQLClient, gql } from "graphql-request";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

const APIURL = "http://localhost:3000/graphql";
const graphQLClient = new GraphQLClient(APIURL, {
  headers: {
    authorization: "",
  },
});
const schema = yup.object({
  name: yup.string().required(),
  password: yup.string().required(),
});

export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      schema,
    };
  },
  methods: {
    async submitForm({ username, password }) {
      const mutation = gql`
        mutation login($username: String, $password: String) {
          login(user: { username: $username, password: $password }) {
            token
          }
        }
      `;
      const variables = {
        username,
        password,
      };
      try {
        const {
          login: { token },
        } = await graphQLClient.request(mutation, variables);
        localStorage.setItem("token", token);
        this.$router.push('/orders')
      } catch (error) {
        alert("Login failed");
      }
    },
  },
};
</script>
