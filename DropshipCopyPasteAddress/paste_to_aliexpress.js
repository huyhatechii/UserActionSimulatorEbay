paste();
function paste() {
	chrome.storage.sync.get("data2", function(items) {
		if (!chrome.runtime.error) {
			
			var obj = items.data2;
			
			var contactPerson = document.getElementsByName("contactPerson");
			contactPerson[0].value = obj.buyercontactname;
			
			// Quốc gia
			var options = document.getElementsByClassName("sa-country")[0].options,
			name = obj.buyercountry;
			var flag = '';
			for(i = 0; i < options.length; i++) {
				if(options[i].text.indexOf(name) > -1) {
					flag = options[i].value;
					break;
				}
			}
			var selections = document.querySelector('.sa-country');
			selections.value = flag;
			console.log(flag);

			var evt = document.createEvent("HTMLEvents");
			evt.initEvent("change", true, true);
			selections.dispatchEvent(evt);
			
			// Địa chỉ
			var address = document.getElementsByName("address");
			address[0].value = obj.buyeraddress1;
			var address2 = document.getElementsByName("address2");
			address2[0].value = obj.buyeraddress2;
			
			var province = document.getElementsByName("province");
			province[0].value = obj.buyerstateprovince;
			
			var city = document.getElementsByName("city");
			city[0].value = obj.buyercity;
			
			var zip = document.getElementsByName("zip");
			zip[0].value = obj.buyerzip;
			
			
			var mobileNo = document.getElementsByName("mobileNo");
			
			if(obj.phone == '') {
				// Load phonedefault
				chrome.storage.sync.get("data_phonedefault", function(data) {
					if (!chrome.runtime.error) {
						mobileNo[0].value = data.data_phonedefault;
					}
				});
			} else {
				mobileNo[0].value = obj.phone;
			}
		}
	});
}