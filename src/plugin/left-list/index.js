////20200402獨立Function(20200319清單生成下載項目)
////20200418獨立js化
function Downloader() {
  ///20200320 新增直接狀態取消/顯示
  if (document.getElementById("DowloadList").style.display == "none") {
    document.getElementById("DowloadList").style.display = "";
  } else {
    document.getElementById("DowloadList").style.display = "none";
  }
}

function funDownload(type, name, Download_output) {
  ////20200319 部分檔案直接執行下載
  if (document.getElementById("type_choice")) {
    // let typeMain = document.getElementById("type_choice").value;
  }

  ///202020319 qrcode不提供帶音源/文字輸出
  if (type == "img") {
    let img = Download_output;
    let url = img.src.replace(
      /^data:image\/[^;]/,
      "data:application/octet-stream"
    );
    // 創建Element
    let eleLink = document.createElement("a");
    eleLink.download = "圖片." + name;
    eleLink.style.display = "none";
    // 指定該連結內容為qrcodeimage的src
    eleLink.href = url;
    // 執行點擊動作
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
  } else if (type == "file") {
    ////alert(Download_output.innerHTML);
    if (Download_output.innerHTML != "") {
      let eleLink = document.createElement("a");
      let txt =
        '<!DOCTYPE html><html lang="en-us">  <head></head><body><pre id="ascii-container-image" style="background-color: white; font-family: monospace; font-size: 10px; line-height: 5px; font-weight: bold; color: rgb(0, 0, 0); clear: left; width: fit-content;">' +
        Download_output.innerHTML +
        "<pre></body></html>";
      eleLink.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(txt)
      );
      eleLink.setAttribute("download", "Ascii." + name);
      eleLink.style.display = "none";
      document.body.appendChild(eleLink);
      // 執行點擊動作
      eleLink.click();
      // 然后移除
      document.body.removeChild(eleLink);
    }
  }
}

function downloadListCreat(FileType, CreatElement, imgElement) {
  ///console.log(CreatElement.id);
  CreatElement.oncontextmenu = function() {
    Downloader();
    return false;
  };
  let left_list = document.createElement("div");
  left_list.id = "DowloadList";
  left_list.classList = "ts vertical compact borderless menu";
  left_list.style.position = "absolute";
  left_list.style.top = "0px";
  left_list.style.width = "110%";
  left_list.style.display = "none";
  left_list.style.zIndex = "99";
  left_list.onmouseout = function() {
    if (document.getElementById("DowloadList")) {
      document.getElementById("DowloadList").style.display = "none";
    }
  };
  CreatElement.appendChild(left_list);

  if (FileType == "gif") {
    ////GIF用

    ////20200402下載清單子項目/右鍵觸發
    let left_list_gif = document.createElement("a");
    left_list_gif.classList = "item";
    left_list_gif.onclick = function() {
      funDownload("img", "gif", imgElement);
    };
    left_list_gif.style.display = "";
    left_list_gif.innerHTML = '<i class="picture icon"></i> 下載( gif )';
    left_list.appendChild(left_list_gif);
    let left_list_flipbook = document.createElement("a");
    left_list_flipbook.classList = "item";
    left_list_flipbook.id = "";
    left_list_flipbook.style.display = "";
    left_list_flipbook.onclick = function() {
      // pagechange("Gmail");
    };
    left_list_flipbook.innerHTML =
      '<i class="book icon"></i> 動畫機製作( Flipbook Maker )';
    left_list.appendChild(left_list_flipbook);
    ///設置移出後清單自動消失
    left_list_gif.onmousemove = function() {
      if (document.getElementById("DowloadList")) {
        document.getElementById("DowloadList").style.display = "";
      }
    };
    left_list_flipbook.onmousemove = function() {
      if (document.getElementById("DowloadList")) {
        document.getElementById("DowloadList").style.display = "";
      }
    };
    ///////
  } else if (
    FileType == "png" ||
    FileType == "jpg" ||
    FileType == "jpeg" ||
    FileType == "html"
  ) {
    ////其他格式用

    ////20200402下載清單子項目/右鍵觸發
    let left_list_jpg = document.createElement("a");
    left_list_jpg.classList = "item";
    left_list_jpg.onclick = function() {
      funDownload("img", "jpg", imgElement);
    };
    left_list_jpg.style.display = "";
    left_list_jpg.innerHTML = '<i class="picture icon"></i> 下載( jpg )';
    left_list.appendChild(left_list_jpg);
    let left_list_png = document.createElement("a");
    left_list_png.classList = "item";
    left_list_png.onclick = function() {
      funDownload("img", "png", imgElement);
    };
    left_list_png.style.display = "";
    left_list_png.innerHTML = '<i class="picture icon"></i> 下載( png )';
    left_list.appendChild(left_list_png);
    if (FileType == "html") {
      ////特殊模式  可將該區塊轉為圖片及程式碼進行下載(不含JS)，請謹慎運用
      let left_list_html = document.createElement("a");
      left_list_html.classList = "item";
      left_list_html.id = "choiceItem_txt";
      left_list_html.onclick = function() {
        // funDownload("file", "html", dom);
      };
      left_list_html.innerHTML = '<i class="book icon"></i> 下載( html )';
      left_list_html.onmousemove = function() {
        if (document.getElementById("DowloadList")) {
          document.getElementById("DowloadList").style.display = "";
        }
      };
      left_list.appendChild(left_list_html);
    }
    let left_list_flipbook = document.createElement("a");
    left_list_flipbook.classList = "item";
    left_list_flipbook.id = "";
    //left_list_flipbook.style.display ='none';
    ///left_list_flipbook.onclick = function(){pagechange('Gmail');};  ////2020.04.19 廠商要求變更(改為直接連結網址)
    left_list_flipbook.innerHTML =
      '<i class="book icon"></i> 實體化服務( Product Maker )<br>';
    left_list.appendChild(left_list_flipbook);
    let left_list_button = document.createElement("div");
    left_list_button.classList = "ts buttons";
    left_list_button.innerHTML =
      '<button id="EastareaAnime" class="ts primary button" >東域</button><button id="anenin123" class="ts inverted button">手工動畫機</button>';
    left_list_button.id = "";
    left_list_flipbook.appendChild(left_list_button);
    ///設置移出後清單自動消失
    left_list.onmouseout = function() {
      if (document.getElementById("DowloadList")) {
        document.getElementById("DowloadList").style.display = "none";
      }
    };
    left_list_jpg.onmousemove = function() {
      if (document.getElementById("DowloadList")) {
        document.getElementById("DowloadList").style.display = "";
      }
    };
    left_list_png.onmousemove = function() {
      if (document.getElementById("DowloadList")) {
        document.getElementById("DowloadList").style.display = "";
      }
    };
    left_list_flipbook.onmousemove = function() {
      if (document.getElementById("DowloadList")) {
        document.getElementById("DowloadList").style.display = "";
      }
    };
    ///////新增跳出連結
    document.getElementById("EastareaAnime").onclick = function() {
      window.open("https://www.facebook.com/EastareaAnime/");
    };
    document.getElementById("anenin123").onclick = function() {
      window.open("https://www.facebook.com/anenin123/");
    };
  }
}

export { Downloader, funDownload, downloadListCreat };
