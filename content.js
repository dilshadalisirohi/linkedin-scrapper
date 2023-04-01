const elements = [...document.querySelectorAll(".MjjYud")];

const userData = elements.map((element) => {
  const extractSpans = [...element?.querySelectorAll("span")][
    [...element?.querySelectorAll("span")].length - 1
  ]?.innerText;
  return {
    userName: element
      ?.querySelector(".LC20lb.MBeuO.DKV0Md")
      ?.innerText.split("-")[0]
      .split(" ")
      .splice(0, 2)
      .join(" "),
    email: extractEmails(extractSpans),
    url: element?.querySelector(".yuRUbf")?.querySelector("a").href,
  };
});

console.log(userData);

chrome.storage.local.get(["linkedInData"], (response) => {
  console.log("dataSet", response.linkedInData);
  if (response.linkedInData === undefined) {
    chrome.storage.local.set({ linkedInData: [...userData] }, () => {
      console.log("Value is set");
    });
  } else {
    chrome.storage.local.set(
      { linkedInData: [...response.linkedInData, ...userData] },
      () => {
        console.log("Value is set");
      }
    );
  }
});

function extractEmails(text) {
  return text
    ?.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)
    ?.toString();
}
