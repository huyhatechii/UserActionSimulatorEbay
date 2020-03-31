console.log('Add Mapping Button');
if (document.getElementsByClassName('map button').length === 0 && document.getElementsByClassName('image-viewer').length > 0) {
    var btn = createButton('Map To Inkfrog')
    document.getElementsByClassName('image-viewer')[0].appendChild(btn)
    btn.className = 'map button'
    btn.onclick = function() {
        var productId = getAliProductId(window.location.href);
        var productURL = window.location.href.split('?')[0];
        var selected = 0;
        var selectedSku = '';
        var skuProducts = [];
        var productName = '';
        var quantity = 1;

        loadDoc('https://m.aliexpress.com/item/' + productId + '.html', function(xhttp) {
            var d = document.createElement('div');
            d.innerHTML = xhttp.responseText;
            skuProducts = JSON.parse(d.querySelector('#skuPriceList').textContent.trim());
            console.log(skuProducts);
            productName = titleCase(d.getElementsByClassName('detail-description')[0].textContent);
            console.log(productName);
            quantity = parseInt(document.getElementsByClassName('product-quantity')[0].getElementsByTagName('input')[0].value);
            console.log(quantity);

            if (document.getElementsByClassName('sku-property-list').length > 0) {
                $('.sku-property-item').each(function(index) {
                    if ($(this).hasClass("selected")) {
                        selected = index;
                    }
                })
            } 
            console.log('this option is selected index ' + selected);
            var i = 0;
            for (var x in skuProducts) {
                if (i === selected) {
                    console.log('Found');
                    console.log(skuProducts[x]);
                    selectedSku = skuProducts[x]['skuAttr'];
                    break;
                }
                i++;
            }
            console.log('Selected SKU');
            console.log(selectedSku);

            setStorageLocal('AliexpressProduct', {
                    productId: productId,
                    productURL: productURL,
                    productName: productName,
                    quantity: quantity,
                    selectedSku: selectedSku,
                    skuProducts: skuProducts
                });
            sendMessage('switch to inkfrog order tab');
            sendMessage('switch to lightinglister order tab');
            getStorageLocal('AliexpressProduct', function(e) {
                console.log(e);
            })
        });
        
    }
}