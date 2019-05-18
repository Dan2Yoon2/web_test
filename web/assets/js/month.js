$(function() {

    /*tui.chart.registerTheme('myTheme', theme);
    options.theme = 'myTheme';*/
    let container = document.getElementById('chart-area2');

    function columnChart() {
        dataset = {};
        options = {
            chart: {
                title: 'Column Chart',
                format: '100'
            },
            yAxis: {
                title: 'Amount',
                min: 0,
                max: 1000
            },
            xAxis: {
                title: 'Usage & Sales rate'
            },
            legend: {
                align: 'top'
            }
        };
        theme = {
            series: {
                colors: [
                    '#f44336', '#ffc107', '#00bcd4', '#673ab7', '#289399',
                    '#ec407a', '#8bc34a', '#ff5722', '#3f51b5', '#dddddd'
                ]
            }
        };

        var month_use=0;
        var month_sale=0;

        let usage = document.getElementById('usage');
        let sales_rate = document.getElementById('sales_rate');

        $.ajax({
            url: 'http://192.168.1.24:9090/StaticsController',
            type: 'GET',
            data: {
               month: month,
               month_use: month_use,
               month_sale: month_sale
            },
            success: function (data) {

                dataset = data
                console.log(dataset);

                container.innerHTML = "";

                var chart = tui.chart.columnChart(container, dataset, options);

                for(let i = 0; i<dataset.series.length; i++){
                    total_use += dataset.series[0].data[i];
                    total_sale += dataset.series[1].data[i];
                }

                usage.innerHTML = month_use;
                sales_rate.innerHTML = month_sale;

                alert("월 사용량"+month_use+", 월 판매량 "+ month_sale);
            },
            error: function () {
                alert('Error message');
            }
        });
    }

    columnChart();
});