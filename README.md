# Genshin Impact auto daily sign-in Browser Extension

[繁體中文 traditional chinese](README.zht.md)

## Breif Description

Automatically sign-in to gain reward everyday at 00:05(time adjustable!).

> ![圖片](https://github.com/user-attachments/assets/7dba2f6e-68db-4fbe-849f-f4cf6c18aa39)
>
> Please login before use.

## Installation

### From Web Store

- [Firefox ADD-ONS](https://addons.mozilla.org/en-US/firefox/addon/genshin-impact-auto-sign/)
- [Chrome Web Store](https://chromewebstore.google.com/detail/%E5%8E%9F%E7%A5%9E%E5%AE%98%E6%96%B9%E8%AB%96%E5%A3%87%E8%87%AA%E5%8B%95%E7%B0%BD%E5%88%B0/hkegjdokofaelllkpnkkigpfncgfnlbf)

### From GitHub Releases

#### FireFox:

1. Download the *.xpi* file
2. Open [about:addons](about:addons)
3. Click the gear icon, then select *Install Add-on From File...*
4. Choose the downloaded `.xpi` file.

#### Chrome:

1. Download the *.crx* file
2. Open [chrome://extensions](chrome://extensions/)
3. Drag and drop the `.crx` file onto the page.

### Build from source code(Not recommended)

\*Without proper config and/or browser version, both Chrome and Firefox do not support packets not signed officially.

1. Clone or Download compressed file from github
2. In base directory, execute:

   ```
   yarn install
   yarn dist
   ```

3. Load the extension manually:
   3a. **Chrome**: Click `Load an unpacked extension` and select the `dist` directory.  
   3b. **Firefox**: select `dist/zip/dist.zip`.

Genshin impact official Sign-in page: https://act.hoyolab.com/ys/event/signin-sea-v3/index.html?act_id=e202102251931481

## What's Different from the Main Fork

In short, this version is compatible with both Mozilla Firefox and Google Chrome.

Notable differences and improvements:

- **Manifest Compatibility**: `manifest.json` supports cross-browser standard.
- **Updated Dependencies**: Replaced outdated packages.
- **Time Selector**: Rewrite time selector with [flatpickr](https://flatpickr.js.org/) for better compatibility.
- **Performance Optimization**: Replaced per-minute checks with a more efficient alarm-based system.
- **Reliability Enhancements**: Multiple-check handling was added to reduce the risk of missing scheduled actions.
- **Reduced Disruption**: Automatically closes sign-in page in second to minize user interruption.

## License

This project is based on software originally developed by oddstab (MIT License).

Modifications and additional code © 2025 JackyHe398.

The project as a whole is distributed under the MIT License.

## Acknowledgements

Special thanks to [@oddstab](https://github.com/oddstab/) for developing the [original software](https://github.com/oddstab/genshin-impact-auto-sign) and relicensing it under MIT License, which made further development possible.
