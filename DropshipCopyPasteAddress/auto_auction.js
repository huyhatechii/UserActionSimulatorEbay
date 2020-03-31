var maxAuction = 8
var keyword = ['beads', 'charm', 'ring', 'case', 'chain', 'keychain', 'crafts']

var ebayAccountName = ''
var validAuctionSellerIdSet = new Set()
var validAuctionLink = []
var biddingSellerIdSet = new Set()
var randNum = 0
var maxTimeBidding = 40000
var dTime = 0

console.log(window.location.href)

function step1_createBlackListSellerIdSet() {
    console.log('feedback.ebay.com')
    var elements = document.getElementsByClassName('mbg-nw')
    getStorageLocalSet('blacklistSellerIdSet', function(blacklistSellerIdSet) {
        for (i = 0; i < elements.length; i++) {
            var sellerId = elements[i].textContent
            if (!blacklistSellerIdSet.has(sellerId)) {
                console.log('Added new sellerId to blacklistSellerIdSet: ' + sellerId)
                blacklistSellerIdSet.add(sellerId)
            }
        }
        setStorageLocalSet('blacklistSellerIdSet', blacklistSellerIdSet);
        console.log('blacklistSellerIdSet');
        console.log(blacklistSellerIdSet);
        setTimeout(function(){
            window.close();
            window.open('https://www.ebay.com/myb/Summary');
        }, 5000);
    })
}

if (window.location.href.includes('feedback.ebay.com/ws/eBayISAPI.dll')) {
    step1_createBlackListSellerIdSet();
}

if ('https://www.ebay.com/myb/Summary' === window.location.href) {
    //alert('Starting Auction Ebay')
    randNum = getRandomInt(0, keyword.length - 1)
    console.log('search keyword ' + keyword[randNum])
    setStorageSync('isBidding', false)
    getStorageSync('isBidding', function(value) {
    	console.log('isBidding ' + value)
    })
    
    var step4 = function() {
    	var myVar = setInterval(function(){
    	getStorageSync('isBidding', function(isBidding) {
    		console.log('isBidding')
    		console.log(isBidding)
    		if (isBidding === false) {
                //alert('false')
                getStorageSync('totalAuction', function(totalAuction) {
                    console.log('totalAuction = ' + totalAuction)
                    console.log('validAuctionLink')
                    console.log(validAuctionLink)
                    if (totalAuction >= maxAuction) {
                        alert('totalAuction > maxAuction! stop auction!')
                        clearInterval(myVar)
                    } else {
                        if (validAuctionLink.length > 0) {
                            setStorageSync('isBidding', true)
                            dTime = 0
                            openNextAuction()
                        } else {
                            location.reload()
                        }
                    }
                })
    		} else {
                dTime += 3000
                if (dTime > maxTimeBidding) {
                    setStorageSync('isBidding', false)
                    dTime = 0
                }
                //alert('true')
            }
    	})
        }, 3000)
    }
    var step3 = function() {
        console.log('step 3');
        console.log('checkNewValidAuction')
        loadDoc('https://www.ebay.com/sch/i.html?_from=R40&_trksid=m570.l1313&_nkw=' + keyword[randNum] + '&_sacat=0&LH_TitleDesc=0&_sop=1&LH_Auction=1&_udhi=23%2C256&_osacat=0&_odkw=' + keyword[randNum] + '&rt=nc&LH_FS=1&LH_TitleDesc=0&_ipg=200', function(xhttp, url) {
            var d = document.createElement('div')
            d.innerHTML = xhttp.responseText
            var items = d.getElementsByClassName('s-item')
            console.log('Items')
            console.log(items)
            for (i = 0; i < items.length; i++) {
                saveValidAuction(items[i])
            }
            step4()
        })
    }
    var step2 = function() {
        console.log('Step2')
        var biddinglistElement = document.getElementById('biddinglist')
        var purchaseHistory = document.getElementById('purchase-history')
        var biddingItemRowList = null
        var purchaseHistorySellerIdList = null
        if (biddinglistElement != null) {
            biddingItemRowList = biddinglistElement.getElementsByClassName('my-row-r')
            console.log('biddingItemRowList')
            console.log(biddingItemRowList)
        }
        if (purchaseHistory != null) {
            purchaseHistorySellerIdList = purchaseHistory.getElementsByClassName('seller-id')
            console.log('purchaseHistorySellerIdList')
            console.log(purchaseHistorySellerIdList)
        }
        getStorageLocalSet('blacklistSellerIdSet', function(blacklistSellerIdSet) {
            console.log('blacklistSellerIdSet')
            console.log(blacklistSellerIdSet)
            // check won bid
            for (i = 0; i < purchaseHistorySellerIdList.length; i++) {
                var sellerId = purchaseHistorySellerIdList[i].textContent
                if (!blacklistSellerIdSet.has(sellerId)) {
                    console.log('Added new sellerId to blacklistSellerIdSet: ' + sellerId)
                    blacklistSellerIdSet.add(sellerId)
                }
            }
            // build bidding set
            if (biddingItemRowList != null && biddingItemRowList.length > 0) {
                console.log('build bidding set')
                for (i = 0; i < biddingItemRowList.length; i++) {
                    var sellerId = biddingItemRowList[i].getElementsByClassName('seller-id')[0].textContent
                    if (biddingItemRowList[i].getElementsByClassName('item-status outbid').length === 0) {
                        console.log('Added new sellerId to biddingSellerIdSet: ' + sellerId)
                        biddingSellerIdSet.add(sellerId)
                    }
                }
            }
            setStorageLocalSet('blacklistSellerIdSet', blacklistSellerIdSet)
            console.log('biddingSellerIdSet')
            console.log(biddingSellerIdSet)
            console.log('blacklistSellerIdSet')
            console.log(blacklistSellerIdSet)
            step3()
        })
    }
    step2();

    getStorageLocal('maxBidCount', function(maxBidCount) {
        maxAuction = parseInt(maxBidCount)
        console.log('maxAuction = ' + maxAuction)
    })
} else if ('https://www.ebay.com/myb/PurchaseHistory' === window.location.href.substr(0, 40)) {
    var index = 0
    var buttons = document.getElementsByClassName('paction btn  btn-m btn-prim')
    if (buttons.length === 0) {
        buttons = document.getElementsByClassName('paction fake-btn fake-btn--primary   btn-m')
    }
    console.log(buttons)
    setStorageLocal('isConfirmed', true)
    var myVar = setInterval(function() {
        getStorageLocal('isConfirmed', function(isConfirmed) {
            console.log('isConfirmed ' + isConfirmed)
            if (typeof(isConfirmed) === 'undefined' || isConfirmed === true) {
                setStorageLocal('isConfirmed', false)
                var pay_url = buttons[index++].getAttribute('href')
                if (pay_url.includes('https://pay.ebay.com')) {
                    window.open(pay_url)
                } else {
                    setStorageLocal('isConfirmed', true)
                }
                if (index >= buttons.length) {
                    clearInterval(myVar)
                    alert('DONE')
                }
            }
        })
    }, 1000)
    console.log(buttons.length)
} else if (document.getElementsByClassName('notifications ERROR').length > 0 && document.getElementsByClassName('notifications ERROR')[0].textContent.includes('Something went wrong. Please try to check out again.')) {
    window.location.reload()
} else if ('https://pay.ebay.com/rxo?action=view' === window.location.href.substr(0, 36)) {
    if (document.getElementsByClassName('radio__control').length > 1) {
        document.getElementsByClassName('radio__control')[1].click()
    }
    if (document.getElementsByClassName('btn btn--primary btn--large').length > 0) {
        document.getElementsByClassName('btn btn--primary btn--large')[0].click()
    }
} else if('https://pay.ebay.com/rxo?action=create' === window.location.href.substr(0, 38) || 'https://pay.ebay.com/rxo?action=confirm' === window.location.href.substr(0, 39)) {
    if (document.getElementsByClassName('notifications ERROR').length > 0 && document.getElementsByClassName('notifications ERROR')[0].textContent.includes('Something went wrong. Please try to check out again.')) {
        window.location.reload()
    }
} else if ('https://pay.ebay.com/rxo?action=success' === window.location.href.substr(0, 39)) {
    setStorageLocal('isConfirmed', true)
    window.close()
} else if ('https://www.paypal.com/webapps/helios/lipp?state=' === window.location.href.substr(0, 49)) {
//     document.getElementById('btnLogin').click()
} else if ('https://offer.ebay.com/ws/eBayISAPI.dll?MakeBid&item' === window.location.href.substr(0, 52)) {
    setStorageLocal('isConfirmed', true)
    window.close()
} 
console.log(window.location.href.substr(0, 52));

function openNextAuction() {
    console.log('Storage Local Auction Link: ')
    console.log(validAuctionLink)
    if (validAuctionLink.length > 0) {
        getStorageLocalSet('blacklistItemIdSet', function(blacklistItemIdSet) {
            console.log('openNextAuction Link: ' + validAuctionLink[0])
            var itemId = validAuctionLink[0].split('?')[0].split('/')[5]
            blacklistItemIdSet.add(itemId)
            setStorageLocalSet('blacklistItemIdSet', blacklistItemIdSet)
            window.open(validAuctionLink[0])
            validAuctionLink.splice(0, 1)
            console.log('Storage Local Auction Link After Splice: ')
            console.log(validAuctionLink)
        })
    }
}

function saveValidAuction(item) {
    console.log(item);
    if (item.getElementsByClassName('s-item__price').length === 0 || item.getElementsByClassName('s-item__seller-info-text').length === 0) {
        return;
    }
    var price = parseFloat(item.getElementsByClassName('s-item__price')[0].textContent.split('$')[1])
    var sellerInfoTxt = item.getElementsByClassName('s-item__seller-info-text')[0].textContent.split(' ')
    var sellerId = sellerInfoTxt[1].trim()
    var totalRating = parseInt(sellerInfoTxt[2].split('(').join('').split(')').join('').split(',').join(''))
    var feedbackPercent = parseFloat(sellerInfoTxt[3].split('%').join(''))
    //console.log(sellerInfoTxt)
    //console.log('Price: ' + price + '/userid: ' + sellerId + '/totalRating: ' + totalRating + '/feedbackPercent: ' + feedbackPercent)
    getStorageLocalSet('blacklistSellerIdSet', function(blacklistSellerIdSet) {
        getStorageLocalSet('blacklistItemIdSet', function(blacklistItemIdSet) {
            var link = item.getElementsByClassName('s-item__link')[0].getAttribute('href')
            var itemId = link.split('?')[0].split('/')[5]
            console.log('blacklistSellerIdSet')
            console.log(blacklistSellerIdSet)
            console.log('Checking/' + sellerId + '/' + totalRating + '/' + feedbackPercent + '/' + price + '/itemId: ' + itemId)
            console.log('validAuctionSellerIdSet: ')
            console.log(validAuctionSellerIdSet)
            console.log('blacklistItemIdSet')
            console.log(blacklistItemIdSet)
            if (!blacklistItemIdSet.has(itemId) && feedbackPercent > 97.5 && price < 0.45 && totalRating > 1000 && !blacklistSellerIdSet.has(sellerId) && !biddingSellerIdSet.has(sellerId) && !validAuctionSellerIdSet.has(sellerId)) {
                console.log('SAVE VALID AUCTION/' + sellerId + '/' + totalRating + '/' + feedbackPercent)
                validAuctionSellerIdSet.add(sellerId)
                console.log('SAVE VALID AUCTION LINK: ' + link)
                validAuctionLink.push(link)
            }
        })
    })
}