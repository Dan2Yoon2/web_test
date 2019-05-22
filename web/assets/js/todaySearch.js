

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

        if (month.toString().length == 1) {
            month = "0" + month;

        }
        if (day.toString().length == 1) {
            day = "0" + day;
        }

        var today_date = year+"-"+month+"-"+day;
        var start_date = document.getElementById('start_date');
        var end_date = document.getElementById('end_date');
        start_date.value = today_date;
        end_date.value = today_date;
        dataSet(today_date);

        console.log("콘솔 : "+today_date);
        lineChart();

    }


    function lineChart() {

        var dataset = {};
        options = {
            chart: {
                width: 700,
                height: 500,
                title: '오늘의 전기사용량과 전기판매량'
            },
            yAxis: {
                title: 'KW',
            },
            xAxis: {
                title: '시간',
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
            url: "http://192.168.1.24:9090//TodayEnergyController",
            type: 'GET',
            data: {
                today_date: today_date
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
                alert('오늘 Error message');
            }
        });

    }

    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    if (month.toString().length == 1) {
        month = "0" + month;

    }
    if (day.toString().length == 1) {
        day = "0" + day;
    }

    var today_date = year+"-"+month+"-"+day;
    dataSet("2019-05-24");
