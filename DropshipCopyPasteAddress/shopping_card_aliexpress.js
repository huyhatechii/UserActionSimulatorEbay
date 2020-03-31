$(document).ready(function() {
	
	// add notes
	var notes = "Please DO NOT combine order when having the same buyer address for multiple orders! I need unique tracking number for each order. If you do wrong I will do not buy again and return all packages. Please also label name the seed and DO NOT POST the INVOICE on the PACKAGE. Make the package as GIFT to avoiding large import. Thank you very much!";
	document.getElementsByClassName('seller-message-title')[0].click();

	var event = document.createEvent("HTMLEvents");
    event.initEvent("change", !0, !0);
    var noteField = document.getElementsByTagName("textarea")[0];
    noteField.focus();
    noteField.value = 'Please DO NOT combine order when having the same buyer address for multiple orders! I need unique tracking number for each order. If you do wrong I will do not buy again and return all packages. Please also label name the seed and DO NOT POST the INVOICE on the PACKAGE. Make the package as GIFT to avoiding large import. Thank you very much!';
    noteField.dispatchEvent(event);
    
    console.log('newestAliexpressOrderURL');
    console.log(window.location.href);
    chrome.storage.local.set({newestAliexpressOrderURL: window.location.href});
    
    // select payment other method
    // document.getElementsByClassName('pay-title others')[0].click();
    // document.getElementsByClassName('next-btn next-large next-btn-primary')[0].click();
});


