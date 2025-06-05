import { SignHelper } from "./SignHelper";

const closeTabAndSetDate = async () => {
  //簽到後用目前時間覆蓋掉上次時間，防止重複開啟網頁
  await chrome.storage.sync.set({lastDate: new Date().toISOString()});
  chrome.runtime.sendMessage({ action: "close_after_check" });
}

const start = async () => {
  console.log("Sign-in Started");
  const helper = new SignHelper();
  let resignInfo = await helper.getInfo();
  
  if (resignInfo === null) {
    console.error("Failed to fetch sign info, reloading page...");
    window.location.reload();
  }else if (!resignInfo || resignInfo.signed) {
    console.log("Already signed, quitting...");
    await closeTabAndSetDate();
    return;
  }

  insertMask();
  let promiseSign = helper.sign();
  await helper.completeTask();
  let promiseResign = helper.resign();

  await Promise.all([promiseSign, promiseResign]);
  
  // resign if status of hoyolab shown not signed
  resignInfo = await helper.getInfo(); // check status again
  if (!resignInfo?.signed) {
    console.log("Sign-in Failed, retrying...");
    window.location.reload();
  }else {
    console.log("Sign-in Finished");
    removeMask();
    await closeTabAndSetDate();
    return;
  }
};

// region - mask 
const MASK_ID = "auto-sign-mask";

const insertMask = () => {
  const maskText = chrome.i18n.getMessage("signing_mask");
  const style = `width: 100%;
    height: 100%;
    background: #000000a3;
    position: absolute;
    top: 0;
    z-index: 9999;
    color: #fff;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 64px;
  `;

  let mask = document.createElement("div");
  mask.id = MASK_ID;
  mask.style.cssText = style;
  mask.innerHTML = maskText;

  document.body.appendChild(mask);
};

const removeMask = () => {
  const mask = document.getElementById(MASK_ID);
  if (mask) mask.remove();
};
// endregion

start();
