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
                //var startDate = values[k].startDate;
                var rate = values[k].rate;


                var startDate = moment(values[k].startDate, "DD/MM/YY").format("X");

                //var startDate = moment($("#startDate").val().trim(), "DD/MM/YY").format("X");
                var empStartPretty = moment.unix(startDate).format("MM/DD/YY");
                console.log("empStartPretty: " + empStartPretty);
                var empMonths = moment().diff(moment.unix(startDate, "X"), "months");
                console.log("Emp Months: " + empMonths);

                var totalBilled = rate * empMonths;


                //

                console.log(name);
                console.log(role);
                console.log(empStartPretty);
                console.log(rate);

                var employeeData = "<tr>";
                employeeData += "<td>" + name + "</td>";
                employeeData += "<td>" + role + "</td>";
                employeeData += "<td>" + empStartPretty + "</td>";

                
                employeeData += "<td>" + empMonths + "</td>";
                employeeData += "<td>" + rate + "</td>";
                employeeData += "<td>" + totalBilled + "</td>";
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
        var startDate = $("#startDate").val().trim();        
        var monthlyRate = $("#monthly-rate").val().trim();        

        database.ref().push({
            name : employeeName,
            role : employeeRole,
            startDate : startDate,
            rate : monthlyRate,
            dataAdded: firebase.database.ServerValue.TIMESTAMP
        });
    });
    
    
})