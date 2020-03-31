var ebayAccount = '11678'
var searchTerm = 'pandora'
var oldPrice = 25.97
var newPrice = 21.97
if("https://open.inkfrog.com/update_pricing" === window.location.href) {
	var index = 1
	var f = function() {
		loadDoc('https://open.inkfrog.com/listings/json/getlistings.aspx?search=' + searchTerm + '&limit=250&price=%3D' + oldPrice + '&hidden=false&_=1539200077464', function(xhttp){
			var listingArr = JSON.parse("[" + xhttp.responseText + "]")[0].results
			var pricingData = '&modified_variants='
			var t = ''
			var t2 = ''
			for (i = 0; i < listingArr.length; i++) {
				var id = listingArr[i].variations[0].id 
				if (i != listingArr.length - 1) {
					t += id + '%2C'
				} else {
					t += id
				}
				t2 += '&listingtype_' + id + '=FixedPriceItem&variant_price_' + id + '=' + newPrice + '&start_price_' + id + '=' + newPrice + '&reserve_price_' + id + '=' + newPrice + '&bin_price_' + id + '=' + newPrice + '&sale_price_' + id + '=' + newPrice + '&sale_pricetype_' + id + '=1'
			}
			pricingData += t + t2
			
			if (listingArr.length > 0) {
				requestDOC('https://open.inkfrog.com/listings/bulkedit/pricing/', pricingData, function(xhttp) {
					f()
				})
			}
		})
	}
	f()
}