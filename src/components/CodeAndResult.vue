<template>
  <div class="ts grid">
    <div class="two column row">
      <div class="column">
        <pre class="car" style="color: white;">{{ code }}</pre>
      </div>
      <div class="column">
        <div class="car" style="margin: 1rem 0; padding: .4rem;">
          <slot name="result"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CodeAndResult",
  props: ["code"]
};
</script>

<style scoped>
.car {
  height: 500px;
  background-color: black;
  overflow: auto;
}
</style>
