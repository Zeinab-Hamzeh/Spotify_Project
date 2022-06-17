<template>
  <div class="d-flex justify-content-center align-items-center h-100">
    <button class="btn" id="loginBtn" @click="authorize()">
      Login
      <span><img :src="require('@/assets/logo.png')" alt="Spotify Logo" /></span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  setup(){
    var client_id = '2ea8d1a8dbf5430fbdd9e2445b158081';
    var redirect_uri = 'http://localhost:8081/search'
    var url = 'https://accounts.spotify.com/authorize';
    var scope = 'user-read-private user-read-email';
    
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    
    var authorize = () => {
      window.location = url;
    };

    return { client_id, redirect_uri, url, scope, authorize}
  }
}
</script>

<style>
#loginBtn{
  width: 30%;
  border: 1px solid #B1B1B1;
}

#loginBtn:hover{
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

#loginBtn>span>img{
  float:right;
  width: 30px;
  height: 30px;
}

</style>
