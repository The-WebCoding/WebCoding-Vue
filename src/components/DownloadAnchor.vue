<template>
  <a :href="href" :download="download" class="item">
    <i class="picture icon" /> {{ name }}
  </a>
</template>

<script>
export default {
  name: "DownloadAnchor",
  props: {
    name: {
      type: String,
      require: true
    },
    href: {
      type: String,
      require: true
    },
    download: {
      type: String,
      require: true
    }
  }
};
</script>
