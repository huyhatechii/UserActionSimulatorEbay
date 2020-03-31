var _defaultItemParams = {
"categoryid": 8439,
"selected_category_path": "Home & Garden > Yard, Garden & Outdoor Living > Plants, Seeds & Bulbs > Seeds & Bulbs > Other Seeds & Bulbs",
"listingtype": "FixedPriceItem",
"variations_enabled": 0,
"condition_description": "100% Fresh & High Quality Seeds",
"location_country": "CN",
"location_zip": "",
"location_description": "Pekin",
"listing_folder": 22895
}
var _shippingParams = {
"domestic_service1": "EconomyShippingFromOutsideUS",
"domestic_service1_free": "on",
"domestic_service2": "", 
"domestic_service2_cost1": "", 
"domestic_service2_cost2": "", 
"domestic_service2_surcharge": "", 
"domestic_service3": "", 
"domestic_service3_cost1": "", 
"domestic_service3_cost2": "", 
"domestic_service3_surcharge": "", 
"domestic_service4": "", 
"domestic_service4_cost1": "", 
"domestic_service4_cost2": "", 
"domestic_service4_surcharge": "", 
"domestic_handlingfee": "", 
"flat_discount_profile": 0,
"calculated_discount_profile": 0,
"has_promo_discount_profile": 0,
"international_service1": "OtherInternational",
"international_service1_free": "on",
"international_service1_shipto": "worldwide",
"international_service2": "",
"international_service2_cost1": "", 
"international_service2_cost2": "", 
"international_service3": "", 
"international_service3_cost1": "", 
"international_service3_cost2": "", 
"international_service4": "", 
"international_service4_cost1": "", 
"international_service4_cost2": "", 
"international_service5": "", 
"international_service5_cost1": "", 
"international_service5_cost2": "", 
"international_handlingfee": "", 
}
var isFlipImage = false
var _encodedSpecificsParams = 'eBayItemSpecificValue_0=Unbranded+%2F+Genenic&isholder0=Brand&eBayItemSpecificCustomValue_1=&eBayItemSpecificValue_1_4=Temperate&eBayItemSpecificNum_1=6&isholder1=Climate&eBayItemSpecificCustomValue_2=&eBayItemSpecificNum_2=4&isholder2=Sunlight&eBayItemSpecificValue_3=No&isholder3=Custom+Bundle&eBayItemSpecificValue_4=&isholder4=Foliage&eBayItemSpecificValue_5=&isholder5=Bundle+Description&eBayItemSpecificValue_6=&isholder6=Season+of+Interest&eBayItemSpecificValue_7=No&isholder7=Modified+Item&eBayItemSpecificCustomValue_8=&eBayItemSpecificNum_8=8&isholder8=Soil+Type&eBayItemSpecificValue_9=&isholder9=Modification+Description&eBayItemSpecificCustomValue_10=&eBayItemSpecificNum_10=14&isholder10=USDA+Hardiness+Zone+(%C2%B0F)&eBayItemSpecificValue_11=No&isholder11=Non-Domestic+Product&eBayItemSpecificValue_12=&isholder12=Watering&eBayItemSpecificValue_13=&isholder13=Applicable+Regions&eBayItemSpecificCustomValue_14=&eBayItemSpecificNum_14=5&isholder14=Aspect&eBayItemSpecificValue_15=&isholder15=Soil+pH&eBayItemSpecificValue_16=&isholder16=Species&eBayItemSpecificValue_17=Afghanistan&isholder17=Country%2FRegion+of+Manufacture&eBayItemSpecificValue_18=&isholder18=California+Prop+65+Warning&removedoption_2=Sunlight&removedoption_3=Custom+Bundle&removedoption_4=Foliage&removedoption_5=Bundle+Description&removedoption_6=Season+of+Interest&removedoption_7=Modified+Item&removedoption_8=Soil+Type&removedoption_9=Modification+Description&removedoption_10=USDA+Hardiness+Zone+(%C2%B0F)&removedoption_11=Non-Domestic+Product&removedoption_12=Watering&removedoption_13=Applicable+Regions&removedoption_14=Aspect&removedoption_15=Soil+pH&removedoption_16=Species&removedoption_17=Country%2FRegion+of+Manufacture&removedoption_18=California+Prop+65+Warning'
var _encodedCustomSpecificsParams = ''
var _encodedExcludeShipToParams = 'item_shipto=worldwide&item_exclude_shipto=africa&item_exclude_shipto=central+america+and+caribbean&item_exclude_shipto=cn&item_exclude_shipto=alaska%2Fhawaii&item_exclude_shipto=kw&item_exclude_shipto=lb&item_exclude_shipto=fm&item_exclude_shipto=wf&item_exclude_shipto=ki&item_exclude_shipto=ws&item_exclude_shipto=vu&item_exclude_shipto=as&item_exclude_shipto=nr&item_exclude_shipto=nc&item_exclude_shipto=nu&item_exclude_shipto=sb&item_exclude_shipto=ck&item_exclude_shipto=tv&item_exclude_shipto=pf&item_exclude_shipto=gu&item_exclude_shipto=mh&item_exclude_shipto=to&item_exclude_shipto=pw&item_exclude_shipto=vn&item_exclude_shipto=hk'
var _encodedProductImagesParams = ''
var canvasNaturalBadge = null
var canvasFreeShippingBadge = null
var imgFeedbackUrl = 'https://i.imgur.com/RnK7d9Z.jpg'
var imgInstructionUrl = 'https://i.imgur.com/HObPOyC.jpg'
var imgNaturalBadgeUrl = 'https://i.imgur.com/mrKv5aP.png'
var imgFreeShippingBadgeUrl = 'https://i.imgur.com/HKqvzNu.png'
var isListNext = true
//
var key = 'listedItemIdSet'
var ebayAccountId = ''
var ebayAccountName = ''
var aliProductExcel = ''
var testItemId = ''
var _totalListed = 0
var _totalListedThisRound = 0
var _maxListRound = 300
var _currentAliIndex = 0
var networkErrorCount = 0

function initParams() {
    getStorageSync('ebayAccountId', function(e) {
        key += e
        ebayAccountId = e
        console.log(key);
    })
    getStorageSync('ebayAccountName', function(e) {
        ebayAccountName = e
        console.log(ebayAccountName);
    })
    getStorageSync('aliProductExcel', function(e) {
        aliProductExcel = e
        console.log(aliProductExcel);
    })
    getStorageSync('testItemId', function(e) {
        testItemId = e
        console.log('testItemId: ' + testItemId);
    })
    getStorageLocal('totalListed', function(e) {
        if (typeof(e) != 'undefined') {
            _totalListed = e
        }
        console.log('totalListed = ' + _totalListed);
    })
    getStorageLocal('currentAliIndex', function(e) {
        if (typeof(e) != 'undefined') {
            _currentAliIndex = e
        }
        console.log('currentAliIndex = ' + _currentAliIndex);
      //  _currentAliIndex = 4176;
    })
}

setTimeout(function(){
   initParams()
}, 1000)

setTimeout(function(){
   listingSeedInkfrog()
}, 4000)

function listingSeedInkfrog() {
    var index = 0
    var length = 0
	var loadImage = function () {
    	var img = new Image()
		img.setAttribute('crossOrigin', 'anonymous')
		img.src = imgNaturalBadgeUrl
		img.onload = function() {
			canvasNaturalBadge = document.createElement("canvas")
  			var badgeContext = canvasNaturalBadge.getContext("2d")
  			canvasNaturalBadge.width = img.width
  			canvasNaturalBadge.height = img.height
  			badgeContext.drawImage(img, 0, 0)
  			console.log('Loaded Canvas Natural Badge')
		}
		var img2 = new Image()
		img2.setAttribute('crossOrigin', 'anonymous')
		img2.src = imgFreeShippingBadgeUrl
		img2.onload = function() {
			canvasFreeShippingBadge = document.createElement("canvas")
  			var badgeContext = canvasFreeShippingBadge.getContext("2d")
  			canvasFreeShippingBadge.width = img2.width
  			canvasFreeShippingBadge.height = img2.height
  			badgeContext.drawImage(img2, 0, 0)
  			console.log('Loaded Canvas Free Shipping Badge')
		}
		
	}
	loadImage()
    console.log('aliProductExcel');
    console.log(aliProductExcel);
    loadDoc(aliProductExcel, function(xhttp) {
        var d = document.createElement('div')
        d.innerHTML = xhttp.responseText
        var softmerge = d.getElementsByClassName('waffle')[0].getElementsByClassName('s0')
        length = softmerge.length
        console.log('Item Elements');
        console.log(softmerge);
        var listNext = function() {
            var productLink = ''
            console.log('currentAliIndex = ' + _currentAliIndex);
            var productId = softmerge[_currentAliIndex].textContent
            if (testItemId != '') {
                productLink = 'https://m.aliexpress.com/item/' + testItemId + '.html'
            } else {
                productLink = getMobileProductLink(productId)
            }
            console.log('ItemId: ' + productId);
            console.log(productLink)
            if (productLink != '') {
                loadDoc(productLink, function(xhttp) {
                    var d = document.createElement('div')
                    d.innerHTML = xhttp.responseText
                    if (typeof(d.getElementsByClassName('detail-description'))[0] === 'undefined') {
                        console.log('invalid product');
                        isListNext = true;
                        return;
                    } else {
                        _currentAliIndex++;
                    }
                    var title = buildSeedTitle(d.getElementsByClassName('detail-description')[0].textContent)
                    console.log(title)
                    var isTitleValid = function(title) {
                        if (title.toLowerCase().includes('bamboo') || title.toLowerCase().includes('citrus')) {
                            return false
                        } else {
                            return true
                        }
                    }
                    if (!isTitleValid(title) || d.getElementsByClassName('info error-info').length > 0 || (xhttp.responseText.indexOf('Garden') === -1 && xhttp.responseText.indexOf('garden') === -1) ) {
                        console.log('There have error with this listing/productLink: ' + productLink)
                        console.log('info error-info');
                        console.log(d.getElementsByClassName('info error-info'));
                        console.log('Garden');
                        console.log(xhttp.responseText.indexOf('Garden'));

                        getStorageLocalSet('aliexpressErrorProductSet', function(aliexpressErrorProductSet) {
                            aliexpressErrorProductSet.add(productLink)
                            setStorageLocalSet('aliexpressErrorProductSet', aliexpressErrorProductSet)
                            console.log(aliexpressErrorProductSet);
                        })
                        isListNext = true
                    } else {
                        var description = createItemDescription(d.getElementsByClassName('specs-item flex align-center'));
                        var specifics = getItemSpecifics(d.getElementsByClassName('specs-item flex align-center'));
                        createItemSpecificsParams(d.getElementsByClassName('specs-item flex align-center'));
                        var photos = getPhotosLink(d.getElementsByClassName('carousel-wrap')[0].children[0].children)
                        console.log("List next ..." + _totalListed)
                        console.log('_totalListedThisRound = ' + _totalListedThisRound);
                        setStorageLocal('totalListed', ++_totalListed)
                        _totalListedThisRound++
                         isListNext = true
                         console.log(productId);
                         console.log(title);
                         console.log(photos);
                         console.log(specifics);
                         $.ajax({
                            url: "https://lightinglister.com/admin/import-seed-products",
                            type: 'GET',
                            dataType: 'html',
                            data: {
                                productId: productId,
                                title: title,
                                photos: JSON.stringify(photos),
                                specifics: JSON.stringify(specifics)
                            },
                            success: function (response) {
                                
                            }
                        });
                        // uploadPhotosToInkfrog(photos, createImageNameList(title, photos.length), function(imgArrId) {
                        //     console.log(imgArrId)
                        //     createProductImagesParams(imgArrId)
                        //     attachImages(imgArrId, function() {
                        //         var fullEncodedParams = getFullEncodedParams(title, description, _encodedSpecificsParams + '&' + _encodedCustomSpecificsParams, _encodedProductImagesParams, _defaultItemParams, _encodedExcludeShipToParams, _shippingParams)
                        //         _encodedCustomSpecificsParams = ''
                        //         requestDOC("https://open.inkfrog.com/listings/new_edit/ajax/savelisting.aspx", fullEncodedParams, function(xhttp) {
                        //             console.log("List next ..." + _totalListed)
                        //             console.log('_totalListedThisRound = ' + _totalListedThisRound);
                        //             setStorageLocal('totalListed', ++_totalListed)
                        //             _totalListedThisRound++
                        //             isListNext = true
                        //             setStorageLocal('currentAliIndex', _currentAliIndex)
                        //         })

                        //     })
                        // })
                    }

                })
            } else {
                _currentAliIndex++;
                console.log('This product have already listed! List next ... row' + _currentAliIndex)
                setStorageLocal('currentAliIndex', _currentAliIndex)
                isListNext = true
            }

        }

        var deltaTime = 0
        var myVar2 = setInterval(function() {
            if (isListNext ===  false) {
                deltaTime += 500
            }
            if (deltaTime > 500000) {
                isListNext = true
                networkErrorCount++
                console.log('NETWORK ERROR => listNext');
            }
        }, 500)


        var myVar = setInterval(function() {
            if (networkErrorCount > 3) {
                alert('Network error more than 3')
                clearInterval(myVar)
                clearInterval(myVar2)
            }
            if (isListNext) {
                deltaTime = 0
                isListNext = false
                listNext()
            }
            if (_currentAliIndex >= length || _totalListed >= totalNeedList) {
                alert('Listed All!/totalListed: ' + _totalListed + '/totalNeedList: ' + totalNeedList)
                clearInterval(myVar)
                clearInterval(myVar2)
            }
            if (_totalListedThisRound > _maxListRound) {
                setStorageLocal('totalListed', _totalListed)
                //window.location.reload()
            }
            getStorageLocal('isRunning', function(e){
                if (e === false) {
                    clearInterval(myVar)
                    clearInterval(myVar2)
                    alert('Pause!!!')
                }
            })
        }, 1000)

    }) // end search ali excel file
}

function editDescriptionAllItems() {
    var index = 1
    var f = function() {
        loadDoc('https://open.inkfrog.com/listings/json/getlistings.aspx?limit=250&folder=22895&ebay_status=live&ebay_account=' + ebayAccountId + '&page=' + index, function(xhttp){
            var listings = JSON.parse("[" + xhttp.responseText + "]")[0].results
            var index2 = 0
            var f2 = function() {
                var id = listings[index2].id
                loadDoc('https://open.inkfrog.com/listings/edit/' + id + '.json', function(xhttp) {
                    var data = JSON.parse("[" + xhttp.responseText + "]")[0]
                    var description = data.description
                    if (description.includes('https://i.frg.im/OhynqGsm/organic2.png')) {
                        console.log('https://open.inkfrog.com/listings/edit/' + id)
                        var organicIndex = description.indexOf('https://i.frg.im/OhynqGsm/organic2.png')
                        description = description.substr(0, organicIndex)
                        var first = description.indexOf('<li>')
                        var last = description.lastIndexOf('</li>')
                        description = description.substr(first, last - first + 5)
                    } else {
                        var first = description.indexOf('<li>')
                        var last = description.lastIndexOf('</li>')
                        description = description.substr(first, last - first + 5)
                    }
  
                    description = removeWordsFromString(description, ['<li>', '<strong>', '</strong>', '<b>', '</b>'])
                    var specifics = description.split('</li>')
                    for (i = 0; i < specifics.length; i++) {
                    	if (specifics[i] === '' || specifics[i].split(':')[0] === '') {
                    		specifics.splice(i, 1)
                    		i--
                    	}
                    }
                    // rebuild description
                    description = ''
					for (i = 0; i < specifics.length; i++) {
						var section = specifics[i].split(':')
						description += '<li><b>' + section[0].trim() + ': </b>' + section[1].trim() + '</li>'
					}
					console.log(description)

					// build custom specifics
                    console.log(specifics)
                    var customSpecific = []
    				for (i = 0; i < specifics.length; i++) {
        				var rand = Math.floor((Math.random() * 100000) + 1)
      					var section = specifics[i].split(':')
        				if (section[0] != '') {
        					customSpecific['customname_' + rand.toString()] = section[0]
        					customSpecific['customvalue_' + rand.toString()] = section[1]
        				}
    				}
   					_encodedCustomSpecificsParams = encodeGetParams(customSpecific)

   					// build product images
   					var attachments = data.image_attachments
   					var images = []
   					for (i = 0; i < attachments.length; i++) {
   						images.push(attachments[i].image.id)
   					}
   					createProductImagesParams(images)
   					// set product id
   					setProductId(id)

                    var fullEncodedParams = getFullEncodedParams(rebuildTitle(data.title), description, _encodedSpecificsParams + '&' + _encodedCustomSpecificsParams, _encodedProductImagesParams, _defaultItemParams, _encodedExcludeShipToParams, _shippingParams)
                    requestDOC("https://open.inkfrog.com/listings/new_edit/ajax/savelisting.aspx", fullEncodedParams, function(xhttp) {
                        loadDoc('https://open.inkfrog.com/listings/json/movelistings.aspx?folderid=22936&listings=' + id, function(xhttp){

                        })
                        index2++
                    	if (index2 < listings.length) {
                        	f2()
                    	} else {
                        	index++
                        	f()
                    	}
                    })
                    
                })
            } 
            f2()
        })
    }
    f()
}

function createProductImagesParams(imgArrId) {
	var params = []
	for (i = 0; i < imgArrId.length; i++) {
		params['product_image_' + imgArrId[i]] = imgArrId[i]
	}
	_encodedProductImagesParams = encodeGetParams(params)
}

function uploadPhotosToInkfrog(photos, names, cFunction) {
	// upload images with name
    var index = 0
    var imgArrId = []
    var img = new Image()
    var loadImage = function () {
		img.setAttribute('crossOrigin', 'anonymous')
		img.src = photos[index]
		img.onerror = function() {
			console.log('Error when loading image!')
			loadImage()
		}

		img.onload = function() {
			var canvas = document.createElement('canvas')
			var context = canvas.getContext('2d')
	
			var canvasCopy = document.createElement("canvas")
  			var copyContext = canvasCopy.getContext("2d")
  			var ratio = settings.min_width / img.width
  			canvasCopy.width = img.width
  			canvasCopy.height = img.height
  			copyContext.drawImage(img, 0, 0)

  			canvas.width = img.width * ratio
 	 		canvas.height = img.height * ratio
 	 		context.save()
 	 		var rand = getRandomFloat(0.02, 0.04) + 1.00
			context.scale(rand, rand)
  			context.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height)
  			context.restore()
			
			if (photos[index] != imgInstructionUrl && photos[index] != imgFeedbackUrl) {
				context.font="25px Comic Sans MS"
				context.fillStyle = "white"
				context.textAlign = "center"
				if (index === 0) {
					context.fillText("Go to my store to get more seeds: ebay.com/str/" + ebayAccountName, canvas.width/3, canvas.height - 50)
					context.drawImage(canvasNaturalBadge, 750, -62, canvasNaturalBadge.width, canvasNaturalBadge.height)
					context.drawImage(canvasFreeShippingBadge, 948, canvas.height - 226, canvasFreeShippingBadge.width, canvasFreeShippingBadge.height)
				} else {
					if (ebayAccountName != '') {
						context.fillText("Go to my store to get more seeds: ebay.com/str/" + ebayAccountName, canvas.width/2, canvas.height - 50)
					}
				}
				
			}
		
			var imageURL = canvas.toDataURL("image/jpeg");
            var file = dataURItoBlob(imageURL)
			requestDOCWithFormData('https://open.inkfrog.com/images/ajax/upload.aspx?folder=08&overwrite_existing=false', file, names[index++] + '.jpg', function(xhttp) {
                networkErrorCount = 0
				imgArrId.push(JSON.parse("[" + xhttp.responseText + "]")[0].id)
				if (index < photos.length) {
					loadImage()
				} else {
					cFunction(imgArrId)
				}
			})
		}
    }
    loadImage()
}

function createImageNameList(title, length) {
	var imageNameList = []
    for (i = 0; i < length; i++) {
        var titleCharSet = title.toLowerCase().split(" ")
        // remove number
        for (j = 0; j < titleCharSet.length; j++) {
        	if (hasNumber(titleCharSet[j])) {
        		titleCharSet.splice(j, 1)
            } 
        }
        if (titleCharSet.length > 3) {
            while(titleCharSet.length > 3) {
               var rand = Math.floor(Math.random() * (titleCharSet.length))
               titleCharSet.splice(rand, 1)
            }
            for (j = 0; j < titleCharSet.length; j++) {
            	titleCharSet[j].toLowerCase()
        	}
       		imageNameList.push(titleCharSet.join("-").replace("&","").replace(",", "").replace("/", "").replace("|", ""))
        } else {
        	imageNameList.push(title.toLowerCase())
        }
    }
    console.log(imageNameList)
    return imageNameList
}

function createItemDescription(specifics) {
	var html = ''
	for (i = 0; i < specifics.length; i++) {
		if (specifics[i].children[0].textContent != 'Brand Name' && specifics[i].children[0].textContent != '') {
			html += '<li><b>' + specifics[i].children[0].textContent + ': </b>' + specifics[i].children[1].textContent + '</li>'
		}
	}
	return html
}

function createItemSpecificsParams(specifics) {
	var customSpecific = []
    for (i = 0; i < specifics.length; i++) {
        var rand = Math.floor((Math.random() * 100000) + 1)
        if (specifics[i].children[0].textContent != 'Brand Name') {
        	customSpecific['customname_' + rand.toString()] = specifics[i].children[0].textContent
        	customSpecific['customvalue_' + rand.toString()] = specifics[i].children[1].textContent
        }
    }
    _encodedCustomSpecificsParams = encodeGetParams(customSpecific)
}

function getItemSpecifics(specificsHTML) {
    var specifics = [];
    for (i = 0; i < specificsHTML.length; i++) {
        if ('Brand Name' != specificsHTML[i].children[0].textContent && 'Brand' != specificsHTML[i].children[0].textContent) {
            specifics.push({'Name': specificsHTML[i].children[0].textContent, 'Value': specificsHTML[i].children[1].textContent});
        }
    }
    return specifics;
}

function getPhotosLink(slides) {
	var photos = []
	//console.log(slides)
	for (i = 0; i < slides.length; i++) {
		var imgId = slides[i].getAttribute('src').split('/')[4]
		if (slides[i].getAttribute('src').includes('jpeg')) {
			photos.push('https://ae01.alicdn.com/kf/' + imgId + '.jpeg')
		} else {
			photos.push('https://ae01.alicdn.com/kf/' + imgId + '.jpg')
		}
	}
	//photos = shuffle(photos)
	// photos.push(imgInstructionUrl)
	// photos.push(imgFeedbackUrl)
	if (photos.length > 6) {
		var temp = photos[4]
		photos[4] = photos[photos.length - 2]
		photos[photos.length - 2] = temp
		temp = photos[5]
		photos[5] = photos[photos.length - 1]
		photos[photos.length - 1] = temp
	}
	return photos
}

function getMobileProductLink(productId) {
	if (saveItemIdToStorageLocal(productId)) {
		return 'https://m.aliexpress.com/item/' + productId + '.html' 
	} else {
		return ''
	}
}

function buildSeedTitle(oldTitle) {
	var newTitle = ''
	var parts = removeWordsFromString(oldTitle.toLowerCase(), ['like', 'cheap', 'very', 'zlking', 'price', 'selling', 'drop shipping', '!', 'for sale', 'free shipping', 'sale', 'big promotion', 'promotion', 'limited', 'new', 'hot', 'top', 'best', '2018', ',', '-', 'plants', 'plant', 'seedsplants', 'seed', 'seeds'])
	parts = parts.replace(/\s+/g, " ").split(' ')
	if (parts.length < 5) {
		return titleCase(oldTitle) + ' Seeds'
	}
	var length = 0
	for (i = 0; i < parts.length; i++) {
		if (parts[i] === 'pcs' || i === 0) {
			newTitle += parts[i]
		} else if (i === 4) {
			newTitle += ' seeds plants'
			newTitle += ' ' + parts[i]
		} else if (!newTitle.includes(parts[i])){
			if (newTitle.length + 1 + parts[i].length < 80) {
				newTitle += ' ' + parts[i]
			} else {
				break
			}
		}
	}
	newTitle = titleCase(newTitle.trim()).trim()
	return rebuildTitle(newTitle)
}

function rebuildTitle(title) {
	var newTitle = ''
	var a = 'indoor,green,easy,blue,rare,house,beautiful,multicolored,fresh,mixed,home,garden'
	var parts = title.toLowerCase().trim().split('seeds').join('').split('plants').join('').split(' ')
	var quantityPartStr = ''
	for (i = 0; i < parts.length; i++) {
		if (hasNumber(parts[i])) {
			for (j = i; j < parts.length; j++) {
				//console.log(parts[j])
				if (hasNumber(parts[j]) || parts[j].includes('pcs') || parts[j].includes('/') || parts[j].includes('bag') || parts[j].includes('pack') || parts[j].includes('lot') || parts[j].includes('piece')) {
					if (!parts[j].includes('%')) {
						quantityPartStr += parts[j]
					}
				} else {
					break
				}
			}
			break
		} 
	}
	for (i = 0; i < parts.length; i++) {
		if (a.includes(parts[i])) {
			parts.push(parts[i])
			parts.splice(i, 1)
		}
	}
	//console.log(quantityPartStr)
	//console.log(parts)
	if (!quantityPartStr.includes('pcs') && !quantityPartStr.includes('/')) {
		quantityPartStr = ''
	}
		for (i = 0; i < parts.length; i++) {
			if (quantityPartStr.includes(parts[i])) {
				parts.splice(i, 1)
				i--
			} else {
				newTitle += parts[i] + ' '
				if (i === 2) {
					newTitle += 'seeds plants '
				}
			}
		}
	newTitle += quantityPartStr
	//console.log(titleCase(newTitle.trim()).trim())
	return titleCase(newTitle.trim()).trim()
}