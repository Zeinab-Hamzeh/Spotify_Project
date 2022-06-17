<template>
  <div class="px-5">
    <div class="d-flex justify-content-center mt-5">
      <div class="input-group d-flex align-items-center" id="searchGroup">
        <input type="search" class="form-control text-center" placeholder="Search for an artist..." id="searchInput" v-model="searchedTerm" @change="searchforArtist()" />
        <i class="fa fa-search"></i>
      </div>
    </div>

    <div class="row my-5 pb-5 gap-5 justify-content-around">

      <div v-if="showloader" class="d-flex justify-content-center mt-5" >
        <div class="spinner-border mb-5" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <!-- one card -->
      <p v-if="artists.length == 0" class="text-center">No artists were found. Try another Search!</p>
      <div v-else
        class="card h-100 col-12 col-sm-4 col-lg-3"
        v-for="(artist, index) in artists"
        :key="index">
          <div v-if="artist.images.length == 0" class="card-bckg-img" :style="{'background-image': 'url(' + require('@/assets/nobackimg.jpg') + ')'}"></div>
          <div v-else class="card-bckg-img" :style="{'background-image': 'url(' + artist.images[0].url + ')'}"></div>
          <div class="d-flex flex-column flex-fill justify-content-between m-3">
            <div class="mb-3">
              <router-link :to="{ name: 'Albums', params: { id: artist.id} }">
                <p class="artist-name mb-2">{{artist.name}}</p>
              </router-link>
              <p class="artist-followers">{{artist.followers.total}} followers</p>
            </div>
            <p class="card-footer artist-rating mb-0">{{Array.from(new Array(Math.ceil((artist.popularity)/20)), () => "⭐").join('')}}</p>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import  {onMounted, ref} from 'vue';
import axios from 'axios';
export default {
  name: 'Search',
  setup(){

    let artists = ref([]);
    let searchedTerm = ref('');
    let showloader = ref(false);

    //retrieve the access token and the token type from the url
    let getAuthToken = (hash) => {
    let neededparams = hash.substring(1);
    let urlparams = neededparams.split("&");
    const splitparams = urlparams.reduce((accumulater, current) => {
      console.log(current);
      let [key, value] = current.split("=");
      accumulater[key] = value;
      return accumulater;
    }, {});

    return splitparams;

    };

    onMounted(async ()=> {
      try{
        if(window.location.hash){
          const {access_token} = getAuthToken(window.location.hash);
          localStorage.setItem("accessToken", access_token); 
          
          //set axios header (authorization)
          axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        }

        if(localStorage.getItem('artistsearched')){
          searchedTerm.value = localStorage.getItem('artistsearched');
          searchforArtist();
        }
      
        
      }catch(e){
        console.log("We encountered the following error: ");
        console.log(e);
      }
    });

    //search for artists
    async function searchforArtist(){
      artists.value = [];
      showloader.value = true
      console.log(searchedTerm.value);
      if (searchedTerm.value == ""){
        artists.value = [];
        showloader.value = false;
      }
      else{
        localStorage.setItem("artistsearched", searchedTerm.value);
        let response = axios.get(`https://api.spotify.com/v1/search?query=${searchedTerm.value}&type=artist`);
        artists.value = (await response).data;
        artists.value = artists.value.artists.items;
        showloader.value = false;
      }
    }




    return { getAuthToken, artists, searchedTerm, searchforArtist, showloader}

  }
}
</script>

<style>

#searchGroup{
  min-width: 150px;
  width: 33%;
  border: 1px solid #B1B1B1;
  border-radius: 0.25rem;
  padding: 6px;
  margin: 0;
}

#searchGroup>i{
  color: #B1B1B1;
  margin-right: 20px;
}

#searchInput{
  border: none;
  margin: 3px;
}

#searchInput:focus{
  box-shadow: none;
  border: none;
}

.card{
  padding: 0;
  width: 250px;
  height: 350px !important;
  border-radius: 0;
}

.card:hover{
  box-shadow: rgba(2, 2, 2, 0.411) 0px 2px 8px;
}

.card-bckg-img{
  height: 200px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-bottom: 1px solid #b1b1b1;
}

.artist-rating{
  background-color: white;
  border: none;
  padding: 0;
}

.artist-name{
  font-size: 20px;
  line-height: 20px;
  margin-bottom: 0;
}

.artist-followers{
  font-size: 16px;
  line-height: 16px;
  color: #b1b1b1;
}

a{
  text-decoration: none;
  color: black;
}

</style>
