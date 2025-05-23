import { IConfigType } from "./interface/IConfigType";

function initializeDefaults(): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.sync.get(["lastDate", "signTime", "open"], (data) => {
      const updates: Record<string, any> = {};
      const { lastDate, signTime, open } = data as IConfigType;

      /* firefox 編者注： 這段沒看到拿來幹嘛的*/ 
      // if (typeof data.urls === "undefined") {
      //   chrome.storage.sync.set({
      //     urls: [],
      //   });
      // }

      if (!lastDate) {
        console.log("Initialize lastDate");
        updates.lastDate = new Date().getDate()
      }

      if (!signTime ||
          typeof signTime.hours === "undefined" ||
          typeof signTime.minutes === "undefined") {
        console.log("Initialize signTime");
        updates.signTime = { hours: 0, minutes: 5 };
      }

      if (typeof open === "undefined") {
        console.log("Initialize open");
        updates.open = true;
      }

      if (Object.keys(updates).length === 0) {
        resolve(); // nothing to update
      } else {
        chrome.storage.sync.set(updates, () => {
          if (chrome.runtime.lastError) {
            console.error("Storage set failed:", chrome.runtime.lastError.message);
          }
          resolve();
        });
      }
    });
  });
}

export function checkSignCondition(): Promise<boolean>{
  return new Promise((resolve) => {
    chrome.storage.sync.get(["lastDate", "signTime", "open"], (data) => {
      let now = new Date(); //目前時間
      console.log(`${now.toLocaleTimeString()} start check sign`);

      // construct time now and target time for comparison
      let { lastDate, open, signTime } = data as IConfigType;
      const h = +signTime.hours,
            m = +signTime.minutes;
      const todayAtHM = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);

      // condition check
      if (!open){
        console.log("Sign-in failed: disabled");
        return resolve(false);
      };
      if (now < todayAtHM) {
        console.log("Sign-in failed: Not yet time to sign in");
        return resolve(false);
      };
      if (now.getDate() === lastDate) {
        console.log("Sign-in failed: Signed today");
        return resolve(false);
      };

      return resolve(true);
      // region - debug
      // console.clear();
      // console.log(data);
      // console.log("currentDate:", now);
      // console.log(now.getDate(), lastDate);
      // console.log(now.getDate() !== lastDate);
      // endregion
      
    });
  });
}

function openSignInPage(){
    /* firefox 編者注： 
    已改成每日chrome.alarms，
    因此理論上不會重複開啟網頁，不過暫時還是保留這段程式碼，
    瀏覽器有limit，有需要請移除或注釋掉*/
    //簽到後用目前時間覆蓋掉上次時間，防止重複開啟網頁
    chrome.storage.sync.set({lastDate: new Date().getDate(),});

    //開啟米哈遊的簽到頁面
    //這邊不需要做任何簽到動作，因為content.ts裡面已經設定只要開啟米哈遊網頁就會自動簽到了
    chrome.tabs.create({
      url: "https://act.hoyolab.com/ys/event/signin-sea-v3/index.html?act_id=e202102251931481",
      active: false, //開啟分頁時不會focus
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
  chrome.storage.sync.get(["signTime"], (data) => {

    // get signTime
    let {signTime} = data as IConfigType;
    let h = Number(signTime.hours);
    let m = Number(signTime.minutes);
    
    const nextrun = getNextRun(h, m);
    chrome.alarms.clear('dailySignIn', () => {
      chrome.alarms.create("dailySignIn", {when: nextrun.getTime()});
    });
    console.log(`Alarm set for ${nextrun.toLocaleDateString() + ' ' +nextrun.toLocaleTimeString()}`);
  });
}
// endregion

// region - main and event listeners
async function performScheduledSign() {
  try {
    await initializeDefaults();
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

/* region - debugging 
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

endregion*/ 