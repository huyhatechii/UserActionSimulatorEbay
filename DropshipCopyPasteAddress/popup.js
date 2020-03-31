document.getElementById("b1").onclick = function() {
    createTitleManual()
}
var input = document.getElementById('input');

input.addEventListener('change', handleFiles, false);

function handleFiles(evt) {
    //Retrieve all the files from the FileList object
    var files = evt.target.files;

    if (files) {
        for (var i = 0, f; f = files[i]; i++) {
            var r = new FileReader();
            r.onload = (function(f) {
                return function(e) {
                    var contents = e.target.result;
                    alert(contents.split("\n")[2]);
                };
            })(f);
            r.readAsText(f);
        }
    } else {
        alert("Failed to load files");
    }
}

document.getElementById("b2").onclick = function() {
    if (!validatePassword()) {
        return
    }
    listingTShirtInkfrog()
}
document.getElementById("b3").onclick = function() {
    if (!validatePassword()) {
        return
    }
}
document.getElementById("b4").onclick = function() {
    if (!validatePassword()) {
        return
    }
    chrome.storage.sync.clear()
    document.getElementsByName('ebayAccountId')[0].value = ''
    document.getElementsByName('paypalEmail')[0].value = ''
    document.getElementsByName('templateId')[0].value = ''
    document.getElementsByName('totalNeedToListing')[0].value = ''
    document.getElementsByName('sourceEbayAccount')[0].value = ''
    document.getElementsByName('maxPrice')[0].value = ''
    document.getElementsByName('lowestPrice')[0].value = ''
    document.getElementsByName('draftListing')[0].value = ''
    document.getElementsByName('testItemId')[0].value = ''
    document.getElementsByName('ebayAccountName')[0].value = ''
}

document.getElementById("b5").onclick = function() {
    if (!validatePassword()) {
        return
    }
    //setStorageLocal('totalListed', 174)
    setStorageLocal('isRunning', true)
    window.open('https://google.com/listing-seed')
}
document.getElementById("b6").onclick = function() {
    if (!validatePassword()) {
        return
    }
    var key = 'listedItemIdSet' + document.getElementsByName('ebayAccountId')[0].value
    var t = {}
    t[key] = []
    chrome.storage.sync.set(t)
}
document.getElementById("b7").onclick = function() {
    if (!validatePassword()) {
        return
    }
    console.log('Run Auto!')
    runAutoRefill()
    runAutoShipping()
}

document.getElementById("b8").onclick = function() {
    // if (!validatePassword()) {
    //     return
    // }
    playDoneSound()

    $.ajax({
        url: "https://trade.aliexpress.com/orderList.htm",
        type: 'POST',
        dataType: 'html',
        headers: {
            'X-CSRF-TOKEN': "Ssi38HyfrHnEfec09cZeVD"
        },
        data: {
            _csrf_token: 'Ssi38HyfrHnEfec09cZeVD',
            status: 'waitBuyerPayment',
            sortKey: '',
            action: 'OrderListAction',
            eventSubmitDoSearchTips: 'doSearchTips'

        },
        success: function (response) {
            
        }
    });

    loadDoc('https://trade.aliexpress.com/orderList.htm', function(xhttp){
        console.log(xhttp.responseText);
    })

}


document.getElementById("b9").onclick = function() {
    if (!validatePassword()) {
        return
    }
    setStorageLocal('isRunning', false)
}
document.getElementById("b10").onclick = function() {
    if (!validatePassword()) {
        return
    }
    exportTShirtOrders()
}
document.getElementById("b11").onclick = function() {
    if (!validatePassword()) {
        return
    }
    fillQuantityErrorListings()
}
document.getElementById("b12").onclick = function() {
    if (!validatePassword()) {
        return
    }
    fillTShirtTrackingNumber()
}
document.getElementById("b13").onclick = function() {
    if (!validatePassword()) {
        return
    }
    setStorageSync('totalAuction', 0);
    chrome.storage.sync.get('ebayAccountName', function(e) {
        console.log('Ebay account name: ' + e.ebayAccountName);
        window.open('https://feedback.ebay.com/ws/eBayISAPI.dll?ViewFeedback2&ftab=AllFeedback&userid=' + e.ebayAccountName + '&iid=-1&de=off&interval=0&searchInterval=30&items=200&searchInterval=30');
    })
}
document.getElementById("b14").onclick = function() {
    if (!validatePassword()) {
        return
    }
    fillSeedTrackingNumber()
}
document.getElementById("b15").onclick = function() {
    // if (!validatePassword()) {
    //     return
    // }
    exportAliexpressProducts()
}
document.getElementById("b16").onclick = function() {
    var email = prompt("Email: ", "")
    if (email != '' && email.includes('@')) {
        checkNewIpAddress(email.toLowerCase())
    } else {
        alert('The email is invalid')
    }
}
document.getElementById("b17").onclick = function() {
    console('enadble cokkieee Huy')
    var inputEnable = prompt("Enable = ", "")
    setStorageLocal('enableAutoCookies', true)
    // if (inputEnable === 'true') {
    //     setStorageLocal('enableAutoCookies', true)
    // } else {
    //     setStorageLocal('enableAutoCookies', false)
    // }
}
document.getElementById("b18").onclick = function() {
    // if (!validatePassword()) {
    //     return
    // }
    autoCheckDisputeAliexpress()
}
document.getElementById("myForm").addEventListener("submit", saveAllData)

// load data to form
chrome.storage.sync.get('testItemId', function(e) {
    var value = e.testItemId
    if (typeof(e.testItemId) === 'undefined') {
        value = ''
    }
    document.getElementsByName('testItemId')[0].value = value
})
chrome.storage.sync.get('aliProductExcel', function(e) {
    var value = e.aliProductExcel
    if (typeof(e.aliProductExcel) === 'undefined') {
        value = ''
    }
    document.getElementsByName('aliProductExcel')[0].value = value
})
chrome.storage.sync.get('ebayAccountId', function(e) {
    var value = e.ebayAccountId
    if (typeof(e.ebayAccountId) === 'undefined') {
        value = ''
    }
    document.getElementsByName('ebayAccountId')[0].value = value
})
chrome.storage.sync.get('ebayAccountName', function(e) {
    var value = e.ebayAccountName
    if (typeof(e.ebayAccountName) === 'undefined') {
        value = ''
    }
    document.getElementsByName('ebayAccountName')[0].value = value
})
chrome.storage.sync.get('paypalEmail', function(e) {
    var value = e.paypalEmail
    if (typeof(e.paypalEmail) === 'undefined') {
        value = ''
    }
    document.getElementsByName('paypalEmail')[0].value = value
})
chrome.storage.sync.get('templateId', function(e) {
    var value = e.templateId
    if (typeof(e.templateId) === 'undefined') {
        value = ''
    }
    document.getElementsByName('templateId')[0].value = value
})

chrome.storage.sync.get('maxPrice', function(e) {
    var value = e.maxPrice
    if (typeof(e.maxPrice) === 'undefined') {
        value = ''
    }
    document.getElementsByName('maxPrice')[0].value = value
})
chrome.storage.sync.get('lowestPrice', function(e) {
    var value = e.lowestPrice
    if (typeof(e.lowestPrice) === 'undefined') {
        value = ''
    }
    document.getElementsByName('lowestPrice')[0].value = value
})
chrome.storage.sync.get('totalNeedToListing', function(e) {
    var value = e.totalNeedToListing
    if (typeof(e.totalNeedToListing) === 'undefined') {
        value = ''
    }
    document.getElementsByName('totalNeedToListing')[0].value = value
})
chrome.storage.sync.get('sourceEbayAccount', function(e) {
    var value = e.sourceEbayAccount
    if (typeof(e.sourceEbayAccount) === 'undefined') {
        value = ''
    }
    document.getElementsByName('sourceEbayAccount')[0].value = value
})
chrome.storage.sync.get('draftListing', function(e) {
    var value = e.draftListing
    if (typeof(e.draftListing) === 'undefined') {
        value = ''
    }
    document.getElementsByName('draftListing')[0].value = value
})

chrome.storage.local.get('maxBidCount', function(e) {
    var value = e.maxBidCount
    if (typeof(e.maxBidCount) === 'undefined') {
        value = ''
    }
    document.getElementsByName('maxBidCount')[0].value = value
})

// setTimeout(function(){
//     initDefaultParams()
//     console.log('initDefaultParams')
// }, 1000)

// save all data
function saveAllData() {
    console.log('saveAllData')
    chrome.storage.sync.set({ 'aliProductExcel': document.getElementsByName('aliProductExcel')[0].value })
    chrome.storage.sync.set({ 'ebayAccountId': document.getElementsByName('ebayAccountId')[0].value })
    setStorageLocal('maxBidCount', document.getElementsByName('maxBidCount')[0].value)
    chrome.storage.sync.set({ 'ebayAccountName': document.getElementsByName('ebayAccountName')[0].value })
    chrome.storage.sync.set({ 'paypalEmail': document.getElementsByName('paypalEmail')[0].value })
    chrome.storage.sync.set({ 'templateId': document.getElementsByName('templateId')[0].value })
    chrome.storage.sync.set({ 'maxPrice': document.getElementsByName('maxPrice')[0].value })
    chrome.storage.sync.set({ 'totalNeedToListing': document.getElementsByName('totalNeedToListing')[0].value })
    chrome.storage.sync.set({ 'sourceEbayAccount': document.getElementsByName('sourceEbayAccount')[0].value })
    chrome.storage.sync.set({ 'lowestPrice': document.getElementsByName('lowestPrice')[0].value })
    chrome.storage.sync.set({ 'draftListing': document.getElementsByName('draftListing')[0].value })
    chrome.storage.sync.set({ 'testItemId': document.getElementsByName('testItemId')[0].value })
    chrome.storage.sync.set({ 'lastUnshippedOrder': document.getElementsByName('lastUnshippedOrder')[0].value })
}