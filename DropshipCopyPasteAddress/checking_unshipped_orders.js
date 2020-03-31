var unshippedOrders = []
var shippedOrderTransactions = []
const MIN_DAY_NUMBER = 6

var productDatabase = []
var errorOrderSet = new Set()

getStorageLocal('unshippedOrders', function(e) {
	if (typeof(e) != 'undefined') {
    	unshippedOrders = e
    }
    console.log('unshippedOrders');
    console.log(unshippedOrders);

    getStorageLocal('shippedOrderTransactions', function(e) {
        if (typeof(e) != 'undefined') {
            shippedOrderTransactions = e
        }
        console.log('shippedOrderTransactions');
        console.log(shippedOrderTransactions);
    })
    getStorageLocal('productDatabase', function(e) {
        if (typeof(e) != 'undefined') {
            productDatabase = e
        }
        console.log('productDatabase');
        console.log(productDatabase);
    })
    getStorageLocalSet('errorOrderSet', function(e) {
        if (typeof(e) != 'undefined') {
            errorOrderSet = e
        }
        console.log('errorOrderSet');
        console.log(e);
    })
    //setStorageLocalSet('errorOrderSet', new Set([]));
    //setStorageLocal('unshippedOrders', [])


    setStorageLocal('productDatabase', [])
    productDatabase = [];
    document.getElementsByClassName('content-container')[0].children[0].innerHTML = '';
    newFunc();


    
    // $unshippedOrdersClone = [];
    // $unshippedOrdersClone = unshippedOrders.slice(0);
    // $index = 0;

    // console.log('unshippedOrdersClone');
    // console.log($unshippedOrdersClone);

    // var f = function() {
    //     $order = unshippedOrders[$index];
    //     var jqxhr = $.ajax( "https://open.inkfrog.com/listings/sold/" + $order.id)
    //     .done(function(responseText) { 
    //         var order2 = getOrderFromResponse(responseText);
    //         console.log(order2); 
    //         if (order2.ebay_seller_username === 'seedca') {
    //             console.log('will remove order: ' + order2.id);
    //             $unshippedOrdersClone.forEach(function(e, index2){
    //                 if (e.id === order2.id) {
    //                     console.log('remove order: ' + e.id);
    //                     $unshippedOrdersClone.splice(index2, 1);
    //                     console.log($unshippedOrdersClone);
    //                 }
    //             });
    //         }
    //         $index++;
    //         if ($index < unshippedOrders.length) {
    //             f();
    //         } else {
    //             console.log('done!');
    //             setStorageLocal('unshippedOrders', $unshippedOrdersClone)
    //         }
    //     })
    //     .fail(function() { 
    //         console.log('eeror ' + $order.id);
    //         $index++;
    //          if ($index < unshippedOrders.length) {
    //             f();
    //         } else {
    //             console.log('done!');
    //             setStorageLocal('unshippedOrders', $unshippedOrdersClone)
    //         }
    //     })
    // };

    // f();

})

function newFunc() {
    var btn = createButton('Upload Orders To DSERS')
    var btn2 = createButton('Open Shipping Tabs')
    console.log('Check new unshipped orders')
    document.getElementsByClassName('content-container')[0].children[0].innerHTML = ''
    document.getElementById('header').children[0].textContent = 'New Orders'
    //checkUnshippedOrder()
    btn.onclick = function() {
        if (validatePassword()) {
            updateProductDatabase()
            uploadProductOrder()
        }
    }
    btn2.onclick = function() {
        window.open('https://www.aliexpress.com/wholesale?catId=0&initiative_id=SB_20190402063653&SearchText=plant')
        window.open('https://www.dsers.com/#/newfeature/list/csv')
    }
    document.getElementsByClassName('content-container')[0].appendChild(btn2)
    document.getElementsByClassName('content-container')[0].appendChild(btn)

    var checkNextPage = function(page) {
        console.log('Check new unshipped orders page: ' + page);
        loadDoc('https://open.inkfrog.com/listings/sold/json/getlistings.aspx?limit=100&payment_status=paid&page=' + page, function(xhttp) {
            var results = JSON.parse("[" + xhttp.responseText + "]")[0].results
            var hasNewOrder = false
            // results.forEach(function(e, index) {
            //     if (isNewOrder(e)) {
            //         console.log('add new order');
            //         console.log(e);
            //         unshippedOrders.push(e)
            //         hasNewOrder = true
            //     }
            //     // if (e.order_date.includes('Jun 23')) {
            //     //     hasNewOrder = false;
            //     //     console.log('Contain Jun 23')
            //     // }
            // })
            if (hasNewOrder) {
                checkNextPage(++page)
            } else {
                console.log('unshippedOrders Final');
                console.log(unshippedOrders);
                setStorageLocal('unshippedOrders', unshippedOrders)
                // set all display to false
                unshippedOrders.forEach(function(e){
                	e.hasnotes = false
                })
                displayUnshippedOrders()
            }
        })
    }
    checkNextPage(1)
}

var pendingAliOrders = []

function uploadProductOrder() {
    console.log('uploadProductOrder')
    var headers = {
        date: "date",
        order_number: "order_number",
        line_item_number: "line_item_number",
        email: "email",
        contact_person: "contact_person",
        address: "address",
        address2: "address2",
        ZIP: "ZIP",
        city: "city",
        province: "province",
        country: "country",
        product_count: "product_count",
        product_id: "product_id",
        SKU: "SKU",
        cpf: "cpf",
        full_name: "full_name",
        phone_country: "phone_country",
        mobile_no: "mobile_no",
        order_memo: "order_memo",
        shipping_method: "shipping_method",
        cost: "cost(total cost of order)",
        AliExpress_order_number: "AliExpress_order_number",
        tracking_no: "tracking_no",
        status: "status"
    };
    
    unshippedOrders.forEach(function(order){
        if (typeof(order.productMap) != 'undefined' && typeof(order.address) != 'undefined') {
            order.productMap.forEach(function(product){
                var dbProduct = getProductFromDatabase(product);
                createNewPendingAliOrder(order, dbProduct, product.quantity, order.address);
            });
            
        }
        if (typeof(order.productMap) != 'undefined' && typeof(order.address) === 'undefined') {
            errorOrderSet.add(order.id);
            setStorageLocalSet('errorOrderSet', errorOrderSet);
            console.log(errorOrderSet);
        }
    });

    console.log('pendingAliOrders Lastest');
    console.log(pendingAliOrders);
    if (pendingAliOrders.length > 0) {
        uploadProductDatabase()
        var fileName = getCurrentTimeStr() + '-order.csv'
        var blob = convertCSVBlob(headers, pendingAliOrders, fileName);
        blob.lastModifiedDate = new Date();
        blob.name = fileName
        var formData  = new FormData();
        formData.append('file', blob, fileName);
        //exportCSVFile(headers, pendingAliOrders, fileName)
        getStorageLocal('dsersToken', function(token){
            requestCSV_Dsers('https://www.dsers.com/api/v1/order/csv/order/import', formData, token, function(xhttp){
                console.log('upload order file success');
                sendMessage('upload orders to dsers')
                exportCSVFile(headers, pendingAliOrders, fileName)
            })
        })
    }
}

function uploadProductDatabase() {
    var headers = {
        product_id: 'product_id',
        mySku: "SKU(your product SKU)",
        aliUrl: "AliExpress_url",
        aliSku: "SKU(AliExpress SKU)",
        sellerId: "AliExpress_seller_id (Optionall)"
    };

    var itemsFormatted = [];
    productDatabase.forEach(function(element, index) {
        itemsFormatted.push({
            product_id: element.productId,
            mySku: element.mySku.replace(/,/g, ''),
            aliUrl: element.productURL,
            aliSku: element.aliSku.replace(/,/g, ''),
            sellerId: ''
        })
    })
    var fileName = getCurrentTimeStr() + '-database.csv'
    var blob = convertCSVBlob(headers, itemsFormatted, fileName);
    blob.lastModifiedDate = new Date();
    blob.name = fileName
    var formData  = new FormData();
    formData.append('file', blob, fileName);
    getStorageLocal('dsersToken', function(token){
        requestCSV_Dsers('https://www.dsers.com/api/v1/order/csv/product/import', formData, token, function(xhttp){
            console.log('upload database file success');
        })
    })
}

function createNewPendingAliOrder(order, dbProduct, quantity, address) {
    var city = address.buyercity.replace(/,/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    var province = address.buyerstateprovince.replace(/,/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    var country = address.buyercountry.replace(/,/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    var address1 = address.buyeraddress1.replace(/,/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    var address2 = address.buyeraddress2.replace(/,/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    var zip = address.buyerzip.replace(/,/g, '')

    if (address1.length > 99) {
        address1 = address1.substr(0, 95)
    }
    if (address2.length > 99) {
        address2 = address2.substr(0, 95)
    }
    var mobileno = '964444181'
    if (address.phone != '') {
        mobileno = address.phone
    }
    if (province === '') {
        province = city
    }
    if (city === '') {
        city = province
    }
    if (province === '' && city === '') {
        province = country
        city = country
    }
    if (zip === '') {
        zip = '0000';
    }
    var newOrder = {
        date: " ", // remove commas to avoid errors
        order_number: order.id,
        line_item_number: " ",
        email: " ",
        contact_person: address.buyercontactname.replace(/,/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
        address: address1,
        address2: address2,
        ZIP: zip,
        city: city,
        province: province,
        country: country,
        product_count: quantity,
        product_id: dbProduct.productId,
        SKU: dbProduct.mySku,
        cpf: " ",
        full_name: address.buyercontactname.replace(/,/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
        phone_country: "1",
        mobile_no: mobileno,
        order_memo: "Please DO NOT combine order when having the same buyer address for multiple orders! I need unique tracking number for each order. If you do wrong I will do not buy again and return all packages. Please also label name the seed and DO NOT POST the INVOICE on the PACKAGE. Make the package as GIFT to avoiding large import. Thank you very much!",
        shipping_method: " ",
        cost: " ",
        AliExpress_order_number: " ",
        tracking_no: " ",
        status: " "
    };
    console.log(newOrder)
    pendingAliOrders.push(newOrder)
    console.log('pendingAliOrders after');
    console.log(pendingAliOrders);
}

function updateProductDatabase() {
    var isChanged = false
    unshippedOrders.forEach(function(order){
        if (typeof(order.productMap) != 'undefined') {
            order.productMap.forEach(function(product){
                if (hasProductInDatabase(product) === false) {
                    addNewProductToDatabase(product)
                    isChanged = true
                }
            });
        }
    });
    
    getStorageLocal('productDatabase', function(e) {
        console.log('productDatabase');
        console.log(productDatabase);
    })
}

function getProductFromDatabase(aliProduct) {
    //console.log('getProductFromDatabase');
    //console.log(aliProduct);
    let found = false;
    var product = null
    productDatabase.forEach(function(e){
        //console.log(e);
        if (aliProduct.productId === e.aliProductId && aliProduct.selectedSku === e.aliSku) {
            found = true
            product = e
            return
        }
    })
    return product
}

function addNewProductToDatabase(product) {
    console.log('addNewProductToDatabase');
    var length = product.skuProducts.length
    var mySku = 'PRODUCT_' + (productDatabase.length + 1)
    var selectedSku = product.selectedSku
    var productId = productDatabase.length + 1
    productDatabase.push({
        productId: productId,
        mySku: mySku,
        aliProductId: product.productId,
        productURL: product.productURL,
        aliSku: selectedSku
    })
    console.log(productDatabase);
    setStorageLocal('productDatabase', productDatabase)
}


function hasProductInDatabase(product) {
    var selectedSku = product.selectedSku
    for (k = 0; k < productDatabase.length; k++) {
        if (productDatabase[k].aliProductId === product.productId && productDatabase[k].aliSku === selectedSku) {
            return true
        }
    }
    return false
}

function isNewOrder(order) {
    var transactionid = order.items[0].ebay_transactionid
    var title = order.items[0].product_title.toLowerCase()
    var dayNumber = parseInt(order.order_date.split(' ')[1]) 
    var monthTxt = order.order_date.split(' ')[0]
    var username = order.buyer_username
    if ((dayNumber < MIN_DAY_NUMBER && monthTxt === 'May') || title.includes('shirt') || title.includes('cotton')) {
        return false
    }
    for (i = 0; i < unshippedOrders.length; i++) {
        if (unshippedOrders[i].buyer_username === username && unshippedOrders[i].items[0].ebay_transactionid === transactionid) {
            return false
        }
    }
    for (i = 0; i < shippedOrderTransactions.length; i++) {
    	if (shippedOrderTransactions[i].ebay_transactionid === transactionid) {
    		return false
    	}
    }
    if (order.order_date.includes('Jun 23') || order.order_date.includes('Jul 5') || order.order_date.includes('Jul 3')) {
        console.log('Include Jun 5 - 3 - 23')
        return false;
    }
    return true
}

function getAddressFromOrder(order, cFunction) {
    var transactionid = order.items[0].ebay_transactionid
    loadDoc('https://open.inkfrog.com/listings/sold/json/getlistings.aspx?search=' + order.buyer_username, function(xhttp){
        var orders = JSON.parse("[" + xhttp.responseText + "]")[0].results
            orders.forEach(function(e){
                if (e.items[0].ebay_transactionid === transactionid) {
                    var orderid = e.id
                    console.log('Found');
                    console.log('orderid = ' + orderid)
                    loadAddressForOrder(orderid, function(address) {
                        cFunction(address);
                        console.log(address);
                    })
                }
            })
    });
}

var labelIndex = 1
function displayUnshippedLabel(index, color) {
    var order = unshippedOrders[index]
    var transactionid = order.items[0].ebay_transactionid
    var _color = color
    if (errorOrderSet.has(order.id)) {
      _color = 'Yellow';
      console.log('OrderId ' + order.id + ' has error!');
    }
    var d = document.createElement('div')
    d.innerHTML = '<font size="4"><a style="color: ' + _color + ';" id="listingtitle_' + order.id + '">' + labelIndex++ + '*****' + order.order_date + '*****' + order.ordered_by + '</a></font>'
    var dashboard = document.getElementsByClassName('content-container')[0]
    dashboard.appendChild(d)

    var copyAddress = function(order) {
    	loadDoc('https://open.inkfrog.com/listings/sold/json/getlistings.aspx?search=' + order.buyer_username, function(xhttp){
    		var orders = JSON.parse("[" + xhttp.responseText + "]")[0].results
    		orders.forEach(function(e){
    			if (e.items[0].ebay_transactionid === transactionid) {
    				var orderid = e.id
    				console.log('Copied');
        			console.log('orderid = ' + orderid)
    				loadAddressForOrder(orderid, function(address) {
    					setStorageLocal('newTransaction', {ebay_transactionid: transactionid, username: order.buyer_username, aliexpressOrderid: '', trackingNumber: ''})
    					setStorageLocal('newAddress', address)
    					console.log(address);
                        console.log('Buyer Username: ' + order.buyer_username);
    				})
    			}
    		})
    	})
    }
    // Start here
    if (order.items.length === 1) {
        // add photo
        var img = document.createElement("img");
        img.src = order.items[0].thumb_nail
        d.appendChild(img)

        var btn = createButton('Copy Address')
        d.appendChild(btn)
        btn.onclick = function() {
            copyAddress(order)
        }

        var btn2 = createButton('FIND')
        d.appendChild(btn2)
        btn2.onclick = function() {
            var keyword = buildKeywordFromTitle(order.items[0].product_title)
            copyAddress(order)
            searchAliexpressKeyword(keyword)
        }
        var t = document.createTextNode(order.items[0].product_title);
     	d.appendChild(t)
    } else {
        var img = document.createElement("img");
        img.src = 'https://i.frg.im/p0w5zbuz/61gxczgc-olacul436_100.png'
        d.appendChild(img)
    }

    var btn = createButton('?????????')
        d.appendChild(btn)
        btn.onclick = function() {
            loadDoc('https://open.inkfrog.com/listings/sold/json/getlistings.aspx?search=' + order.buyer_username, function(xhttp){
				var orders = JSON.parse("[" + xhttp.responseText + "]")[0].results
                if (orders.length === 0) {
                    window.open('https://open.inkfrog.com/listings/sold/' + order.id);
                }
				for (i = 0; i < orders.length; i++) {
					if (orders[i].items[0].ebay_transactionid === transactionid) {
						setStorageLocal('newTransaction', {ebay_transactionid: transactionid, username: order.buyer_username, aliexpressOrderid: '', trackingNumber: ''})
						window.open('https://open.inkfrog.com/listings/sold/' + orders[i].id)
						break
					}
				}
			})
        }

    var btn3 = createButton('MAPPING')
    d.appendChild(btn3)
    btn3.onclick = function() {
        getStorageLocal('AliexpressProduct', function(e) {
            console.log(e);
            if (typeof(e) === 'undefined') {
                return
            }
            var g = document.createElement('div');
            g.className = 'productName'
            var t = document.createTextNode(e.productName + '  X ' + e.quantity);
            g.style.color = "green";
            g.appendChild(t);
            d.appendChild(g);
            if (typeof(order.productMap) === 'undefined') {
                order.productMap = [];
            }
            order.productMap.push(e);
            console.log(order);
            // add address
            if (typeof(order.address) === 'undefined') {
               // console.log(order.address);
                getAddressFromOrder(order, function(address){
                    order.address = address;
                    console.log(order);
                });
            }
        })
    }
    var btn4 = createButton('CLEAR')
    d.appendChild(btn4)
    btn4.onclick = function() {
        var productNameElements = btn4.parentNode.getElementsByClassName('productName')
        var length = productNameElements.length
        if (length > 0) {
            btn4.parentNode.removeChild(productNameElements[length - 1])
            if (typeof(order.productMap) != 'undefined') {
                order.productMap.pop();
                console.log(order);
            }
        }
    }
}

var color = 'Tomato'
function displayUnshippedOrders() {
	var currentOneItemSizeIndex = -1
	for (i = 0; i < unshippedOrders.length; i++) {
		if (unshippedOrders[i].hasnotes === false) {
			if (unshippedOrders[i].items.length === 1) {
				currentOneItemSizeIndex = i
				break
			}
		}
	}
	if (currentOneItemSizeIndex != -1) {
		var thisTitle = unshippedOrders[currentOneItemSizeIndex].items[0].product_title.trim()
		var validOrderIndexArr = []
		unshippedOrders.forEach(function(e, index){
			if (e.hasnotes === false) {
				var items = e.items
				items.forEach(function(e){
					if (e.product_title.trim() === thisTitle) {
						validOrderIndexArr.push(index)
					}
				})
			}
		})
		if (validOrderIndexArr.length === 1) {
			unshippedOrders[validOrderIndexArr[0]].hasnotes = true
			displayUnshippedLabel(validOrderIndexArr[0], 'Black')
		} else {
			validOrderIndexArr.forEach(function(e){
				displayUnshippedLabel(e, color)
				unshippedOrders[e].hasnotes = true
			})
			color = (color === 'Tomato') ? 'SlateBlue' : 'Tomato';
		}
		displayUnshippedOrders()
	} else {
		unshippedOrders.forEach(function(e, index){
			if (e.hasnotes === false) {
				displayUnshippedLabel(index, 'Black')
				unshippedOrders[index].hasnotes = true
			}
		})
	}
}

