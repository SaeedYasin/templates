<script>
  const presetButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"];
  let currentColor;
  let name = "Jack";

  chrome.storage.sync.get("color", ({ color }) => {
    currentColor = color;
  });

  const handleButtonClick = (color) => {
    currentColor = color;
    chrome.storage.sync.set({ color });
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
<p>Choose a different background color!</p>
{#each presetButtonColors as buttonColor (buttonColor)}
  <button
    on:click={(e) => handleButtonClick(buttonColor)}
    class:current={currentColor === buttonColor}
    style="background-color: {buttonColor};"
  />
{/each}

<style>
  button {
    height: 30px;
    width: 30px;
    outline: none;
    margin: 10px;
    border: none;
    border-radius: 2px;
  }

  .current {
    box-shadow: 0 0 0 2px white, 0 0 0 4px black;
  }
</style>
