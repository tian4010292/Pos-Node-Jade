$(document).ready(function () {
    function getCounter () {
        $.get('/api/cart_counter', function (data, status) {
            if(!data || data.err) {
                console.log(data);
            }
            else {
                $('#cart_counter').text(data);
            }
        });

    }
    getCounter();

    $('#item-list-table').on('click', 'button', function () {
        var item_name = $(this).closest('tr').children().first().next().text();
        $.post('/api/add_item', {name: item_name}, function (data, status) {
            if(!data || data.err) {
                alert('加入购物车失败！');
                console.log(data);
            }
            else {
                var counter = $('#cart_counter');
                counter.text(parseInt(counter.text()) + 1);
            }
        });
    });

    $('#bought-list-table').on('click', 'button', function () {
        var self = this;
        var item_name = $(self).closest('tr').children().first().next().text();
        var operation = { '+': 'add', '-': 'minus'}[$(this).text()];
        $.post('/api/' + operation + '_item', { name: item_name }, function (data, status) {
            if(!data || data.err) {
                alert('数量变更失败！');
                console.log(data);
            }
            else {
                var counter = $('#cart_counter');
                var number = $(self).closest('.btn-group').find('.item-count');
                if(operation == 'add') {
                    counter.text(parseInt(counter.text()) + 1);
                    number.text(parseInt(number.text()) + 1);
                }
                else {
                    counter.text(parseInt(counter.text()) - 1);
                    number.text(parseInt(number.text()) - 1);
                }
                $.post('/api/sum_display', { name: item_name }, function (data, status) {
                    $(self).closest('tr').children().last().text(data);
                });
            }
        });
    });
});