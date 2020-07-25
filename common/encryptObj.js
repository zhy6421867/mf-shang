import CryptoJS from 'crypto-js'

function encrypt(data) {
    /*偏移量（被拆成了两段）*/
    var CB = "03920392";

    function CBCIV(CB) {
        return CB + "03920300"
    }

    // AES 密钥 （必须16位）
    var DTime = new Date().getTime();
    var Random = (Math.random() * 100000).toFixed(0) * 1 || 0;

    var AK = function (a, b) {
        return ((a + b).toString() + "0000000000000000").substr(0, 16)
    };

    function encryptFn(data) {
        var key = CryptoJS.enc.Utf8.parse(AK(DTime, Random));
        var secretData = CryptoJS.enc.Utf8.parse(data);
        var encrypted = CryptoJS.AES.encrypt(
            secretData,
            key,
            {
                iv: CryptoJS.enc.Utf8.parse(CBCIV(CB)),
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }
        );
        return encrypted.toString();
    }

    for (var i in data) {
        data[i] = encryptFn(data[i]);
    }
    data["Timestamp"] = DTime, data["RAN"] = Random;
    return data
}

/*
* datas object 加密对象
* targetObj 合并对象（非必选）
* */
function encryptObj(datas, targetObj) {
    /*
    * true 加密
    * false 不加密
    * */
    var encryptData = true ? encrypt(datas) : datas;
    if (typeof targetObj === "object") {
        encryptData = Object.assign({}, targetObj, encryptData)
    }
    return encryptData;
}

export {
	encryptObj
}
