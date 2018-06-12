function deleteOrder(id){
    var confirmDelete = confirm("Are you sure you want to delete this Order?");
    if(confirmDelete){
        $.ajax({
            url: '/orders/'+ id,
            type: 'DELETE',
            success: function(result){
                window.location.reload(true);
            }
        });
    }
};