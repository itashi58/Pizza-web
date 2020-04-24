/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");

let pizzaInMenuNum = 0;

let PizzaProperties = {
    Meat: "meat",
    Pineapples: "pineapple",
    Mushrooms: "mushroom",
    SeaFood: "ocean"
};

function showPizzaList(list) {


    //Очищаємо старі піци в кошику
    $pizza_list.html("");
    pizzaInMenuNum = 0;

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find("#buy-big").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find("#buy-small").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
        pizzaInMenuNum++;
    }

    list.forEach(showOnePizza);
    $("#pizzaInMenuNum").html(pizzaInMenuNum);
}

function filterPizza(filter) {
    let pizza_shown = [];

    if(filter !== "all") {
        pizzaInMenuNum = 0;
        Pizza_List.forEach(function (pizza) {
            if (pizza.content.hasOwnProperty(filter) && pizza.content[filter]) {
                pizza_shown.push(pizza);
                pizzaInMenuNum++;
            }
        });

        showPizzaList(pizza_shown);
    } else {
        showPizzaList(Pizza_List);
    }
}

function initialiseMenu() {
    //Показуємо усі піци
    showPizzaList(Pizza_List);

    $("#filter-none").click(function () {
        filterPizza("all");
        $("#pizzaInMenuNum").html(pizzaInMenuNum);
    });
    $("#filter-meet").click(function () {
        filterPizza(PizzaProperties.Meat);
        $("#pizzaInMenuNum").html(pizzaInMenuNum);
    });
    $("#filter-pineapple").click(function () {
        filterPizza(PizzaProperties.Pineapples);
        $("#pizzaInMenuNum").html(pizzaInMenuNum);
    });
    $("#filter-mushrooms").click(function () {
        filterPizza(PizzaProperties.Mushrooms);
        $("#pizzaInMenuNum").html(pizzaInMenuNum);
    });
    $("#filter-seafood").click(function () {
        filterPizza(PizzaProperties.SeaFood);
        $("#pizzaInMenuNum").html(pizzaInMenuNum);
    });
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;