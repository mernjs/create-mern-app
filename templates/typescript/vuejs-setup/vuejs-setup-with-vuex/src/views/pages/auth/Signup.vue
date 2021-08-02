<template>
  <div>
    <Header />
    <div class="flex-center position-ref full-height">
       <div class="panel panel-default" style="width: 500px;">
          <div class="panel-heading"><b>Signup</b></div>
          <div class="panel-body">
            <form @submit.prevent="register">
              <div class="form-group">
              <label for="name">Name</label>
                <input id="name" type="text" v-model="name" class="form-control"/>
              </div>

              <div class="form-group">
              <label for="email">E-Mail Address</label>
                <input id="email" type="email" v-model="email" class="form-control"/>
              </div>

              <div class="form-group">
              <label for="password">Password</label>
                <input id="password" type="password" v-model="password" class="form-control"/>
              </div>

              <div class="form-group">
              <label for="password-confirm">Confirm Password</label>
                <input id="password-confirm" type="password" v-model="password_confirmation" class="form-control"/>
              </div>
              
              <br />
              <div class="form-group">
                <button class="btn btn-default btn-block" type="submit">Signup</button>
              </div>
            </form>
          </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "../../components/parts/Header";
import Footer from "../../components/parts/Footer";

export default {
  name: "Signup",
  components: {
    Header,
    Footer
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    };
  },

  methods: {
    register() {
      let data = {
        name: this.name,
        email: this.email,
        password: this.password
      };
      console.log("data => ", data);
    }
  }
};
</script>