console.log(window.location.href)

if (window.location.href.includes('shoppingcart.aliexpress.com')) {
    var btn = document.createElement("BUTTON")
    var t = document.createTextNode("Fill Address")
    btn.appendChild(t)
    
    var comboBoxName = 'next-input next-large next-select-inner';
    var found = false;

    var myInterval = setInterval(function(){
        if (typeof(document.getElementsByClassName(comboBoxName)[0]) != 'undefined' && !found) {
            document.getElementsByClassName(comboBoxName)[0].click();
            found = true;
        }
        if (typeof(document.getElementsByClassName(comboBoxName)[0]) === 'undefined') {
            found = false;
        }
        if (typeof(document.getElementsByClassName('dropdown-content')[0]) != 'undefined' && document.getElementsByClassName('dropdown-content')[0].children.length > 10 && found === true) {
            clearInterval(myInterval);
            var saveElement = document.getElementsByClassName('save')[0];
            if (saveElement.children.length <= 2) {
                saveElement.appendChild(btn)
                paste();
                btn.onclick = function() {
                    paste();
                }
            }
        }
    }, 500);

    var myInterval2 = setInterval(function(){
        if (document.getElementsByClassName('pay-title wm-ebank').length > 0 && document.getElementsByClassName('pay-title wm-ebank')[0].parentNode.className === 'pay-type  show-method') {
            console.log('mastercard');
            document.getElementsByClassName('pay-title wm-ebank')[0].click();
            //document.getElementsByClassName('pay-method')[0].getElementsByClassName('next-btn next-large next-btn-primary')[0].click();
        } else {
            console.log('other');
        }
    }, 500);
} else if (window.location.href.includes("https://www.aliexpress.com/af/") || window.location.href.includes("https://www.aliexpress.com/wholesale")) {
    chrome.storage.local.get('keyword', function(e){
        console.log('keyword');
        console.log(e.keyword);
        document.getElementsByClassName('search-key')[0].value = e.keyword;
        document.getElementsByClassName('search-button')[0].click();
    });
}

function paste() {
    var refill = function(address) {
        var event = document.createEvent("HTMLEvents");
        event.initEvent("change", !0, !0);

        // set Default Address
        var checkDefault = document.getElementsByClassName('next-checkbox-label save-as-default')[0];
        checkDefault.focus();
        checkDefault.click();
        checkDefault.dispatchEvent(event);

        // refill province
        var provinceField = document.getElementById('province')
        if (provinceField != 'undefined') {
            provinceField.focus();
            provinceField.value = address.buyerstateprovince;
            provinceField.dispatchEvent(event);
        }

        // refill city
        var cityField = document.getElementById('city')
        if (cityField != 'undefined') {
            cityField.focus();
            cityField.value = address.buyercity;
            cityField.dispatchEvent(event);
        }

        // Fill Address
        var addressField1 = document.getElementById('address');
        addressField1.focus();
        addressField1.value = address.buyeraddress1;
        addressField1.dispatchEvent(event);

        var addressField2 = document.getElementById('address2');
        addressField2.focus();
        addressField2.value = address.buyeraddress2;
        addressField2.dispatchEvent(event);

        // Fill Name
        var nameField = document.getElementById('contactPerson');
        nameField.focus();
        nameField.value = address.buyercontactname;
        nameField.dispatchEvent(event);

        // Phone
        var phoneField = document.getElementById('mobileNo');
        phoneField.focus();
        phoneField.value = address.phone;
        phoneField.dispatchEvent(event);

        // Zip
        var zipField = document.getElementById('zip');
        zipField.focus();
        zipField.value = address.buyerzip;
        zipField.dispatchEvent(event);

        // Fill Notes
        var noteField = document.getElementsByClassName('next-input next-input-textarea seller-message-textarea')[0].children[0];
        noteField.focus();
        noteField.value = 'Please DO NOT combine order when having the same buyer address for multiple orders! I need unique tracking number for each order. If you do wrong I will do not buy again and return all packages. Please also label name the seed and DO NOT POST the INVOICE on the PACKAGE. Make the package as GIFT to avoiding large import. Thank you very much!';
        noteField.dispatchEvent(event);

        // Confirm Address
        document.getElementsByClassName('next-btn next-large next-btn-primary')[0].click();

        
    }

    $(document).ready(function() {
        var comboBoxName = 'next-input next-large next-select-inner';
        chrome.storage.local.get("newAddress", function(e) {
            var address = e.newAddress;
            console.log(address);
            // Fill country
            if (typeof(document.getElementsByClassName(comboBoxName)[0]) != 'undefined') {
                document.getElementsByClassName(comboBoxName)[0].click();

                var myInterval = setInterval(function() { // interval 1
                    var countryNames = document.getElementsByClassName('country-name');
                    if (countryNames.length > 5) { // if 1
                        clearInterval(myInterval);
                        for (i = 0; i < countryNames.length; i++) { 
                            if (countryNames[i].textContent.toLowerCase() === address.buyercountry.toLowerCase()) {
                                console.log('click: ' + countryNames[i].textContent);
                                countryNames[i].click();
                                break;
                            }
                        }

                    setTimeout(function() { // interval 2
                    // fill State/Province/Region
                        if (typeof(document.getElementsByClassName(comboBoxName)[1]) != 'undefined') {  // if 2
                            document.getElementsByClassName(comboBoxName)[1].click();
                            var dropdown = document.getElementsByClassName('dropdown-content')[1].getElementsByClassName('next-menu-item');
                            console.log(dropdown.length);
                            for (j = 0; j < dropdown.length; j++) {
                                if (dropdown[j].textContent.toLowerCase() === address.buyerstateprovince.toLowerCase()) {
                                    dropdown[j].click();
                                    // fill City
                                    if (typeof(document.getElementsByClassName(comboBoxName)[2]) != 'undefined') {
                                        document.getElementsByClassName(comboBoxName)[2].click();
                                        dropdown = document.getElementsByClassName('dropdown-content')[1].getElementsByClassName('next-menu-item');
                                        for (j = 0; j < dropdown.length; j++) {
                                            if (dropdown[j].textContent.toLowerCase() === address.buyercity.toLowerCase()) {
                                                dropdown[j].click();
                                                break;
                                            }
                                        }
                                    }
                                    break;
                                }
                            }
                        } // endif 2

                        refill(address);

                    }, 2000); // end Interval 2

                    } // endif 1
                }, 200); // end Interval 1
                
            }
        })
    });
}
