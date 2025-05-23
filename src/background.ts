import { getConfig } from "./configHelper";
import { checkSignCondition } from "./SignHelper";


function openSignInPage(){
    //開啟米哈遊的簽到頁面
    //這邊不需要做任何簽到動作，因為content.ts裡面已經設定只要開啟米哈遊網頁就會自動簽到了
    console.log("Opening sign-in page...");
    chrome.tabs.create({
      url: "https://act.hoyolab.com/ys/event/signin-sea-v3/index.html?act_id=e202102251931481",
      active: false, //開啟分頁時不會focus
    }
    , (tab) => {
      if (tab.id !== undefined) {
        // @ts-ignore
        chrome.storage.session.set({ [tab.id.toString()]: true });
      }
    });
}

// region - functions scheduling
function getNextRun(h: number, m: number) {
  const now = new Date();
  // construct the target alarm time
  const nextRun = new Date();
  nextRun.setHours(h, m, 0, 0);

  // if the time is already pasted, set the date to tomorrow
  if (now.getTime() > nextRun.getTime()) {
    nextRun.setDate(now.getDate() + 1);
  };

  return nextRun;
}


async function scheduleNext() {
  // create alarm once a day
  // get signTime
  let {signTime} = await getConfig(["signTime"]);

  let h = Number(signTime.hours);
  let m = Number(signTime.minutes);
  
  const nextrun = getNextRun(h, m);
  chrome.alarms.clear('dailySignIn', () => {
    chrome.alarms.create("dailySignIn", {when: nextrun.getTime()});
  });
  console.log(`Alarm set for ${nextrun.toLocaleDateString() + ' ' +nextrun.toLocaleTimeString()}`);

}
// endregion

// region - main and event listeners
async function performScheduledSign() {
  try {
    if(await checkSignCondition()){
      openSignInPage();
    }
    scheduleNext();
  } catch (err) {
    console.error("Sign or schedule failed:", err);
  }
}


chrome.runtime.onInstalled.addListener(({reason}) => {
  if (reason === "install") { // On a fresh install, run a catch-up
    console.log("==Fresh Install==");
    performScheduledSign();
  }
});

chrome.runtime.onStartup.addListener(() => {
  console.log("==Browser startup==");
  performScheduledSign();
});

chrome.runtime.onMessage.addListener((msg, sender, _sendResponse) => {
  if (msg.action === "performScheduledSign") {
    console.log("==SignTime changed==");
    performScheduledSign(); // No response needed
    // No `return true`
  }
});

chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name !== "dailySignIn") {return; }
    console.log("==Alarm triggered==");
    performScheduledSign();
});
// endregion

//region 
chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.action === "close_after_check") {
    if (sender.tab===undefined || sender.tab.id===undefined){
      return;
    }
    const tid = sender.tab.id;
    // @ts-ignore
    chrome.storage.session.get(tid.toString(), (result) => {
      if (result[tid]) {
        chrome.tabs.remove(tid);
        // @ts-ignore
        chrome.storage.session.remove(tid); // <--- clean up
      }
    });
  }
});

//endregion

// region - debugging 
(window as any).resetAlarm = function (){
    // check the time of the alarm
    // Since log in chrome.runtime will not show up in the console
    chrome.alarms.get("dailySignIn", alarm => {
      if (!alarm) {
        console.log("No dailySignIn alarm found");
      } else {
        console.log(
          "dailySignIn will fire next at",
          new Date(alarm.scheduledTime).toLocaleString()
        );
      }
    });

    // reset the lastDate
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    chrome.storage.sync.set({ lastDate: yesterday.getDate() }, () => {
      console.log(`✅ Debug: lastDate set to yesterday (${yesterday.getDate()})`);
    });
}
// endregion 