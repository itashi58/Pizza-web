function initialise() {

    var crypto = require('crypto');

    var order = {
        version: 3,
        public_key: 'i52645082200',
        action: "pay",
        amount: 568.00,
        currency: "UAH",
        description: "Покупка піци",
        order_id: Math.random(),

        sandbox: 1
    };

    var data = base64(JSON.stringify(order));
    var signature = base64(sha1('jOy184ASegVwMXwDogJoaltE09JpzZuFxoy9lEiq'
        + data + 'jOy184ASegVwMXwDogJoaltE09JpzZuFxoy9lEiq')); //change

    function base64(str) {
        return new Buffer(str).toString('base64');
    }

    function sha1(string) {
        var sha1 = crypto.createHash('sha1');
        sha1.update(string);

        return sha1.digest(); //change
    }

    LiqPayCheckout.init({
        data: data,
        signature: signature,
        // embedTo: "#liqpay",
        //	embed	||	popup
        mode: "popup"
    }).on("liqpay.callback", function (data) {
        console.log(data.status);
        console.log(data);
    }).on("liqpay.ready", function (data) {
//	ready
    }).on("liqpay.close", function (data) {
//	close
    });
}

exports.initialise = initialise;