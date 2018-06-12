function disassociateRepCust(cid, sid){
    console.log("Customer id: " + cid + " Rep id: " + sid);
    var confirmDelete = confirm("Are you sure you want to disassociate this Sales Rep from this Customer?");
    if(confirmDelete){     
        $.ajax({
            url: '/salespeople/' + cid + '_' + sid,
            type: 'DELETE',
            success: function(result){
                window.location.reload(true);
            }
        });
    }
};