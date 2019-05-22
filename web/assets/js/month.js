$(document).ready(function() {

    /*tui.chart.registerTheme('myTheme', theme);
    options.theme = 'myTheme';*/


    function columnChart() {
        dataset = {};
        options = {
            chart: {
                width: 700,
                height: 500,
                title: '월별 전기사용량과 전기판매량 ',
                format: '100'
            },
            yAxis: {
                title: 'KW',
                /*min: 0,
                max: 3000*/
            },
            xAxis: {
                title: '월'
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
        let container = document.getElementById('chart-area2');

        $.ajax({
            url: 'http://192.168.1.24:9090/StaticsController',
            type: 'GET',
            /*data: {
               month: month,
              /!* month_use: month_use,
               month_sale: month_sale*!/
            },*/

            timeout : 3000,
            success: function (data) {

                dataset = data
                console.log(dataset);

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
                alert('월별 Error message');
            }
        });
    }

    columnChart();
});