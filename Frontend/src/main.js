/**
 * Created by chaika on 25.01.16.
 */

$(function(){
    //This code will execute when the page is ready
    const PizzaMenu = require('./pizza/PizzaMenu');
    const PizzaCart = require('./pizza/PizzaCart');
    const Pizza_List = require('./Pizza_List');
    const Order = require('./pizza/Order');

    PizzaCart.initialiseCart();
    PizzaMenu.initialiseMenu();

    let nameIsRight = false;
    let phoneIsRight = false;
    let addressIsRight = false;



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
            $("#nameAlert").css('color', "red !important");
        } else {
            $("#nameAlert").html("OK");
            $("#nameAlert").css('color', "green !important");
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
            $("#phoneNumberAlert").css('color', "red !important");
        } else {
            $("#phoneNumberAlert").html("OK");
            $("#phoneNumberAlert").css('color', "green !important");
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
            $("#addressAlert").css('color', "red !important");
        } else {
            $("#addressAlert").html("OK");
            $("#addressAlert").css('color', "green !important");
        }

        validData();
    });
    
    
    function validData() {
        if (nameIsRight && addressIsRight && phoneIsRight){
            $("#submit").removeAttr("disabled")
        }
    }



});