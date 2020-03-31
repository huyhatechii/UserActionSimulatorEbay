if ("docs.google.com" === window.location.hostname) {
    if (confirm('Bạn muốn cập nhật tất cả tracking number không?')) {
    var sheet = document.getElementsByClassName("waffle")[0].children[1].children;
    var orders = []
    var trackings = []
    var i = 1
    //console.log(sheet)
    
    var f = function() {
        //console.log(i + 'ok')
        var tracking;
        var orderid;
        if (typeof(sheet[i].children[15].children[0]) === "undefined") {
           tracking = sheet[i].children[15].textContent;
        } else {
            tracking = sheet[i].children[15].children[0].textContent.trim();
        }
        if (typeof(sheet[i].children[2].children[0]) === "undefined") {
           orderid = sheet[i].children[2].textContent;
        } else {
            orderid = sheet[i].children[2].children[0].textContent.trim();
        }
        i++
        console.log('orderid: ' + orderid + '/tracking: ' + tracking)
        if (orders.includes(orderid) === false && trackings.includes(tracking) === false) {
            orders.push(orderid)
            trackings.push(tracking)
            loadDocWithTracking("https://open.inkfrog.com/listings/sold/" + orderid, tracking, function(xhttp, url, tracking) {
            var order = getOrderFromResponse(xhttp.responseText)
            var items = order.order_items;
            var trackingPath = "https://open.inkfrog.com/listings/sold/json/change_status.aspx?status_type=shipped&order=" + order.id + "&shippingcarrier_" + order.id + "=Custom&shippingcarrier_custom_" + order.id + "=Yanwen&tracking_number_" + order.id + "=" + tracking;
            var notePath = "https://open.inkfrog.com/listings/sold/" + order.id + ".json?action=update_notes&internal_note=addedtracking";
            var firstName = order.shipping_address.first_name.charAt(0).toUpperCase() + order.shipping_address.first_name.substr(1).toLowerCase();
            var notes = order.internal_note;
            if (notes === "") {
                console.log(order);
                    var itemid = items[0].ebay_itemid;
                    var messagePath = "https://open.inkfrog.com/messages/json/sendnew.aspx?" + "order_id=" + order.id + "&message_type=CustomizedSubject&message=Dear+" + firstName + "%2C%0A%0AThis+is+your+tracking+number%3A+" + tracking + "%0AYou+can+check+your+order+here%3A+https%3A%2F%2Ftrack.aftership.com%2Fyanwen%2F" + tracking + "3F%0AI+also+sent+the+gift+seed+to+follow+your+order%0ABy+the+way%2C+please+take+your+time+if+you+can+rate+5*+for+this+transaction.%0AYou+can+also+leave+feedback+through+your+purchase+history.+If+you+haven't+already%2C+you'll+see+the+option+to+leave+feedback.%0AYou+can+then%3A%0A-+Select+an+overall+feedback+rating+%E2%80%93+positive%2C+neutral%2C+or+negative%0A-+Rate+aspects+of+the+transaction+%E2%80%93+including+whether+the+item+arrived+on+time%2C+the+accuracy+of+the+item+description%2C+shipping+costs%2C+and+the+seller's+communication%0A-+Write+a+comment+about+your+experience%0A%0AThank+you+so+much%2C%0A" + getNickNameFromUserId(order.userid) + "&subject=Tracking+number+updated&ebay_itemid=" + order.order_items[0].ebay_itemid + "&ebay_userid=" + order.ebay_userid + "&recipient_username=" + order.ebay_buyer_username + "&attachment_urls=&attachment_names=&send_a_copy=false"
                    // Add notes
                    requestDOCWithSkipStatus(notePath, '', function(xhttp) {
                        // Add tracking number
                        requestDOC(trackingPath, '', function(xhttp) {
                            // Send message
                            requestDOC(messagePath, '', function(xhttp) {
                                f()
                            })
                        })
                    })            
             } else {
                console.log("Skip update tracking id for oderid:" + order.id)
                f()
            }
            })
        } else {
            f()
        }
    }

    var orderColumnName;
    var trackingColumnName;

    if (typeof(sheet[0].children[2].children[0]) === "undefined") {
        orderColumnName = sheet[0].children[2].textContent.toLowerCase()
    } else {
        orderColumnName = sheet[0].children[2].children[0].textContent.toLowerCase()
    }
    for (j = 0; j < 30; j++) {
        if (typeof(sheet[0].children[j].children[0]) === "undefined") {
            trackingColumnName = sheet[0].children[j].textContent.toLowerCase()
        } else {
            trackingColumnName = sheet[0].children[j].children[0].textContent.toLowerCase()
        }
        if (trackingColumnName === 'tracking number') {
            break
        }
    }

    if (orderColumnName === 'order id' && trackingColumnName === 'tracking number') {
        console.log('Starting filling tracking number' + orderColumnName + '/' + trackingColumnName)
        f()
    } else {
        alert('Invalid column/' + orderColumnName + '/' + trackingColumnName)
    }
    console.log(orderColumnName + '/' + trackingColumnName)

} else {
    // Do nothing!
}

} 