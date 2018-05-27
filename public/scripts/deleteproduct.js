function deleteProduct(id){
    var confirmDelete = confirm("Are you sure you want to delete this Product?");
    if(confirmDelete){
        
        $.ajax({
            url: '/products/'+ id,
            type: 'DELETE',
            success: function(result){
                window.location.reload(true);
            }
        });
    }
};