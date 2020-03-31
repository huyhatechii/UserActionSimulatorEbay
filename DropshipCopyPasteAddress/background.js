chrome.browserAction.onClicked.addListener(function(e) {

});

chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    if (typeof(request) === 'undefined') {
        sendResponse({success: false});
    }

    // success
    if (typeof(request.newAddress) != 'undefined') {
        chrome.storage.local.set({newAddress: request.newAddress}, function() {
            sendResponse({success: true});
        });
    } else if (typeof(request.searchKeyword) != 'undefined') {
        $keyword = request.searchKeyword.split('-').join(' ');
        chrome.storage.local.set({keyword: $keyword});
        switchTab('https://www.aliexpress.com/af/', 'copy_address.js', function(hasTab){
            if (hasTab) {
                sendResponse({success: true});
            } else {
                switchTab('https://www.aliexpress.com/wholesale', 'copy_address.js', function(hasTab){
                    if (hasTab) {
                        sendResponse({success: true});
                    } else {
                        alert('Không tìm được tab https://www.aliexpress.com/af/ & https://www.aliexpress.com/wholesale');
                        sendResponse({success: false});
                    }
                });
            } 
        });
    } else if (typeof(request.getMapAliProduct) != 'undefined') {
        chrome.storage.local.get('AliexpressProduct', function(e){
            sendResponse({success: true, aliProduct: e.AliexpressProduct});
        });
    } else if (request.getDsersToken) {
        chrome.storage.local.get('dsersToken', function(e){
            sendResponse({success: true, dsersToken: e.dsersToken});
        });
    } else if (typeof(request.getNewAliexpressOrder) != 'undefined') {
        chrome.storage.local.get('newAliexpressOrder', function(e){
            sendResponse({success: true, newAliexpressOrder: e.newAliexpressOrder});
        });
    } else if (typeof(request.getDsersOrderData) != 'undefined') {
        chrome.storage.local.get('dsersSuccessOrder', function(e1){
            chrome.storage.local.get('dsersFailOrder', function(e2){
                sendResponse({ success: true, dsersSuccessOrder: e1.dsersSuccessOrder, dsersFailOrder: e2.dsersFailOrder });
            });
        });
    } else if (typeof(request.getNewestAliexpressOrderURL) != 'undefined') {
        chrome.storage.local.get('newestAliexpressOrderURL', function(e){
            sendResponse({ success: true, newestAliexpressOrderURL: e.newestAliexpressOrderURL});
        });
    }
  });

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (tab.url.includes('https://www.aliexpress.com/item/')) {
        chrome.tabs.executeScript(null, {
            file: "map_aliexpress_products.js"
        })
    }

    if (changeInfo.status != 'complete') {
        return;
    }

    if ("icashier.alipay.com" === getHostName(tab.url)) {
        chrome.tabs.executeScript(null, {
            file: "sync_aliexpress_order_to_lighting_lister.js"
        })
    }

    if (tab.url.includes('https://shoppingcart.aliexpress.com/order/payOnlineSuccess.htm') || tab.url.includes('https://shoppingcart.aliexpress.com/order/payOnlineFailure.htm')) {
        // chrome.tabs.executeScript(null, {
        //     file: "go_to_orderlist_aliexpress.js"
        // })
    } else if (tab.url.includes('https://psp.wmtransfer.com/Payment/process')) {
        chrome.tabs.executeScript(null, {
            file: "go_to_orderlist_aliexpress.js"
        })
    } else if ("https://trade.aliexpress.com/orderList.htm" === tab.url) {
        chrome.tabs.executeScript(null, {
            file: "get_new_order_id.js"
        })
    } else if ("shoppingcart.aliexpress.com" === getHostName(tab.url)) {
        chrome.tabs.executeScript(null, {
            file: "shopping_card_aliexpress.js"
        })
        chrome.tabs.executeScript(null, {
            file: "copy_address.js"
        })
    } else if ("trade.aliexpress.com" === getHostName(tab.url)) {

    } else if (tab.url.includes('https://www.ebay.com/itm') && tab.url.includes('Auction')) {
        chrome.tabs.executeScript(null, {
            file: "bidding.js"
        })
    } else if ('https://open.inkfrog.com/sold/' === tab.url || 'https://open.inkfrog.com/sold' === tab.url) {
        chrome.tabs.executeScript(null, {
            file: "checking_unshipped_orders.js"
        })
    } else if (tab.url.includes('https://open.inkfrog.com/listings/sold/')) {
        chrome.tabs.executeScript(null, {
            file: "copy_address.js"
        })
    } else if (tab.url.includes('https://www.aliexpress.com/af') || tab.url.includes('https://www.aliexpress.com/wholesale')) {
        // chrome.tabs.executeScript(null, {
        //     file: "display_shipping_cost.js"
        // })
    } else if (tab.url.includes('https://www.dsers.com/#/newfeature/list/csv')) {
        chrome.tabs.executeScript(null, {
            file: "sync_dsers_orders_to_lighting_lister.js"
        })
    } else if (tab.url.includes('track-chinapost.com')) {
        chrome.tabs.executeScript(null, {
            file: "get_tracking_from_chinapost_forum.js"
        })
    } else if ('https://www.ebay.com/sh/ovw' === tab.url) {
        chrome.tabs.executeScript(null, {
            file: "auto_cookies.js"
        })
    } else if (getHostName(tab.url).includes('ebay.com')) {
        chrome.tabs.executeScript(null, {
            file: "auto_cookies.js"
        })
    } else if (tab.url.includes('ebay.com')) {
        chrome.tabs.executeScript(null, {
            file: "auto_cookies.js"
        })
    }

    if (tab.url.includes('https://trade.aliexpress.com/order_detail.htm?inv=1&orderId')) {
        chrome.tabs.executeScript(null, {
            file: "update_company_info_ali_invoice.js"
        })
    }

    if ('https://google.com/listing-seed' === tab.url) {
        chrome.tabs.executeScript(null, {
            file: "listing_seed.js"
        })
    }
})
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message === 'search keyword') {
            switchTab('https://www.aliexpress.com/af/', 'copy_address.js')
            switchTab('https://www.aliexpress.com/wholesale', 'copy_address.js')
        } else if (request.message === 'get new order id') {
            switchTab('https://www.aliexpress.com/af/', 'get_new_order_id.js')
            switchTab('https://www.aliexpress.com/wholesale', 'get_new_order_id.js')
        } else if (request.message === 'switch to inkfrog order tab') {
            switchTab('https://open.inkfrog.com/sold/', '')
            switchTab('https://open.inkfrog.com/sold', '')
        } else if (request.message === 'upload orders to dsers') {
            switchTab('https://www.dsers.com/#/newfeature/list/csv', '')
        } else if (request.message === 'get token complete') {
            switchTab('https://open.inkfrog.com/sold/', '')
            switchTab('https://open.inkfrog.com/sold', '')
        } else if (request.message === 'switch to lightinglister order tab') {
            switchTab('https://lightinglister.com/admin/order', '')
        }
    })

function switchTab(tabName, exeScript, cFunction) {
    chrome.tabs.query({}, function(tabs) {
        var found = false;
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].url.search(tabName) > -1) {
                found = true;
                tabId = tabs[i].id;
            }
        }
        if (found == false) {
            chrome.tabs.executeScript(null, { file: exeScript });
        } else {
            chrome.tabs.update(tabId, { selected: true });
            chrome.tabs.executeScript(null, { file: exeScript });
        }
        cFunction(found);
    });
}

function openNextBidTab(sendResponse) {
    var found = false
    chrome.tabs.query({}, function(tabs) {
        //alert(tabs[i].url)
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].url.indexOf("https://www.ebay.com/itm") > -1) {
                found = true
            }
        }
        if (found === false) {
            sendResponse({ result: "Not found" });
            //switchTab('https://pages.ebay.com/auto-auction', 'copy_from_ebay.js')
        } else {
            sendResponse({ result: "Found" });
        }
    })
}

function getHostName(url) {
    var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
        return match[2];
    } else {
        return null;
    }
}

var getCleanUrl = function(url) {
    return url.replace(/#.*$/, '').replace(/\?.*$/, '');
};