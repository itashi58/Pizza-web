function createOrder(){
    var data ={
        'fullName': $('#name').val(),
        'phoneNumber': $('#phoneNumber').val(),
        'address': $('#address').val()
    };

    $.ajax({
        url:'http://localhost:5050/api/create-order/',
        type: 'POST',
        contentType : 'application/json',
        data: JSON.stringify(data),
        success: function(data){
            callback(null, data);
        },
        error: function() {
            callback(new Error("Ajax Failed"));
        }
    });
}
