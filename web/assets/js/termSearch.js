var start_date = document.getElementById('start_date');
var end_date = document.getElementById('end_date');
var searchBtn = document.getElementById('search');



searchBtn.onclick = function () {
    $.ajax({
        url: "http://192.168.1.24:9090/CalendarController",
        type: 'GET',
        data: {
            start_date: start_date.value,
            end_date: end_date.value
        },
        success: function (data) {
            dataset = data
            console.log("콘솔2 : "+dataset);

            container.innerHTML = "";
            var options = {
                chart: {
                    width: 700,
                    height: 500,
                    title: '기간별 전기사용량과 전기판매량'
                },
                yAxis: {
                    title: 'KW',
                },
                xAxis: {
                    title: '기간',
                    pointOnColumn: true,
                    dateFormat: 'MMM',
                    tickInterval: 'auto'
                },
                series: {
                    showDot: false,
                    zoomable: true

                },
                tooltip: {
                    suffix: 'W'
                },
                legend: {
                    align: 'top'
                }
            };
            var chart = tui.chart.lineChart(container, dataset, options);

            // pay.innerHTML = dataset.payment;
            //
            // for(let i = 0; i<dataset.series.length; i++){
            //     today_usage += dataset.series[0].data[i];
            //     today_sales_rate += dataset.series[1].data[i];
            // }
            //
            // usage.innerHTML = today_usage;
            // sales_rate.innerHTML = today_sales_rate;
            //
            // alert("오늘사용량 : "+today_usage+", 판매량 : "+ today_sales_rate);

        },
        error: function () {
            alert('기간별 Error message');
        }
    });
}