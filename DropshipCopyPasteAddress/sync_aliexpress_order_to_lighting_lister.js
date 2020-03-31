
$(document).ready(function() {
	$newOrderID = document.getElementsByClassName('order-no')[0].textContent;
	console.log('newOrderID: ' + $newOrderID);
	syncNewOrderToLightingLister($newOrderID);
});

function syncNewOrderToLightingLister($orderID) {
    getStorageLocal('newAddress', function(e) {
        console.log('New address');
        newAddress = e;
        console.log(newAddress);

        $webOrderID = newAddress.orderid; 
        console.log('newAliOrderId: ' + $orderID);
        console.log('Web OrderID: ' + $webOrderID);
        setStorageLocal('newAliexpressOrder', {webOrderID: $webOrderID, aliOrderID: $orderID});
        window.close();
    });
}