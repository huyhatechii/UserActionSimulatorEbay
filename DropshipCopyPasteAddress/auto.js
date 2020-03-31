var timeAutoRefill = 3 // minutes     
var timeSyncSold = 5
var timeAutoShipping = 60 // minutes
var defaultQuantity = 1        

function fillQuantityErrorListings() {
    loadDoc('https://open.inkfrog.com/logs/json/getlogs.aspx?search=Unable+to+sync+quantity+for+eBay+item&_=1549765569116', function(xhttp){
        var results = JSON.parse("[" + xhttp.responseText + "]")[0].results
        var data = "savelistings="
        var data2;
        for (i = 0; i < results.length; i++) {
            var id = results[i].message_full.split("href='/listings/edit/")[1].split("'>View Listing")[0]
            data += id + "%2C"
        }
        data2 = data
        data = data.substr(0, data.length - 3) + '&quantity=' + 2 + '&removevariantsfrom=&removevariantsto='
        data2 = data2.substr(0, data2.length - 3) + '&quantity=' + defaultQuantity + '&removevariantsfrom=&removevariantsto='
        //change quanity of all items
        requestDOC("https://open.inkfrog.com/listings/bulkedit/inventory/", data, function(xhttp) {
            requestDOC("https://open.inkfrog.com/listings/bulkedit/inventory/", data2, function(xhttp) {
           
            })
        })
    })
}

function getNewSeedPrice(oldPrice, soldQuantity) {
    if (soldQuantity > 20) {
        return 2.49
    } else if (soldQuantity >= 10) {
        return 2.49
    } else if (soldQuantity >= 5) {
        return 2.49
    } else if (soldQuantity >= 3){
        return 2.49
    } else {
        return 2.49
    }
}

function repricing(orders) {
    var index = 0
    var f = function() {
        var order = orders[index++]
        //console.log(order)
        loadDoc('https://open.inkfrog.com/listings/sold/json/getlistings.aspx?search=' + order.ebay_itemid, function(xhttp) {
            var numSold = JSON.parse("[" + xhttp.responseText + "]")[0].results.length
            var oldPrice = parseFloat(order.price.substr(1, order.price.length))
            var newPrice = getNewSeedPrice(oldPrice, numSold)
            if (newPrice != oldPrice && oldPrice < 5 && newPrice < 5 && newPrice > 0.99) {
                console.log('Updated Ebay item ' + order.ebay_itemid + ' to new price' + '/Num sold = ' + numSold + "/oldPrice: " + oldPrice + "/newPrice: " + newPrice)
                var data = 'modified_variants=' + order.variations[0].id + '&listingtype_' + order.variations[0].id + '=FixedPriceItem&variant_price_' + order.variations[0].id + '=' + newPrice + '&start_price_' + order.variations[0].id + '=' + newPrice + '&reserve_price_' + order.variations[0].id + '=&bin_price_' + order.variations[0].id + '=' + newPrice + '&sale_price_' + order.variations[0].id + '=&sale_pricetype_' + order.variations[0].id + '=1'
                requestDOC('https://open.inkfrog.com/listings/bulkedit/pricing/', data, function(xhttp) {
                    console.log('Changed quantity of all items')
                })
            }
            if (index < orders.length) {
                f()
            }
        })
    }
    f()
}

function runRepricing(pageQuantity) {
    var page = 1
    var f = function() {
        loadDoc('https://open.inkfrog.com/listings/json/getlistings.aspx?search=seed&limit=250&ebay_status=live&price=<2.5&page=' + page, function(xhttp) {
            var orders = JSON.parse("[" + xhttp.responseText + "]")[0].results
            if (orders != null) {
                repricing(orders)
            }
            if (page <= pageQuantity) {
                f()
            }
        })
    }
    f()
}

function runAutoRefill() {
    var autoRefill = function() {
        console.log("Checking-AutoRefill!")
        // Get inventory with quanity = 0
        loadDoc('https://open.inkfrog.com/listings/json/getlistings.aspx?inventory=%3D0&limit=250&hidden=false', function(xhttp) {
            var orders = JSON.parse("[" + xhttp.responseText + "]")[0].results
            var data = "savelistings="
            if (orders != null) {
                for (i = 0; i < orders.length; i++) {
                    data += orders[i].id + "%2C"
                }
                data = data.substr(0, data.length - 3) + '&quantity=' + defaultQuantity + '&removevariantsfrom=&removevariantsto='
                //change quanity of all items
                requestDOC("https://open.inkfrog.com/listings/bulkedit/inventory/", data, function(xhttp) {
                    console.log('Changed quantity of all items')
                    //repricing(orders)
                })
            }
        })
    }
    
    autoRefill()

    // Auto Refill
    setInterval(function() {
        autoRefill()
    }, timeAutoRefill * 60 * 1000)
}

function runAutoShipping() {
    var index = 0
    var orders = ''
    var trackingNumber = ''
    var totalPage = 1
    var currentPage = 1
    var getListOrder = function(page) {
        console.log('Auto Shipping page: ' + page)
        if (page > totalPage) {
            return
        }
        index = 0
        loadDoc('https://open.inkfrog.com/listings/sold/json/getlistings.aspx?payment_status=paid&shipping_status=unshipped&limit=250&page=' + page, function(xhttp) {
            orders = JSON.parse("[" + xhttp.responseText + "]")[0].results
            totalPage = JSON.parse("[" + xhttp.responseText + "]")[0].total_pages
            console.log('order size: ' + orders.length)
            console.log('total page: ' + totalPage);
            if (orders.length > 0) {
                processingOrder(orders[index++])
            }
        })

    }
    var processingOrder = function(order) {
        var deltaTime = getDeltaOrderHours(order.order_date)
        // console.log('deltaTime: ' + deltaTime)
        // console.log(order.items[0].product_title.toLowerCase())
        // console.log(index)
        if (deltaTime > 72) {
            //console.log('deltaTime > 2')
            if (order.items[0].product_title.toLowerCase().includes('shirt')) {
                if (index < orders.length) {
                    processingOrder(orders[index++])
                } else {
                    getListOrder(++currentPage)
                }
            } else if (order.items[0].product_title.toLowerCase().includes('seeds')) {
                markShip(order)
            } else if (order.items[0].price < 5) {
                markShip(order)
            }
        } else {
           // console.log('deltaTime < 2')
            if (index < orders.length) {
                processingOrder(orders[index++])
            } else {
                getListOrder(++currentPage)
            }
        }
    }
    var markShip = function(order) {
        trackingNumber = getRandomChinaPostTrackingNumber()
        //var data = "status_type=shipped&order=" + order.id + "&shippingcarrier_" + order.id + "=Custom&shippingcarrier_custom_" + order.id + "=ChinaPost&tracking_number_" + order.id + "=" + trackingNumber;
        var data = "status_type=shipped&order=" + order.id + "&shippingcarrier_" + order.id + "=Custom&shippingcarrier_custom_" + order.id + "=&tracking_number_" + order.id + "=";
        requestDOC("https://open.inkfrog.com/listings/sold/json/change_status.aspx?", data, function(xhttp) {
            sendMessage(order)
        })
    }
    var sendMessage = function(order) {
        var firstName = jsUcfirst(order.ordered_by.split(' ')[0])
        loadDoc("https://open.inkfrog.com/listings/sold/" + order.id, function(xhttp) {
            var order = getOrderFromResponse(xhttp.responseText)
            var data = 'order_id=' + order.id + '&message_type=CustomizedSubject&message=Dear+' + firstName + '%2C%0A%0AI+have+shipped+your+order%2C+i+hope+you+can+get+the+goods+as+soon+as+possible.+The+tracking+number+is+' + trackingNumber + '%0AI+labelled+your+seed+and+added+the+instruction.+I+also+sent+the+gift+of+Rose+seeds+for+you.%5E%5E+%0ANote%3A+*If+you+have+more+than+one+order%2C+they+may+come+in+different+order+at+different+times.%0ATransportation+of+goods+usually+takes+20-40+days+%2C+Please+wait+patiently%0AIf+the+item+not+arrive+within+50+days.+Please+let+me+know%2C+i+will+send+the+full+refund+or+resend+the+order+%5E_%5E+%0A%0AIf+you+like+this+transaction+please+take+a+minute+and+leave+us+a+5+star+positive+feedback.+%0AThis+is+the+guide+to+leaving+feedback%3A+ebay.com%2Fhelp%2Fbuying%2Fleaving-feedback-sellers%2Fleaving-feedback-sellers%3Fid%3D4007%0APlease+let+me+know+when+you+are+done.+Thank+you+so+much+in+advance.+%0A%0ALook+forward+to+your+next+cooperation+%5E_%5E%0ABest+regards%2C%0A' + getNickNameFromUserId(order.userid) + '&subject=Thank+you+for+your+order!&ebay_itemid=' + order.order_items[0].ebay_itemid + '&ebay_userid=' + order.ebay_userid + '&recipient_username=' + order.ebay_buyer_username + '&attachment_urls=&attachment_names=&send_a_copy=false'
            // Send message
            requestDOC('https://open.inkfrog.com/messages/json/sendnew.aspx', data, function(xhttp) {
                if (index < orders.length) {
                    processingOrder(orders[index++])
                } else {
                    getListOrder(++currentPage)
                }
            })
        })
    }

    getListOrder(1)
    setInterval(function() {
        currentPage = 1
        totalPage = 1
        getListOrder(1)
    }, timeAutoShipping * 60 * 1000)
}

function getDeltaOrderHours(orderDateStr) {
    var currentDate = new Date()
    var d = orderDateStr
    var c = d.split(" ")
    var t, h, m;
    if (c[2].indexOf('am') != -1) {
        t = c[2].split('am')[0]
        h = parseInt(t.split(':')[0])
        m = parseInt(t.split(':')[1])
        if (h === 12) {
            h = 0
        }
    } else {
        t = c[2].split('pm')[0]
        h = parseInt(t.split(':')[0])
        m = parseInt(t.split(':')[1])
        if (h < 12) {
            h += 12
        }
    }
    var orderDate = new Date(2019, getMonthNumber(c[0]), c[1], h, m, 0)
    var milliseconds = Math.abs(currentDate - orderDate)
    var dh = (milliseconds / 1000) / 3600
    return dh
}

function getRandomChinaPostTrackingNumber() {
    var tracking = 'RR'
    for (var i = 0; i < 10; i++) {
        tracking += getRandomInt(1, 9).toString()
    }
    tracking += 'CN'
    return tracking
}

if("https://open.inkfrog.com/auto" === window.location.href) { //**********************************************************************************************************************************************************************************************************************************************************************************************
    //clearDataToLocalStorage('pendingOrder')                           //**********************************************************************************************************************************************************************************************************************************************************************************************
    var timeAutoShipping = 60 // minutes                                    //**********************************************************************************************************************************************************************************************************************************************************************************************
    var timeAutoRefill = 10 // minutes                                   //**********************************************************************************************************************************************************************************************************************************************************************************************
    var timeAutoMessage = 60
    var timeSyncSold = 5
    console.log("All Function Running!!")

    // checking messages
    var messageIdArr = []
    setInterval(function(){ 
    console.log('checking messages')
    loadDoc('https://open.inkfrog.com/messages/json/getmessages.aspx', function(xhttp) {
    var messages = JSON.parse("[" + xhttp.responseText + "]")[0].results
    //console.log(messageIdArr)
    for (i = 0; i < messages.length; i++) {
        if (messageIdArr.includes(messages[i].id) === false && messages[i].flagged === false) {
            loadDocWithData('https://open.inkfrog.com/messages/view/body/?id=' + messages[i].id, messages[i].id,  function(xhttp, messageId) {
            messageIdArr.push(messageId)
            //console.log(messageIdArr)
            if (isFlagThisMessage(xhttp.responseText)) {
                console.log('Flag new message id: ' + messageId)
                requestDOC('https://open.inkfrog.com/messages/?action=flag&messages=' + messageId + '&folderid=', '', function(xhttp) {
                    requestDOC('https://open.inkfrog.com/messages/?action=unread&messages=' + messageId + '&folderid=', '', function(xhttp) {
                    
                    })
                })
            }
            })
        }
    }
    })
    }, timeAutoMessage*60*1000)

} 

function isFlagThisMessage(message) {
    var t = ['no received', 'have not received', 'haven\'t received', 'not received', 'no receive', 'not receive', 'where is', 'where\'s', 'refund', 'negative feedback', 'bad feedback', 'dispute', 'open case', 'not arrive', 'claim', 'stop', 'cancel', 'report', 'never received', 'why', 'can not', 'can\'t', 'cannot', 'fake', 'return']
    for (i = 0; i < t.length; i++) {
        if (message.indexOf(t[i]) > -1 && message.indexOf('eBay sent this message') === -1 && message.indexOf('Please do not reply to this email') === -1 && message.indexOf('Please don\'t reply to this message') === -1) {
            return true
        }
    }
    return false
}
