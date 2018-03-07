<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Styling"/>

    <StackLayout>
      <!-- <Button class="btn btn-primary" @tap="$router.push('/counter')">Counter</Button>
      <Button class="btn btn-primary" @tap="$router.push('/hello')">Hello World</Button> -->
      <Button class="btn btn-primary" @tap="login()">Login GraphQL</Button>
      <Label :text="user.email" style="width: 30%" />
    </StackLayout>

  </Page>
</template>

<script>
import Vue from "nativescript-vue";
import gql from "graphql-tag";

const LoginQuery = gql`
  mutation signinUser($email: String!, $password: String!) {
    signinUser(email: { email: $email, password: $password }) {
      token
      user {
        email
      }
    }
  }
`;

export default {
  created: function() {
    debugger;
  },
  data: function() {
    return {
      user: {}
    };
  },
  methods: {
    login() {
      try {
        this.$apollo
          .mutate({
            mutation: LoginQuery,
            variables: { email: "aaron1", password: "password" }
          })
          .then(({ data: { signinUser } }) => {
            debugger;
            console.log(signinUser);
            this.user = {
              email: signinUser.user.email,
              token: signinUser.token
            };
          });
      } catch (e) {
        console.error("mutation error", e);
      }
    }
  }
};
</script>

