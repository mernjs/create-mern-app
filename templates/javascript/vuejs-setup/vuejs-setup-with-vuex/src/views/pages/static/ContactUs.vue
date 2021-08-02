<template>
<div>
  <Header/>
  <div class="flex-center position-ref full-height">
    <div style="padding: 100px;">
      <div class="col-md-6">
        <div class="panel panel-default">
              <div class="panel-heading"><b>Contact Us</b></div>
              <div class="panel-body">
                  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero quibusdam consequatur voluptatem, rem aliquid architecto, vel dicta inventore dolore, molestias facere commodi eum. Quasi saepe blanditiis labore voluptatem error atque!</p>
                  <p><b>XXXXXX</b></p>
                  <p>xxxxx, xxxxx, xxxxx xxxxx xxxx xxxxx</p>
                  <p><b>XXXXXX</b></p>
                  <p>xxxxx, xxxxx, xxxxx xxxxx xxxx xxxxx</p>
                  <p><b>XXXXXX</b></p>
                  <p>xxxxx, xxxxx, xxxxx xxxxx xxxx xxxxx</p>
                  <p><b>XXXXXX</b></p>
                  <p>xxxxx, xxxxx, xxxxx xxxxx xxxx xxxxx</p>
              </div>
        </div>
      </div>
      <div class="col-md-6">
          <div class="panel panel-default">
          <div class="panel-heading"><b>Query</b></div>
          <div class="panel-body">
            <form @submit.prevent="contactUs">
              <div class="form-group">
                <label for="name">Name</label>
                <input
                  id="name"
                  required
                  v-model="name"
                  type="name"
                  placeholder="Name"
                  class="form-control"
                />
              </div>

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
                <label for="message">Message</label>
                <textarea
                  id="message"
                  required
                  v-model="message"
                  type="message"
                  placeholder="message"
                  class="form-control"
                />
              </div>
              <br />
              <div class="form-group">
                <button class="btn btn-default btn-block" type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
 <Footer/>
</div>
</template>

<script>

import Header from "../../components/parts/Header";
import Footer from "../../components/parts/Footer";

export default {
  name: "ContactUs",
  components: {
    Header,
    Footer
  },

  data() {
    return {
      email: "",
      message: "",
      name:""
    };
  },

  methods: {

    contactUs() {
      let data = {
        name: this.name,
        email: this.email,
        message: this.message
      };
      console.log("login = data", data);
    }
    
  }

};
</script>