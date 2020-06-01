<template>
  <div
    class="ts vertical compact borderless menu webcoding-downloadlist"
    :style="styleObject"
    v-on="$listeners"
  >
    <slot name="header" />
    <a
      v-for="(item, index) in anchorList"
      :key="index"
      :href="item.href"
      :download="item.download"
      class="item"
    >
      <i class="picture icon" /> {{ item.name }}
    </a>
    <slot name="footer" />
  </div>
</template>

<script>
function getDataUrlCanvas(dataUrl) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.addEventListener("load", () => {
      canvas.setAttribute("width", image.width);
      canvas.setAttribute("height", image.height);
      ctx.drawImage(image, 0, 0);
      return resolve(canvas);
    });
    image.addEventListener("error", event => {
      return reject(event);
    });
    image.setAttribute("src", dataUrl);
  });
}

export default {
  name: "DownloadList",
  props: {
    dataUrl: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      styleObject: {
        position: "static",
        top: "0px",
        left: "0px"
      }
    };
  },
  asyncComputed: {
    anchorList: {
      async get() {
        let anchorList = [];
        if (/(?<=data:image\/)gif(?=;)/.test(this.dataUrl)) {
          anchorList.push({
            name: "下載( gif )",
            href: this.dataUrl,
            download: "圖片.gif"
          });
        } else if (/(?<=data:image\/)(jpe?g|png)(?=;)/.test(this.dataUrl)) {
          try {
            const canvas = await getDataUrlCanvas(this.dataUrl);
            anchorList.push(
              {
                name: "下載( jpg )",
                href: canvas.toDataURL("image/jpeg"),
                download: "圖片.jpg"
              },
              {
                name: "下載( png )",
                href: canvas.toDataURL("image/png"),
                download: "圖片.png"
              }
            );
          } catch (error) {
            alert(error.message);
          }
        }
        return anchorList;
      },
      watch: ["dataUrl"]
    }
  },
  methods: {
    moveTo(x, y) {
      this.styleObject = {
        position: "fixed",
        left: `${x}px`,
        top: `${y}px`
      };
    }
  }
};
</script>

<style scoped>
.webcoding-downloadlist {
  min-width: 100px;
  z-index: 99;
}
</style>
