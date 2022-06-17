<template>
    <div class="p-5">
        <p id="albumArtist">Artist Name</p>
        <p id="albumsTxt">Albums</p>

        <div v-if="showloader" class="d-flex justify-content-center mt-5" >
            <div class="spinner-border mb-5" role="status">
            <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <div class="row my-5 pb-5 gap-5 justify-content-around">
            <div 
            class="card h-100 col-12 col-sm-4 col-lg-3"
            v-for="(album, index) in albumsArray"
            :key="index"
            >
                <div v-if="album.images.length == 0" class="card-img-top card-bckg-img" :style="{'background-image': 'url(' + require('@/assets/nobackimg.jpg') + ')'}"></div>
                <div v-else class="card-img-top rounded-0 card-bckg-img" :style="{'background-image': 'url(' + album.images[0].url + ')'}"></div>
                <div class="d-flex flex-column flex-fill justify-content-between mt-3 mx-3">
                    <div class="mb-3">
                        <p class="artist-name mb-2">{{album.name}}</p>
                        <p class="artist-followers">{{album.artists[0].name}}</p>
                    </div>
                    <div class="alb-txt">
                        <p>{{album.release_date}}</p>
                        <p>{{album.total_tracks}} tracks</p>
                    </div>
                </div>
                <a class="card-footer" :href="`${album.external_urls.spotify}`">Preview on Spotify</a>

                
            </div>
        </div>
    </div>
</template>

<script>
import  {onMounted, ref} from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
export default {
  name: 'Albums',
  setup(){
    let albumsArray = ref([]);
    let albumId = ref('');
    let route = useRoute();
    let showloader = ref(false);
    onMounted(async ()=> {
      try{
        showloader.value = true
        albumId.value =  route.params.id;
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        let albumResponse = axios.get(`https://api.spotify.com/v1/artists/${albumId.value}/albums`);
        console.log("I got the albums");
        albumsArray.value = (await albumResponse).data.items;
        console.log(albumsArray.value);
        showloader.value = false
      
      }catch(e){
        console.log("We encountered the following error: ");
        console.log(e);
      }
    });

    return {albumsArray, albumId, route, showloader}
  }
}
</script>

<style>

#albumArtist{
    font-size: 25px;
    font-weight: 500;
    line-height: 15px;
}

#albumsTxt{
    font-size: 20px;
    line-height: 16px;
    color: #B1B1B1;
}

.alb-txt{
    font-size: 14px;
    line-height: 10px;
    color: #b1b1b1;
}

a{
    text-decoration: none;
    color: black;
}

a:hover{
    color: black;
}

.card{
    padding: 0;
    width: 250px;
    height: 425px !important;
    border-radius: 0;
}

.card-bckg-img{
    height: 200px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-bottom: 1px solid #b1b1b1;
}

.card-footer:hover{
    font-weight: 600;
}

</style>
