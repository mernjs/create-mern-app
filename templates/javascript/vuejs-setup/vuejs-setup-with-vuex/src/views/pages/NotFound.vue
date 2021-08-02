<template>
  <div>
    <Header title="Page Not Header" />
    <p>Page Not Page</p>
    <router-link to="/">Back to home</router-link>
    <Footer title="Page Not Footer" />
  </div>
</template>

<script>
import Header from "../components/parts/Header";
import Footer from "../components/parts/Footer";

export default {
  name: "PageNotFound",
  components: {
    Header,
    Footer
  }
};
</script>