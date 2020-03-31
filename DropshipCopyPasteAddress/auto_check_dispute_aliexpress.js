var shippedOrderListMap = []

var _disputeParams = {
	"solutionType": "ro",
	"reasonId": "115",
	"whoPayForReturn": "seller",
	"amount": "", /// ??????
	"requestDetail": "I+have+not+received",
	"imageUrls": "", 
	"videoId": "", 
	"uploading": false,
	"isReceived": "no",
	"coverUrl": "", 
	"isBuyerReason": false,
	"umidToken": "B6a157a577a5f7b0c339b092b340389b7",
 	"ua": "115%236%2FMd6C1O1TaXAbayGCF21CsoE51adhVg1gqDV%2Fk1qfqfVaCCfxaK1hrocbCCIuG6Cmb8yya5i7WR6UU8AyZIa8pXyrrQc0xHeK%2FqykZIi%2FSthaUr9MavwTdzyyZQeIfP1K%2Fky%2BxQi%2FwJzzU8FkNcFYKvyzFB9sboeKsGyymQia2Jh1Q8AuCcDTefuaEQaSbGex%2F%2FyroQiGyJhZz8vBNDaLBfy5fdvEAw3pg8ukZQgQkRhEPCOSgaCY9XuzFZASAyeKb8ukNQiFMJhUU4AWNcaB6fyzFQgSRlTRDv5QE%2FZAW5HMc%2Ft5%2FjdQQNr67Rsgg4RnyA8HMfg6ug33AFr2ur2jcscIWZGzVX5O8JhtmbwfLi3k5KbReDj5yjolrb5kZf4YHRUjFIyqvC2P42rd6UDfRWEjGLjJZTFShcIWoB3KJl%2F3F1Def0sTcs9xtkeOH%2Fh8XnToF15S7HlyB%2BsWbgahv4V7G5KgzI%2FGCzrn%2BdT%2FMZFGkvPB3oQ7SIEnU5S9aE3FXVcWHICvM1CyxM6AygYl5AeyN3jUhc7WPNLRXz2h4fZ4bcBZhunlSqyDIh%2Fy3n%2BrEFAnghxp99JneZJuDoOBCrv9Bp9wUgIXXL%2Brv61xZrKchaq%2BBmxwCEFvN6UWdu%2BElIMJXFKGuc1GYYYhRdlgdPqlu1PywcCdpnDF1lJr4ut4KPyyT5ajUuwhPNY8kyyXGIgkyBcO4rhr4BquhxVveE0nGexp0erWfoTtowd%2FMT%2BirUvl0DYRgvgU7Rtif%2BnxuFcZANjRpGCJBjW%2Br3kiLHqYJO6xLgSmJ2Kiwc9jHqSPmd6%2BTXm8zLXUKLBrA87aU7LYLysU%2F0bESyS1jr1yUAa2wKmrP6gTrOfoRwKg%2BircP5jetlg%2FNR4dDZmk5p2WuWU%2FtLtXDQMnIsfAcHtD2hD3GNslYLBlaWGWbE4xtNgBfBNPNnG5K5k9gHhPybWgOlLfvl2Db0dEfGZyN4RSqvRp2kBxGEhDTafg9uj5QfILsF35gedqoZohHXu8X9FpY0ug0j19EktTxBQog2JCE9F8IepCw8CjO1YhssulV2nD7N9ocy6dio4KnGyK4vQwhMbLtzPGs3SRQOx7OWSZEImmsTZaHLDZjSvgmtbgUwK3Di4taya8anTElwbUY603gSRXV1Ed487ztxKfw55PdeEYah8lpDrjG%2F6ifMOSHIrgAcX7KUWVOg6LV8jAchlpcwZxhf958kMV%2B1GgyGGGMdFfuYY%2B7ZahXxuYFyCc4Iwxq1354gjQumVp7IXPTuD5FDFYVzoMgfNGmS6cKZGZlkCUQGaeBbZGBeriAA%2B%2Fk%2BZYZ4jVOArzPyassqbT4AmFVVEH4Hvi%2FvuTQ3e6IfFkVvB%2F7uD5tQdorbzOoC2EVcNW%2BEe5W42gCXZ%2Fk3ocucnZEPp95c%2F6BP4QQltqopWLi5fIyQWFMLEUmRpb%2Fc",
	"newVideo": true,
	"returnGoodsMethod": "", 
	"orderId": "", /// ????????
	"_csrf_token_": "19vmnj1iqjyb_",
	"issueId": "", /// ???????
	"cc": "USD"
}

getStorageLocal('orderListMap3', function(e) {
	if (typeof(e) != 'undefined') {
		shippedOrderListMap = e
	}
	console.log(e);
	//autoCheckDisputeAliexpress()
})

function autoCheckDisputeAliexpress() {
	console.log('autoCheckDisputeAliexpress');
	console.log(shippedOrderListMap);
	var index = 0
	var aliOrderIdArr = JSON.parse(shippedOrderListMap[index][1] || '[]')
	console.log(aliOrderIdArr);
	var index2 = 0
	var checkDisputeOrder = function(aliOrderId) {
		loadDoc('https://trade.aliexpress.com/order_detail.htm?orderId=' + aliOrderId, function(xhttp){
			var d = document.createElement('div')
			d.innerHTML = xhttp.responseText
			var orderReminderTxt = d.getElementsByClassName('order-reminder')[0].textContent.trim()
			if (orderReminderTxt.indexOf('If your order does not arrive on') != -1) {
				var expiredTime = orderReminderTxt.substr(orderReminderTxt.indexOf('2019'), 10)
				var str = expiredTime.split('-')
				const date1 = new Date(str[1] + '/' + str[2] + '/' + str[0]);
				var diff = diffDays(date1, new Date())
				console.log(diff);
				if (diff < 5) {
					console.log('Open dispute');
					_disputeParams.orderId = aliOrderId
					openDisputeOrder(aliOrderId)
				} else {
					console.log('Expired Time: ' +  expiredTime);
				}
			} else {
				console.log('This order have been finished or cancelled');
			}
		})
	}
	var openDisputeOrder = function(aliOrderId) {
		loadDoc('https://trade.aliexpress.com/issue/fastissue/createIssueStep1.htm?orderId=' + aliOrderId, function(xhttp){
			var d = document.createElement('div')
			d.innerHTML = xhttp.responseText
			var t = d.getElementsByClassName('product-amount util-clearfix li')[0].textContent
			var price = t.split('Quantity')[0].split('$')[1].trim()
			_disputeParams.amount = price
			loadDoc('https://trade.aliexpress.com/issue/createIssueStep1.json?orderId=' + aliOrderId + '&_csrf_token_=19vmnj1iqjyb_&solutionType=ro', function(xhttp){
				_disputeParams.issueId = ''
				//requestDOC('https://trade.aliexpress.com/issue/createIssueStep2.json', '')
			})
		})
	}
	
	checkDisputeOrder('98862073876226')
	//checkDisputeOrder(aliOrderIdArr[index2])
	
}

function diffDays(date1, date2) {
	const diffTime = Math.abs(date2.getTime() - date1.getTime());
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
	return diffDays
}