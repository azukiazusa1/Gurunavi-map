<template>
  <div
    :id="rest.id"
    class="rest"
  >
    <div><h2 @mouseover="panTo" class="rest-name">{{rest.name}}</h2></div>
        <div>{{rest.category}}</div>
        <div>住所：{{rest.address}}</div>
        <div>電話番号：{{rest.tel}}</div>
        <div>営業時間：{{rest.opentime}}</div>
        <div>定休日：{{rest.holiday}}</div>
        <img v-bind:src="rest.image_url.shop_image1"/>
        <img v-bind:src="rest.image_url.shop_image2"/>
        <a v-bind:href="rest.url" target="_blank">詳細</a>
  </div>
</template>
<script>

export default {
  props: ['rest'],
  data: function() {
    return {
      position: {
        lat: 0,
        lng: 0
      },
      iconOptions: {
        url: require('../assets/marker.svg'),
        size: {width: 60, height: 90, f: 'px', b: 'px',},
        scaledSize: {width: 30, height: 45, f: 'px', b: 'px',},
      },
      infoWinOpen: false,
      infoOptions: {
        pixelOffset: {
          width: -20,
          height: -80
        },
        disableAutoPan: true,
      },
      infoContent: null
    }
  },
  methods: {
    panTo: function() {
      this.$emit('panTo', parseFloat(this.rest.latitude), parseFloat(this.rest.longitude));
    }
  }
}
</script>
<style scoped>
.rest {
  border: 1px ridge;
}
.rest-name {
  cursor: pointer;
  border-bottom: 1px solid;
}
</style>