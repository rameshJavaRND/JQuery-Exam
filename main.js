let UData;

$(document).ready(function () {

//Get user data from Json for Login
 $.ajax({
    url: "../login.json",
    dataType: "json",
    type: "get",
    data: {},
    success: function (data) {
        UData = data;
    },
    error: function () {
      alert("Unable to login");
    },
  });
 
 // Modal button submit
 $("#add-btn").click(function () {
    //login validation
    if($("#email").val()== "")
    {
      document.querySelector(".err-email").style.opacity = 1;
      return false;
    }
    else
    {
      document.querySelector(".err-email").style.opacity = 0; 
    }

    if($("#password").val()== "")
    {
      document.querySelector(".err-password").style.opacity = 1;
      return false;
    }
    else
    {
      document.querySelector(".err-password").style.opacity = 0; 
    }

    $.map(UData, function (Obj) {
      //if email, password match and status should be active
      if (Obj.email == $("#email").val() &&Obj.password == $("#password").val() &&Obj.status == 'active') 
      {
        sessionStorage.setItem("name", Obj.firstname);
        sessionStorage.setItem("lname", Obj.lastname);
        sessionStorage.setItem("email", Obj.email);
        sessionStorage.setItem("mobile", Obj.mobile);
        sessionStorage.setItem("loginName", Obj.loginName);
        sessionStorage.setItem("role", Obj.role);
        // Redirecting to loggedin index page
        window.location = "indexlogin.html";
      } 

    });
  });

  // Logout function
  $(".logoutb").click(function () {
    if (sessionStorage.length > 0) {
      sessionStorage.clear();
      window.location = "index.html";
    }
  });

  // Reset function
  function resetInputs() {
    $("#fname").val("");
    $("#lname").val("");
    $("#emailId").val("");
    $("#mobno").val("");
    $("#city").val("");
  }

  //Search function
  $("#search").on("keyup", function () {
    let value = $(this).val().toLowerCase();
    $("#table-body tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });

  // Adding new contacts
  let index = 1;
  $("#contact-btn").click(function (e) {
    e.preventDefault();
    let fName = document.getElementById("fname").value;
    let lName = document.getElementById("lname").value;
    let emailId = document.getElementById("emailId").value;
    let mobNumber = document.getElementById("mobno").value;
    let cityVal = document.getElementById("city").value;

    let myArray = [];

    let myObj = {
      firstName: fName,
      lastName: lName,
      eMailId: emailId,
      mobileNo: mobNumber,
      cityName: cityVal,
    };

    //new contact form validation
    if(fName== "")
    {
        document.querySelector(".err-fname").style.opacity = 1;
        return false;
    }
    else
    {
        document.querySelector(".err-fname").style.opacity = 0; 
    }
    if(lName== "")
    {
        document.querySelector(".err-lname").style.opacity = 1;
        return false;
    }
    else
    {
        document.querySelector(".err-lname").style.opacity = 0; 
    }
    if(emailId== "")
    {
        document.querySelector(".err-email").style.opacity = 1;
        return false;
    }
    else
    {
        document.querySelector(".err-email").style.opacity = 0; 
    }
    if(mobNumber== "")
    {
        document.querySelector(".err-mobno").style.opacity = 1;
        return false;
    }
    else
    {
        document.querySelector(".err-mobno").style.opacity = 0; 
    }
    if(cityVal== "")
    {
        document.querySelector(".err-city").style.opacity = 1;
        return false;
    }
    else
    {
        document.querySelector(".err-city").style.opacity = 0; 
    }


    myArray.push(myObj);
    buildTable(myObj);

    function buildTable(data) {
      resetInputs();
      let table = document.getElementById("table-body");
      let row = "";

      for (var i = 0; i <= myArray.length; i++) {
        row = `<tr id=${index}_index style="background-color: #f0f0f0; border: 1px solid #cccccc">
        <td >${index}</td>
        <td id=${index}firstName>${myArray[i]["firstName"]}</td>
        <td id=${index}lastName>${myArray[i]["lastName"]}</td>
        <td id=${index}mobileNo>${myArray[i]["mobileNo"]}</td>
        <td id=${index}eMailId>${myArray[i]["eMailId"]}</td>
        <td id=${index}cityName>${myArray[i]["cityName"]}</td>
        <td id=${index}_icon><i class="fa fa-edit" onClick="edit(${index});"></i> | &nbsp;<i class="fa fa-window-close fa-lg" onClick="del(${index});"></i></td>
        </tr>`;

        table.innerHTML += row;
        index += 1;
      }
    }
  });
});

// Edit button
function edit(index) {
    if(sessionStorage.getItem("role")=="admin"){
        let x = document.getElementById(index + "_index");
        if (x.contentEditable == "true") {

            x.contentEditable = "false";
        } 
        else {
            x.contentEditable = "true";
        }
    }
    else{
        var z = window.open('','','width=200,height=100');
        z.document.write('User has no edit access!!');
        z.focus();
        setTimeout(function() {z.close();}, 3000);
    }

  }
  
// Delete button
function del(index) {
    if(sessionStorage.getItem("role")=="admin"){
        document.getElementById(index + "_index").style.display = "none";
    }
    else{
        var z = window.open('','','width=200,height=100');
        z.document.write('User has no delete access!!');
        z.focus();
        setTimeout(function() {z.close();}, 3000);
    }
  }

//Before/After Login headings 
let firstname = sessionStorage.getItem("name");
$(window).on("load", function () {
  if ("name" in sessionStorage) 
  {
    $("#home-heading").html("Welcome" + " " + firstname + "!!!");
  } 
  else 
  {
    $("#home-heading").html("Please login to get access");
  }
});