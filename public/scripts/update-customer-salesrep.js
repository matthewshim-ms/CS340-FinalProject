function updateCustomerSalesrep(customer_id, salesrep_id){
    $.ajax({
        url: '/salespeople/assign/customer=' + customer_id + '/salesrep=' + salesrep_id,
        type: 'PUT',
        data: $(`#assign-salesrep`).serialize(),
        success: function(result){
            window.location.replace("./");
        }
    });
};