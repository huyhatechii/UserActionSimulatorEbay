const uuid = uuidv4()
var encodeGetParams = p => Object.entries(p).map(kv => kv.map(encodeURIComponent).join("=")).join("&")
var _excludeShippingParams = 'item_exclude_shipto=cn&item_exclude_shipto=alaska%2Fhawaii&item_exclude_shipto=us+protectorates&item_exclude_shipto=apo%2Ffpo&item_exclude_shipto=po+box&item_exclude_shipto=vn&item_exclude_shipto=hk'
var listedItemIdSet
var totalNeedList = 0
var settings = {
  min_width: 1200
}

var _defaultParams = {
"__VIEWSTATEGENERATOR": "4A7D6D78",
"listing_ebayaccount": "......................",
"siteid": 0,
"currency": "USD",
"listing_title": "...............................",
"listing_subtitle": "",
"vin": "" ,
"seller_provided_title": "",
"listing_description": ".........................................",
"identifier": "", 
"identifier_type": "MPN",
"identifier_brand": "Unbranded / Genenic",
"auto_relist_setting": "account",
"images_modified": false,
"multisku_images_modified": false,
"secondary_categoryid": "", 
"secondary_selected_category_path": "", 
"listingduration": "GTC",
"charityid": "", 
"donation": "", 
"private": 0,
"store_category1": "none",
"store_category2": "none",
"lotsize": "", 
"catalog_usestockphotoasgallery": "on",
"catalog_showstockphoto": "on",
"catalog_showdescription": "on",
"catalog_enabled": 0,
"catalog_productid": "",
"catalog_productname": "", 
"catalog_detailsurl": "", 
"catalog_stockimageurl": "", 
"year": "", 
"manIDs": "", 
"manIDsDel": "", 
"h_condition": "", 
"h_conditionrequired": 0,
"templateid": "..........................",
"builderId": "", 
"bestoffer": 0,
"start_price": "..........................",
"start_price_old": "..........................",
"bin_price": "", 
"bin_price_old": "", 
"reserve_price": "", 
"saleprice": "", 
"saleprice_old": "", 
"salepricetype": 1,
"cost_auction": 0.00,
"price": "..........................",
"price_old": "..........................",
"quantity": 1,
"totalquantity": 1,
"oldtotalquantity": 1,
"cost_fixed": 0.00,
"fixedsaleprice": "", 
"fixedsaleprice_old": "", 
"fixedsalepricetype": 1,
"sku": "------------------------------------",
"multisku_sku": "",
"multisku-base-price": "" ,
"multisku-base-quantity": 1,
"multisku-base-sku":  "",
"returnpolicy": "on",
"return_within": "Days_30",
"return_refund_as": "MoneyBack",
"return_actor": "Seller",
"restocking_fee": "NoRestockingFee",
"return_details": "", 
"internationalreturnpolicy": "on",
"international_return_within": "Days_30",
"international_return_refund_as": "MoneyBack",
"international_return_actor": "Seller",
"return_businesspolicyid": "126339359026",
"shippingtype": "Flat",
"vehicle_shipping_option": "buyer_responsible_for_shipping",
"dispatch_time": 5,
"codcost": "", 
"intl_flat_discount_profile": 0,
"intl_calculated_discount_profile": 0,
"has_intl_promo_discount_profile": 0,
"shipping_businesspolicyid": 126339361026,
"dimensions_depth": 0,
"dimensions_length": 0,
"dimensions_width": 0,
"weight_major": 1,
"weight_minor": 2,
"packagetype": "PackageThickEnvelope",
"pay_paypalemail": "----------------------------------------------",
"pay_paypal": "on",
"pay_payimmediately": "on",
"vatpercent": "", 
"salestaxstate": "", 
"salestaxpercent": 0,
"deposit_amount": "", 
"hours_to_deposit": 48,
"days_to_full_payment": 0,
"payment_businesspolicyid": 115473524026,
"paymentinstructions": "Thank you for your purchase! Please pay promptly via PayPal. Let us know if you have any questions.", 
"buyer_requirements": "block",
"buyer_unpaid_strikecount": 2,
"buyer_unpaid_days": 30,
"buyer_country": "on",
"buyer_policy_count": 4,
"buyer_policy_days": 30,
"buyer_feedback_score": 0,
"productid": 0,
"tempid": "----------------------------------------------",
"relist": "", 
"relist_id": "", 
"linked_profile_listing": "", 
"linked_profile_shipping": "", 
"linked_profile_return": "", 
"linked_profile_payment": "", 
"list_option_on": false,
"schedule_listing": false,
"lister_date": "immediate",
"lister_hour": "12",
"lister_minute": "00",
"lister_ampm": "AM",
"variantsalepricetype": 1,
"variantidentifiertype": "MPN",
"variationidentifierbrand": "Unbranded / Genenic", 
"addvar_sku": "", 
"addvar_price": "", 
"addvar_quant": 1,
"variations_reset": "" 
}

var key = 'listedItemIdSet'

initDefaultParams()

function getHostName(url) {
    var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    return match[2];
    }
    else {
        return null;
    }
}

function validatePassword() {
    var password = prompt("Password: ", "")
    if (password != "0964444181") {
        return false
    } else {
        return true
    }
}

function getCurrentTimeStr() {
    var f = function(n) {
        return n > 9 ? "" + n: "0" + n;
    }
    var today = new Date();
    return today.getHours() + "-" + today.getMinutes() + "-" + today.getDate() + '-' + (today.getMonth()+1)
}

function requestCSV_Dsers(url, formData, token, cFunction) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = state_change;
    request.open("POST", url, true);
    request.setRequestHeader("Accept", "*/*")
    request.setRequestHeader("Encoding", "gzip, deflate, br")
    request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    request.setRequestHeader("authorization", token);
    request.send(formData);
        function state_change() {
            if (request.readyState == 4) { // 4 = "loaded"
                if (request.status == 200) { // 200 = OK
                    // ...our code here...
                    cFunction(this);
                } else {
                    console.log("Problem retrieving XML data");
                }
            }
        }
}

function convertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}

function exportCSVFile(headers, items, fileTitle) {
    var blob = convertCSVBlob(headers, items, fileTitle)
    var exportedFilename = fileTitle + '.csv' || 'export.csv';
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilename);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

function convertCSVBlob(headers, items, fileTitle) {
    if (headers) {
        items.unshift(headers);
    }

    // Convert Object to JSON
    var jsonObject = JSON.stringify(items);

    var csv = this.convertToCSV(jsonObject);

    var exportedFilename = fileTitle + '.csv' || 'export.csv';

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    return blob
}

function getAliProductId(url) {
    return url.split('item/')[1].split('.html')[0];
}

function buildKeywordFromTitle(title) {
    return title.toLowerCase().split('seeds')[0].split(' ').join('-').split('/').join('')
}

function sendMessage(msg) {
    chrome.runtime.sendMessage({message: msg}, function(response) {
        //console.log(response.farewell);
    });
}

function searchAliexpressKeyword(keyword) {
    setStorageLocal('keyword', keyword.split('-').join(' '))
    console.log('keyword');
    console.log(keyword);
    chrome.runtime.sendMessage({message: "search keyword"}, function(response) {
        //console.log(response.farewell);
    });
}

function createButton(name) {
    var btn = document.createElement("BUTTON");
    var t = document.createTextNode(name);
    btn.appendChild(t);
    return btn
}

function loadAddressForOrder(orderId, cFunction) {
    loadDoc('https://open.inkfrog.com/listings/sold/' + orderId, function(xhttp) {
            var order = getOrderFromResponse(xhttp.responseText)
            var keyword = order.order_items[0].product_title.toLowerCase().split('seeds')[0].split(' ').join('-').split('/').join('')
            var buyerInfoArr = order.shipping_address
            var fullName = capitalizeFirstLetter(buyerInfoArr.first_name) + " " + capitalizeFirstLetter(buyerInfoArr.last_name)
            a = buyerInfoArr.address1.replace(/\w\S*/g, function(e) {
                return e.charAt(0).toUpperCase() + e.substr(1).toLowerCase()
            }), t = buyerInfoArr.address2.replace(/\w\S*/g, function(e) {
                return e.charAt(0).toUpperCase() + e.substr(1).toLowerCase()
            });
            var r, m = capitalizeFirstLetter(buyerInfoArr.city);
            n = buyerInfoArr.zip;
            void 0 === (r = list_state_usa(r = buyerInfoArr.state)) && (r = buyerInfoArr.state);
            i = buyerInfoArr.country_name.replace(/\w\S*/g, function(e) {
                return e.charAt(0).toUpperCase() + e.substr(1).toLowerCase()
            }), o = buyerInfoArr.phone.replace(/[^\w\s]/gi, "").replace(/\s/g, "")

            e = {
                orderid: order.id,
                buyercontactname: fullName.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
                buyeraddress1: a.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
                buyeraddress2: t.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
                buyercity: m.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
                buyerstateprovince: r.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
                buyerzip: n,
                buyercountry: i.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
                phone: o
            }
            // console.log('keyword');
            // console.log(keyword);
            cFunction(e)
    })
}

function removeUnsoldListings() {
    console.log('Remove unsold listing');
    var ebayAccount = '11695' // 
    var searchTerm = 'seed'
    var totalNeedEnding = 250
    var isRemoveAll = true
    var index = 1
    var f = function() {
        loadDoc('https://open.inkfrog.com/listings/live/json/getlistings.aspx?ebay_account=' + ebayAccount + '&limit=250&search=' + searchTerm + '&sortby=time_left&order=desc&page=' + index++ + '&_=1538558599176', function(xhttp) {
            var listingArr = JSON.parse("[" + xhttp.responseText + "]")[0].results
            var index2 = 0
            var f2 = function() {
                var id = listingArr[index2].itemid
                loadDoc('https://open.inkfrog.com/listings/sold/json/getlistings.aspx?limit=250&search=' + id + '&_=1538401811443', function(xhttp) {
                    var soldArr = JSON.parse("[" + xhttp.responseText + "]")[0].results
                    var timeLeft = parseInt(listingArr[index2].time_left.split('d')[0])
                    //console.log(soldArr)
                    if (soldArr.length === 0 && totalNeedEnding > 0) {
                        console.log('Ending this item https://www.ebay.com/itm/' + listingArr[index2].itemid + ' /totalNeedEnding: ' + --totalNeedEnding + '/listingid: ' + listingArr[index2].productid + '/timeLeft: ' + timeLeft)
                        loadDoc('https://open.inkfrog.com/listings/new_edit/ajax/endearly.aspx?productid=' + listingArr[index2].productid, function(xhttp) {

                        })
                    }
                    index2++
                    if (index2 < listingArr.length) {
                        f2()
                    } else if (index <= 40) {
                        f()
                    }
                })
            }
            f2()
        })
    }
    f()
}

function readFile() {
    let file = chrome.runtime.getURL('input.txt')
    
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                console.log(allText);
                var array = JSON.parse("[" + allText + "]");
                console.log(array);
                setStorageLocal('orderListMap3', array[0])
            }
        }
    }
    rawFile.send(null);
}

function playDoneSound() {
    let url = chrome.runtime.getURL('note.mp3')
    console.log(url)
    let a = new Audio(url)
    a.pause()
    a.play()
}

function parseResponseText(xhttp) {
    return JSON.parse("[" + xhttp.responseText + "]")[0]
}

function getStorageLocalSet(key, cFunction) {
    chrome.storage.local.get(key, function(e) {
        var value = e[key]
        if (typeof(value) === 'undefined' || value.length === 0) {
            cFunction(new Set())
        } else {
            cFunction(new Set(JSON.parse(value || '[]')))
        }
    })
}

function setStorageLocalSet(key, setValue) {
    var t = {}
    t[key] = JSON.stringify(Array.from(setValue))
    chrome.storage.local.set(t)
}

function setStorageLocal(key, value) {
    var t = {}
    t[key] = value
    chrome.storage.local.set(t)
}

function getStorageLocal(key, cFunction) {
    chrome.storage.local.get(key, function(e) {
        cFunction(e[key])
    })
}

function setStorageSync(key, value) {
    var t = {}
    t[key] = value
    chrome.storage.sync.set(t)
}

function getStorageSync(key, cFunction) {
    chrome.storage.sync.get(key, function(e) {
        cFunction(e[key])
    })
}

function clearStorageLocalSet(key) {
    var t = {}
    t[key] = JSON.stringify(Array.from(new Set([])))
    chrome.storage.local.set(t)
}

function removeWordsFromString(str, words) {
    var strResult = str
    for (i = 0; i < words.length; i++) {
        strResult = strResult.split(words[i]).join('')
    }
    return strResult
}

function getFullEncodedParams(title, description, encodedSpecificsParams, encodedProductImagesParams, defaultItemParams, encodedExcludeShipToParams, shippingParams) {
    _defaultParams.listing_title = title
    _defaultParams.listing_description = description
    _defaultParams.sku = 'SEED_' + getRandomSKU()
    return encodeGetParams(_defaultParams) + '&' + encodedSpecificsParams + '&' + encodedProductImagesParams + '&' + encodeGetParams(defaultItemParams) + '&' + _encodedExcludeShipToParams + '&' + encodeGetParams(shippingParams)
}
function setProductId(id) {
    _defaultParams.productid = id
}

function checkNewIpAddress(email) {
    var isValidIp = function(ip, ipListMap) {
        for (i = 0; i < ipListMap.length; i++) {
            if (ipListMap[i][0] != email) {
                var ipSet = new Set(JSON.parse(ipListMap[i][1] || '[]'))
                if (ipSet.has(ip)) {
                    return false
                }
            }
        }
        return true
    }
    loadDoc('https://whoer.net/', function(xhttp){
        console.log('Get new ip for ' + email);
        var d = document.createElement('div')
        d.innerHTML = xhttp.responseText
        var myIp = d.getElementsByClassName('your-ip')[0].textContent
        console.log('Current Ip: ' + myIp);
        getStorageLocal('IpListMap', function(ipListMap) {
            if (typeof(ipListMap) != 'undefined') {
                console.log(ipListMap);
                var ipInfo = []
                for (i = 0; i < ipListMap.length; i++) {
                    if (ipListMap[i][0] === email) {
                        ipInfo = ipListMap[i]
                    }
                }
                console.log('IpInfo: ');
                console.log(ipInfo);
                if (ipInfo.length === 0) {
                    ipInfo[0] = email
                    ipInfo[1] = '[]'
                    ipListMap.push(ipInfo)
                }
                var ipSet = new Set(JSON.parse(ipInfo[1] || '[]'))
                if (isValidIp(myIp, ipListMap)) {
                    ipSet.add(myIp)
                    ipInfo[1] = JSON.stringify(Array.from(ipSet))
                    playDoneSound()
                    //alert('The ip is valid ' + myIp + '/email: ' + email)
                } else {
                    alert('The ip is invalid.... reset modem ' + myIp  + '/email: ' + email);
                }
                setStorageLocal('IpListMap', ipListMap)
            } else {
                console.log('ipListMap null!');
                setStorageLocal('IpListMap', [])
            }
        })
    })
}

function initDefaultParams() {
    console.log('initDefaultParams')
    chrome.storage.local.set({'isBidding':false})

    getStorageSync('ebayAccountId', function(e) {
        _defaultParams.listing_ebayaccount = e
        key = 'listedItemIdSet' + e
        console.log('Key = ' + key)
        getStorageLocalSet(key, function(e) {
            console.log('listedItemIdSet');
            listedItemIdSet = e
            console.log(listedItemIdSet);
        })
    })
    getStorageSync('templateId', function(e) {
        _defaultParams.templateid = e
    })
    getStorageSync('paypalEmail', function(e) {
        _defaultParams.pay_paypalemail = e
    })
    getStorageSync('lowestPrice', function(e) {
        _defaultParams.price = e
        _defaultParams.price_old = e
        _defaultParams.start_price = e
        _defaultParams.start_price_old = e
    })
    getStorageSync('paypalEmail', function(e) {
        _defaultParams.pay_paypalemail = e
    })
    getStorageSync('testItemId', function(e) {
        if (e != '') {
            totalNeedList = 1
            console.log('totalNeedList: 1');
        } else {
            getStorageSync('totalNeedToListing', function(e) {
                totalNeedList = parseInt(e)
                console.log('totalNeedList: ' + totalNeedList);
            })
        }
    })
    getStorageSync('draftListing', function(e) {
        if (e === 'no') {
            _defaultParams.list_option_on = true
            _defaultParams.schedule_listing = true
        }
    })
    _defaultParams.sku = getRandomSKU()
    _defaultParams.tempid = uuid
}

function saveItemIdToStorageLocal(id) {
    if (!listedItemIdSet.has(id)) {
        listedItemIdSet.add(id)
        var t = {}
        t[key] = JSON.stringify(Array.from(listedItemIdSet))
        chrome.storage.local.set(t)
        return true
    } else {
        return false
    }
}
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
}

function attachImages(imgArrId, cFunction) {
    var imgVar = '';
    for (i = 0; i < imgArrId.length; i++) {
        imgVar += imgArrId[i];
        if (i != imgArrId.length - 1) {
            imgVar += "%2C";
        }
    }
    loadDoc("https://open.inkfrog.com/images/ajax/attach.aspx?&tempid=" + uuid + "&productid=0&r=O9iPrKFiGRKvHtM3vKXVCMHvTVDtUxuLOUEeTmTGa&images=" + imgVar, function(xhttp) {
        cFunction()
    })
}

function titleCase(str) {
  return str.toLowerCase().split(' ').map(function(word) {
    if (typeof(word[0]) != 'undefined') {
         return word.replace(word[0], word[0].toUpperCase());
    }
      }).join(' ').replace(/\s+/g, " ").trim();
}

function getRandomFloat(fromValue, toValue) {
    return (Math.random() * (toValue - fromValue) + fromValue)
}

function hasNumber(myString) {
  return /\d/.test(myString);
}
function editTitleAllItems() {
    var index = 1
    var f = function() {
        loadDoc('https://open.inkfrog.com/listings/json/getlistings.aspx?limit=250&ebay_status=live&search=seed&page=' + index, function(xhttp){
            var listings = JSON.parse("[" + xhttp.responseText + "]")[0].results
            var index2 = 0
            var f2 = function() {
                var params = {}
                var newTitle = rebuildTitle(listings[index2].title)
                var parts = listings[index2].title.split(' ')
                if (newTitle != listings[index2].title && !hasNumber(parts[parts.length - 1])) {
                    params['action'] = 'edit_title'
                    params['productid'] = listings[index2].id
                    params['title'] = newTitle
                    index2++
                    requestDOC('https://open.inkfrog.com/listings/new_edit/ajax/savelisting.aspx', encodeGetParams(params), function(xhttp){
                        if (index2 >= listings.length) {
                            index++
                            f()
                        } else {
                            f2()
                        }
                    })
                } else {
                    console.log('skipped! - ' + listings[index2].title)
                    index2++
                    if (index2 >= listings.length) {
                        index++
                        f()
                    } else {
                        f2()
                    }
                }
            }
            f2()
        })
    }
    f()
}
function editPriceAllItems() {
    var price = 14.99
    var index = 1
    var f = function() {
        loadDoc('https://open.inkfrog.com/listings/json/getlistings.aspx?limit=250&ebay_status=live&search=Cotton&page=' + index, function(xhttp){
            var listings = JSON.parse("[" + xhttp.responseText + "]")[0].results
            console.log(listings)
            var params = {}
            var value = ''
            for (i = 0; i < listings.length; i++){
                var id = listings[i].variations[0].id
                value += id + ','
                params['listingtype_' + id] = 'FixedPriceItem'
                params['variant_price_' + id] = price
                params['start_price_' + id] = price
                params['reserve_price_' + id] = price
                params['bin_price_' + id] = price
                params['sale_price_' + id] = price
                params['sale_pricetype_' + id] = price
            }
            params['modified_variants'] = value.substr(0, value.length - 1)
            requestDOC('https://open.inkfrog.com/listings/bulkedit/pricing/', encodeGetParams(params), function(xhttp){
                console.log('Done page ' + index++)
                if (index <= 12) {
                    f()
                }
            })
        })
    }
    f()
}

function editPriceAllSeedItems() {
    var price = 2.49
    var index = 1
    var f = function() {
        loadDoc('https://open.inkfrog.com/listings/json/getlistings.aspx?limit=250&ebay_status=live&search=seed&price=>2.5&page=' + index, function(xhttp){
            var listings = JSON.parse("[" + xhttp.responseText + "]")[0].results
            console.log(listings)
            var params = {}
            var value = ''
            for (i = 0; i < listings.length; i++){
                var id = listings[i].variations[0].id
                value += id + ','
                params['listingtype_' + id] = 'FixedPriceItem'
                params['variant_price_' + id] = price
                params['start_price_' + id] = price
                params['reserve_price_' + id] = price
                params['bin_price_' + id] = price
                params['sale_price_' + id] = price
                params['sale_pricetype_' + id] = price
            }
            params['modified_variants'] = value.substr(0, value.length - 1)
            requestDOC('https://open.inkfrog.com/listings/bulkedit/pricing/', encodeGetParams(params), function(xhttp){
                //console.log('Done page ' + index++)
                //if (index <= 12) {
                    f()
               // }
            })
        })
    }
    f()
}

function getOrderFromResponse(responseText) {
    return JSON.parse("[" + responseText.substr(responseText.indexOf("order \= \{\"id\"") + 8, responseText.indexOf("\"vat_str\"\:\"\"\}") - responseText.indexOf("order \= \{\"id\"") + 7) + "]")[0];
}

function capitalizeFirstLetter(e) {
    return e.charAt(0).toUpperCase() + e.toLowerCase().slice(1)
}

function list_state_usa(e) {
    for (var a = [{
            name: "Alabama",
            abbreviation: "AL"
        }, {
            name: "Alaska",
            abbreviation: "AK"
        }, {
            name: "American Samoa",
            abbreviation: "AS"
        }, {
            name: "Arizona",
            abbreviation: "AZ"
        }, {
            name: "Arkansas",
            abbreviation: "AR"
        }, {
            name: "California",
            abbreviation: "CA"
        }, {
            name: "Colorado",
            abbreviation: "CO"
        }, {
            name: "Connecticut",
            abbreviation: "CT"
        }, {
            name: "Delaware",
            abbreviation: "DE"
        }, {
            name: "District Of Columbia",
            abbreviation: "DC"
        }, {
            name: "Federated States Of Micronesia",
            abbreviation: "FM"
        }, {
            name: "Florida",
            abbreviation: "FL"
        }, {
            name: "Georgia",
            abbreviation: "GA"
        }, {
            name: "Guam",
            abbreviation: "GU"
        }, {
            name: "Hawaii",
            abbreviation: "HI"
        }, {
            name: "Idaho",
            abbreviation: "ID"
        }, {
            name: "Illinois",
            abbreviation: "IL"
        }, {
            name: "Indiana",
            abbreviation: "IN"
        }, {
            name: "Iowa",
            abbreviation: "IA"
        }, {
            name: "Kansas",
            abbreviation: "KS"
        }, {
            name: "Kentucky",
            abbreviation: "KY"
        }, {
            name: "Louisiana",
            abbreviation: "LA"
        }, {
            name: "Maine",
            abbreviation: "ME"
        }, {
            name: "Marshall Islands",
            abbreviation: "MH"
        }, {
            name: "Maryland",
            abbreviation: "MD"
        }, {
            name: "Massachusetts",
            abbreviation: "MA"
        }, {
            name: "Michigan",
            abbreviation: "MI"
        }, {
            name: "Minnesota",
            abbreviation: "MN"
        }, {
            name: "Mississippi",
            abbreviation: "MS"
        }, {
            name: "Missouri",
            abbreviation: "MO"
        }, {
            name: "Montana",
            abbreviation: "MT"
        }, {
            name: "Nebraska",
            abbreviation: "NE"
        }, {
            name: "Nevada",
            abbreviation: "NV"
        }, {
            name: "New Hampshire",
            abbreviation: "NH"
        }, {
            name: "New Jersey",
            abbreviation: "NJ"
        }, {
            name: "New Mexico",
            abbreviation: "NM"
        }, {
            name: "New York",
            abbreviation: "NY"
        }, {
            name: "North Carolina",
            abbreviation: "NC"
        }, {
            name: "North Dakota",
            abbreviation: "ND"
        }, {
            name: "Northern Mariana Islands",
            abbreviation: "MP"
        }, {
            name: "Ohio",
            abbreviation: "OH"
        }, {
            name: "Oklahoma",
            abbreviation: "OK"
        }, {
            name: "Oregon",
            abbreviation: "OR"
        }, {
            name: "Palau",
            abbreviation: "PW"
        }, {
            name: "Pennsylvania",
            abbreviation: "PA"
        }, {
            name: "Puerto Rico",
            abbreviation: "PR"
        }, {
            name: "Rhode Island",
            abbreviation: "RI"
        }, {
            name: "South Carolina",
            abbreviation: "SC"
        }, {
            name: "South Dakota",
            abbreviation: "SD"
        }, {
            name: "Tennessee",
            abbreviation: "TN"
        }, {
            name: "Texas",
            abbreviation: "TX"
        }, {
            name: "Utah",
            abbreviation: "UT"
        }, {
            name: "Vermont",
            abbreviation: "VT"
        }, {
            name: "Virgin Islands",
            abbreviation: "VI"
        }, {
            name: "Virginia",
            abbreviation: "VA"
        }, {
            name: "Washington",
            abbreviation: "WA"
        }, {
            name: "West Virginia",
            abbreviation: "WV"
        }, {
            name: "Wisconsin",
            abbreviation: "WI"
        }, {
            name: "Wyoming",
            abbreviation: "WY"
        }], t = 0; t < a.length; t++)
        if (e === a[t].abbreviation) return a[t].name
}