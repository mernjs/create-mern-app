<template>
<div>
  <Header/>
  <div class="flex-center position-ref full-height">
    <div class="content">
      <div class="title m-b-md">New Password</div>
    </div>
  </div>
 <Footer/>
</div>
</template>

<script>

import Header from "../../components/parts/Header";
import Footer from "../../components/parts/Footer";

export default {
  name: "ForgotPasswordReset",
  components: {
    Header,
    Footer
  }
};
</script>