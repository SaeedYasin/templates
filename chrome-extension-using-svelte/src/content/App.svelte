<script>
  let name = "Jack";

  const handleSubmit = (e) => {
    chrome.runtime.sendMessage(
      {
        type: "CHANGE_NAME",
        payload: e.target[0].value,
      },
      (response) => {
        if (!chrome.runtime.lastError) {
          if (response.type === "SUCCESS") {
            name = e.target[0].value;
            e.target[0].value = "";
          }
        } else {
          console.warn(chrome.runtime.lastError.message);
        }
      }
    );
  };
</script>

<h4>Hello {name}</h4>
<form on:submit|preventDefault={handleSubmit}>
  <input type="text" placeholder="New name" />
  <button type="submit">Update name</button>
</form>

<style>
  form {
    width: 100%;
    padding: 15px;
    margin: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
  }

  button {
    color: #fff;
    background-color: #5cb85c;
    display: inline-block;
    margin-bottom: 0;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    border: 1px solid #4cae4c;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    border-radius: 4px;
    user-select: none;
  }

  button:active {
    color: #fff;
    background-color: #28a745;
    border-color: #28a745;
  }

  input {
    text-rendering: auto;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    text-align: start;
    appearance: auto;
    cursor: text;
    margin: 0em;
    display: inline-block;
    width: 60%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  input:focus {
    color: #495057;
    background-color: #fff;
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgb(0 123 255 / 25%);
  }
</style>
