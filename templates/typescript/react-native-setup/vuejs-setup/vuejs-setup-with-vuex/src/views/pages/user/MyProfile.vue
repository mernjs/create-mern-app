<template>
<div>
  <Header/>
  <div class="flex-center position-ref full-height">
    <div class="content">
      <div class="title m-b-md">My Profile</div>
    </div>
  </div>
 <Footer/>
</div>
</template>

<script>

import Header from "../../components/parts/Header";
import Footer from "../../components/parts/Footer";

export default {
  name: "Home",
  components: {
    Header,
    Footer
  }
};
</script>