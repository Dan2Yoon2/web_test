$(function () {

    let option = "";

    var today_usage = 0;
    var today_sales_rate = 0;

    let container = document.getElementById('chart-area');
    let usage = document.getElementById('usage');
    let sales_rate = document.getElementById('sales_rate');
    let price = document.getElementById('pay');

    document.getElementById('today').onclick = function(){

        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        if (month.length == 1) {
            month = "0" + month;

        }
        if (day.length == 1) {
            day = "0" + day;
        }

        let today_date = year+"-"+month+"-"+day;

        dataSet(today_date);

        console.log("콘솔 : "+today_date);
        lineChart();

    }


    function lineChart() {

        var dataset = {};
        options = {
            chart: {
                title: 'line Graph'
            },
            yAxis: {
                title: 'Electronic data',
            },
            xAxis: {
                title: 'Hour',
                pointOnColumn: true,
                /*min: 0,
                max: 24,*/
                dateFormat: 'MMM',
                tickInterval: 'auto'
            },
            series: {
                showDot: false,
                zoomable: true

            },
            tooltip: {
                suffix: 'W'
            }
        };

    }



    
    function dataSet(today_date) {

        $.ajax({
            url: "http://192.168.1.24:9090//TodayEnergyController?today_date=2019-05-17",
            type: 'GET',
            data: {
                //today_date: today_date
            },
            success: function (data) {
                dataset = data
                console.log("콘솔2 : "+dataset);

                container.innerHTML = "";
                var chart = tui.chart.lineChart(container, dataset, options);

                pay.innerHTML = dataset.payment;

                for(let i = 0; i<dataset.series.length; i++){
                    today_usage += dataset.series[0].data[i];
                    today_sales_rate += dataset.series[1].data[i];
                }

                usage.innerHTML = today_usage;
                sales_rate.innerHTML = today_sales_rate;

                alert("오늘사용량 : "+today_usage+", 판매량 : "+ today_sales_rate);

            },
            error: function () {
                alert('Error message');
            }
        });

    }

})