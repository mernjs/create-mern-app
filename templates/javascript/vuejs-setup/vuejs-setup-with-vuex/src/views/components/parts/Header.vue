<template>
   <nav class="navbar navbar-default navbar-fixed-top">
  <div class="container-fluid">
    <div class="navbar-header">
      <router-link to="/" class="navbar-brand">VueJs</router-link>
    </div>
    <ul class="nav navbar-nav">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/about-us">About Us</router-link></li>
      <li><router-link to="/contact-us">Contact Us</router-link></li>
    </ul>
    <ul class="nav navbar-nav navbar-right">
      <li><router-link to="/signup"><span class="glyphicon glyphicon-user"></span> Sign Up</router-link></li>
      <li><router-link to="/login"><span class="glyphicon glyphicon-log-in"></span> Login</router-link></li>
      <li class="dropdown">
        <a class="dropdown-toggle" data-toggle="dropdown" href="#">My Account
        <span class="caret"></span></a>
        <ul class="dropdown-menu">
          <li><router-link to="/my-profile">My Profile</router-link></li>
          <li><router-link to="/change-password">Change Password</router-link></li>
          <li><router-link to="/">Logout</router-link></li>
        </ul>
      </li>
    </ul>
  </div>
</nav>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    title: String
  }
}
</script>