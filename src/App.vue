<template>
  <div id="app">
    <div id="search">
      フリーワード検索<input type="text" name="aaa">
      もっと細かい検索
    </div>
    <div class="split">
      <div class="split-item split-left">
        <rest-index
          v-for="(rest, index) in restaurants"
         :key="index"
         v-bind:rest="rest"
         @panTo="panTo"
         />
      </div>
      <div id="map" class="split-item split-right">
        <GmapMap
          ref="mapRef"
          :center="{lat:35.658034, lng:139.701636}"
          :zoom="15"
          :options="mapOptions"
          style="width: 100%; height: 100%"
          @idle="place()"
        >

        <GmapCluster :maxZoom="clusterZoom">
        <map-marker
         v-for="(rest, index) in restaurants"
         :key="index"
         v-bind:rest="rest"
        >
        </map-marker>
      </GmapCluster>
        </GmapMap>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import MapMarker from "./components/MapMarker"
import RestIndex from "./components/RestIndex"

export default {
  name: 'app',
  data: function() {
    return {
      restaurants: [],
      params: {
        keyid: process.env.VUE_APP_GURUBAVI_API_KEY,
        latitude: 35.658034,
        longitude: 139.701636,
        hit_per_page: 100
      },
      clusterZoom: 18,
      mapOptions: {
        gestureHandling: "greedy"
      }
    }
  },
  methods: {
    getRestaurants: async function() {
      try {
        const result = await axios.get(this.$url, { params: this.params });
        const restaurants = result.data.rest
          .filter(item => {
            return (!this.restaurants.some(v => item.id === v.id) && result.data.rest.some(v => item.id === v.id))
          })
          this.restaurants = this.restaurants.concat(restaurants);
      } catch(e) {
        console.error(e);
      }
    },
    place: function() {
      const center = this.$refs.mapRef.$mapObject.getCenter();
      this.params.latitude = center.lat();
      this.params.longitude = center.lng();
      this.getRestaurants();
    },
    panTo: function(lat, lng) {
      this.$refs.mapRef.panTo({lat: lat, lng: lng});
    }
  },

  components: {
    MapMarker,
    RestIndex
  },
}
</script>

<style>
#search {
  position: fixed;
  background: #0e8fa1;
  color: #fff;
  top: 0;
  left: 30%;
  margin: 0;
  padding: 10px;
  width: 100%;
  height: 70px;
}
.split{
    display: table;
    width: 100%;
}
.split-item{
    display: table-cell;
}
.split-right{
    position: relative;
    height: 100%;
    position: fixed;
    width: 70%;
    margin-top: 80px
}
.split-left{
    width: 30%;
    padding-top: 100px
}
</style>
