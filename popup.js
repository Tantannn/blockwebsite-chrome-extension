

document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const activeTab = tabs[0];
    const url = activeTab.url;
    const domain = new URL(url).hostname;
    document.getElementById('blockButton').addEventListener('click', function() {
      if (domain) {
        chrome.storage.local.get(["blockedUrls"], function(result) {
          const blockedUrls = result.blockedUrls || [];
          blockedUrls.push(domain);
          chrome.storage.local.set({blockedUrls: blockedUrls}, function() {
            updateBlockedList();
          });
        });
      }
    });
  });
});

function updateBlockedList() {
  chrome.storage.local.get(["blockedUrls"], (result, index) => {
    const blockedList = document.getElementById('blockedList');
    blockedList.innerHTML = '';
    const blockedUrls = result.blockedUrls || [];
    blockedUrls.forEach(function(url) {
      const li = document.createElement('li');
      const button = document.createElement("button");
      button.addEventListener("click", () => {
        blockedUrls.splice(index, 1);
        chrome.storage.local.set({blockedUrls: blockedUrls}, function() {
          li.remove();
        });
      });
      button.textContent = "Delete";
      li.textContent = url;
      blockedList.appendChild(li);
      li.appendChild(button);
    });
  });
}

updateBlockedList();
