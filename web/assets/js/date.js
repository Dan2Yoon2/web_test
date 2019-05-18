

$(function() {
    //모든 datepicker에 대한 공통 옵션 설정
    $.datepicker.setDefaults({
        dateFormat: 'yy-mm-dd' //Input Display Format 변경
        , showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
        , showMonthAfterYear: true //년도 먼저 나오고, 뒤에 월 표시
        , changeYear: true //콤보박스에서 년 선택 가능
        , changeMonth: true //콤보박스에서 월 선택 가능
        , showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시
        , buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif" //버튼 이미지 경로
        , buttonImageOnly: true //기본 버튼의 회색 부분을 없애고, 이미지만 보이게 함
        , buttonText: "선택" //버튼에 마우스 갖다 댔을 때 표시되는 텍스트
        , yearSuffix: "년" //달력의 년도 부분 뒤에 붙는 텍스트
        , monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] //달력의 월 부분 텍스트
        , monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'] //달력의 월 부분 Tooltip 텍스트
        , dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'] //달력의 요일 부분 텍스트
        , dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'] //달력의 요일 부분 Tooltip 텍스트
        /*,minDate: "-1M" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
        ,maxDate: "+1M" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)*/
    });

    //input을 datepicker로 선언
    $("#start_date").datepicker();
    $("#end_date").datepicker();

    //From의 초기값을 오늘 날짜로 설정
    $('#start_date').datepicker('setDate', 'today'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
    //To의 초기값을 내일로 설정
    $('#end_date').datepicker('setDate', '+1D'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)

    $('#end_date').datepicker().on('change', function () {
        //alert('날짜 변경됨');
        lineChart();
    });

    //lineChart();
    //////////////////////////////////////////차트JS//////////////////////////////////////////
    let dataset = "";
    var options = "";

    function lineChart() {
        dataset = {};
        options = {
            chart: {
                title: 'line Graph'
            },
            yAxis: {
                title: 'Electronic data',
            },
            xAxis: {
                title: 'Date',
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
            }
        };
        var total_use=0;
        var total_sale=0;

        let usage = document.getElementById('usage');
        let sales_rate = document.getElementById('sales_rate');

        let container = document.getElementById('chart-area');

        let price = document.getElementById('pay');

        var start_date = $('#start_date').val();
        var end_date = $('#end_date').val();


        //columnChart();
        //////////////////////////////////////////차트JS//////////////////////////////////////////



        /*tui.chart.registerTheme('myTheme', theme);
        options.theme = 'myTheme'*/


        /*alert(start_date + ", " + end_date);
    */

        //url: '/CalendarController?start_date=' + start_date + "&end_date=" + end_date,
        //url: '/CalendarController?start_date=2019-05-10&end_date=2019-05-13',
        $.ajax({
            url: 'http://192.168.1.24:9090/CalendarController',
            type: 'POST',
            data: {
                start_date: start_date,
                end_date: end_date
            },
            success: function (data) {

                dataset = data
                console.log(dataset);

                container.innerHTML = "";
                var chart = tui.chart.lineChart(container, dataset, options);

                pay.innerHTML = dataset.payment;

                for(let i = 0; i<dataset.series.length; i++){
                    total_use += dataset.series[0].data[i];
                    total_sale += dataset.series[1].data[i];
                }

                usage.innerHTML = total_use;
                sales_rate.innerHTML = total_sale;

                //alert("사용량"+total_use+", 판매량 "+ total_sale);
            },
            error: function () {
                alert('Error message');
            }
        });
    }

    lineChart();

});

