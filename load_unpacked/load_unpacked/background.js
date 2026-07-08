// Initialize the professional context menu item on installation
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "toggle-rtl-layout",
    title: "اصلاح هوشمند فونت و جهت (RTL)",
    contexts: ["all"]
  });
});

// Listen for context menu clicks and securely dispatch to the active tab
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "toggle-rtl-layout" && tab?.id) {
    chrome.tabs.sendMessage(tab.id, { action: "FORCE_RTL_SELECTION" });
  }
});