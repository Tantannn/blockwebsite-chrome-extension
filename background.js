const blockedUrls = ["https://9gag.com/",'https://www.google.com/'];
console.log(blockedUrls);
chrome.declarativeNetRequest.getDynamicRules(prevRules => {
  console.log(prevRules);
  
  // blockedUrls.forEach((domain, index) => {
    // let id = index + 1;

    chrome.declarativeNetRequest.updateDynamicRules({
      // addRules: [{
      //   "id": id,
      //   "priority": 1,
      //   "action": { "type": "block" },
      //   "condition": { "urlFilter": domain, "resourceTypes": ["main_frame"] }
      // }],
      removeRuleIds: [2]
    });
  // });
})

// chrome.declarativeNetRequest.getDynamicRules(previousRules => {
//   const previousRuleIds = previousRules.map(rule => rule.id);
//   chrome.declarativeNetRequest.updateDynamicRules({
//     removeRuleIds: previousRuleIds,
//     addRules: blockedUrls
//   });
// });


// To add URLs dynamically, you can use chrome.storage to store and retrieve blocked URLs
// chrome.storage.sync.get(["blockedUrls"], function(result) {
//   if (result.blockedUrls) {
//     blockedUrls.push(...result.blockedUrls);
//   }
// });
//
//
// // Add a listener for changes to blocked URLs
// chrome.storage.onChanged.addListener(function(changes, areaName) {
//   if (areaName === "sync" && changes.blockedUrls) {
//     blockedUrls.length = 0;
//     blockedUrls.push(...changes.blockedUrls.newValue);
//   }
// });


// changeAllURL();
// function changeAllURL(text){
//   var current = window.location.href;
//   if(current.startsWith("https://www.google.com")){
//     document.documentElement.innerHTML = '';
//     document.documentElement.innerHTML = 'Domain is blocked';
//     document.documentElement.scrollTop = 0;
//   }
// }
