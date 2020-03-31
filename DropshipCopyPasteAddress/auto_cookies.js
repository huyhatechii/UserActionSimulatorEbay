var keywords = ['Iphone 11 promax', 'Google pixel 3', 'pet supplier', 'samsung galaxy s10', 'iphone xs mas']

function getNextSellerHubLink() {
    var links = document.getElementsByClassName('widget-container sortable-container')[0].getElementsByTagName('a');
    var index = Math.floor(Math.random() * links.length);
    if (links[index].getAttribute('target') === null && links[index].getAttribute('href').includes('ebay.com') && links[index].getAttribute('href').includes('Summary') === false && links[index].getAttribute('href').includes('feedback.ebay.com') === false) {
        links[index].click()
    } else {
        getNextSellerHubLink()
    }
}

function getNextProductLink() {
    var links = document.getElementsByClassName('s-item__link')
    var index = Math.floor(Math.random() * links.length);
    links[index].click()
}

function changeStateToSearchItems() {
    debugger
    var rand = Math.floor(Math.random() * keywords.length);
    document.getElementsByClassName('gh-tb ui-autocomplete-input')[0].value = keywords[rand]//select keyword
    
    if((document.getElementsByClassName('btn btn-prim gh-spr') !== undefined) && (document.getElementsByClassName('btn btn-prim gh-spr').length !== 0)){
        document.getElementsByClassName('btn btn-prim gh-spr')[0].click()//click Search button
    }

    if((document.getElementsByClassName('btn btn-ter gh-spr') !== undefined) && (document.getElementsByClassName('btn btn-ter gh-spr').length !== 0)){
        document.getElementsByClassName('btn btn-ter gh-spr')[0].click()//click Search button
    }
}

function changeStateToSellerHub() {
    location.replace('https://www.ebay.com/sh/ovw')
}




getStorageLocal('enableAutoCookies', function(e) {
    debugger
    // if (typeof(e) != 'undefined' && e === true) {
        console.log('window location' + window.location.href)
        if ('https://www.ebay.com/' === window.location.href) {
            var rand = Math.floor(Math.random() * 30);
            console.log('Huy' + rand);
            if (rand > -1) {
                changeStateToSearchItems()// search random keyword
            } else {
                // getNextSellerHubLink()//back to seller hub
            }
        } else if (window.location.href.includes('ebay.com/sch/i.html')) {
            debugger
            var rand = Math.floor(Math.random() * 30);
            if (rand > 25) {
                changeStateToSellerHub()
                document.getElementById("gh-btn")[0].click()
            } else {
                getNextProductLink()
            }
        }
        else if (window.location.href.includes('ebay.com/itm')) {
            debugger
            changeStateToSearchItems()
            debugger

        } else if (window.location.href.includes('signin')) {
            changeStateToSellerHub();
        } else if (getHostName(window.location.href).includes('ebay.com')) {
            console.log('back');
            var rand = Math.floor(Math.random() * 60) + 20;
            console.log('time = ' + rand + ' seconds');
            setTimeout(function(){
            	window.history.back();
            }, 5000 * rand)
        }
    // }
})