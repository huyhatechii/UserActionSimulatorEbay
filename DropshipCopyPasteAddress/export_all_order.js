var shippedOrderTransactions = []
var newShippedOrderTransactions = []
var trackingSet = new Set()
var index = 0
var checkOrderFunc = null
var checkNextOrderFunc = null

function removeNewOrderTransactions(aliexpressOrderid) {
    for (i = 0; i < newShippedOrderTransactions.length; i++) {
        if (newShippedOrderTransactions[i].aliexpressOrderid === aliexpressOrderid) {
            newShippedOrderTransactions.splice(i, 1);
            setStorageLocal('shippedOrderTransactions', newShippedOrderTransactions);
            console.log(newShippedOrderTransactions);
            break;
        }
    }
}

function fillSeedTrackingNumber() {

    checkOrderFunc = function(ali_orderid, ink_orderid) {
         loadDoc('https://trade.aliexpress.com/order_detail.htm?orderId=' + ali_orderid, function(xhttp) {
            //console.log('checkOrderFunc')
            var d = document.createElement('div')
            d.innerHTML = xhttp.responseText
            var shippingElement = d.getElementsByClassName('shipping-bd')
            var status = d.getElementsByClassName('order-status')[0];
            if (typeof(d.getElementsByClassName('order-status')[0]) != 'undefined') {
                status = status.textContent.trim();
            }
            // console.log('Shipping Element: ')
            // console.log(shippingElement)
            if (shippingElement.length > 0 && typeof(status) != 'undefined' && status != 'Closed') { // Aliexpress updated tracking number
                var tracking = shippingElement[0].getElementsByClassName('no')[0].textContent.trim()
                var carrier = shippingElement[0].getElementsByClassName('logistics-name')[0].textContent.trim()

                if (tracking.includes('LP') || tracking.includes('YP')) {
                    carrier = 'YANWEN'
                } else if (tracking.includes('LAO')) {
                    carrier = 'LAO POST'
                } else if (tracking.includes('SG')) {
                    carrier = '4PX Singapore Post OM Pro'
                }
                if (carrier === "Seller's Shipping Method") {
                    carrier = 'YANWEN'
                }
                if (trackingSet.has(tracking)) {
                    tracking = getRandomChinaPostTrackingNumber()
                    carrier = 'China Post'
                } else {
                    trackingSet.add(tracking)
                }
                console.log('Trackingset')
                console.log(trackingSet)
               // console.log('Aliexpress Track: ' + carrier + '/' + tracking)
                fillTracking(ink_orderid, tracking, carrier, function(xhttp) {
                    if (xhttp.status != 200) {
                        console.log('This order have error!!!!!/order: ' + ink_orderid);
                        checkNextOrderFunc()
                    } else {
                        var result = JSON.parse("[" + xhttp.responseText + "]")[0].orders_updated
                    if (result === 0) {
                        console.log('Tracking uploading failed/' + tracking + '/' + ink_orderid + '/' + carrier)   
                        fillTracking(ink_orderid, getRandomChinaPostTrackingNumber(), 'China Post', function(xhttp) {
                            result = JSON.parse("[" + xhttp.responseText + "]")[0].orders_updated
                            if (result === 0) {
                                 console.log('Tracking reupload fail!');
                            } else {
                                 console.log('Tracking reupload success!');
                                 removeNewOrderTransactions(ali_orderid);
                            }
                            checkNextOrderFunc()
                        })
                    } else {
                        console.log('Filled tracking for this order/' + ink_orderid + '/' + tracking + '/' + carrier);
                        removeNewOrderTransactions(ali_orderid);
                        checkNextOrderFunc();
                    }
                    }
                    
                })
            } else {
                if (status === 'Closed') {
                    removeNewOrderTransactions(ali_orderid);
                }
                //console.log('Order ' + ink_orderid + ' still have not tracking number available')
                checkNextOrderFunc()
            }
         })
    }
    checkNextOrderFunc = function() {
        //console.log('checkNextOrderFunc')
        if (index++ < shippedOrderTransactions.length) {
            if (typeof(shippedOrderTransactions[index]) != 'undefined') {
                var ink_orderid = '';
                var ali_orderid = shippedOrderTransactions[index].aliexpressOrderid;
                //console.log(ink_orderid + '/' + ali_orderid)
                getInkfrogOrderId(shippedOrderTransactions[index].username, shippedOrderTransactions[index].ebay_transactionid, shippedOrderTransactions[index].aliexpressOrderid, function(result) {
                    if (result != null) {
                        ink_orderid = result;
                        checkOrderFunc(ali_orderid, ink_orderid);
                    } else {
                        checkNextOrderFunc();
                    }
                });
            } else {
                checkNextOrderFunc()
            }
        } else {
            alert('DONE!')
            playDoneSound()
        }
    }
    getStorageLocal('shippedOrderTransactions', function(e) {
        if (typeof(e) != 'undefined') {
            shippedOrderTransactions = e
        }
        console.log('shippedOrderTransactions');
        console.log(shippedOrderTransactions);
        newShippedOrderTransactions = shippedOrderTransactions.slice();
        setStorageLocal('shippedOrderTransactions2', shippedOrderTransactions);
        checkNextOrderFunc();
    })
}


function getInkfrogOrderId(username, transactionid, aliexpressOrderid, cFunction) {
    loadDoc('https://open.inkfrog.com/listings/sold/json/getlistings.aspx?search=' + username, function(xhttp){
        var orders = JSON.parse("[" + xhttp.responseText + "]")[0].results
        if (orders.length > 0) {
            var found = false;
            orders.forEach(function(e){
                if (e.items[0].ebay_transactionid === transactionid) {
                    found = true;
                    var orderid = e.id
                    console.log('Found');
                    console.log('orderid = ' + orderid)
                    cFunction(orderid);
                }
            })
            if (!found) {
                removeNewOrderTransactions(aliexpressOrderid);
                cFunction(null);
            }
        } else {
            removeNewOrderTransactions(aliexpressOrderid);
            cFunction(null);
        }
    });
}

function fillTracking(ink_orderid, newTracking, carrier, cFunction) { 
    var data = "status_type=shipped&order=" + ink_orderid + "&shippingcarrier_" + ink_orderid + "=Custom&shippingcarrier_custom_" + ink_orderid + "=" + carrier + "&tracking_number_" + ink_orderid + "=" + newTracking
    requestDOC("https://open.inkfrog.com/listings/sold/json/change_status.aspx?", data, function(xhttp) {
        cFunction(xhttp)
    }, function(xhttp) {
        console.log('error!');
        cFunction(xhttp)
    })
}

function fillTShirtTrackingNumber() {
    var date = new Date()
    var m = date.getMonth() + 1
    var d = date.getDate()
    var data = 'start_date=' + (m-1) + '%2F' + d + '%2F' + '2019' + '&end_date=' + m + '%2F' + d + '%2F' + '2019'
    //var data = 'start_date=02%2F28%2F2019&end_date=03%2F29%2F2019&order_sort=&filter=all&start=41'
    requestDOC('https://customcat-beta.mylocker.net/?t=e.ViewOrders', data, function(xhttp){
        var d = document.createElement('div')
        d.innerHTML = xhttp.responseText
        var body = d.getElementsByClassName('table table-striped')[0].children[1].children
        for (i = 0; i < body.length; i++) {
            var orderid = body[i].children[4].textContent.trim()
            var trackingNumber = body[i].children[11].textContent.trim()
            fillTracking(orderid, trackingNumber)
        }
    })
    var fillTracking = function(orderid, newTracking) {
        console.log(orderid + '/' + newTracking)
        loadDoc('https://open.inkfrog.com/listings/sold/json/change_status.aspx?orders=' + orderid, function(xhttp){
            var tracking = JSON.parse("[" + xhttp.responseText + "]")[0][0].order_items[0].shiptracking
            var carrier = JSON.parse("[" + xhttp.responseText + "]")[0][0].order_items[0].shippingcarrier
            if (tracking === '' && newTracking != '') {
                playDoneSound()
                console.log('Filled tracking for this order/' + orderid + '/' + newTracking)
                var data = "status_type=shipped&order=" + orderid + "&shippingcarrier_" + orderid + "=Custom&shippingcarrier_custom_" + orderid + "=UPS&tracking_number_" + orderid + "=" + newTracking
                requestDOC("https://open.inkfrog.com/listings/sold/json/change_status.aspx?", data, function(xhttp) {
                })
            } else {
                console.log(orderid + 'skipped/current tracking: ' + tracking + '/new tracking: ' + newTracking)
            }
        })
    }
}

var orderList = []

function exportTShirtOrders() {
    var orders = []
    var index = 0
    var downloadFile = null
    var loadNextOrder = function() {
        var order = orders[index++]
        loadDoc("https://open.inkfrog.com/listings/sold/" + order.id, function(xhttp) {
            var order = getOrderFromResponse(xhttp.responseText)
            createDataFromOrder(order)
            if (index < orders.length) {
                loadNextOrder()
            } else {
                downloadFile()
            }
            console.log(order)
        })
    }
    var loadPage = function() {
         loadDoc('https://open.inkfrog.com/listings/sold/json/getlistings.aspx?shipping_status=unshipped&search=shirt&payment_status=paid', function(xhttp) {
            orders = JSON.parse("[" + xhttp.responseText + "]")[0].results
            loadDoc('https://open.inkfrog.com/listings/sold/json/getlistings.aspx?shipping_status=unshipped&search=cotton&payment_status=paid', function(xhttp) {
                orders = orders.concat(JSON.parse("[" + xhttp.responseText + "]")[0].results)
                loadNextOrder()
                console.log(orders)
            })
        })
    }
   
    loadPage()

    var headers = {
        orderId: "OrderId",
        quanity: "Quantity",
        designId: "DesignId",
        sku: "Sku",
        productId: "ProductId",
        productName: "ProductName",
        color: "Color",
        size: "Size",
        designPosition: "DesignPosition",
        shipToFirstName: "ShipToFirstName",
        shipToLastName: "ShipToLastName",
        shipToAddress: "ShipToAddress",
        shipToAddress2: "ShipToAddress2",
        shipToCity: "ShipToCity",
        shipToZip: "ShipToZip",
        shipToState: "ShipToState",
        shipToCountry: "ShipToCountry",
        shipToPhone: "ShipToPhone",
        shippingMethod: "ShippingMethod",
        customerEmail: "CustomerEmail",
        designURL: "DesignURL",
        exactArtwork: "ExactArtwork"
    };
    var itemsFormatted = [];
    downloadFile = function() {
        console.log('Download file');
        if (!chrome.runtime.error) {
            console.log(orderList)
                if (orderList.length != 0) {
                    orderList.forEach(function(element, index) {
                        itemsFormatted.push({
                            orderId: element[0],
                            quanity: element[1],
                            designId: element[2],
                            sku: element[3],
                            productId: element[4],
                            productName: element[5],
                            color: element[6],
                            size: element[7],
                            designPosition: element[8],
                            shipToFirstName: element[9],
                            shipToLastName: element[10],
                            shipToAddress: element[11],
                            shipToAddress2: element[12],
                            shipToCity: element[13],
                            shipToZip: element[14],
                            shipToState: element[15],
                            shipToCountry: element[16],
                            shipToPhone: element[17],
                            shippingMethod: element[18],
                            customerEmail: element[19],
                            designURL: element[20],
                            exactArtwork: element[21]
                        })
                    });
                    var d = new Date();
                    var fileName = d.getDate() + '-' + (d.getMonth()+1) + '-tshirt-order.csv'
                    exportCSVFile(headers, itemsFormatted, fileName)
                    playDoneSound()
                }
                else {
                    console.log("There is no data to export or please wait a minute to finish all details pages!" + "dataLength: " + orderList.length + " < orderListLength: " + totalOrder);
                }
        }
   
    }
}

function createDataFromOrder(order) {
    var firstName = order.shipping_address.first_name
    var lastName = order.shipping_address.last_name
    var streetAddress1 = order.shipping_address.address1.split(';').join(',')
    var streetAddress2 = order.shipping_address.address2.split(';').join(',')
    var city = order.shipping_address.city.split(';').join(',')
    var state = order.shipping_address.state
    var zipcode = order.shipping_address.zip
    var country = order.shipping_address.country
    var phoneNumber = order.shipping_address.phone
    var email = order.email
    var data = []
    for (j = 0; j < order.order_items.length; j++) {

        var item = order.order_items[j]
        console.log('item');
        console.log(item);
        console.log('order');
        console.log(order);
        var productUrl = "https://www.ebay.com/itm/" + item.ebay_itemid + "/"
        var productTitle = item.product_title
        var quantity = item.quantity
        var designId = getDesignId(productTitle)
        var sku = item.sku
        var color = item.product_options[0].value
        var size = item.product_options[1].value
        data = [order.id, quantity, designId, sku, 'G200', 
        productTitle, color, size, '', firstName, lastName, 
        streetAddress1, streetAddress2, city, zipcode, state, 
        country, phoneNumber, 'Economy', email, '', 'TRUE']
        console.log(data)
        for (i = 0; i < orderList.length; i++) {
            if (orderList[i][0] === order.id) {
                return;
            }
        }
        orderList.push(data)
       // saveDataToLocalStorage('orderList', data)
    }
}

function getDesignId(title) {
    var parts = title.split(' ')
    var lastPart = parts[parts.length - 1]
    if (lastPart.includes('N') && hasNumber(lastPart)) {
        return lastPart
    } else {
        return title
    }
}