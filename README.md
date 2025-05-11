# 原神官方論壇自動簽到 Firefox Extension

## Credit and License

All right and credits goes to original author @[oddstab](https://github.com/JackyHe398/genshin-impact-auto-sign/commits?author=oddstab) for the part he/she finished. I reserve all right for the part i modified at the moment. Please contact me if you need to use the code or republish.

## To Original author

Thank you for writing such a useful tool. I've uploaded the extension to firefox developement centre. Unfortunately, I cannot contact you though any methods before doing so. I didn't publish it to addons.mozilla.org because of that. If you think that is inappropriate or for any reason, please contact me to delete it.

感謝您的組件。抱歉在沒看到有附上使用協議和在得到您的答復之前，將其上載至firefox平臺，真的沒辦法以任何手段聯係到您。如果您覺得有任何不妥，或者任何原因，請不吝聯係我刪除和禁用上載版本。

## What's different from main fork

Since I am switching from google chrome to mozilla firefox, I would like to migrate this extension. But time selector is missing in firefox so I use flatpickr instead.

## 功能說明

自動簽到，省去每天還要簽到的麻煩每日00:05自動開啟簽到網頁並簽到（可自由調整簽到時間）

> ![圖片](https://github.com/user-attachments/assets/7dba2f6e-68db-4fbe-849f-f4cf6c18aa39)
> 
> 請記得先登入！



## 安裝 Installation

### 應用商店 from Store (Chrome)

- [Chrome Web Store](https://chrome.google.com/webstore/detail/ddncbaijlknflhdcijpdblfapjgfnohb?authuser=0&hl=zh-TW) This is the original version from @[oddstab](https://github.com/JackyHe398/genshin-impact-auto-sign/commits?author=oddstab).

### GitHub發佈頁 From GitHub release (Firefox)

1. Download the *.xpi* file
2. Go to [about:addons](about:addons) from firefox
3. Click *Setting* then *Install Add-on From File...*
4. Select the file you download

### 自己 clone 下來安裝

1. clone下來後執行

```
yarn install
yarn dist
```

2. chrome 右上角的設定按鈕下找到更多工具，打開 `擴充功能`，並把開發人員模式打開
3. 選擇 `載入未封裝項目`並選取剛剛的dist資料夾

原神官方論壇 https://act.hoyolab.com/ys/event/signin-sea-v3/index.html?act_id=e202102251931481
