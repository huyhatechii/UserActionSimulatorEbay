// var unshippedOrderListMap = []
// var shippedOrderListMap = []
// var unshippedOrderAddressMap = []
// var addressList = []
// var productDatabase = []
// var oldestOrderId = -1
// var newOldestOrderId = -1
// var errorOrderSet = new Set()
// var unshippedOrders = []
// const MIN_DAY_NUMBER = 28

// // setStorageLocal('unshippedOrderListMap', [])
// // setStorageLocal('unshippedOrderAddressMap', [])
// // chrome.storage.sync.set({'oldestOrderId': 46934}) 

// //setStorageLocal('productDatabase', [])

// // 4 - address
// // 5 - show - hide
// // 6 - aliexpress orders map
// // 7 - results
// getStorageLocal('unshippedOrderListMap', function(e) {
// 	if (typeof(e) != 'undefined') {
// 		unshippedOrderListMap = e
// 	}
// 	for (i = 0; i < unshippedOrderListMap.length; i++) {
// 		unshippedOrderListMap[i][5] = false
// 	}
// 	console.log('unshippedOrderListMap');
// 	console.log(unshippedOrderListMap);

// 	getStorageLocal('unshippedOrderAddressMap', function(e){
// 		if (typeof(e) != 'undefined') {
// 			unshippedOrderAddressMap = e
// 		} 
// 		console.log('unshippedOrderAddressMap');
// 		console.log(unshippedOrderAddressMap);
// 	})
// 	getStorageLocal('orderListMap3', function(e) {
// 		if (typeof(e) != 'undefined') {
// 			shippedOrderListMap = e
// 		}
// 		console.log('shippedOrderListMap');
// 		console.log(shippedOrderListMap);
// 	})
// 	getStorageLocal('productDatabase', function(e) {
// 		if (typeof(e) != 'undefined') {
// 			productDatabase = e
// 		}
// 		console.log('productDatabase');
// 		console.log(productDatabase);
// 	})
// 	getStorageLocalSet('errorOrderSet', function(e) {
//         if (typeof(e) != 'undefined') {
//             errorOrderSet = e
//         }
//         console.log('errorOrderSet');
//         console.log(e);
//     })
//     getStorageLocal('unshippedOrders', function(e) {
//         if (typeof(e) != 'undefined') {
//             unshippedOrders = e
//         }
//         console.log('unshippedOrders');
//         console.log(unshippedOrders);
//     })
// 	chrome.storage.sync.get('oldestOrderId', function(e) {
// 		if (typeof(e) != 'undefined') {
// 			oldestOrderId = parseInt(e.oldestOrderId)
// 		} else {
// 			oldestOrderId = 44000
// 		}
// 		console.log('oldestOrderId: ' + oldestOrderId);
// 	})

// 	//checkNewUpshippedOrder()
//     //setStorageLocal('unshippedOrders', [])
//     newFunc()
// })

// function newFunc() {
//     var checkNextPage = function(page) {
//         console.log('Check new unshipped orders page: ' + page);
//         loadDoc('https://open.inkfrog.com/listings/sold/json/getlistings.aspx?limit=100&payment_status=paid&page=' + page, function(xhttp) {
//             var results = JSON.parse("[" + xhttp.responseText + "]")[0].results
//             var hasNewOrder = false
//             results.forEach(function(e, index) {
//                 if (isNewOrder(e)) {
//                     console.log('add new order');
//                     console.log(e);
//                     unshippedOrders.push(e)
//                     hasNewOrder = true
//                 }
//             })
//             if (hasNewOrder) {
//                 checkNextPage(++page)
//             } else {
//                 console.log('unshippedOrders Final');
//                 console.log(unshippedOrders);
//                 setStorageLocal('unshippedOrders', unshippedOrders)
//             }
//         })
//     }
//     checkNextPage(1)
// }

// function isNewOrder(order) {
//     var transactionid = order.items[0].ebay_transactionid
//     var dayNumber = parseInt(order.order_date.split(' ')[1]) 
//     var username = order.buyer_username
//     for (i = 0; i < unshippedOrders.length; i++) {
//         if (unshippedOrders[i].buyer_username === username && unshippedOrders[i].items[0].ebay_transactionid === transactionid) {
//             return false
//         }
//         if (dayNumber < MIN_DAY_NUMBER) {
//             return false
//         }
//     }
//     return true
// }

// function checkNewUpshippedOrder() {
//     var btn = createButton('Upload Orders To DSERS')
//     var btn2 = createButton('Open Shipping Tabs')
//     console.log('Check new unshipped orders')
//     document.getElementsByClassName('content-container')[0].children[0].innerHTML = ''
//     document.getElementById('header').children[0].textContent = 'New Orders'
//     checkUnshippedOrder()
//     btn.onclick = function() {
//     	if (validatePassword()) {
//     		updateProductDatabase()
//     		uploadProductOrder()
//     	}
//     }
//     btn2.onclick = function() {
//     	window.open('https://www.aliexpress.com/wholesale?catId=0&initiative_id=SB_20190402063653&SearchText=plant')
//     	window.open('https://www.dsers.com/#/newfeature/list/csv')
//     }
//     document.getElementsByClassName('content-container')[0].appendChild(btn2)
//     document.getElementsByClassName('content-container')[0].appendChild(btn)
// }

// function uploadProductDatabase() {
// 	var headers = {
//         product_id: 'product_id',
//         mySku: "SKU(your product SKU)",
//         aliId: "AliExpress_url",
//         aliSku: "SKU(AliExpress SKU)",
//         sellerId: "AliExpress_seller_id (Optionall)"
//     };

//     var itemsFormatted = [];
//     productDatabase.forEach(function(element, index) {
//         itemsFormatted.push({
//             product_id: element.productId,
//             mySku: element.mySku.replace(/,/g, ''),
//             aliId: element.aliProductId.replace(/,/g, ''),
//             aliSku: element.aliSku.replace(/,/g, ''),
//             sellerId: ''
//         })
//     })
//     var fileName = getCurrentTimeStr() + '-database.csv'
//     var blob = convertCSVBlob(headers, itemsFormatted, fileName);
//     blob.lastModifiedDate = new Date();
//     blob.name = fileName
//     var formData  = new FormData();
//     formData.append('file', blob, fileName);
//     getStorageLocal('dsersToken', function(token){
//     	requestCSV_Dsers('https://www.dsers.com/api/v1/order/csv/product/import', formData, token, function(xhttp){
//  			console.log('upload database file success');
//  		})
//     })
// }

// var pendingAliOrders = []
// var totalOrder = 0
// var waitingTimes = 0

// function uploadProductOrder() {
// 	console.log('uploadProductOrder')
// 	var headers = {
//         date: "date",
//         order_number: "order_number",
//         line_item_number: "line_item_number",
//         email: "email",
//         contact_person: "contact_person",
//         address: "address",
//         address2: "address2",
//         ZIP: "ZIP",
//         city: "city",
//         province: "province",
//         country: "country",
//         product_count: "product_count",
//         product_id: "product_id",
//         SKU: "SKU",
//         cpf: "cpf",
//         full_name: "full_name",
//         phone_country: "phone_country",
//         mobile_no: "mobile_no",
//         order_memo: "order_memo",
//         shipping_method: "shipping_method",
//         cost: "cost(total cost of order)",
//         AliExpress_order_number: "AliExpress_order_number",
//         tracking_no: "tracking_no",
//         status: "status"
//     };
//     unshippedOrderListMap.forEach(function(e){
//     	if (e[6] != '' && e[6].length > 0) { // this inkfrog order have linked to ali orders
//     		var aliProducts = e[6]
//     		totalOrder += aliProducts.length
//     		waitingTimes = 0
//     		aliProducts.forEach(function(e2){
//     			// console.log('e2');
//     			// console.log(e2);
//     			var dbProduct = getProductFromDatabase(e2)
//     			// console.log('dbProduct');
//     			// console.log(dbProduct);
//     			createNewPendingAliOrder(e, dbProduct, e2.quantity)
//     		})
//         }
//     })

//     var myVar = setInterval(function() {
//     	if ((pendingAliOrders.length === totalOrder && pendingAliOrders.length > 0) || waitingTimes > 20) {
//     		console.log('pendingAliOrders Lastest');
//     		console.log(pendingAliOrders);
//     		uploadProductDatabase()
//     		var fileName = getCurrentTimeStr() + '-order.csv'
//     		var blob = convertCSVBlob(headers, pendingAliOrders, fileName);
//     		blob.lastModifiedDate = new Date();
//     		blob.name = fileName
//     		var formData  = new FormData();
//     		formData.append('file', blob, fileName);
//     		//exportCSVFile(headers, pendingAliOrders, fileName)
//     		getStorageLocal('dsersToken', function(token){
//     			requestCSV_Dsers('https://www.dsers.com/api/v1/order/csv/order/import', formData, token, function(xhttp){
//  					console.log('upload order file success');
//  					sendMessage('upload orders to dsers')
//  					exportCSVFile(headers, pendingAliOrders, fileName)
//  				})
//     		})
//     		clearInterval(myVar)
//     	} else {
//     		console.log('Waiting.................................')
//     		waitingTimes++
//     	} 
//     	if (pendingAliOrders.length === 0) {
//     		alert('Have not any new orders')
//     		clearInterval(myVar)
//     	}
//     }, 5000)
// }

// function updateProductDatabase() {
// 	var isChanged = false
//     unshippedOrders.forEach(function(order){
//         if ()
//     });
// 	for (i = 0; i < unshippedOrderListMap.length; i++) {
// 		var order = unshippedOrderListMap[i]
//         if (order[6] != '' && order[6].length > 0) {
//             //console.log(order);
//             var productOrderArr = order[6]
//             for (j = 0; j < productOrderArr.length; j++) {
//             	//console.log(productOrderArr[j]);
//             	if (hasProductInDatabase(productOrderArr[j]) === false) {
//             		addNewProductToDatabase(productOrderArr[j])
//             		isChanged = true
//             	}
//             }
//         }
//     }   
//     getStorageLocal('productDatabase', function(e) {
// 		console.log('productDatabase');
// 		console.log(productDatabase);
// 	})
// }

// function createNewPendingAliOrder(order, dbProduct, quantity) {
// 	var createOrder = function(address) {
// 		var city = address.buyercity.replace(/,/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, "")
//     	var province = address.buyerstateprovince.replace(/,/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, "")
//     	var country = address.buyercountry.replace(/,/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, "")
//         var address1 = address.buyeraddress1.replace(/,/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, "")
//         var address2 = address.buyeraddress2.replace(/,/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, "")
//         if (address1.length > 99) {
//             address1 = address1.substr(0, 95)
//         }
//         if (address2.length > 99) {
//             address2 = address2.substr(0, 95)
//         }
//     	var mobileno = '964444181'
//     	if (address.phone != '') {
//     		mobileno = address.phone
//     	}
//     	if (province === '') {
//     		province = city
//     	}
//     	if (city === '') {
//     		city = province
//     	}
//     	if (province === '' && city === '') {
//     		province = country
//     		city = country
//     	}
//     	var newOrder = {
//         	date: " ", // remove commas to avoid errors
//         	order_number: order[0],
//        		line_item_number: " ",
//         	email: " ",
//         	contact_person: address.buyercontactname.replace(/,/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
//         	address: address1,
//         	address2: address2,
//         	ZIP: address.buyerzip.replace(/,/g, ''),
//         	city: city,
//         	province: province,
//         	country: country,
//         	product_count: quantity,
//         	product_id: dbProduct.productId,
//         	SKU: dbProduct.mySku,
//         	cpf: " ",
//         	full_name: address.buyercontactname.replace(/,/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
//         	phone_country: "1",
//         	mobile_no: mobileno,
//         	order_memo: "Please DO NOT combine order when having the same buyer address for multiple orders! I need unique tracking number for each order. If you do wrong I will do not buy again and return all packages. Please also label name the seed and DO NOT POST the INVOICE on the PACKAGE. Make the package as GIFT to avoiding large import. Thank you very much!",
//         	shipping_method: " ",
//         	cost: " ",
//         	AliExpress_order_number: " ",
//         	tracking_no: " ",
//         	status: " "
//     	};
//     	console.log(newOrder)
//     	pendingAliOrders.push(newOrder)
//     	console.log('pendingAliOrders after');
//     	console.log(pendingAliOrders);
// 	}
// 	var address = order[4]
// 	if (address != null) {
// 		createOrder(address)
// 	} else {
// 		getAddressForOrder(order[0], function(address){
//     		createOrder(address)
//     	})
// 	}
// }

// function getAddressForOrder(orderId, cFunction) {
// 	var address = null
// 	unshippedOrderAddressMap.forEach(function(e){
// 		if (e[0] === orderId && e[4] != null) {
// 			address = e[4]
// 			return
// 		}
// 	})
// 	if (address != null) {
// 		cFunction(address)
// 	} else {
// 		loadAddressForOrder(orderId, function(e) {
// 			cFunction(e)
// 		})
// 	}
	
// }

// function getProductFromDatabase(aliProduct) {
// 	//console.log('getProductFromDatabase');
// 	//console.log(aliProduct);
// 	let found = false;
// 	var product = null
// 	productDatabase.forEach(function(e){
// 		//console.log(e);
// 		if (aliProduct.productId === e.aliProductId && aliProduct.selectedSku === e.aliSku) {
// 			found = true
// 			product = e
// 			return
// 		}
// 	})
// 	return product
// }

// function addNewProductToDatabase(product) {
// 	console.log('addNewProductToDatabase');
// 	var length = product.skuProducts.length
// 	var mySku = 'PRODUCT_' + (productDatabase.length + 1)
// 	var selectedSku = product.selectedSku
// 	var productId = productDatabase.length + 1
// 	productDatabase.push({
// 		productId: productId,
// 		mySku: mySku,
// 		aliProductId: product.productId,
// 		aliSku: selectedSku
// 	})
// 	console.log(productDatabase);
// 	setStorageLocal('productDatabase', productDatabase)
// }

// function hasProductInDatabase(product) {
// 	var selectedSku = product.selectedSku
// 	for (k = 0; k < productDatabase.length; k++) {
// 		if (productDatabase[k].aliProductId === product.productId && productDatabase[k].aliSku === selectedSku) {
// 			return true
// 		}
// 	}
// 	return false
// }

// function checkUnshippedOrder() {
// 	var didResponse = false
// 	var myVar = null
// 	var delta = 0
// 	var page = 1
//     var checkOrderPage = function() {
//     	delta = 0
//     	didResponse = false
//     	console.log('Check order page: ' + page);
//         loadDoc('https://open.inkfrog.com/listings/sold/json/getlistings.aspx?limit=5&payment_status=paid&page=' + page, function(xhttp) {
//         	didResponse = true
//             var results = JSON.parse("[" + xhttp.responseText + "]")[0].results
//             //console.log(results);
//             var lastOrderId = results[results.length - 1].id
//             if (page === 1) {
//             	newOldestOrderId = results[0].id
//             	console.log('new oldestOrderId: ' + oldestOrderId);
//             }
//             for (i = 0; i < results.length; i++) {
//                 var orderId = results[i].id
//                 if (getShippedOrderElement(orderId) === null) {
//                     if (getUnshippedOrderElement(orderId) === null) {
//                     	console.log('Add new unshipped order ' + orderId);
//                         var items = results[i].items
//                         var titleArr = []
//                         for (j = 0; j < items.length; j++) {
//                             titleArr.push(items[j].product_title)
//                         }
//                         var date = results[i].order_date
//                         var buyerName = results[i].ordered_by
//                         unshippedOrderListMap.push([orderId, JSON.stringify(titleArr), date, buyerName, null, false, '', results[i]])
//                         unshippedOrderAddressMap.push([orderId, JSON.stringify(titleArr), date, buyerName, null, false, '', results[i]])
//                     }
//                 }
//             }
//             setStorageLocal('unshippedOrderListMap', unshippedOrderListMap)
//             console.log('unshippedOrderListMap');
//             console.log(unshippedOrderListMap);
          
//             setStorageLocal('unshippedOrderAddressMap', unshippedOrderAddressMap)
//             console.log('unshippedOrderAddressMap');
//             console.log(unshippedOrderAddressMap);
//             if (lastOrderId > oldestOrderId) {
//             	console.log('lastOrderId')
//             	console.log(lastOrderId)
//             	++page
//                 checkOrderPage()
//             } else {
//             	clearInterval(myVar)
//             	console.log('set new oldestOrderId: ' + newOldestOrderId);
//             	chrome.storage.sync.set({'oldestOrderId': newOldestOrderId}) 
//             	console.log('DISPLAY AND SORT ALL ORDERS');
//             	hideTShirtOrder()
//             	displayUnshippedOrders()
//             	playDoneSound()
//             	console.log('unshippedOrderAddressMap');
//             	console.log(unshippedOrderAddressMap);
//             	//syncAddressMapOrder()
//             }
//         })
//     }
//     checkOrderPage()
//     myVar = setInterval(function(){
//     	if (didResponse === false) {
//     		delta += 1000
//     	}
//     	if (delta > 30000) {
//     		console.log('Resend request')
//     		checkOrderPage()
//     	}
//     }, 1000)
// }

// function syncAddressMapOrder() {
//     var index = 0
//     var f = function() {
//     	var orderId = addressList[index]
//     	unshippedOrderAddressMap.forEach(function(e){
//     		if (e[0] === orderId && e[4] === null) {
//     			loadAddressForOrder(orderId, function(address) {
//     				console.log('sync address for order ' + orderId);
//                 	console.log(address);
//                 	e[4] = address
//                 	setStorageLocal('unshippedOrderAddressMap', unshippedOrderAddressMap)
//     			})
//     			return
//     		}
//     	})
//     	if (++index < unshippedOrderAddressMap.length) {
//         	f()
//         }	
//     }
    
//     console.log('syncAddressMapOrder');
//     console.log('unshippedOrderAddressMap');
//     console.log(unshippedOrderAddressMap);
//     console.log('addressList');
//     console.log(addressList);
//     if (addressList.length > 0) {
//     	f()
//     }
// }

// function hideTShirtOrder() {
// 	console.log('Hide shirt orders....');
// 	for (i = 0; i < unshippedOrderListMap.length; i++) {
// 		var titleArr = JSON.parse(unshippedOrderListMap[i][1])
// 		for (j = 0; j < titleArr.length; j++) {
// 			if (titleArr[j].toLowerCase().includes('shirt')){
// 				console.log('Hide shirt order ' + unshippedOrderListMap[i][0]);
// 				unshippedOrderListMap[i][5] = true
// 				break
// 			}
// 		}
// 	}
// }

// var _aliShippingParams = {
//     "features": '{"mobile_no_verified":"false","locale":"en_US","countryBeta":"US,1;CL,1;","countryWhiteList":"RU,ID,ES,US,CL,CA,NL,KR,UA,AU,NZ,UK,US,FR,KZ","ruPassport":"taxNumber"}',
//     "id": "1244618994",
//     "contactPerson": "", /// ???
//     "address": "",  /// ???
//     "city": "", /// ???
//     "province": "", /// ???
//     "zip": "",  /// ???
//     "phoneCountry": "+1", /// ???
//     "mobileNo": "", /// ???
//     "isDefault": false, /// ???
//     "country": "", /// ???
//     "email": "namtran27692%40gmail.com",
//     "_csrf_token_": "olmnymygj2g5"
// }

// var labelIndex = 1

// function displayUnshippedLabel(index, color) {
//     var order = unshippedOrderListMap[index]
//     var _color = color

//     if (errorOrderSet.has(order[0].toString())) {
//     	_color = 'Yellow'
//     }
//     addressList.push(order[0])
//     var titleArr = JSON.parse(order[1])
//     var d = document.createElement('div')
//     d.innerHTML = '<font size="4"><a href="/listings/sold/' + order[0] + '" target="_blank" style="color: ' + _color + ';" id="listingtitle_' + order[0] + '">' + labelIndex++ + '-----' + order[0] + '*****' + order[2] + '*****' + order[3] + '</a></font>'
//     var dashboard = document.getElementsByClassName('content-container')[0]
//     dashboard.appendChild(d)

//     var fillAddressAliexpress = function(address) {
//         _aliShippingParams.contactPerson = address.buyercontactname
//         _aliShippingParams.address = address.buyeraddress1
//        // _aliShippingParams.address2 = address.buyeraddress2
//         _aliShippingParams.city = address.buyercity
//         _aliShippingParams.province = address.buyerstateprovince
//         _aliShippingParams.zip = address.buyerzip
//         _aliShippingParams.mobileNo = address.phone
//         _aliShippingParams.country = 'US'
//         requestDOC('https://ilogisticsaddress.aliexpress.com/ajaxSaveOrUpdateBuyerAddress.htm', encodeGetParams(_aliShippingParams), function(xhttp){
//             console.log('fill address done!');
//         })
//     }

//     var copyAddress = function(orderId) {
//         console.log('Copied');
//         console.log('orderid = ' + orderId)
//         var address = null
//         for (i = 0; i < unshippedOrderAddressMap.length; i++) {
//             if (unshippedOrderAddressMap[i][0] === orderId) {
//                 //console.log( unshippedOrderAddressMap[i])
//                 address = unshippedOrderAddressMap[i][4]
//                 if (address === null) {
//                 	console.log('Not Found Address')
//                     loadAddressForOrder(orderId, function(address) {
//                        // fillAddressAliexpress(address)
//                         setStorageLocal('newAddress', address)
//                         console.log('try to find address ')
//                         unshippedOrderAddressMap.forEach(function(e){
//                         	if (e[0] === orderId) {
//                         		console.log('ok')
//                         		e[4] = address
//                         		console.log(e[4])
//                         	}
//                         })
//                     })
//                 } else {
//                     //fillAddressAliexpress(address)
//                     setStorageLocal('newAddress', address)
//                 	console.log('Found Address')
//                 }
//                 break;
//             }
//         }
//         getStorageLocal('newAddress', function(address) {
//             console.log(address);
//         })
//     }
//     // Start here
//     if (titleArr.length === 1) {
//         // add photo
//         var img = document.createElement("img");
//         img.src = order[7].items[0].thumb_nail
//         d.appendChild(img)

//         var btn = createButton('Copy Address')
//         d.appendChild(btn)
//         btn.onclick = function() {
//             copyAddress(order[0])
//         }

//         var btn2 = createButton('FIND')
//         d.appendChild(btn2)
//         btn2.onclick = function() {
//             var keyword = buildKeywordFromTitle(order[7].items[0].product_title)
//             copyAddress(order[0])
//             searchAliexpressKeyword(keyword)
//         }
//     } else {
//         var img = document.createElement("img");
//         img.src = 'https://i.frg.im/p0w5zbuz/61gxczgc-olacul436_100.png'
//         d.appendChild(img)
//     }
//     var btn3 = createButton('MAPPING')
//     d.appendChild(btn3)
//     btn3.onclick = function() {
//         getStorageLocal('AliexpressProduct', function(e) {
//             console.log(e);
//             if (typeof(e) === 'undefined') {
//             	return
//             }
//             var g = document.createElement('div');
//             g.className = 'productName'
//             var t = document.createTextNode(e.productName + '  X ' + e.quantity);
//             g.style.color = "green"
//             g.appendChild(t)
//             d.appendChild(g)
//             // add to map list
//             var importOrders = order[6]
//             if (importOrders === "") {
//             	importOrders = []
//             }
//             importOrders.push(e)
//             order[6] = importOrders
//             copyAddress(order[0])
//             console.log(order);
//         })
//     }

//     var btn4 = createButton('CLEAR')
//     d.appendChild(btn4)
//     btn4.onclick = function() {
//         var productNameElements = btn4.parentNode.getElementsByClassName('productName')
//         var length = productNameElements.length
//         if (length > 0) {
//             btn4.parentNode.removeChild(productNameElements[length - 1])
//             var importOrders = order[6]
//             if (importOrders != "" && importOrders.length > 0) {
//             	importOrders.pop()
//             }
//             order[6] = importOrders
//             console.log(order);
//         }
//     }
//     if (titleArr.length === 1) {
//      	var t = document.createTextNode(titleArr[0]);
//      	d.appendChild(t)
//     }
// }

// var color = 'Tomato'

// function displayUnshippedOrders() {
// 	//console.log('------>displayUnshippedOrder');
// 	var orderIndex = -1
// 	for (i = 0; i < unshippedOrderListMap.length; i++) {
// 		if (unshippedOrderListMap[i][5] === false) {
// 			var titleArr = JSON.parse(unshippedOrderListMap[i][1])
// 			if (titleArr.length === 1) {
// 				orderIndex = i
// 				break
// 			}
// 		}
// 	}
// 	//console.log('valid orderIndex = ' + orderIndex);
// 	if (orderIndex != -1) {
// 		var thisTitle = JSON.parse(unshippedOrderListMap[orderIndex][1])[0].trim()
// 		// var color = 'Tomato'
// 		// displayUnshippedLabel(unshippedOrderListMap[orderIndex][0], color)
// 		// unshippedOrderListMap[orderIndex] = null
// 		var validOrderIndexArr = []
// 		for (i = 0; i < unshippedOrderListMap.length; i++) {
// 			if (unshippedOrderListMap[i][5] === false) {
// 				var titleArr = JSON.parse(unshippedOrderListMap[i][1])
// 				for (j = 0; j < titleArr.length; j++) {
// 					if (titleArr[j].trim() === thisTitle) {
// 						validOrderIndexArr.push(i)
// 						break
// 					}
// 				}
// 			}
// 		}
// 		if (validOrderIndexArr.length === 1) {
// 			var index = validOrderIndexArr[0]
// 			displayUnshippedLabel(orderIndex, 'Black')
// 			unshippedOrderListMap[index][5] = true
// 		} else if (validOrderIndexArr.length > 1) {
// 			for (i = 0; i < validOrderIndexArr.length; i++) {
// 				var index = validOrderIndexArr[i]
// 				displayUnshippedLabel(index, color)
// 				unshippedOrderListMap[index][5] = true
// 			}
// 			if (color === 'Tomato') {
// 				color = 'SlateBlue'
// 			} else {
// 				color = 'Tomato'
// 			}
// 		}
// 		//console.log('validOrderIndexArr');
// 		//console.log(validOrderIndexArr);
// 		//playDoneSound()
// 		displayUnshippedOrders()
// 	} else {
// 		for (i = 0; i < unshippedOrderListMap.length; i++) {
// 			if (unshippedOrderListMap[i][5] === false) {
// 				displayUnshippedLabel(i, 'Black')
// 				unshippedOrderListMap[i][5] = true
// 			}
// 		}
// 	}
// }

// function getUnshippedOrderElement(orderId) {
// 	for (k = 0; k < unshippedOrderListMap.length; k++) {
// 		if (unshippedOrderListMap[k][0] === orderId) {
// 			return unshippedOrderListMap[k]
// 		}
// 	}
// 	return null
// }

// function getShippedOrderElement(orderId) {
//     for (k = 0; k < shippedOrderListMap.length; k++) {
//         if (shippedOrderListMap[k][0] === orderId) {
//             return shippedOrderListMap[k]
//         }
//     }
//     return null
// }
