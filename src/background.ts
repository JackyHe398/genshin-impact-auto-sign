import { IConfigType } from "./interface/IConfigType";

function checkSign() {
  chrome.storage.sync.get(["lastDate", "signTime", "open"], (data) => {
    console.log("start check sign...");
    let { lastDate, open, signTime } = data as IConfigType;

    // ========= data validation start =========
    // =========================================
    if (!data.urls) {
      chrome.storage.sync.set({
        urls: [],
      });
    }
    if (!lastDate) {
      chrome.storage.sync.set({
        lastDate: new Date().getDate(), //上次簽到日期
      });
    }

    if (!signTime) {
      chrome.storage.sync.set({
        signTime: {
          hours: 0,
          minutes: 5,
        },
      });
    }

    if (typeof open === "undefined") {
      chrome.storage.sync.set({
        open: true,
      });
      return;
    }

    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // ========= data validation end =========

    
    let now = new Date(); //目前時間
    
    const h = +signTime.hours, m = +signTime.minutes;
    const todayAtHM = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);

    if (!open) return;                          // no need to sign in
    if (now < todayAtHM) return;                // too early
    if (now.getDate() === lastDate) return;     // already signed today

    /* debug */
    // console.clear();
    // console.log(data);
    // console.log("currentDate:", now);
    // console.log(now.getDate(), lastDate);
    // console.log(now.getDate() !== lastDate);
    // console.log(now > old);



      // firefox 編者注： 已改成每日chrome.alarms, 因此理論上不會重複開啟網頁
      // 不過暫時還是保留這段程式碼
      //簽到後用目前時間覆蓋掉上次時間，防止重複開啟網頁
      chrome.storage.sync.set({
        lastDate: new Date().getDate(),
      });

      //開啟米哈遊的簽到頁面
      //這邊不需要做任何簽到動作，因為content.ts裡面已經設定只要開啟米哈遊網頁就會自動簽到了
      chrome.tabs.create({
        url: "https://act.hoyolab.com/ys/event/signin-sea-v3/index.html?act_id=e202102251931481",
        active: false, //開啟分頁時不會focus
      });
      console.log(
        `sign-in triggered at ${now.toLocaleTimeString()}`
      );
    
    console.log("check done..");
  });
}

function getNextRun(h: number, m: number) {
  // construct time now and target time for comparison
  const now = new Date();
  const todayAtHM = new Date(
    now.getFullYear(), now.getMonth(), now.getDate(),
    h, m, 0, 0
  );

  // if the time is already past, set the date to tomorrow
  let date = now.getDate();
  if (now.getTime() > todayAtHM.getTime()) {
    date = now.getDate() + 1;
  };

  // construct the target alarm time
  const nextRun = new Date(
    now.getFullYear(),
    now.getMonth(),
    date,
    h, m, 0, 0
  );

  return nextRun;
}

// create alarm once a day
function scheduleNext() {
    chrome.storage.sync.get(["signTime"], (data) => {

      // get signTime
      let {signTime} = data as IConfigType;

      if (!signTime) {
        chrome.storage.sync.set({
          signTime: {
            hours: 0,
            minutes: 5,
          },
        });
      }
      let h = Number(signTime.hours);
      let m = Number(signTime.minutes);
      
      chrome.alarms.clear('dailySignIn', () => {
        chrome.alarms.create("dailySignIn", {when: getNextRun(h, m).getTime()});
      });
      console.log(`Alarm set for ${h}:${m}`);
});
}


// add alarm and checkSign on install
chrome.runtime.onInstalled.addListener(({ reason }) => {
  // On a fresh install, run a catch-up
  if (reason === "install") {
    checkSign();
  }
  scheduleNext();
});

// set alarm on startup in case unexpected issues
chrome.runtime.onStartup.addListener(() => {
  console.log("Browser startup, rescheduling alarm");
  scheduleNext();
});

// add alarm and checkSign on update
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && changes.signTime){
    console.log("signTime change detected, rescheduling alarm");
    scheduleNext();
  }
});

chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name !== "dailySignIn") {return; }
  checkSign();
  console.log("Finished Sign In, rescheduling alarm");
  scheduleNext();
});


/* Since log in chrome.runtime will not show up in the console
  use this to check the time of the alarm

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
*/ 