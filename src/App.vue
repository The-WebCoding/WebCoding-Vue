<template>
  <div id="app">
    <!-- 開始列 -->
    <div
      id="LeftSidebar"
      class="ts wide left big sidebar inverted vertical menu"
    >
      <router-link class="item" to="/">
        <i class="image icon" />首頁
      </router-link>
      <a class="item"> <i class="users icon" />合作專區 </a>
      <div class="item">
        <i class="code icon" />程式範例Example
        <div class="ts label">{{ menu.length }}</div>
        <div class="menu">
          <router-link
            v-for="(item, index) in menu"
            :key="index"
            :to="item.to"
            class="item"
          >
            <i :class="item.iconClass" />{{ item.title }}
          </router-link>
        </div>
      </div>
      <a href="https://p.opay.tw/RP3fB" class="item">
        <i class="money icon" />贊助
        <div class="ts label">
          <img
            src="https://payment.opay.tw/Content/themes/WebStyle201404/images/allpay.png"
            style="width: 80px;"
          />
        </div>
      </a>
      <!-- <a id="filePage" class="item" @click="Call('file')">
        <i class="file icon" />文件
        <div class="ts label" data-tooltip="未上傳Folder檔！">
          <i class="frown icon" />X
        </div>
      </a> -->
      <!-- <a id="cmdPage" class="item" @click="Call('cmd')">
        <i class="terminal icon" />命令提示字元
      </a> -->
    </div>
    <!-- 主頁面 -->
    <!-- 2020.03.16
      恩，大家好，我是益誠  叫我 伊藤誠 就可以了。
      這個頁面主要用於給我實驗各種稀奇古怪的功能及網頁放置效果
      
      基本上你會看到這段文字，代表你在做些什麼壞壞的事情，
      不過也不用費心研究啦，這些都是 純JS + HTML 寫的
      程式碼都放在那，註解也寫給你們了，
      真的看不懂或沒註解的，有留FB的崁入聊天窗(點左上角 命令提示字元) 可以直接問我
      如果還是看不懂，代表你真的沒這塊資質都不到，
      還是不要投入這條不歸路比較好 QAQ)

      PS：這頁面UI是取自 Tocas UI 2.3.3
      研究所期間至少四五個案子都是靠他的套件解決的
      非常實用方便
      總之
      
      一個Case又平安的過去了，
      感謝 洨洨安 (https://github.com/teacat/tocas) 的努力
      也期待他的Tocas 3 -->

    <div class="pusher">
      <button
        class="ts massive icon button"
        onclick="ts('.left.inverted.sidebar').sidebar('toggle')"
      >
        <i id="play-icon" class="list icon" />
      </button>
      <!-- 網頁內容擺置於此 -->

      <!-- 主要容器 -->
      <div class="ts narrow container" id="filePage" style="display: none;">
        <!-- 頂部麵包屑路徑 -->
        <div class="ts breadcrumb">
          <a href="#!" class="section">我的雲端</a>
          <div class="divider">/</div>
          <a href="#!" class="section">文件</a>
          <div class="divider">/</div>
          <div class="active section"><i class="folder icon" /> 備份</div>
        </div>
        <!-- / 頂部麵包屑路徑 -->

        <br /><br />

        <!-- 主要網格系統 -->
        <div class="ts grid">
          <!-- 左側欄位 -->
          <div class="eleven wide column" style="width: 100%;">
            <!-- 檔案目錄清單 -->
            <div class="ts selection segmented list">
              <a href="#!" class="item">
                <i class="file outline icon" />示範.html
              </a>
              <a href="#!" class="active item">
                <i class="file image outline icon" />示範.png
              </a>
              <a href="#!" class="item">
                <i class="file text outline icon" />示範.txt
              </a>
              <a href="#!" class="item">
                <i class="file outline icon" />示範.file
              </a>
              <a href="#!" class="item">..</a>
            </div>
            <!-- / 檔案目錄清單 -->
          </div>
          <!-- / 左側欄位 -->

          <!-- 右側欄位 -->
          <div
            class="five wide column"
            style="position: absolute;right: 0px;display: none;"
          >
            <div class="ts card">
              <!-- 檔案圖示 -->
              <div class="secondary very padded extra content">
                <div class="ts icon header">
                  <i class="file image outline icon" />
                </div>
              </div>
              <!-- / 檔案圖示 -->

              <!-- 檔名內容 -->
              <div class="extra content">
                <div class="header">示範.png</div>
              </div>
              <!-- / 檔名內容 -->

              <!-- 檔案大綱 -->
              <div class="extra content">
                <div class="ts list">
                  <!-- 最後開啟時間 -->
                  <div class="item">
                    <i class="time icon" />
                    <div class="content">
                      <div class="header">最後開啟時間</div>
                      <div class="description">2020-03-16 12:36PM</div>
                    </div>
                  </div>
                  <!-- / 最後開啟時間 -->

                  <!-- 檔案擁有者 -->
                  <div class="item">
                    <i class="user icon" />
                    <div class="content">
                      <div class="header">檔案擁有者</div>
                      <div class="description">Fred</div>
                    </div>
                  </div>
                  <!-- / 檔案擁有者 -->

                  <!-- 檔案驗證碼 -->
                  <div class="item">
                    <i class="lock icon" />
                    <div class="content">
                      <div class="header">檔案驗證碼</div>
                      <div class="description">nope</div>
                    </div>
                  </div>
                  <!-- / 檔案驗證碼 -->
                </div>
              </div>
              <!-- / 檔案大綱 -->
            </div>
          </div>
          <!-- / 右側欄位 -->
        </div>
        <!-- / 主要網格系統 -->
      </div>
      <!-- / 主要容器 -->
      <!-- 單個募資專案 -->

      <div class="ts card" style="left: 12.5%;width: 75%;">
        <router-view />

        <div class="secondary extra content">
          <!-- 募資進度條 -->
          <div class="ts small active negative progress">
            <div class="bar" style="width: 5%"></div>
          </div>
          <!-- / 募資進度條 -->

          <!-- 資訊網格 -->
          <div class="ts three column grid">
            <div class="column">
              <strong>0%</strong>
              <br />
              維持免費服務需要經費，才能運行，<br />
              使用後若有滿足你的需求，<br />希望能給予贊助或購買貼圖支持我們。
            </div>
            <div class="column">
              <strong>$0</strong>
              <br />
              當前經費(公開)
            </div>
            <div class="column" style="text-align: right;">
              <strong>
                <a href="https://p.opay.tw/RP3fB">
                  <img
                    src="https://payment.opay.tw/Content/themes/WebStyle201404/images/allpay.png"
                    style="width: 120px;"
                  />
                </a>
              </strong>
              <br />
              <strong>
                <a href="https://store.line.me/stickershop/product/11150287">
                  <img src="@/assets/Line.png" style="width: 125px;" />
                </a>
              </strong>
              <br />Email : at8011741@gmail.com <br />
              <strong>
                <a href="PrivacyPolicy.html">中文隱私權條款</a>
              </strong>
            </div>
          </div>
          <!-- / 資訊網格 -->
        </div>
      </div>
      <!-- / 單個募資專案 -->
    </div>
    <!-- cmd視窗 -->
    <cmd-frame />
  </div>
</template>

<script>
import CmdFrame from "@/components/CmdFrame.vue";

export default {
  components: {
    CmdFrame
  },
  data() {
    return {
      menu: [
        {
          to: "/Ascii",
          iconClass: "icon font",
          title: "Ascii"
        },
        {
          to: "/QRcode",
          iconClass: "icon qrcode",
          title: "QRcode"
        },
        // {
        //   to: "/Expert",
        //   iconClass: "icon user",
        //   title: "Expert"
        // },
        // {
        //   to: "/Live2D",
        //   iconClass: "icon user",
        //   title: "Live2D"
        // }
      ],
    };
  },
};
</script>
