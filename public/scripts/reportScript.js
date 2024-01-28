document.addEventListener('DOMContentLoaded', async function () {
    const GenerateReport=document.getElementById('GenerateReport');
    if(GenerateReport){
        GenerateReport.addEventListener('click', generateReport);
    } 
    const backButton=document.getElementById('back-button');
    if(backButton){
        backButton.addEventListener("click",goBack);
    }
})



function generateReport() {
    var reportType = document.getElementById("report-type").value;
    var fromDate = document.getElementById("from-date").value;
    var toDate = document.getElementById("to-date").value;
    var reportOutput = document.getElementById("report-output");
  
    reportOutput.innerHTML = "";
  
    if (reportType === "sales" || reportType === "stock" || reportType === "commission" || reportType === "closing") {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/reports/generateReport", true);
      xhr.setRequestHeader("Content-Type", "application/json");
  
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
              // Display the data in table format
              displayTable(response.reportData);
            } else {
              reportOutput.innerHTML = "Error fetching data.";
            }
          } else {
            reportOutput.innerHTML = "Error fetching data: " + xhr.statusText;
          }
        }
      };
  
      // Send the request with the selected report type and date range
      xhr.send(JSON.stringify({ reportType: reportType, fromDate: fromDate, toDate: toDate }));
    }
  }
  


    function displayTable(data) {
        var reportOutput = document.getElementById("report-output");
    
        // Create a table element
        var table = document.createElement("table");
    
        // Create a header row
        var headerRow = table.insertRow(0);
        for (var key in data[0]) {
          var th = document.createElement("th");
          th.innerHTML = key;
          headerRow.appendChild(th);
        }
    
        // Create rows with data
        for (var i = 0; i < data.length; i++) {
          var row = table.insertRow(i + 1);
          for (var key in data[i]) {
            var cell = row.insertCell();
            
            // Check if the current key is 'date' and format it
            if (key === 'date') {
              cell.innerHTML = formatDate(data[i][key]);
            } else {
              cell.innerHTML = data[i][key];
            }
          }
        }

  // Append the table to the reportOutput element
  reportOutput.appendChild(table);
}
function formatDate(inputDate) {
    const date = new Date(inputDate);
  
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Months are zero-based
    const year = date.getUTCFullYear();
  
    // Pad single-digit day and month with a leading zero
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}-${formattedMonth}-${year}`;
  }

function goBack() {
  window.history.back();
}

window.addEventListener('load', function () {
    // Fetch user information from the server
    fetch('/api/users/current')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Unauthorized');
            }
        })
        .then(data => {
            // Update the user name in the dashboard
            document.getElementById('username-display').innerText = data.user.name;

            // Store user data in session storage
            sessionStorage.setItem('currentUser', JSON.stringify(data.user));
        })
        .catch(error => {
            // Handle unauthorized access, e.g., redirect to the login page
            window.location.href = '/login.html'; // Adjust the URL based on your project structure
        });
});