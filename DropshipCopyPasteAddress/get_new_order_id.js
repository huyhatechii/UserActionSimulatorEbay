var unshippedOrders = []
var shippedOrderTransactions = []
var newAddress = null
var newTransaction = ''
var errorOrderArr = []

//getNewAliexpressOrderId();
syncNewOrderLightingLister();

function syncNewOrderLightingLister() {
    getStorageLocal('newAddress', function(e) {
        console.log('New address');
        newAddress = e;
        console.log(newAddress);
    });
    setTimeout(function() {
        $inkfrogOrderId = newAddress.orderid;
        $status = document.getElementsByClassName('f-left')[0].textContent.trim();
        $newAliOrderID = document.getElementsByClassName('info-body')[0].textContent.trim();
        $webOrderID = newAddress.orderid; 
        console.log('Status: ' + $status);
        console.log('newAliOrderId: ' + $newAliOrderID);
        console.log('Web OrderID: ' + $webOrderID);
        setStorageLocal('newAliexpressOrder', {webOrderID: $webOrderID, aliOrderID: $newAliOrderID});
        window.close();
    }, 300);
}
