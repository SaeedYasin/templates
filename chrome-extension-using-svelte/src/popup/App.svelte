<script>
  let buttonColor = "white";
  let name = "Jack";

  chrome.storage.sync.get("color", ({ color }) => {
    buttonColor = color;
  });

  // The activeTab permission gives an extension temporary access to the currently
  // active tab when the user invokes the extension, so
  // When this button is clicked, inject setPageBackgroundColor into current page
  const injectContentIntoPage = async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setPageBackgroundColor,
    });
  };

  // The body of this function will be executed as a content script
  // inside the current page
  const setPageBackgroundColor = () => {
    chrome.storage.sync.get("color", ({ color }) => {
      document.body.style.backgroundColor = color;
    });
  };

  chrome.runtime.sendMessage(
    {
      type: "GET_NAME",
    },
    (response) => {
      if (!chrome.runtime.lastError) {
        if (response.type === "SUCCESS") {
          name = response.payload;
        }
      } else {
        console.warn(chrome.runtime.lastError.message);
      }
    }
  );
</script>

<h4>Hello {name}</h4>
<button
  style="background-color: {buttonColor}"
  on:click={injectContentIntoPage}
/>

<style>
  button {
    height: 30px;
    width: 30px;
    outline: none;
    margin: 10px;
    border: none;
    border-radius: 2px;
  }

  button:active {
    box-shadow: 0 0 0 2px white, 0 0 0 4px black;
  }
</style>
