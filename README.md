# 原神官方論壇自動簽到 Firefox Extension

## 功能說明

自動簽到，省去每天還要簽到的麻煩每日00:05自動開啟簽到網頁並簽到（可自由調整簽到時間）

> ![圖片](https://github.com/user-attachments/assets/7dba2f6e-68db-4fbe-849f-f4cf6c18aa39)
> 
> 請記得先登入！

## 安裝 Installation

### 應用商店 Store

- [Firefox ADD-ONS](https://addons.mozilla.org/en-US/firefox/addon/genshin-impact-auto-sign/)
- [Chrome Web Store](https://chromewebstore.google.com/detail/%E5%8E%9F%E7%A5%9E%E5%AE%98%E6%96%B9%E8%AB%96%E5%A3%87%E8%87%AA%E5%8B%95%E7%B0%BD%E5%88%B0/hkegjdokofaelllkpnkkigpfncgfnlbf)

### GitHub發佈頁 From GitHub release

#### FireFox:

1. Download the *.xpi* file
2. Go to [about:addons](about:addons)
3. Click *Setting* then *Install Add-on From File...*
4. Select the file you download

#### Chrome:

1. Download the *.crx* file
2. Go to [chrome://extensions](chrome://extensions/)
3. Drag the file to the page

### 從源代碼編譯(不建議)

\*Mozilla Firefox 無法自行安裝未經官方簽名的addon，除非使用dev版本並開啓相對應的權限，但極度不建議。

1. clone 或者 從github頁面下載壓縮包
2. 執行:

    ```
    yarn install
    yarn dist
    ```

. chrome 右上角的設定按鈕下找到更多工具，打開 `擴充功能`，並把開發人員模式打開
3. 選擇 `載入未封裝項目`並選取剛剛的dist資料夾
   - 3a. Firefox 需要選擇“dist/zip/dist.zip”

原神官方論壇 https://act.hoyolab.com/ys/event/signin-sea-v3/index.html?act_id=e202102251931481

## What's Different from the Main Fork

In short, this version is compatible with both Mozilla Firefox and Google Chrome.

Notable differences and improvements:

- **Manifest compatibility**: The `manifest.json` supports both browsers, following cross-browser extension standards.
- **Updated dependencies**: Some packages have been replaced with newer versions for improved compatibility.
- **Time selector**: The original lacked a built-in time selector, so I rewrote that part using [flatpickr](https://flatpickr.js.org/).
- **Performance optimization**: The previous per-minute checking logic has been replaced with a more efficient alarm-based approach.
- **Reliability enhancements**: Multiple-check handling was added to reduce the risk of missing scheduled actions.

## License

This project is based on software originally developed by oddstab (MIT License).

Modifications and additional code © 2025 JackyHe398.

The project as a whole is distributed under the MIT License.

## Acknowledgements

Special thanks to @oddstab for developing the original software and relicensing it under MIT License, which made further development possible.

