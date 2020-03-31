function downloadPhotoFromAmazon() {
	var imgUrl = document.getElementsByClassName('imgTagWrapper')[0].children[0].getAttribute('src')
	var indexUX = imgUrl.indexOf('UX')
	imgUrl = imgUrl.substring(0, indexUX) + "UX5000_.jpg"
	var title = document.getElementById('productTitle').textContent.trim()
	if (title.length <= 62) {
		title = title.toLowerCase().split('t-shirt').join('').split('shirt').join('').replace(/\s+/g, " ").trim().split('-').join(' ')
		title = titleCase(title) + " Men Cotton T-Shirt"
	} else {
		title = titleCase(title.toLowerCase())
	}

	var x=new XMLHttpRequest();
	x.open("GET", imgUrl, true);
	x.responseType = 'blob';
	x.onload=function(e){download(x.response, title + ".jpg", "image/jpg" ); }
	x.send();
}