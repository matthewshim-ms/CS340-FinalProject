function updateSalesRep(id) {
    var confirmUpdate = confirm("Are you sure you want to update this Sales rep?");
    if(confirmUpdate){
        
        $.ajax({
            url: '/salespeople/'+ id,
            type: 'PUT',
            data: $('#update-salesrep').serialize(),
            success: function(result){
                window.location.replace("./");
                console.log("hello");
            }
        });
    }
};
