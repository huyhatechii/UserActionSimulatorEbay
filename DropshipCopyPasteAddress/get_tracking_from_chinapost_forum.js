//alert('ok')
getTrackingNumberFromChinaPost()

function getTrackingNumberFromChinaPost() {
	var topicURL = document.getElementsByClassName("topicTitle");
    var trackingNumber = [];
    //console.log(topicURL);
    for (i = 0; i < topicURL.length; i++) {
        var link = topicURL[i].children[0].getAttribute("href");
        //console.log(link);
        loadDoc(link, function(xhttp) {
            var d = document.createElement('div');
            d.innerHTML = xhttp.responseText;
            var topicText = d.getElementsByClassName("topic_text");
            for (j = 0; j < topicText.length; j++) {
                var words = topicText[j].textContent.split(" ");
                for (k = 0; k < words.length; k++) {
                    var strWord = words[k].toString();
                    if (strWord.includes("CN")) {
                        // check position
                        var index = strWord.indexOf("CN");
                        var tracking = strWord.substr(index - 11, index + 2);
                        if (tracking.length == 13) {
                            // console.log(tracking);
                            trackingNumber.push(tracking);
                        }

                    }
                }
            }
        });
    }
    setTimeout(function() {
        var output = "";
        for (i = 0; i < trackingNumber.length; i++) {
            output = output + trackingNumber[i] + "\n";
        }
        console.log(output);
    }, 4000);
}