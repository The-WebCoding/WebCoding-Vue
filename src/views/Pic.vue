<template>
  <div id="pic_Page" class="content">
    <div class="ts fitted primary segment">
      <div class="ts secondary horizontally fitted menu">
        <!-- 標題項目 -->
        <div class="header item">
          圖片/影片轉換工具
        </div>
        <div class="item">
          <!-- 轉寄按鈕 -->
          <select class="ts basic dropdown" v-model="typeChoice">
            <option value="qrcode">QR Code</option>
            <option value="ascii">Ascii 文字</option>
          </select>
          <!-- / 選擇 -->
        </div>
        <!-- / 標題項目 -->
        <!-- 上側選單 -->
        <div class="right menu">
          <div class="item">
            <!-- 上傳鈕 -->
            <div class="ts primary message" v-show="isQrcode">
              <label class="header">請輸入網址</label>
              <div class="ts fluid input">
                <input
                  id="QRcode_Url"
                  type="text"
                  value="https://akakaze.idv.tw/WebCoding/"
                />
              </div>
            </div>

            <div class="ts massive buttons">
              <label class="ts icon button" for="fileToUpload">
                <i class="right upload icon" />
              </label>
              <input
                id="fileToUpload"
                type="file"
                hidden
                @change="filecheck"
                :accept="inputAccept"
              />
            </div>
            <!-- / 上傳鈕  -->
          </div>
          <div class="item">
            <!-- 轉寄按鈕 -->
            <select class="ts basic dropdown" hidden>
              <option value="black">黑白</option>
              <option value="color">彩色(建議不使用影片)</option>
            </select>
            <!-- / 選擇 -->
          </div>
        </div>
        <!-- / 右側選單 -->
      </div>
    </div>
    <div
      class="ts center very padded secondary segment"
      style="z-index:90;width:280px;height:280px;position: absolute;right: 15px;overflow: hidden;"
    >
      <div class="section clearfix" v-show="!isRendered">
        <img
          src="@/assets/loading.gif"
          class="webcoding-loading"
          width="212px"
          height="212px"
        />
      </div>
      <div class="section clearfix" v-show="isAscii && isRendered">
        <img :src="jsciiImageSrc" width="212" />
      </div>
      <div class="section clearfix" v-show="isQrcode && isRendered">
        <vue-qr
          :bg-src="bgSrc"
          :gif-bg-src="gifBgSrc"
          :text="qrcodeUrl"
          :size="212"
          :correct-level="2"
          :dot-scale="0.5"
          :margin="5"
          :callback="vueQrCallback"
          ref="img"
        />
      </div>
    </div>
    <description-frame title="使用說明" :content="content">
      <img
        slot="img"
        class="ts image"
        style="transform: scaleX(-1);"
        src="@/assets/06-example_resized.png"
      />
    </description-frame>
    <pre class="webcoding-pre-shadow" ref="jsciiContainer"></pre>
  </div>
</template>

<script>
import Jscii from "@/plugin/jscii-export";
import html2canvas from "html2canvas";
import DescriptionFrame from "@/components/DescriptionFrame.vue";
import VueQr from "vue-qr";

import content from "!raw-loader!@/assets/pic/content.md";

const regexGif = /(?<=data:image\/)gif(?=;)/;
const imagePattern = /\.(jpe?g|png)$/i;

function readFile(file) {
  return new Promise((resolve, reject) => {
    let FR = new FileReader();
    FR.addEventListener("load", event => {
      resolve(event.target.result);
      FR = null;
    });
    FR.addEventListener("error", event => {
      reject(event);
      FR = null;
    });
    FR.readAsDataURL(file);
  });
}

export default {
  components: {
    DescriptionFrame,
    VueQr
  },
  data() {
    return {
      content: content,
      typeChoice: "qrcode",
      qrcodeUrl: "https://akakaze.idv.tw/WebCoding",
      qrcodeImageSrc: require("@/assets/06-example_resized.png"),
      jsciiImageSrc: require("@/assets/pic/06-ascii.png"),
      isRendered: false,
      isDownloadListShow: false
    };
  },
  computed: {
    inputAccept() {
      if (this.typeChoice === "qrcode") {
        return ".jpg,.jpeg,.png,.gif";
      }
      if (this.typeChoice === "ascii") {
        return ".jpg,.jpeg,.png";
      }
      return null;
    },
    isQrcode() {
      return this.typeChoice === "qrcode";
    },
    isAscii() {
      return this.typeChoice === "ascii";
    },
    gifBgSrc() {
      return regexGif.test(this.qrcodeImageSrc) ? this.qrcodeImageSrc : "";
    },
    bgSrc() {
      return regexGif.test(this.qrcodeImageSrc) ? "" : this.qrcodeImageSrc;
    }
  },
  methods: {
    filecheck(event) {
      if (event.target.files && event.target.files[0]) {
        this.isRendered = false;
        // this.isDownloadListShow = false;
        let file = event.target.files[0];
        if (this.isQrcode) {
          this.pushSrc2VueQr(file);
        }
        if (this.isAscii) {
          this.createJscii(file);
        }
        event.target.value = "";
      }
    },
    createJscii(file) {
      let el;
      let container = this.$refs["jsciiContainer"];
      let color = false;
      let fn;
      let src = URL.createObjectURL(file);

      let nodeName = container.nodeName;
      if (nodeName !== "PRE") {
        console.warn(
          `container是${nodeName}，不是<pre>類型的node，可能無法正確顯示結果。`
        );
      }

      if (imagePattern.test(file.name)) {
        this.inputType = "img";
        el = new Image();
        fn = this.prepareImgDownload;
      } else {
        throw new Error("不支援的檔案格式");
      }

      new Jscii({ el, container, color, fn });
      el.src = src;
      this.isOutputShow = true;
    },
    async pushSrc2VueQr(file) {
      try {
        this.qrcodeImageSrc = await readFile(file);
      } catch (error) {
        console.error(error);
      }
    },
    vueQrCallback(/*dataUrl*/) {
      this.isRendered = true;
      // this.dataUrl = dataUrl;
    },
    prepareImgDownload() {
      html2canvas(this.$refs["jsciiContainer"]).then(canvas => {
        this.jsciiImageSrc = canvas.toDataURL();
        this.isRendered = true;
        // this.dataUrl = canvas.toDataURL();
      });
    }
    // showDownloadList(event) {
    //   event.stopPropagation();
    //   event.preventDefault();
    //   this.$refs["downloadList"].moveTo(event.clientX, event.clientY);
    //   this.isDownloadListShow = true;
    // },
    // hideDownloadList() {
    //   this.isDownloadListShow = false;
    // }
  },
  mounted() {
    // this.$refs["img"].$el.addEventListener("click", this.showDownloadList);
  }
};
</script>

<style>
.webcoding-pre-shadow {
  width: fit-content;
  background-color: white;
  font: bold 9px/5px monospace;
  color: black;
  clear: left;
  position: fixed;
  top: 99999px;
  left: 99999px;
}
.webcoding-loading {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
