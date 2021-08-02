<template>
<div>
  <Header/>
  <div class="flex-center position-ref full-height">
    <div class="content">
      <div class="title m-b-md">VueJs</div>
      <div class="links">
        <a href="#">Docs</a>
        <a href="#">Blog</a>
        <a href="#">Videos</a>
        <a href="#">GitHub</a>
      </div>
    </div>
  </div>
 <Footer/>
</div>
</template>

<script>

import Header from "../components/parts/Header";
import Footer from "../components/parts/Footer";

export default {
  name: "Home",
  components: {
    Header,
    Footer
  },
   mounted() {
    this.$store.dispatch("user/fetchUsers");
  },
};
</script>