const button = document.querySelector(".dataButton");
const clearStorage = document.querySelector(".clearButton");

button.addEventListener("click", function () {
  const msg = {
    command: "fetchData",
  };
  chrome.runtime.sendMessage(msg, function (response) {
    console.log("Dilshad", response);
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command === "generateCsv") {
    let csvData = `s.No,userName,Email\n`;

    request.data.forEach((item, index) => {
      const userName = item?.userName?.replace(/[,\n\r]/g, "");
      const email = item?.email?.replace(/[,\n\r]/g, "");
      const url = item?.url?.replace(/[,\n\r]/g, "");
      let row = `${index + 1},${userName ? userName : ""},${
        email ? email : ""
      },${url ? url : ""}\n`;

      csvData += row;
    });

    console.log(request);

    const csvBlob = new Blob([csvData], { type: "text/csv" });
    const csvHref = window.URL.createObjectURL(csvBlob);
    const a = document.createElement("a");
    a.href = csvHref;
    a.download = Date.now() + ".csv";
    document.body.appendChild(a);
    a.click();
    a.removeChild(a);
  }
});

clearStorage.addEventListener("click", function () {
  const msg = {
    command: "clearData",
  };
  chrome.runtime.sendMessage(msg, function (response) {
    console.log("Dilshad", response);
  });
});
