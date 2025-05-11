# 原神官方論壇自動簽到 Firefox Extension

## What's different from main fork

Since I am switching from google chrome to mozilla firefox, I would like to migrate this extension. But the time selector is missing in firefox and I am not able to write a new one(I've tried but none of them are working), so:

1. I removed the popup part from the *manifest.json*. After, time select function will not be available.
2. Base on that, a lot of the files will not be used. I only included *background.ts, content.ts, icon.png*(respecting original author), and *manifest.json* for smaller file size.

## Credit and License

All right and credits goes to original author @[oddstab](https://github.com/JackyHe398/genshin-impact-auto-sign/commits?author=oddstab). I reserve no right including the part I change. You may only use the code I change without asking the original author if you need to use commercially.

## To Original author

Thank you for writing such a useful tool. I've tried to upload to firefox developement centre to sign. Unfortunately, I cannot contact you though any methods before doing so. I didn't publish it to addons.mozilla.org because of that. If you think that is inappropriate or for any reason, please contact me to delete it.

感謝您的組件。抱歉在沒看到有附上使用協議和在得到您的答復之前，將其提交至firefox平臺簽名，真的沒辦法以任何手段聯係到您。如果您覺得有任何不妥，或者任何原因，請不吝聯係我刪除和禁用已簽名的版本。

## 功能說明

自動簽到，省去每天還要簽到的麻煩每日00:05自動開啟簽到網頁並簽到（可自由調整簽到時間）

> 請記得先登入！
> ![image](https://user-images.githubusercontent.com/44750772/185805452-c57e9930-99a4-4dad-be1b-bf84f706b44a.png)

### Note from editor

: This function is only available in Chrome version. I removed it from Firefox version because firefox do not provide time selector. The default signing time is still 0005 everyday, you may not change it because the program will sign automatically even if you miss the signing time, so I'll say it's good enough.

If you really need to change it, you may download the source code and edit *background.ts* before compiling. I may add it later, but i am not familiar with js, I will be happy to accept pull request if anyone would like to:).

## 安裝 Installation

### 應用商店 from Store (Chrome)

- [Chrome Web Store](https://chrome.google.com/webstore/detail/ddncbaijlknflhdcijpdblfapjgfnohb?authuser=0&hl=zh-TW) This is the original version from @[oddstab](https://github.com/JackyHe398/genshin-impact-auto-sign/commits?author=oddstab).

### GitHub發佈頁 From GitHub release (Firefox)

1. Download the xmi file
2. Go to [about:addons](about:addons) from firefox
3. Click *Setting* then *Install Add-on From File...*
4. Select the file you download

### 自己 clone 下來安裝

1. clone下來後執行

```
yarn add -D webpack webpack-cli
yarn dist
```

2. chrome 右上角的設定按鈕下找到更多工具，打開 `擴充功能`，並把開發人員模式打開
3. 選擇 `載入未封裝項目`並選取剛剛的dist資料夾

原神官方論壇 https://act.hoyolab.com/ys/event/signin-sea-v3/index.html?act_id=e202102251931481
