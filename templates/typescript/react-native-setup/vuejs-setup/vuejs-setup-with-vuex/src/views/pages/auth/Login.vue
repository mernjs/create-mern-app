<template>
  <div>
    <Header />
    <div class="flex-center position-ref full-height">
        <div class="panel panel-default" style="width: 500px;">
          <div class="panel-heading"><b>Login</b></div>
          <div class="panel-body">
            <form @submit.prevent="login">
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  id="email"
                  required
                  v-model="email"
                  type="email"
                  placeholder="Name"
                  class="form-control"
                />
              </div>

              <div class="form-group">
                <label for="password">Password</label>
                <input
                  id="password"
                  required
                  v-model="password"
                  type="password"
                  placeholder="Password"
                  class="form-control"
                />
              </div>
              <br />
              <div class="form-group">
                <button class="btn btn-default btn-block" type="submit">Login</button>
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
  name: "Login",

  components: {
    Header,
    Footer
  },

  data() {
    return {
      email: "",
      password: ""
    };
  },

  methods: {

    login() {
      let data = {
        email: this.email,
        password: this.password
      };
      console.log("login = data", data);
    }
    
  }

};
</script>