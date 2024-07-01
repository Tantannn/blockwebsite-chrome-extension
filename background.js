
const blockedUrls = [];


// chrome.runtime.onInstalled.addListener(function() {
//   chrome.declarativeNetRequest.updateDynamicRules({
//     options:  {
//       id: 'block-google',
//       priority: 1,
//       action: {
//         type: 'block'
//       },
//       condition: {
//         urlFilter: {
//           hostSuffix: 'google.com'
//         }
//       }
//     }
//   });
// });

chrome.declarativeNetRequest.updateDynamicRules({
  addRules: {
      id: 'block-google',
      priority: 1,
      action: {
        type: 'block'
      },
      condition: {
        urlFilter: {
          hostSuffix: 'google.com'
        }
      }
    }
});

// To add URLs dynamically, you can use chrome.storage to store and retrieve blocked URLs
chrome.storage.sync.get(["blockedUrls"], function(result) {
  if (result.blockedUrls) {
    blockedUrls.push(...result.blockedUrls);
  }
});
console.log(blockedUrls );


// Add a listener for changes to blocked URLs
chrome.storage.onChanged.addListener(function(changes, areaName) {
  if (areaName === "sync" && changes.blockedUrls) {
    blockedUrls.length = 0;
    blockedUrls.push(...changes.blockedUrls.newValue);
  }
});

// changeAllURL();
// function changeAllURL(text){
//   var current = window.location.href;
//   if(current.startsWith("https://www.google.com")){
//     document.documentElement.innerHTML = '';
//     document.documentElement.innerHTML = 'Domain is blocked';
//     document.documentElement.scrollTop = 0;
//   }
// }
