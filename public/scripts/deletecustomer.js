function deleteCustomer(id){
    var confirmDelete = confirm("Are you sure you want to delete this customer?");
    if(confirmDelete){
        
        $.ajax({
            url: '/customers/'+ id,
            type: 'DELETE',
            success: function(result){
                window.location.reload(true);
            }
        });
    }
};