// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

// Read values from storage
chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// The body of this function will be executed as a content script
// inside the current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}

// When we want to send a message from the background, options, popup,
// or foreground components to the background, options, or popup components
// we use the RUNTIME version of sendMessage().
chrome.runtime.sendMessage(
  {
    message: "get_name",
  },
  (response) => {
    if (!chrome.runtime.lastError) {
      if (response.message === "success") {
        document.querySelector("div").innerHTML = `Hello ${response.payload}`;
      }
    }
  }
);

// timeout because can't do this right after doing get_name
setTimeout(() => {
  chrome.storage.local.get("tabId", ({ tabId }) => {
    if (!chrome.runtime.lastError) {
      // When we want to send a message from the background, options, or popup
      // components to the foreground component we use the TABS version of sendMessage().
      chrome.tabs.sendMessage(
        tabId,
        {
          message: "set_name",
          payload: "sam",
        },
        (response) => {
          if (response && response.message === "success") {
            document.querySelector(
              "div"
            ).innerHTML = `Hello ${response.payload}`;
          }
        }
      );
    }
  });
}, 1000);
