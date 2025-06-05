import { getConfig } from "./configHelper";
import { IConfigType } from "./interface/IConfigType";
import flatpickr from "flatpickr";

/**
 * 更新簽到時間
 * @param h
 * @param m
 */
function updateSignTime(h: Number, m: Number) {
  chrome.storage.sync.set({
    signTime: {
      hours: h,
      minutes: m,
    },
  });
}

/**
 * 檢查今天是否已經簽到過
 */
async function checkIsSignToday() {
  const config = await getConfig();
  const currentDate = new Date();
  const el = document.querySelector(".is-sign-today") as HTMLInputElement;
  el.innerHTML =
    config.lastDate === currentDate
      ? chrome.i18n.getMessage("is_signed_today_true")
      : chrome.i18n.getMessage("is_signed_today_false");
}

/**
 * 本地化html頁面
 */
function localizeHtmlPage() {
  document.querySelectorAll("[data-i18n-text]").forEach((element) => {
    const key = element.getAttribute("data-i18n-text");
    if (key) {
      element.textContent = chrome.i18n.getMessage(key);
    }
  });

  const input = document.querySelectorAll("[data-i18n-placeholder]") as NodeListOf<HTMLInputElement>;
  input.forEach((element) => {
    const key = element.getAttribute("data-i18n-placeholder");
    if (key) {
      element.placeholder = chrome.i18n.getMessage(key);
    }
  });

  const title = document.querySelectorAll("[data-i18n-title]") as NodeListOf<HTMLDivElement>;
  title.forEach((element) => {
    const key = element.getAttribute("data-i18n-title");
    if (key) {
      element.title = chrome.i18n.getMessage(key);
    }
  });
}

window.addEventListener("load", async () => {
  const open = document.querySelector("#open") as HTMLInputElement; //開啟自動簽到
  open.addEventListener("change", (e) => {
    const el = e.target as HTMLInputElement;
    chrome.storage.sync.set({
      open: el.checked,
    });
  });

  const config = await getConfig();
  const h = config.signTime.hours.toString().padStart(2, "0");
  const m = config.signTime.minutes.toString().padStart(2, "0");
  open.checked = Boolean(config.open);

  localizeHtmlPage();
  checkIsSignToday();
});

document.addEventListener("DOMContentLoaded", async () => {
  // ─── 1) OPEN checkbox ────────────────────────────────
  const open = document.getElementById("open") as HTMLInputElement;
  if (!open) {
    console.warn("Checkbox #open not found");
  } else {
    // save when toggled
    open.addEventListener("change", (e) => {
      chrome.storage.sync.set({ open: (e.target as HTMLInputElement).checked });
    });
  }

  // ─── 2) LOAD config & SEED UI ────────────────────────
  const config = await getConfig();
  if (open) open.checked = Boolean(config.open);

  // ─── 3) TIME-PICKER with Flatpickr ────────────────────
  const h = config.signTime.hours.toString().padStart(2, "0");
  const m = config.signTime.minutes.toString().padStart(2, "0");
  const defaultTime = `${h}:${m}`;

  const input = document.getElementById("timePicker") as HTMLInputElement;
  if (!input) {
    console.warn("Input #timePicker not found");
  } else {
    flatpickr(input, {
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i",
      time_24hr: true,
      inline: true,
      defaultDate: defaultTime,
      onChange: (_dates, dateStr) => {
        if (!dateStr) return;
        const [hours, minutes] = dateStr.split(":").map(Number);
        console.log("Selected time:", dateStr);
        chrome.storage.sync.set({ signTime: { hours, minutes } });
        updateSignTime(hours, minutes);
        chrome.runtime.sendMessage({ action: "performScheduledSign" });
      },
    });
  }

  // ─── 4) THE REST ──────────────────────────────────────
  localizeHtmlPage();
  checkIsSignToday();
});
