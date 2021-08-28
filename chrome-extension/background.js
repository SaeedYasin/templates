let color = "#e8453c";

chrome.runtime.onInstalled.addListener(async () => {
  // Code in here runs ONE TIME ONLY (unless the user reinstalls your extension)

  // Write values to storage
  chrome.storage.sync.set({ color });
  console.log("Default background color set to %cred", `color: ${color}`);

  // Write values to local storage
  chrome.storage.local.set({
    name: "Jack",
  });

  // Create a new tab
  //let url = chrome.runtime.getURL("newTab.html");
  //let tab = await chrome.tabs.create({ url });
  //console.log(`Created tab ${tab.id}`);
});

// Content script -- runs in user's webpage --  define webpages in
// content_scripts > matches in manifest to run content script in them
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // If the web page the user is viewing is fully loaded(complete) AND it's
  // an actual web page(http), then we do something.
  if (changeInfo.status === "complete" && /^http/.test(tab.url)) {
    // We will get here only for our host_permissions URL based tabs
    chrome.scripting
      .executeScript({
        target: { tabId: tabId },
        files: ["./content.js"],
      })
      .then(() => {
        console.log("INJECTED THE CONTENT SCRIPT.", tabId, changeInfo, tab);
      })
      .catch((err) => console.log(err));

    chrome.scripting
      .insertCSS({
        target: { tabId: tabId },
        files: ["./content.css"],
      })
      .then(() => {
        console.log("INJECTED THE CONTENT STYLES.");
      })
      .catch((err) => console.log(err));
  }

  // Save tabId for popup to use
  // OR we can code such that popup can send messaga to query our tab
  chrome.storage.local.set({
    tabId,
  });
});

// background can receive messages from everyone using runtime.onMessage
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "get_name") {
    chrome.storage.local.get("name", (data) => {
      if (chrome.runtime.lastError) {
        sendResponse({
          message: "fail",
        });
        return;
      }
      sendResponse({
        message: "success",
        payload: data.name,
      });
    });
    return true;
  } else if (request.message === "change_name") {
    chrome.storage.local.set(
      {
        name: request.payload,
      },
      () => {
        if (chrome.runtime.lastError) {
          sendResponse({ message: "fail" });
          return;
        }
        sendResponse({ message: "success" });
      }
    );
    return true;
  }
});
