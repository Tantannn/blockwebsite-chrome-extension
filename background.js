const blockedUrls = [];

function getBlockedUrls() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(["blockedUrls"], function(result) {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      resolve(result.blockedUrls || []);
    });
  });
}

function getDynamicRules() {
  return new Promise((resolve, reject) => {
    chrome.declarativeNetRequest.getDynamicRules(function(rules) {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      resolve(rules);
    });
  });
}

function updateDynamicRules(removeRuleIds, addRules) {
  return new Promise((resolve, reject) => {
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: removeRuleIds,
      addRules: addRules
    }, function() {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      resolve();
    });
  });
}

async function main() {
  try {
    const storedBlockedUrls = await getBlockedUrls();
    blockedUrls.push(...storedBlockedUrls);

    const newRules = blockedUrls.map((domain, index) => {
      return {
        "id": index + 1,
        "priority": 1,
        "action": { "type": "block" },
        "condition": { "urlFilter": domain, "resourceTypes": ["main_frame"] }
      };
    });

    const previousRules = await getDynamicRules();
    const previousRuleIds = previousRules.map(rule => rule.id);

    await updateDynamicRules(previousRuleIds, newRules);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Initialize the dynamic rules when the extension is loaded
main();

// Add a listener for changes to blocked URLs
chrome.storage.onChanged.addListener(async function(changes, areaName) {
  if (areaName === "local" && changes.blockedUrls) {
    blockedUrls.length = 0;
    blockedUrls.push(...changes.blockedUrls.newValue);
    await main();
  }
});


// changeAllURL();
function changeAllURL(text){
  var current = window.location.href;
  if(current.startsWith("https://www.google.com")){
    document.documentElement.innerHTML = '';
    document.documentElement.innerHTML = 'Domain is blocked';
    document.documentElement.scrollTop = 0;
  }
}
