<template>
  <div id="Ascii_Page" class="content">
    <div class="ts fitted primary segment">
      <div class="ts top attached small message">
        <span><i class="book icon" />Ascii 範例</span>
      </div>
      <code-and-result :code="code">
        <div slot="result">
          <div class="ts labeled button">
            <label for="ex_fileToUpload" class="ts button">
              <i class="unhide icon" />上傳
            </label>
            <input
              id="ex_fileToUpload"
              type="file"
              accept=".jpg,.jpeg,.png,.mp4,.ogg"
              hidden
              @change="filecheck"
            />
          </div>
          <div v-show="isOutputShow">
            <div id="Ascii_image" class="section clearfix">
              <p style="color: white;">輸入</p>
              <img ref="jsciiElImg" v-show="inputType === 'img'" />
              <video
                autoplay
                controls
                ref="jsciiElVideo"
                v-show="inputType === 'video'"
              ></video>
              <!-- @ended="renderGif" -->
              <!-- <video
                
                muted
                ref="jsciiElVideoShadow"
                v-show="inputType === 'video'"
                @canplay="renderShadow"
              ></video> -->
            </div>
            <div id="AsciiSet" class="section clearfix">
              <p style="color: white;">輸出</p>
              <pre
                class="webcoding-pre"
                @click="showDownloadList"
                ref="jsciiContainer"
              ></pre>
              <!-- <pre class="webcoding-pre-shadow" ref="jsciiContainerShadow"></pre> -->
            </div>
          </div>
          <download-list
            :data-url="dataUrl"
            v-click-outside="hideDownloadList"
            v-show="isDownloadListShow"
            ref="downloadList"
          >
            <div class="item" slot="header" v-show="inputType === 'video'">
              影片輸出目前只提供展示，下載功能敬請期待。
            </div>
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
      <description-frame title="Ascii轉換" :content="content">
        <img
          slot="img"
          class="ts image"
          style="width: 200px;height:200px;transform: scaleX(-1);"
          src="@/assets/06-example_resized.png"
        />
      </description-frame>
    </div>
  </div>
</template>

<script>
// import GIF from "gif.js/dist/gif";
import Jscii from "@/plugin/jscii-export";
import html2canvas from "html2canvas";
// import { CanvasToImage } from "@magic-words/canvas2image/src";
// import { downloadListCreat } from "@/plugin/left-list";
// import JsciiCovert from "@/plugin/ascii-worker";
import ClickOutside from "vue-click-outside";

import DescriptionFrame from "@/components/DescriptionFrame.vue";
import CodeAndResult from "@/components/CodeAndResult.vue";
import DownloadList from "@/components/DownloadList.vue";

import code from "!raw-loader!@/assets/Ascii/code.txt";
import content from "!raw-loader!@/assets/Ascii/content.md";

const imagePattern = /\.(jpe?g|png)$/i;
const videoPattern = /\.(mp4|ogg)$/i;

// function blob2base64(blob) {
//   return new Promise((resolve, reject) => {
//     let reader = new FileReader();
//     reader.addEventListener("load", () => {
//       resolve(reader.result);
//     });
//     reader.addEventListener("error", event => {
//       reject(event);
//     });
//     reader.readAsDataURL(blob);
//   });
// }

export default {
  components: {
    CodeAndResult,
    DescriptionFrame,
    DownloadList
  },
  directives: {
    ClickOutside
  },
  data() {
    return {
      code,
      content,
      isOutputShow: false,
      isDownloadListShow: false,
      inputType: "",
      dataUrl: ""
      // gif: "",
      // jsciiShadow: null,
      // gifEnd: false,
      // gifTimer: 0,
      // delay: 500
    };
  },
  methods: {
    filecheck(event) {
      this.dataUrl = "";

      let el;
      let container = this.$refs["jsciiContainer"];
      let color = false;
      let fn;
      let file = event.target.files[0];
      let src = URL.createObjectURL(file);

      let nodeName = container.nodeName;
      if (nodeName !== "PRE") {
        console.warn(
          `container是${nodeName}，不是<pre>類型的node，可能無法正確顯示結果。`
        );
      }

      if (imagePattern.test(file.name)) {
        this.inputType = "img";
        el = this.$refs["jsciiElImg"];
        fn = this.prepareImgDownload;
      } else if (videoPattern.test(file.name)) {
        this.inputType = "video";
        el = this.$refs["jsciiElVideo"];
        fn = null;
        // fn = this.prepareVideoDownload;
        // this.gif = new GIF();
        // this.gif.on("finished", blob => {
        //   console.log("this.gif.onfinished");
        //   blob2base64(blob).then(dataUrl => {
        //     this.dataUrl = dataUrl;
        //   });
        // });
        // this.videoShadowStart(src);
      } else {
        throw new Error("不支援的檔案格式");
      }

      new Jscii({ el, container, color, fn });
      el.src = src;
      this.isOutputShow = true;
    },
    prepareImgDownload() {
      html2canvas(this.$refs["jsciiContainer"]).then(canvas => {
        this.dataUrl = canvas.toDataURL();
      });
    },
    // videoShadowStart(src) {
    //   this.gif = new GIF();
    //   this.gif.on("finished", blob => {
    //     console.log("this.gif.onfinished");

    //     blob2base64(blob).then(dataUrl => {
    //       this.dataUrl = dataUrl;
    //     });
    //   });
    //   let el = this.$refs["jsciiElVideoShadow"];
    //   let container = this.$refs["jsciiContainerShadow"];
    //   let color = false;
    //   let fn = this.prepareVideoDownload;
    //   this.jsciiShadow = new Jscii({ el, container, color, fn });
    //   el.src = src;
    // },
    // prepareVideoDownload() {
    //   if (!this.gifEnd) {
    //     html2canvas(this.$refs["jsciiContainer"]).then(canvas => {
    //       let $v = this.$refs["jsciiElVideo"];
    //       if (this.gifTimer === 0 || this.gifTimer <= $v.currentTime) {
    //         this.gif.addFrame(canvas, { delay: this.delay });
    //         this.gifTimer += this.delay;
    //       }
    //       console.log("this.gif.addFrame. $v.currentTime:", $v.currentTime);

    //     });
    //   }
    //   else {
    //     console.log("OK");

    //   }
    // },
    // renderShadow() {
    //   if (!this.gifEnd) {
    //     html2canvas(this.$refs["jsciiContainerShadow"]).then(canvas => {

    //       let $v = this.$refs["jsciiElVideoShadow"];
    //       // this.jsciiShadow.pause();

    //       if ($v.currentTime + 0.5 < $v.duration) {
    //         this.gif.addFrame(canvas, { delay: 100 });
    //         $v.currentTime += 0.5;
    //       }
    //       else {
    //         $v.currentTime = $v.duration;
    //         console.log("$v.currentTime = $v.duration");
    //         this.gifEnd = true;
    //       }
    //       console.log($v.currentTime, canvas.width, canvas.height);
    //     });

    //   }
    //   // console.log("renderShadow()");
    //   // this.jsciiShadow.render();
    // },
    // renderGif() {
    //   console.log("renderGif()");
    //   this.gifEnd = true;
    //   this.gif.render();
    // },
    showDownloadList(event) {
      event.stopPropagation();
      event.preventDefault();
      this.$refs["downloadList"].moveTo(event.clientX, event.clientY);
      this.isDownloadListShow = true;
    },
    hideDownloadList() {
      this.isDownloadListShow = false;
    }
  }
};
</script>

<style>
.webcoding-pre {
  width: fit-content;
  background-color: white;
  font: bold 9px/5px monospace;
  color: black;
  clear: left;
  cursor: pointer;
  /* transform: scale(0.5) translate(-50%, -50%); */
}
.webcoding-pre > font {
  font-family: monospace !important;
}
</style>
