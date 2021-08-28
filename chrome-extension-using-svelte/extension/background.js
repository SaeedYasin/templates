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
});

// background can receive messages from everyone using runtime.onMessage
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GET_NAME") {
    chrome.storage.local.get("name", ({ name }) => {
      if (chrome.runtime.lastError) {
        sendResponse({
          type: "FAIL",
        });
        return;
      }
      sendResponse({
        type: "SUCCESS",
        payload: name,
      });
    });
    return true;
  } else if (request.type === "CHANGE_NAME") {
    chrome.storage.local.set(
      {
        name: request.payload,
      },
      () => {
        if (chrome.runtime.lastError) {
          sendResponse({ type: "FAIL" });
          return;
        }
        sendResponse({ type: "SUCCESS" });
      }
    );
    return true;
  }
});
