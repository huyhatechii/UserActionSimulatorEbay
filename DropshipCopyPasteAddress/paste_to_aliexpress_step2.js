paste2();
function paste2() {
	chrome.storage.sync.get("data2", function(items) {
		if (!chrome.runtime.error) {
			
			var obj = items.data2;
			var options = document.getElementsByClassName("ui-textfield-system")[5].options,
				name = obj.buyerstateprovince;
				var flag = '';
				for(i = 0; i < options.length; i++) {
					if(options[i].text.indexOf(name) > -1) {
						flag = options[i].value;
						break;
					}
				}
				var selections = document.querySelector('.sa-province-wrapper select.ui-textfield-system');
				selections.value = flag;
				console.log(selections);

				var evt = document.createEvent("HTMLEvents");
				evt.initEvent("change", true, true);
				selections.dispatchEvent(evt);
					
				// Lấy style nếu nó display none thì điền vào input.	
				if(selections.getAttribute("style") == 'display: none;') {
					var province = document.querySelector('.sa-province-wrapper input.ui-textfield-system');
					province.value = name;
				}


			// Tiểu bang
			setTimeout(function(){ 
				
				
				
			}, 100);
			
			
		}
	});
}