<template>
  <div class="ts modals dimmer" id="dimmer" style="background: transparent;">
    <dialog
      id="optionModal"
      class="ts fullscreen modal"
      style="height: -webkit-fill-available;"
    >
      <div
        class="header"
        style="text-align:left;font-family: Consolas ;font-size: 16px;background-color: rgb(242, 242, 242);"
      >
        命令提示字元
        <div style="width: 65%;display: -webkit-inline-box;"></div>
        <div
          class="ts fluid stackable buttons"
          style="position:absolute;right:0px;width: 14%;font-size: 11px;top: 7px;"
        >
          <button class="ts deny button" @click="$emit('Call', 'Main')">
            ─
          </button>
          <button
            class="ts negative button"
            @click="$emit('Call', 'Main', 'clear')"
          >
            X
          </button>
        </div>
      </div>
      <div
        class="content"
        style="font-family: Consolas ;font-size: 18px;color: rgb(242, 242, 242);background-color: black;height: 95.5%;overflow: auto;"
      >
        <div id="history">
          <div>WebCoding Windows [版本 1.0.00000.001]</div>
          <br />
          <div>(c) 2020 W.C Corporation. 著作權所有，並保留一切權力。</div>
          <br />
        </div>
        <div>
          <div id="url" style="display: inline;">C:/Users></div>
          <input
            id="textInput"
            type="text"
            placeholder="▌"
            style="color: white;width: 83%;"
            @keydown="CheckInput(event)"
          />
          <input
            type="file"
            id="fileToUpload"
            style="display:none"
            @change="$emit('filecheck', this)"
          />
        </div>

        <!-- jscii-master：圖像辨識/轉換 -->
        <div id="AsciiSet" class="section clearfix"></div>
        <!-- ////////////////////////// -->
      </div>
    </dialog>
    <div class="ts bottom right snackbar">
      <div class="content"></div>
      <i class="spinner loading icon" />
    </div>
    <!-- FB messenger：客服諮詢 -->
    <div id="fb-root"></div>
  </div>
</template>

<script>
export default {
  name: "CmdFrame",
  methods: {
    // CheckInput(event) {
    //   let char = event.which || event.keyCode;
    //   if (char == 13) {
    //     /// 判定是否為Enter
    //     if (document.getElementById("picSet").innerHTML != "") {
    //       document.getElementById("picSet").innerHTML = "";
    //     }
    //     if (document.getElementById("videoSet").innerHTML != "") {
    //       document.getElementById("videoSet").innerHTML = "";
    //     }
    //     if (document.getElementById("textInput").value == "upload") {
    //       ////執行上傳檔案
    //       document.getElementById("fileToUpload").click();
    //     } else if (document.getElementById("textInput").value == "ls") {
    //       ////顯示可cd項目(讀取excel檔案)
    //       this.CdResetCheck();
    //       this.HistoryUpdate(
    //         "<div>C:/Users" + this.NowFolderAllUrl + "> ls",
    //         "cmd"
    //       );
    //       for (let FDi = 0; FDi < this.FolderData.length; FDi++) {
    //         if (this.FolderData[FDi]["Data_Name"] == this.NowFolderUrl) {
    //           for (let NFi = 0; NFi < this.NowFolderList.length; NFi++) {
    //             for (
    //               let minFDi = 0;
    //               minFDi < this.FolderData.length;
    //               minFDi++
    //             ) {
    //               if (
    //                 this.FolderData[minFDi]["Data_No"] ==
    //                 this.NowFolderList[NFi]
    //               ) {
    //                 this.HistoryUpdate(
    //                   this.FolderData[minFDi]["Data_Name"],
    //                   "cmd"
    //                 );
    //                 document.getElementById("textInput").value = "";
    //               }
    //             }
    //           }
    //         }
    //       }
    //       this.HistoryUpdate("", "cmd");
    //     } else if (document.getElementById("textInput").value == "cd") {
    //       ////20200314 cd 重置路徑
    //       this.NowFolderNum = 0; ///主目錄編號
    //       this.CdResetCheck();
    //     } else if (
    //       document.getElementById("textInput").value.indexOf("cd ") != -1
    //     ) {
    //       ////進入資料夾(進入選項)
    //       // let CheckUrl = false;
    //       for (let FDi = 0; FDi < this.FolderData.length; FDi++) {
    //         if (
    //           this.FolderData[FDi]["Data_Name"] ==
    //             document.getElementById("textInput").value.split("cd ")[1] &&
    //           this.NowFolderList.indexOf(this.FolderData[FDi]["Data_No"] != -1)
    //         ) {
    //           this.NowFolderNum = FDi;
    //           this.NowFolderUrl = document
    //             .getElementById("textInput")
    //             .value.split("cd ")[1];
    //           this.HistoryUpdate(
    //             "<div>C:/Users" +
    //               this.NowFolderAllUrl +
    //               "> cd " +
    //               document.getElementById("textInput").value.split("cd ")[1],
    //             "cmd"
    //           );
    //           document.getElementById("textInput").value = "";
    //           this.NowFolderAllUrl =
    //             this.NowFolderAllUrl + "/" + this.NowFolderUrl;
    //           this.NowFolderTrueUrl =
    //             this.NowFolderTrueUrl + "/" + this.FolderData[FDi]["Data_No"];
    //           this.NowFolderList = JSON.parse(
    //             this.FolderData[FDi]["Sub_route"]
    //           );
    //           // CheckUrl = true;
    //           document.getElementById("url").innerHTML =
    //             "C:/Users" + this.NowFolderAllUrl + ">";
    //         }
    //       }
    //     } else if (document.getElementById("textInput").value == "help") {
    //       ////進入資料夾(進入選項)
    //       this.HistoryUpdate(
    //         "要了解特定命令的詳細資訊，請輸入 HELP 命令名稱<br>CD_________顯示或變更目前目錄的名稱。<br>INFO_______顯示開發者資訊。<br>DATE_______顯示或設定日期。<br>HELP_______為 WebCoding命令提供說明資訊。<br>LS_________顯示目前目錄所有內容的名稱。<br>Node_______執行特定程式/AI或內容。(開發中)<br>upload_______上傳Folder檔案。(位置../WebCoding/Folder/20200307.xlsx)<br>",
    //         "cmd"
    //       );
    //     } else {
    //       if (
    //         document.getElementById("textInput").value.indexOf("cd ") == -1 &&
    //         document
    //           .getElementById("textInput")
    //           .value.replace(/^\s+(.*?)\s+$/g, "$1") != ""
    //       ) {
    //         ////檢測輸入路徑(非讀取圖片檔案)(開發中)
    //         window.ts(".snackbar").snackbar({
    //           content: "讀取中..."
    //         });
    //         //alert(document.getElementById('textInput').value.indexOf('cd '));
    //         for (let FDi = 0; FDi < this.FolderData.length; FDi++) {
    //           if (
    //             this.FolderData[FDi]["Data_Name"] ==
    //               document.getElementById("textInput").value &&
    //             this.NowFolderList.indexOf(this.FolderData[FDi]["Data_No"]) !=
    //               -1
    //           ) {
    //             document.getElementById("textInput").value = "";
    //             let arg1 =
    //               "./Folder/" +
    //               this.NowFolderTrueUrl +
    //               "/" +
    //               this.FolderData[FDi]["Data_No"] +
    //               "." +
    //               document.getElementById("textInput").value.split(".")[1];
    //             let arg2 = "AsciiSet";
    //             let arg3 = "QrcodeSet";
    //             this.$emit("JsciiCovert", arg1, arg2, arg3);
    //           }
    //         }
    //       }
    //     }
    //   } else if (char == 38 || char == 40) {
    //     this.historyListView(char);
    //   }
    // },
    // filecheck(FileURL) {
    //   window.ts(".snackbar").snackbar({
    //     content: "讀取中..."
    //   });
    //   this.nowLoadFileType = FileURL.value.split(".").pop();
    //   //////////////////20200317新增 QRcode / Ascii 判斷
    //   let typeMain = document.getElementById("type_choice").value;
    //   if (typeMain == "ascii") {
    //     ////////Ascii生成
    //     this.HistoryUpdate(
    //       "<div>C:/Users" +
    //         this.NowFolderAllUrl +
    //         ">  upload " +
    //         window.URL.createObjectURL(FileURL.files[0]) +
    //         "</div>",
    //       "cmd"
    //     );
    //     ///alert(FileURL.value.split('.').pop());
    //     if (FileURL.value.split(".").pop() == "xlsx") {
    //       ////檢測檔案格式(Folder文件)
    //       this.ExcelRead(FileURL, "Folder");
    //     } else {
    //       document.getElementById("QrcodeSet").innerHTML = "";
    //       JsciiCovert(FileURL, "QrcodeSet", "Ascii_image", true); ///直接使用QRCode產生的img元件  ///20200420 新增判定(自動修正生成位置)  注意!該功能會改變Ascii Art顯示位置
    //     }
    //   } else if (typeMain == "qrcode") {
    //     //// 20200317 qrcode生成
    //     let returnText = QRcodeCovert(
    //       document.getElementById("QRcode_Url").value,
    //       FileURL,
    //       "QrcodeSet"
    //     );
    //     if (returnText == "error : element has not found") {
    //       alert("錯誤:找不到該物件。");
    //     } else if (returnText == "error : img has not support") {
    //       alert("錯誤:尚未支援該格式。");
    //     } else if (returnText == "error : Url has not found") {
    //       alert("錯誤:網址錯誤。");
    //     }
    //   }
    //   ///////////////////////
    //   document.getElementById("textInput").value = "";
    //   this.windowsUpdate(
    //     document.getElementById("history").innerHTML.split("<br>").length - 3,
    //     "cmd"
    //   );
    // }
  }
};
</script>
