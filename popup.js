
document.getElementById('blockButton').addEventListener('click', function() {
  const url = document.getElementById('urlInput').value;
  if (url) {
    chrome.storage.sync.get(["blockedUrls"], function(result) {
      const blockedUrls = result.blockedUrls || [];
      blockedUrls.push(url);
      chrome.storage.sync.set({blockedUrls: blockedUrls}, function() {
        updateBlockedList();
      });
    });
  }
});

function updateBlockedList() {
  chrome.storage.sync.get(["blockedUrls"], function(result) {
    const blockedList = document.getElementById('blockedList');
    blockedList.innerHTML = '';
    const blockedUrls = result.blockedUrls || [];
    blockedUrls.forEach(function(url) {
      const li = document.createElement('li');
      li.textContent = url;
      blockedList.appendChild(li);
    });
  });
}

updateBlockedList();


