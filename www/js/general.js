
app.log = function (msg) {
  console.trace(msg);
};

app.executeFunction = function (func, a, b, c, d, e) {
  if (typeof func == "function") {
    func(a, b, c, d, e);
  }
};


String.format = String.prototype.format = function () {
  var i = 0,
    l = 0;
  var string = typeof this == "function" && !i++ ? arguments[0] : this;
  while (i < arguments.length) {
    string = string.replaceAll("{" + l + "}", arguments[i]);
    i++;
    l++;
  }
  return string;
};

$(document).ready(function () {
  $("#uploadButton").click(function () {
    var formData = new FormData();
    formData.append("uploadFile", $("#uploadFile")[0].files[0]);
    $.ajax({
      url: "/upload",
      type: "POST",
      data: formData,
      processData: false, // tell jQuery not to process the data
      contentType: false, // tell jQuery not to set contentType
      success: function (data) {
        console.log(data);
      },
      error: function (error) {
        console.log(error);
      },
    });
  });




  // function getSerialPorts(){
  
  //   $.ajax({
  //     url: "/readPort",
  //     type: "GET",
  //     data: formData,
  //     processData: false, // tell jQuery not to process the data
  //     contentType: false, // tell jQuery not to set contentType
  //     success: function (data) {
  //       console.log(data);
  //     },
  //     error: function (error) {
  //       console.log(error);
  //     },
  //   });
  // }

  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [name, value] = cookie.split('=');
    if (name === 'userRole') {
      gblUserRole = value; 
      break;
    }
  }
});

// $("#stopserial").click(function () {
 
//   $.ajax({
//     url: "http://localhost:8686/closePort",
//     type: "GET",
//     cache: false,
//     success: function (res) {
//       console.log(res);
//     },
//   });

// });



$("#stopReading").click(function () {
  $.ajax({
    url: "http://localhost:8686/closePort",
    type: "GET",
    cache: false,
    success: function (res) {
      console.log(res);
    },
  });
});

// $(document).ready(function () {
//   // app.serialHelper.readFromSerialPort();
//   $.ajax({
//     url: "http://localhost:8686/serialSend",
//     type: "GET",
//     cache: false,
//     //   dataType: "json", // added data type
//     success: function (res) {
//       console.log(res);
//     },
//   });
// });

// let socket;
// $(document).ready(function () {
//   socket = io.connect("http://localhost:3000");
// });

// $(document).ready(function () {
//   console.log("trigger socket connection");
//   alert("test");
//   socket.emit("message", "Hello, server!");
//   socket.on("message", (message) => {
    
//     console.log(`Message from server: ${message}`);
//     document.getElementById("testtrue").value= message;
//   });
// });


