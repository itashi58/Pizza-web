/**
 * Created by chaika on 25.01.16.
 */

let nameIsRight = false;
let phoneIsRight = false;
let addressIsRight = false;

$(function(){
    //This code will execute when the page is ready
    const PizzaMenu = require('./pizza/PizzaMenu');
    const PizzaCart = require('./pizza/PizzaCart');
    const Pizza_List = require('./Pizza_List');
    const Map = require('./pizza/Map');
    const LiqPay = require('./pizza/Liqpay');


        PizzaMenu.initialiseMenu();
        PizzaCart.initialiseCart();

    if (window.location.pathname === "/order.html") {
        Map.initializeMap();
    }




    $("#submit").click(function () {
        // Order.createOrder();
        setTimeout(function() {
            LiqPay.initialise();
        }, 3000);
    });

    $('#name').focusout(function () {

        nameIsRight = false;
        let myValue = $('#name').val().toString();

        if (myValue.length > 0) {
            nameIsRight = true;
        }

        for (let i = 0; i < myValue.length; i++){
            if(myValue.charCodeAt(i) >= 32 &&  myValue.charCodeAt(i) <= 64){
                nameIsRight = false;
                break;
            }
        }

        if(!nameIsRight){
            $("#nameAlert").html("You have wrong character in name");
            $("#nameAlert").attr("style","color: red !important ");
        } else {
            $("#nameAlert").html("OK");
            $("#nameAlert").attr("style","color: green !important ");
        }

        validData();

    });


    $('#phoneNumber').focusout(function () {

        phoneIsRight = false;
        let myValue = $('#phoneNumber').val().toString();


        if (myValue.length === 9) {
            phoneIsRight = true;
        }

        for (let i = 0; i < myValue.length; i++){
            if(myValue.charCodeAt(i) <= 48 &&  myValue.charCodeAt(i) >= 57){
                phoneIsRight = false;
                break;
            }
        }

        console.log(phoneIsRight);

        if(!phoneIsRight){
            $("#phoneNumberAlert").html("You have wrong character in your number, it should be 9 characters (numbers) in format +380*********");
            $("#phoneNumberAlert").attr("style","color: red !important ");
        } else {
            $("#phoneNumberAlert").html("OK");
            $("#phoneNumberAlert").attr("style","color: green !important ");
        }

        validData();
    });



    $('#address').focusout(function () {

        addressIsRight = true;
        let myValue = $('#address').val().toString();
        
        if (myValue.length === 0) {
            addressIsRight = false;
        }

        console.log(phoneIsRight);

        if(!addressIsRight){
            $("#addressAlert").html("Write your address");
            $("#addressAlert").attr("style","color: red !important ");
        } else {
            $("#addressAlert").html("OK");
            $("#addressAlert").attr("style","color: green !important ");
        }

        validData();
    });

    

});

function validData() {
    if (nameIsRight && addressIsRight && phoneIsRight){
        $("#submit").removeAttr("disabled")
    } else {
        $("#submit").attr("disabled", "disabled");
    }
}

function AddressCheck() {

    addressIsRight = true;
    let myValue = $('#address').val().toString();

    if (myValue.length === 0) {
        addressIsRight = false;
    }

    console.log(phoneIsRight);

    if(!addressIsRight){
        $("#addressAlert").html("Write your address");
        $("#addressAlert").attr("style","color: red !important ");
    } else {
        $("#addressAlert").html("OK");
        $("#addressAlert").attr("style","color: green !important ");
    }

    validData();

}

