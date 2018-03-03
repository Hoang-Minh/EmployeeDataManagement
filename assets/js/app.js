$(document).ready(function(){
    

    var config = {
        apiKey: "AIzaSyBjl3VoxjFJHxPe_8Hjmh90mU_DywiapSY",
        authDomain: "myproject-1e732.firebaseapp.com",
        databaseURL: "https://myproject-1e732.firebaseio.com",
        projectId: "myproject-1e732",
        storageBucket: "myproject-1e732.appspot.com",
        messagingSenderId: "837965826408"
      };
    firebase.initializeApp(config);

    var database = firebase.database();
    database.ref().on("value", displayData, getError)

    function displayData(snap){

        $("#employee").empty();        
        var values = snap.val();
        if(!$.isEmptyObject(values))
        {
            var keys = Object.keys(values);
            console.log("Keys: " + keys);

            for(var i = 0; i < keys.length; i++){
                var k = keys[i];
                var name = values[k].name;
                var role = values[k].role;
                var startDate = values[k].startYear;
                var rate = values[k].rate;

                console.log(name);
                console.log(role);
                console.log(startDate);
                console.log(rate);

                var employeeData = "<tr>";
                employeeData += "<td>" + name + "</td>";
                employeeData += "<td>" + role + "</td>";
                employeeData += "<td>" + startDate + "</td>";
                employeeData += "<td></td>";
                employeeData += "<td>" + rate + "</td>";
                employeeData += "<td></td>";
                employeeData += "</tr>";

                $("#employee").append(employeeData);
            }
        }

    }

    function getError(error){
        console.log(error);
    }
    
    // database.ref().orderByChild("dataAdded").limitToLast(1).on("child_added", function(snap){
        
    // })

    $(document).on("click", "#addToDatabase", function(event){
          event.preventDefault();
          var employeeName = $("#name").val().trim();
          var employeeRole = $("#role").val().trim();
          var startYear = $("#startDate").val().trim();
          var monthlyRate = $("#monthly-rate").val().trim();

          database.ref().push({
              name : employeeName,
              role : employeeRole,
              startYear : startYear,
              rate : monthlyRate,
              dataAdded: firebase.database.ServerValue.TIMESTAMP
          });
    });
    
    
})