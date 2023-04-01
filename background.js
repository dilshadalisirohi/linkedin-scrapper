chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);

  if (request.command === "clearData") {
    chrome.storage.local.remove("linkedInData", () => {
      console.log("Data removed");
    });
  }

  if (request.command === "fetchData") {
    chrome.storage.local.get(["linkedInData"], (response) => {
      console.log(response);
      chrome.runtime.sendMessage({
        command: "generateCsv",
        data: response.linkedInData,
      });
    });
  }
});
