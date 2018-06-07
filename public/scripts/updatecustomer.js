function updateCustomer(id) {
    var confirmUpdate = confirm("Are you sure you want to update this Customer?");
    if(confirmUpdate){
        
        $.ajax({
            url: '/customers/'+ id,
            type: 'PUT',
            data: $('#update-customer').serialize(),
            success: function(result){
                window.location.replace("./");
                console.log("hello");
            }
        });
    }
};