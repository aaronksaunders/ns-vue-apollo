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

  },
  data: function() {
    return {
      user: {}
    };
  },
  methods: {
    login() {
      try {
        this.$apollo.mutate({
          mutation: LoginQuery,
          variables: { email: "aaron1", password: "password" },
          update: (store, { data: { signinUser } }) => {
            console.log("in update: signinUser " + JSON.stringify({ ...signinUser }, 2));
            console.log("in update: store", store);
            this.user = {
              email: signinUser.user.email,
              token: signinUser.token
            };
          },
          optimisticResponse: {}
        });
      } catch (e) {
        console.error("mutation error", e);
      }
    }
  },
  computed: {
    // here we filter the results of the query to get
    // just a subset of the elements
    filteredRates() {
      console.log("in filteredRates");
      if (!this.rates) return [];
      return this.rates.rates.filter(
        ({ currency }) =>
          currency !== this.currentCurrency &&
          ["USD", "BTC", "LTC", "EUR", "JPY", "ETH"].indexOf(currency) !== -1
      );
    }
  },
  apollo: {
    // variable to hold results of query..
    // rates: {
    //   // see the actual query below...
    //   query: ExchangeRateQuery,
    //   // this is how we pass in the specific parameter
    //   // for the query to use
    //   variables() {
    //     return { currency: "BTC" };
    //   },
    //   error(error) {
    //     console.log("apollo", error);
    //   },
    //   // this is where we track the loading state which
    //   // is used to determine if we should show indicator
    //   // of not
    //   watchLoading(isLoading, countModifier) {
    //     // isLoading is a boolean
    //     // countModifier is either 1 or -1
    //     console.log(isLoading);
    //     this.isLoading = isLoading;
    //   }
    // }
  }
};
</script>

