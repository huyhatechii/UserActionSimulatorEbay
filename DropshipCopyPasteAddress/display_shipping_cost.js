
$items = document.getElementsByClassName('item');
console.log($items);

$index = 0

$f = function() {
	$atcElement = $items[$index].getElementsByClassName('atc-product-id');
	if ($atcElement.length > 0) {
		$productID = $atcElement[0].getAttribute('value');

		$.ajax({
			url: "https://www.aliexpress.com/aeglodetailweb/api/logistics/freight",
			type: 'GET',
			dataType: 'html',
			headers: {
		    },
			data: {
				productId: $productID,
				count: 1,
				minPrice: 0,
				maxPrice: 8136,
				country: 'US',
				provinceCode: '',
				cityCode: '',
				tradeCurrency: 'USD',
				sellerAdminSeq: '223491646',
				userScene: 'PC_DETAIL_SHIPPING_PANEL'
			},
			success: function ($response) {
				$freightResults = JSON.parse($response).body.freightResult;
				console.log($freightResults);
				$minShippingPrice = $freightResults[0].freightAmount.value;

				$text = document.createTextNode('US');
				$items[$index].textContent = $minShippingPrice;
				$items[$index].style.color = "red"
				$items[$index].style.fontSize = "20px";
				$items[$index].appendChild($text);
				if (++$index < $items.length) {
					$f();
				}
		    }
		});
	} else {
		if (++$index < $items.length) {
			$f();
		}
	}
	
}
if ($items.length > 0) {
	$f();
}