


$(document).ready(function(){
       function step2() {
        console.log('Run step 2');
        var myVar = setTimeout(function() {
            if (document.documentElement.innerHTML.search("You've been outbid") != -1) {
                getStorageSync('totalAuction', function(totalAuction) {
                    console.log("totalAuction = " + totalAuction);
                    console.log('increase total auction');
                    setStorageSync('totalAuction', ++totalAuction);
                    setStorageSync('isBidding', false);
                    window.close();
                    
                })
                clearInterval(myVar);
            } else {
                console.log('NOT increase total auction');
                setStorageSync('isBidding', false);
                clearInterval(myVar);
                window.close();
            }
        }, 500);
    }

    getStorageSync('isBidding', function(value) {
        //alert(value)
        console.log('isBidding: ' + value);
        if (value === true) {
            console.log('Bidding');
            document.getElementById('bidBtn_btn').click();
            var myVar = setInterval(function() {
                console.log(document.getElementById('app-bidlayer-bidsection-input'));
                if (typeof(document.getElementById('app-bidlayer-bidsection-input')) != 'undefined' && document.getElementsByClassName('app-bidlayer-bidsection-custombid').length > 0) {
                    var customBidElement = document.getElementsByClassName('app-bidlayer-bidsection-custombid')[0];
                    clearInterval(myVar);
                    console.log('Filling bid price');
                    setTimeout(function() {
                        document.getElementById('app-bidlayer-bidsection-input').value = 0.5;
                    }, 3000);
                    setTimeout(function() {
                        customBidElement.getElementsByClassName('button-placebid')[0].click();
                        step2();
                    }, 4000);
                }
                if (document.documentElement.innerHTML.search("Bidding has ended") != -1) {
                    window.close();
                }

                if (document.getElementsByClassName('inpVal').length > 0 && document.getElementsByClassName('ebayBidSectionTr').length > 0) {
                    var customBidElement = document.getElementsByClassName('ebayBidSectionTr')[0];
                    clearInterval(myVar);
                    console.log('Filling bid price');
                    setTimeout(function() {
                        customBidElement.getElementsByClassName('inpVal')[0].value = 0.5;
                    }, 5000);
                    setTimeout(function() {
                        customBidElement.getElementsByClassName('btn btn-prim  vi-placemax-alignment')[0].click();
                        step2();
                    }, 6000);
                }

                
            }, 500)
        }
    }); 
    
});