
chrome.storage.local.set({aliexpressCookie: document.cookie}, function() {
	console.log('Aliexpress Cookie');
    console.log(document.cookie);
});