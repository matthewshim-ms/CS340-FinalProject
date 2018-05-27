function deleteSalesrep(id){
    var confirmDelete = confirm("Are you sure you want to delete this Sales rep?");
    if(confirmDelete){
        
        $.ajax({
            url: '/salespeople/'+ id,
            type: 'DELETE',
            success: function(result){
                window.location.reload(true);
            }
        });
    }
};