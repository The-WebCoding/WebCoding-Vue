<template>
  <div id="QRcode_Page" class="content">
    <div class="ts fitted primary segment">
      <div class="ts top attached small message">
        <span><i class="book icon" />QRcode 範例</span>
      </div>
      <code-and-result :code="code">
        <div slot="result">
          <div class="ts labeled button">
            <label class="ts button" for="ex_fileToUpload">
              <i class="unhide icon" />上傳
            </label>
            <input
              type="file"
              id="ex_fileToUpload"
              @change="fileCheck"
              hidden
            />
            <div class="ts underlined input">
              <input type="text" v-model.lazy="qrcodeUrl" />
            </div>
          </div>
          <div class="section clearfix">
            <img
              src="@/assets/loading.gif"
              class="webcoding-loading"
              width="212px"
              height="212px"
            />
            <vue-qr
              style="cursor: pointer"
              v-show="isRendered"
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
          <download-list
            :data-url="dataUrl"
            v-show="isDownloadListShow"
            v-click-outside="hideDownloadList"
            ref="downloadList"
          >
            <div class="item" slot="footer">
              <div><i class="book icon" /> 實體化服務( Product Maker )</div>
              <div class="ts buttons">
                <a
                  id="EastareaAnime"
                  href="https://www.facebook.com/EastareaAnime/"
                  class="ts primary button"
                >
                  東域
                </a>
                <a
                  id="anenin123"
                  href="https://www.facebook.com/anenin123/"
                  class="ts inverted button"
                >
                  手工動畫機
                </a>
              </div>
            </div>
          </download-list>
        </div>
      </code-and-result>
      <description-frame title="QRcode轉換" :content="content">
        <img
          slot="img"
          class="ts image"
          style="height: -webkit-fill-available; transform: scaleX(-1);"
          src="@/assets/06-example_resized.png"
        />
      </description-frame>
    </div>
  </div>
</template>

<script>
import CodeAndResult from "@/components/CodeAndResult.vue";
import DescriptionFrame from "@/components/DescriptionFrame.vue";
import DownloadList from "@/components/DownloadList.vue";
import VueQr from "vue-qr";
import ClickOutside from "vue-click-outside";

import code from "!raw-loader!@/assets/QRCode/code.txt";
import content from "!raw-loader!@/assets/QRCode/content.md";

const regexGif = /(?<=data:image\/)gif(?=;)/;
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
    CodeAndResult,
    DescriptionFrame,
    DownloadList,
    VueQr
  },
  directives: {
    ClickOutside
  },
  data() {
    return {
      code,
      content,
      qrcodeUrl: "https://akakaze.idv.tw/WebCoding",
      result: require("@/assets/06-example_resized.png"),
      isRendered: false,
      isDownloadListShow: false,
      dataUrl: ""
    };
  },
  computed: {
    gifBgSrc() {
      return regexGif.test(this.result) ? this.result : "";
    },
    bgSrc() {
      return regexGif.test(this.result) ? "" : this.result;
    }
  },
  methods: {
    fileCheck(event) {
      if (event.target.files && event.target.files[0]) {
        this.isRendered = false;
        this.isDownloadListShow = false;
        this.pushSrc2VueQr(event.target.files[0]);
      }
    },
    async pushSrc2VueQr(file) {
      try {
        this.result = await readFile(file);
      } catch (error) {
        console.error(error);
      }
    },
    vueQrCallback(dataUrl) {
      this.isRendered = true;
      this.dataUrl = dataUrl;
    },
    showDownloadList(event) {
      event.stopPropagation();
      event.preventDefault();
      this.$refs["downloadList"].moveTo(event.clientX, event.clientY);
      this.isDownloadListShow = true;
    },
    hideDownloadList() {
      this.isDownloadListShow = false;
    }
  },
  mounted() {
    this.$refs["img"].$el.addEventListener("click", this.showDownloadList);
  }
};
</script>
