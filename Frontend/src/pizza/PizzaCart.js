/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
let storage = window.localStorage;

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $("#cart");

let totalPizzaPrice = 0;

let PizzaInCart = 0;


function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок

    let haveInCart = false;

    for (let i = 0; i < Cart.length; i++) {
        if (Cart[i].pizza === pizza && Cart[i].size === size) {
            Cart[i].quantity++;
            totalPizzaPrice = totalPizzaPrice + pizza[size].price;
            haveInCart = true;
            break;
        }
    }


    if (!haveInCart) {
        Cart.push({
            pizza: pizza,
            size: size,
            quantity: 1,
        });
        totalPizzaPrice = totalPizzaPrice + pizza[size].price;
    }

    PizzaInCart ++;


    //Оновити вміст кошика на сторінці
    updateCart();
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика

    for (let i = 0; i < Cart.length; i++) {
        if (Cart[i] === cart_item) {
            Cart.splice(i, 1);
            break;
        }
    }
    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    let storageCart = JSON.parse(storage.getItem("cart"));

    if(storageCart) {
        Cart = storageCart;
        Cart.forEach(function (element) {
            PizzaInCart+=element.quantity;
        });
        $("#CardTotal").html(PizzaInCart);
        Cart.forEach(function (element) {
            totalPizzaPrice += element.quantity * element.pizza[element.size].price;
        });
    }

    $("#removeOrder").click(function () {
        Cart = [];
        PizzaInCart = 0;
        totalPizzaPrice = 0;
        updateCart();
    });

    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html("");



    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);

        $node.find(".plus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity++;
            totalPizzaPrice = totalPizzaPrice + cart_item.pizza[cart_item.size].price;
            PizzaInCart++;
            //Оновлюємо відображення
            updateCart();
        });

        $node.find(".minus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity --;
            totalPizzaPrice = totalPizzaPrice - cart_item.pizza[cart_item.size].price;
            PizzaInCart--;
            if(cart_item.quantity === 0){
                removeFromCart(cart_item);
            }
            //Оновлюємо відображення
            updateCart();
        });


        $node.find(".cross").click(function () {
            PizzaInCart -= $node.find(".pizza-count").html();
            totalPizzaPrice = totalPizzaPrice -(cart_item.quantity * cart_item.pizza[cart_item.size].price);
            removeFromCart(cart_item);
            updateCart();
        });



        $cart.append($node);
        // $node.css("display", "none");
        // $node.slideDown();
    }

    $("#CardTotal").html(PizzaInCart);
    $("#total-price").html(totalPizzaPrice);
    Cart.forEach(showOnePizzaInCart);

    storage.setItem("cart", JSON.stringify(Cart));

}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;


exports.PizzaSize = PizzaSize;