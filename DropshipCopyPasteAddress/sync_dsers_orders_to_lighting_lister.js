

setTimeout(function() {
    // get token
    $databaseLink = document.getElementsByClassName('ant-table-row ant-table-row-level-0')[0].children[1].children[0].getAttribute('href');
    $token = $databaseLink.split('token=')[1];
    console.log('token: ' + $token);
    setStorageLocal('dsersToken', $token);

    $e = document.getElementsByClassName('ant-alert-message')[0];
    $p = document.createElement("p")   
    $t = document.createTextNode('token: ' + $token);
    $p.appendChild($t);
    $e.appendChild($p);

    // check new orders
    $firstRow = document.getElementsByClassName('ant-table-row ant-table-row-level-0')[1];
    $successURL = $firstRow.children[2].children[0].getAttribute('href');
    $failURL = $firstRow.children[3].children[0].getAttribute('href');

    if ($successURL != null) {
        loadDoc($successURL, function($xhttp) {
            $d = document.createElement('div');
            $d.innerHTML = $xhttp.responseText;
            $data = $.csv.toObjects($xhttp.responseText);
            console.log('success orders = ' + $data.length);
            console.log($data);
            chrome.storage.local.set({dsersSuccessOrder: $data});
            sendMessage('switch to lightinglister order tab');
        })
    } else {
        chrome.storage.local.set({dsersSuccessOrder: []});
    }

    if ($failURL != null) {
        loadDoc($failURL, function($xhttp) {
            $d = document.createElement('div');
            $d.innerHTML = $xhttp.responseText;
            $data = $.csv.toObjects($xhttp.responseText);
            console.log('fail orders = ' + $data.length);
            console.log($data);
            chrome.storage.local.set({dsersFailOrder: $data});
            sendMessage('switch to lightinglister order tab');
        })
    } else {
        chrome.storage.local.set({dsersFailOrder: []});
    }

}, 4000);
