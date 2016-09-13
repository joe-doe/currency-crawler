
$(function(){
    var ctx = $('.chart');

    var data = {
        labels: [],
        datasets: [
            {
                label: "usd / euro",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [],
                spanGaps: false,
            }
        ]
    };

    $.get('https://currency-crawl.herokuapp.com/usd_data', function(res, status){
        
        for (var i=0; i<res.length; i++) {
            data.labels.push(res[i].date);
            data.datasets[0].data.push(res[i].buy);
        }

        var myLineChart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                title: {
                    display: true,
                    text: 'USD Chart'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });

   });

});