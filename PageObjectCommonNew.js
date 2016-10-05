var All = function () {

    this.inputForm = element(by.model('query'));

    this.selectType = function (string) {
        element(by.css(".button")).click();
        element(by.css(".dropdown.active>label[for='search-" + string + "']")).click();
    };

    this.checkKeywordInProfile = function (obj, keyword) {        
        if (Array.isArray(obj)) {
            for (i = 0; i < obj.length; i++) {
                var item = obj[i];
                var newObj = {};
                for (key in obj[i]) {
                    if(Array.isArray(obj[i][key])){
                        obj[i][key] = obj[i][key].filter(function(v){return v!==''}).join();
                    }
                    if (key == "descr") {
                        obj[i][key] = obj[i][key].replace(/<[^>]+>|(^"|"$)|\.+$/g, "").trim();
                    }
                    var oldkey = item[key];
                    newObj[key] = item[key].toLowerCase().includes(keyword.toLowerCase());
                    newObj[key] == true ? console.log(oldkey + " (" + key + ") " + "======> KEYWORD exist") : console.log(oldkey + " (" + key + ") " + "======> KEYWORD NOT exist");
                }
            }
        } else {            
            for (key in obj) {
                newObj = {};
                if(Array.isArray(obj[key])){
                    obj[key] = obj[key].filter(function(v){return v!==''}).join().toLowerCase();
                }
                if (key == "descr") {
                    obj[key] = obj[key].replace(/<[^>]+>|less/g, "").trim();
                }
                var oldkey = obj[key];
                newObj[key] = obj[key].toLowerCase().includes(keyword.toLowerCase());
                newObj[key] == true ? console.log(oldkey + " (" + key + ") " + "======> KEYWORD exist") : console.log(oldkey + " (" + key + ") " + "======> KEYWORD NOT exist");
            }
        }
    };

    this.searchInArr = function (arr, key, valuesearch) {
        for(var i = 0; i < arr.length; i++) {
            if (arr[i][key]== valuesearch) {
                return i
            }
        }
        console.log("nothing found");
    };
};

module.exports = All;

