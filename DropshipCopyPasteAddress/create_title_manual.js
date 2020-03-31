function createTitleManual() {
    var mainKeyword = prompt("Keyword chinh: ", "")
    var subKeyword = prompt("Keyword phu: ", "")
    //var gioiTinh = prompt("Gioi tinh: ", "men")
    var gioiTinh = "men"
    var color = prompt("Mau Sac: ", "black")
    var subT = titleCase(color) + ' ' + titleCase(gioiTinh) + ' Cotton T-Shirt S-6XL'
    var titleList = []
    var myOutput = document.getElementById("myOutput")
    myOutput.textContent = ""
    var newDesignId = getRandomDesignId()
    for (i = 0; i < 10; i++) {
        var charArr = subT.split(' ')
        var one = 0
        var two = 0
        var three = 0
        three = getRandomInt(0, 1)
        while (charArr.length >= 2 && one == two) {
            one = getRandomInt(0, charArr.length - 1)
            two = getRandomInt(0, charArr.length - 1)
        }
        var temp = charArr[one]
        charArr[one] = charArr[two]
        charArr[two] = temp
        var title = ''
        if (three === 0) {
            title = subKeyword + ' ' + mainKeyword + ' ' + charArr.join(' ')
        } else {
            title = mainKeyword + ' ' + subKeyword + ' ' + charArr.join(' ')
        }
        title = titleCase(title).replace('T-shirt', 'T-Shirt').replace('S-6xl', 'S-6XL')
        if (title.length > 80) {
            title = title.split('S-6XL').join('')
        } 
        if (title.length > 80) {
            alert('Title > 80 characters')
        } else {
            var node = document.createTextNode(title)
            myOutput.appendChild(node);
            var br = document.createElement("br")
            myOutput.appendChild(br)
        }
    }   
}
function getRandomDesignId() {
    var id
    do {
        id = "DS"
        for (i = 0; i < 10; i++) {
            id += getRandomInt(0, 9).toString()
        }
    } while(designIdSet.has(id) === true || typeof(designIdSet) === 'undefined')
    designIdSet.add(id)
    chrome.storage.sync.set({'designIdSet': JSON.stringify(Array.from(designIdSet))}) 
    console.log(designIdSet)
    return id
}