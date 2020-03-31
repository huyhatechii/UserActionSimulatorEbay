 if ("gethuman.com" === window.location.hostname) {
 	setInterval(function(){ 
 		console.log('Checking gethuman')
 		if (document.getElementsByClassName('btn-primary')[0] != null) {
 			console.log('Calling ebay!!')
 			document.getElementsByClassName('btn-primary')[0].children[0].click()
 		}

 	}, 5000)
 }

