var startPage = 1
var endPage = 20
var currentSellerPage = startPage

var f = function() {
	loadDoc('https://www.topratedseller.com/vietnam/ebay?page=' + currentSellerPage++, function(xhttp){
		var d = document.createElement('div')
		d.innerHTML = xhttp.responseText
		var sellerList = d.getElementsByClassName('table table-full-screen table-striped table-sellers-list')[0].children[1].children
		var index = 0

		var f2 = function() {
			if (index < sellerList.length) {
				var username = sellerList[index++].textContent.trim()
				loadDocWithData('https://www.topratedseller.com/ebay/' + username, username, function(xhttp, newStore) {
				var d = document.createElement('div')
				d.innerHTML = xhttp.responseText
				var productList = d.getElementsByClassName('product-list')[0]
				if (typeof(productList) != 'undefined' && productList.textContent.toLowerCase().match(/shirt/ig) != null && productList.textContent.toLowerCase().match(/shirt/ig).length > 3) { // This is T-Shirt store
					// disconnect all Stores
					 loadDoc('https://zikanalytics.com/Index', function(xhttp){
					 	var d = document.createElement('div')
						d.innerHTML = xhttp.responseText
						if (d.getElementsByClassName('Stores')[0].children.length >= 2) {
							var storeName = d.getElementsByClassName('Stores')[0].children[1].textContent
							console.log("Disconnect Storename: " + storeName)
							requestDOC('https://zikanalytics.com/StoreAnalytic/DisconnectStore', 'storeName=' + storeName, function(xhttp) {
								
							})
						}
						// adding new Store
						requestDOCWithSkipStatus('https://zikanalytics.com/StoreAnalytic/AddUserStore', 'storeName=' + newStore, function(xhttp){
							if (xhttp.responseText === "\"error\"") {
								console.log('This seller have been suspended: ' + newStore)
								f2() // next seller
							} else {
								requestDOC('https://zikanalytics.com/StoreAnalytic/LoadStore', 'draw=1&columns%5B0%5D%5Bdata%5D=ItemID&columns%5B0%5D%5Bname%5D=TotalRevenuePerItem&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=true&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=Title&columns%5B1%5D%5Bname%5D=Title&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=true&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=CurrentPrice&columns%5B2%5D%5Bname%5D=CurrentPrice&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=true&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=SelectedColumnSales&columns%5B3%5D%5Bname%5D=SelectedColumnSales&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=true&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=TotalRevenuePerItem&columns%5B4%5D%5Bname%5D=TotalRevenuePerItem&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=true&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&order%5B0%5D%5Bcolumn%5D=4&order%5B0%5D%5Bdir%5D=desc&start=0&length=50&search%5Bvalue%5D=&search%5Bregex%5D=false&_store=' + newStore + '&searchValue=', function(xhttp) {
								var recordsFilteredCount = JSON.parse("[" + xhttp.responseText + "]")[0].recordsFiltered
								var numPage = Math.round(recordsFilteredCount / 50)
								var currentPage = 1
								var f3 = function() {
									requestDOC('https://zikanalytics.com/StoreAnalytic/LoadStore', 'draw=' + 1 + '&columns%5B0%5D%5Bdata%5D=ItemID&columns%5B0%5D%5Bname%5D=TotalRevenuePerItem&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=true&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=Title&columns%5B1%5D%5Bname%5D=Title&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=true&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=CurrentPrice&columns%5B2%5D%5Bname%5D=CurrentPrice&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=true&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=SelectedColumnSales&columns%5B3%5D%5Bname%5D=SelectedColumnSales&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=true&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=TotalRevenuePerItem&columns%5B4%5D%5Bname%5D=TotalRevenuePerItem&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=true&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&order%5B0%5D%5Bcolumn%5D=4&order%5B0%5D%5Bdir%5D=desc&start=' + (currentPage - 1)*50 + '&length=50&search%5Bvalue%5D=&search%5Bregex%5D=false&_store=' + newStore + '&searchValue=', function(xhttp) {
										currentPage++
										var items = JSON.parse("[" + xhttp.responseText + "]")[0].data
										for (i = 0; i < items.length; i++) {
											// save items to csv file
											createDataFromZikAnalyticsItem(items[i])
										}
										if (currentPage <= numPage) {
											setTimeout(function(){
												f3() // next item page
											}, 1000)
											
										} else {
											f2() // next seller
										}
									})
								}
								f3()
								
							})

							}
							
						})
					 })
				} else {
					// go to next seller
					f2()
				}
			})
			} else {
				if (currentSellerPage >= endPage) {
					// download file
					console.log("Download File!")
					downloadZikAnalyticsItem()
				} else {
					console.log('Go to next seller list page/page: ' + currentSellerPage)
					f() // go to next seller list page
				}
			}
		} // end f2 function

		f2()
	})
}


ClearDataToLocalStorage()
f()

function downloadZikAnalyticsItem() {
    if (!chrome.runtime.error) {
        var data = [];
        // Parse the serialized data back into an aray of objects
        var oL = localStorage.getItem('ZikAnalyticsItems') || '[]'
        data = JSON.parse(oL);
        //console.log(data)
        if (data.length != 0) {
            // Building the CSV from the Data two-dimensional array
            // Each column is separated by ";" and new line "\n" for next row
            var csvContent = 'Title;ItemURL;Sale30Days;Revenue30Days\n';
                data.forEach(function(infoArray, index) {
                	dataString = infoArray.join(';');
                    csvContent += index < data.length ? dataString + '\n' : dataString;
                });
                var d = new Date();
                var fileName = d.getDate() + '-' + (d.getMonth()+1) + '-ZikAnalyticsBestItems.csv'
                download(csvContent, fileName, 'text/csv;encoding:utf-8');
                ClearDataToLocalStorage();
        }
    }                
}

function createDataFromZikAnalyticsItem(item) {
	var title = item.Title.split(';').join('').split(',').join('').split(':').join('')
	var itemURL = 'https://www.ebay.com/itm/' + item.ItemID + '/'
	var saleThisMonth = item.SelectedColumnSales
	var revenueThisMonth = item.TotalRevenuePerItem
	saveDataToLocalStorage('ZikAnalyticsItems', [title, itemURL, saleThisMonth, revenueThisMonth])

}