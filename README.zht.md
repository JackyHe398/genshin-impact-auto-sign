# 原神官方論壇自動簽到

[英文 English](README.zht.md)

## 功能說明

自動簽到，省去每天還要簽到的麻煩每日00:05自動開啟簽到網頁並簽到（可自由調整簽到時間）

> ![圖片](https://github.com/user-attachments/assets/7dba2f6e-68db-4fbe-849f-f4cf6c18aa39)
>
> 請記得先登入！

## 安裝

### 應用商店

- [Firefox ADD-ONS](https://addons.mozilla.org/en-US/firefox/addon/genshin-impact-auto-sign/)
- [Chrome Web Store](https://chromewebstore.google.com/detail/%E5%8E%9F%E7%A5%9E%E5%AE%98%E6%96%B9%E8%AB%96%E5%A3%87%E8%87%AA%E5%8B%95%E7%B0%BD%E5%88%B0/hkegjdokofaelllkpnkkigpfncgfnlbf)

### GitHub發佈頁

#### FireFox:

1. 下載 *.xpi* 文件
2. 開啓 [about:addons](about:addons)
3. 選擇右上角 *設定* 然後 *從檔案安裝附加元件*
4. 選取已下載的文件

#### Chrome:

1. 下載 *.crx* 文件
2. 開啓 [chrome://extensions](chrome://extensions/)
3. 將已下載的文件拉至頁面

### 從源代碼編譯(不建議)

\*Google Chrome 和 Mozilla Firefox 的發行版都無法在沒有相應設置下自行安裝未經官方簽名的addon/extension

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

## 與原版本有何不同？

長話短説，firefox 和 Google Chrome 這個版本都兼容。

顯著的差異和改進：

- **改善相容性**: 整個extension 跟從兩個瀏覽器的標準編寫。
- **更新依賴**: 為兼容性和安全性，更新了幾個版本的依賴。
- **重寫時間選擇器**: 使用 [flatpickr](https://flatpickr.js.org/) 重構時間選擇方面的代碼，也是爲了兼容性。
- **性能優化**: 將每分鐘檢查換成按需檢查，減少不必要性能開銷。
- **增强可靠性**: 簡單來説就是不會漏簽到。

## 授權
\* 授權部分以英文爲準
此 Project 基於原本由 oddstab 開發的軟件（MIT 協議）。

© 2025 JackyHe398 修改與附加代碼。

完整 Project 以 MIT 協議分發。

This project is based on software originally developed by oddstab (MIT License).

Modifications and additional code © 2025 JackyHe398.

The project as a whole is distributed under the MIT License.

## 致謝
特別鳴謝[@oddstab](https://github.com/oddstab/)開發的[原版軟件](https://github.com/oddstab/genshin-impact-auto-sign)並在多年之後仍然肯開放協議，讓後續開發成爲可能。

Special thanks to [@oddstab](https://github.com/oddstab/) for developing the [original software](https://github.com/oddstab/genshin-impact-auto-sign) and relicensing it under MIT License, which made further development possible.
