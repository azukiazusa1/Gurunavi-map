<template>
  <div>
    <gmap-marker
    :position="position"
    :icon="iconOptions"
    :animation=4
    :clickable=true
    @mouseover="toggleInfoWindow"
    @mouseout="toggleInfoWindow"
    @click="openDetails"
    >
    </gmap-marker>
    <gmap-info-window
      :options="infoOptions"
      :position="position"
      :opened="infoWinOpen"
    >
      <div v-html="infoContent"></div>
    </gmap-info-window>
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
      },
      infoContent: null
    }
  },
  mounted() {
    this.setPosition();
  },
  methods: {
    setPosition: function() {
      // 緯度経度の無いデータがあるので除外
      if (this.rest.latitude && this.rest.longitude) {
        // 文字列を数字に
        this.position.lat = parseFloat(this.rest.latitude);
        this.position.lng = parseFloat(this.rest.longitude);
      }
    },
    toggleInfoWindow: function () {
      location.href = `#${this.rest.id}`;
      this.infoWinOpen = !this.infoWinOpen
      this.infoContent = this.getInfoWindowContent();

    },
    getInfoWindowContent() {
      return (`
        <div><h2>${this.rest.name}</h2></div>
        <div>${this.rest.category}</div>
        <div>住所：${this.rest.address}</div>
        <div>電話番号：${this.rest.tel}</div>
        <div>営業時間：${this.rest.opentime}</div>
        <div>定休日：${this.rest.holiday}</div>
        <div>${this.rest.pr.pr_short}</div>
        <img src="${this.rest.image_url.shop_image1}"/>
        <img src="${this.rest.image_url.shop_image2}"/>
        <a href="${this.rest.url}" target="_blank">詳細</a>
      `
      )
    },
    openDetails() {
      open(this.rest.url, '_blank');
    }
  }
}
</script>