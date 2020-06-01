<template>
  <div class="ts grid">
    <div class="row">
      <div class="column">
        <slot name="img"></slot>
        <!-- js/06-example_resized.png -->
      </div>
      <div class="nine wide column">
        <!-- 標題 -->
        <div class="ts huge dividing header">{{ title }}</div>
        <!-- / 標題 -->
        <div ref="content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import marked from "marked/src/marked";

export default {
  name: "DescriptionFrame",
  props: ["title", "content"],
  mounted() {
    this.$refs["content"].innerHTML = marked(this.$props["content"]);
  }
};
</script>
