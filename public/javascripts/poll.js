$(document).ready(function() {

  var id = document.getElementById("inputID").value;
  // Chart

  var ctx = document.getElementById("myChart");
  $.get("/api/poll/" + id, function(data) {
    // We get the data
    var answers = [];
    var votes = [];

    for (var i = 0; i < data.answers.length; i++) {
      answers.push(data.answers[i].answer);
      votes.push(data.answers[i].vote);
    }

    // We construct the data
    var data = {
      // labels (what we're studying) are the answers, data contain the number of votes for each answer
      labels: answers,
      datasets: [{
        data: votes,
        backgroundColor: data.colors,
        hoverBackgroundColor: data.colors
      }],

    };

    // We can now create a new chart
    var myDoughnutChart = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: { responsive: true, maintainAspectRatio: false }
    });
  });
});
