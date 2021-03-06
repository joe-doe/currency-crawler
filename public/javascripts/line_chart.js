
$(function(){
    var ctx = $('.chart');

    var data = {
        labels: [],
        datasets: [
            {
                label: "buy",
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
            },
            {
                label: "sell",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(175,92,192,0.4)",
                borderColor: "rgba(175,92,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(175,92,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(175,92,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [],
                spanGaps: false,
            }

        ]
    };

    $.get(document.location.origin+'/usd_data', function(res, status){
        
        for (var i=0; i<res.length; i++) {
            data.labels.push(res[i].date.substring(0,10));
            data.datasets[0].data.push(res[i].buy);
            data.datasets[1].data.push(res[i].sell);
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
                            beginAtZero:false
                        }
                    }]
                }
            }
        });

   });

});