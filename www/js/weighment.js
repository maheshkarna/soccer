$(document).ready(() => {
  app.database.createDB();
  app.weighments.loadAgentDropdowns();
  app.weighments.loadPartyDropdowns();
  app.weighments.loadMaterialDropdowns();
  app.weighments.getNumber();

$("#createWeieghment").click(function () {

  $.when(app.database.tables.fields.FetchAll())
  .done(function (data) {
    let validate = true;
    let fieldsIds = ["Vehicle_no", "material","party_name","agent","qty","remark",];
    let ErrorIds = ["Vehicle_noError","materialError","party_nameError","agentError","qtyError","remarkError",];
  
    // Validations 
    for(i=0; i<fieldsIds.length; i++){
      if(data[i].ISVISIBLE == "1" && data[i].ISMANDATORY == "1" &&  document.getElementById(fieldsIds[i]).value ==""){  
        validate = false;
        $("#"+fieldsIds[i]).addClass("is-invalid");
        $("#"+ErrorIds[i]).text("Required Field");
      }else{
        $("#"+fieldsIds[i]).removeClass("is-invalid");
        $("#"+ErrorIds[i]).text("");
      }
    }
    
    //add New validation 
    if($('#material').val()==0 && $('#newMetereal').val() == ""){
      validate = false
      $("#newMetereal").addClass("is-invalid");
      $("#newMetereal_err").text("Required Field");
    }else{
      $("#newMetereal").removeClass("is-invalid");
      $("#newMetereal_err").text("");
    }

    if($('#party_name').val()==0 && $('#newParty_name').val() == ""){
      validate = false
      $("#newParty_name").addClass("is-invalid");
      $("#newParty_name_err").text("Required Field");
    }else{
      $("#newParty_name").removeClass("is-invalid");
      $("#newParty_name_err").text("");
    }
   
    // if($('#agent').val()==0 && $('#newAgent').val() == ""){
    //   validate = false
    //   $("#newAgent").addClass("is-invalid");
    //   $("#newAgent_err").text("Required Field");
    // }else{
    //   $("#newAgent").removeClass("is-invalid");
    //   $("#newAgent_err").text("");
    // }

    if($("#entryType").val()==""){
      validate = false
      $("#entryType").addClass("is-invalid");
      $("#entryTypeError").text("Required Field");
    }else{
      $("#entryType").removeClass("is-invalid");
      $("#entryTypeError").text("")
    }
      
        if(validate){
          $('#confirm_save').modal('show');
        } 
   });
});



$("#confirmSave").click(function () {

  $('#confirm_save').modal('hide');

  $.when(app.database.tables.weighment.getcamData())
  .done(function(data){
    // alert(data);
    console.log(data);
    if(data === null){
      toastr.warning('No Camaras...!','', {timeOut: 1000});
    }
    if(data != null && navigator.onLine){
  
    if(data[0].IP_ONE_ACTIVATE == 0 && data[0].IP_TWO_ACTIVATE == 0 && data[0].IP_THREE_ACTIVATE ==0 ){
      // alert(" Camra Testing")
      let res = ["no Image","no Image","no Image"];
      app.weighments.addWeighment(res); 
    }else{   
    let username1 = data[0].IP_ONE_USERNAME;
    let password1 = data[0].IP_ONE_PASSWORD;
    let portNo1 = data[0].IPPORT_ONE;
    let active1 = data[0].IP_ONE_ACTIVATE;
  
    let username2 = data[0].IP_TWO_USERNAME;
    let password2 = data[0].IP_TWO_PASSWORD;
    let portNo2 = data[0].IPPORT_TWO;
    let active2 = data[0].IP_TWO_ACTIVATE;
  
    let username3 = data[0].IP_THREE_USERNAME;
    let password3 = data[0].IP_THREE_PASSWORD;
    let portNo3 = data[0].IPPORT_THREE;
    let active3 = data[0].IP_THREE_ACTIVATE;
  
    let ipCamURL1 ="";
    let ipCamURL2 ="";
    let ipCamURL3 ="";
  
    if(active1 == 1){
     ipCamURL1 = `rtsp://${username1}:${password1}@${portNo1}/ch01.264`;
    }
    if(active2 == 1){
      ipCamURL2 = `rtsp://${username2}:${password2}@${portNo2}/ch01.264`;
    }
    if(active3 == 1){
       ipCamURL3 = `rtsp://${username3}:${password3}@${portNo3}/ch01.264`;
    }
  
    let slipNum = $("#slip_no").val();
    let filePath = data[0].filePath; 
  
    // 'ipCamURL1': ipCamURL1,'ipCamURL2': ipCamURL2,'ipCamURL3':ipCamURL3
    $("#spinner").show()
    $.ajax({
      url: "http://localhost:8686/Saveimage",
      type: "GET",
      cache: false,
      data: {'slipNum': slipNum,'ipCamURL1': ipCamURL1,'ipCamURL2': ipCamURL2,'ipCamURL3':ipCamURL3,'filePath': filePath},
      success: function (res) {
       
        app.weighments.addWeighment(res);
        // Hide the spinner
        $("#spinner").hide();
      },
      error: function(){
        // Hide the spinner in case of error
        $("#spinner").hide();
      }
      });
    }
        }else{
            let res = ["no Image","no Image","no Image"];
            app.weighments.addWeighment(res); 
        }
    });
});
/////////////////   First Weigment End  //////////////////////



//////////////////   Second Weighment  Start  //////////////////
  $("#updateWeieghment").click(function () {
    let currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    let currentDate = new Date();

    const Grosscheckbox = document.getElementById('gross');
    if (Grosscheckbox.checked) {
      document.getElementById('gross_date').valueAsDate = currentDate;
      document.getElementById("gross_time").value = currentTime;
    } else {
      document.getElementById('tare_date').valueAsDate = currentDate;
      document.getElementById("tare_time").value = currentTime;
    }
    
    validate = true;
    $.when(app.database.tables.fields.FetchAll())
    .done(function (data) {
    let validate = true;
    let fieldsIds = ["Vehicle_no", "material","party_name","agent","qty","remark",];
    let ErrorIds = ["Vehicle_noError","materialError","party_nameError","agentError","qtyError","remarkError",];
  
    // Validations 
    for(i=0; i<fieldsIds.length; i++){
      if(data[i].ISVISIBLE == "1" && data[i].ISMANDATORY == "1" &&  document.getElementById(fieldsIds[i]).value ==""){  
        validate = false;
        $("#"+fieldsIds[i]).addClass("is-invalid");
        $("#"+ErrorIds[i]).text("Required Field");
      }else{
        $("#"+fieldsIds[i]).removeClass("is-invalid");
        $("#"+ErrorIds[i]).text("");
      }
    }

    if($('#material').val()==0 && $('#newMetereal').val() == ""){
      validate = false
      $("#newMetereal").addClass("is-invalid");
      $("#newMetereal_err").text("Required Field");
    }else{
      $("#newMetereal").removeClass("is-invalid");
      $("#newMetereal_err").text("");
    }
    if($('#party_name').val()==0 && $('#newParty_name').val() == ""){
      validate = false
      $("#newParty_name").addClass("is-invalid");
      $("#newParty_name_err").text("Required Field");
    }else{
      $("#newParty_name").removeClass("is-invalid");
      $("#newParty_name_err").text("");
    }

    // if($('#agent').val()==0 && $('#newAgent').val() == ""){
    //   validate = false
    //   $("#newAgent").addClass("is-invalid");
    //   $("#newAgent_err").text("Required Field");
    // }else{
    //   $("#newAgent").removeClass("is-invalid");
    //   $("#newAgent_err").text("");
    // }

if(validate){
  $('#confirm_update').modal('show');
   }
  });   
});

$('#confirm2ndSave').click(function(){

   $('#confirm_update').modal('hide');

  $.when(app.database.tables.weighment.getcamData())
  .done(function(data){
    if(data === null){
      toastr.warning('No Camaras...!','', {timeOut: 1000});
    }
  if(data != null && navigator.onLine){
      console.log(data);
  let username1 = data[0].IP_ONE_USERNAME;
  let password1 = data[0].IP_ONE_PASSWORD;
  let portNo1 = data[0].IPPORT_ONE;
  let active1 = data[0].IP_ONE_ACTIVATE;

  let username2 = data[0].IP_TWO_USERNAME;
  let password2 = data[0].IP_TWO_PASSWORD;
  let portNo2 = data[0].IPPORT_TWO;
  let active2 = data[0].IP_TWO_ACTIVATE;

  let username3 = data[0].IP_THREE_USERNAME;
  let password3 = data[0].IP_THREE_PASSWORD;
  let portNo3 = data[0].IPPORT_THREE;
  let active3 = data[0].IP_THREE_ACTIVATE;

  let ipCamURL1 ="";
  let ipCamURL2 ="";
  let ipCamURL3 ="";

  if(active1 == 1){
   ipCamURL1 = `rtsp://${username1}:${password1}@${portNo1}/ch01.264`;
  }
  if(active2 == 1){
    ipCamURL2 = `rtsp://${username2}:${password2}@${portNo2}/ch01.264`;
  }
  if(active3 == 1){
     ipCamURL3 = `rtsp://${username3}:${password3}@${portNo3}/ch01.264`;
  }

  $("#spinner").show();
  let slipNum = $("#slip_no").val();
  let filePath = data[0].filePath; 
  $.ajax({
    url: "http://localhost:8686/Saveimage",
    type: "GET",
    cache: false,
    //data: {'slipNum' : slipNum},
    data: {'slipNum': slipNum,'ipCamURL1': ipCamURL1,'ipCamURL2': ipCamURL2,'ipCamURL3':ipCamURL3,'filePath': filePath},
    success: function (res) {
      console.log(res);
      app.weighments.updateWeighment(res);
      $("#spinner").hide();
     },
   }); 
   }else{
    let res = ["no Image","no Image","no Image"];
    app.weighments.updateWeighment(res);
   }
  });
});


});

app.weighments = {
  serialSender:()=>{
    $.when(
      app.database.tables.weighment.getPorts()
      ).done(function (data) {
        console.log(data);
        
        if(data == null){
          toastr.options = {
            positionClass: 'toast-bottom-right'
          };
          toastr.error('Serial Ports Data Is Empty..!', '', {timeOut: 1000});
        }else{
          let port = data[0].PORTNO;
          let Boadrate = data[0].BOADRATE; 
          $.ajax({
            url: "http://localhost:8686/serialSend",
            type: "GET",
            data : {'port' : port,'Boadrate' : Boadrate},
            cache: false,
            //   dataType: "json", // added data type
             success: function (res) {
              console.log(res);
            },
          });
        }
     });
  },

  addWeighment: (image) => {
    const Grosscheckbox = document.getElementById('gross');
    let statusval = "";
    if (Grosscheckbox.checked) {
      statusval = "Gorss";
    } else {
      statusval = "Tare";
    }
     let  images = image[0];
     let  imagesTwo = image[1];
     let  imagesThree = image[2];
    const data = {
      WBS : localStorage.getItem('wbs'),
      userid : localStorage.getItem('role'),
      slipNumber: $('#slip_no').val(),
      vehicleNo: $('#Vehicle_no').val().toUpperCase(),
      material: $('#material').val(),
      partyname: $('#party_name').val(),
      Agent: $('#agent').val(),
      Remark: $('#remark').val(),
      wieghmentType: statusval,
      grossWeight: $('#gross_weight').val(),
      tareWeight: $('#tare_weight').val(),
      nettWeight: $('#net_weight').val(),
      qty: $('#qty').val(),
      grossDate: $('#gross_date').val(),
      tareDate: $('#tare_date').val(),
      grossTime: $('#gross_time').val(),
      tareTime: $('#tare_time').val(),
      currentDate : new Date().toISOString().slice(0, 10),
      imagevar : images,
      imagevarTwo : imagesTwo,
      imagevarThree : imagesThree,
      newMetereal :$("#newMetereal").val(),
      newParty_name :$("#newParty_name").val(),
      newAgent :$("#newAgent").val(),
      entryType:$("#entryType").val()
    };

    if($('#material').val()==0 && $('#newMetereal').val() != ""){
        fieldData ={
          fieldVal: $('#newMetereal').val(),
          fieldName:"material",
          date : new Date().toISOString().slice(0, 10)
        }
       app.database.tables.weighment.addMasterFieldVal(fieldData);
    }
    if($('#party_name').val()==0 && $('#newParty_name').val() != ""){
      fieldData ={
        fieldVal: $('#newParty_name').val(),
        fieldName:"party_name",
        date : new Date().toISOString().slice(0, 10)
      }
      app.database.tables.weighment.addMasterFieldVal(fieldData);
    }
    if($('#agent').val()==0 && $('#newAgent').val() != ""){
      fieldData ={
        fieldVal: $('#newAgent').val(),
        fieldName:"agent",
        date : new Date().toISOString().slice(0, 10)
      }
      app.database.tables.weighment.addMasterFieldVal(fieldData);
    }

    $.when(
      app.database.tables.weighment.save(data)
    ).done(function () {
      toastr.options = {
        positionClass: 'toast-bottom-right'
      };
      toastr.success('Saved Successfully..👍' , '', {timeOut: 1000});
      app.weighments.printConfirmation(data.slipNumber);
    });
  },

  printConfirmation:(alpNo)=>{
    $('#susbc-form').modal('show');
    document.getElementById("PrintSlipNo").value = alpNo;
  },

  printRecipt : (slipNo)=>{
   // alert(slipNo);
    $.when(app.database.tables.weighment.getRecordById(slipNo))
    .done(function (data) {
      if(data && data == null){
        alert("Failed to Fetch Record");
    }else{
      // console.log(data[0]);
      let title = data[0].TITLE;
      let s_title = data[0].SUBTITLE;

      
      let printType = "";
      let printBody ="";
      let noOfCopys = $('#noOfCopys').val();
       if( $("#vahicleImage").is(':checked')){
        
       let tarevehicle1 = data[0].TARE_CAMERAONE;
       let tarevehicle2 = data[0].TARE_CAMERATWO;
       let tarevehicle3 = data[0].TARE_CAMERATHREE;
       let grossvehicle1 = data[0].GROSS_CAMERAONE;
       let grossvehicle2 = data[0].GROSS_CAMERATWO;
       let grossvehicle3 = data[0].GROSS_CAMERATHREE;

       for (var i = 0; i < noOfCopys; i++) {
        if((data[0].STATUS === 0 && data[0].PRINT_STATUS === 0 && i === 0 ) || (data[0].STATUS === 1 && data[0].PRINT_STATUS === 1 && i === 0 )){
          printType = "Original";
        }else{
          printType = "Duplicate";
        }

        
        printBody += `<html>
        <head> 
          <style>
             html, body {
              height: 297mm;
            }
               .container {
                display: flex;
                align-items: center;
              }
              .slip {
                border: 2px solid black;
                border-radius: 5px;
                padding: 10px;
                margin: 0px;
                width: 100%;
                max-width: 8500px;
                font-family: Arial, sans-serif;
              }
              
              .imageBox{
                border: 2px solid black;
                border-radius: 5px;
                padding: 10px;
                margin-top: 10px;
                font-family: Arial, sans-serif;
              }
              .image{
               padding:3px;
              }
    
              .slip-header {
                border-bottom: 1px solid black; 
              }    
              .slip-header p{
                margin: -2;
                text-align: center;
              }
              
              .slip-body {
                margin-bottom: 10px;
                margin-top: -25px;
              }
          
              .slip-footer {
               border: 2px solid black;
                border-radius: 5px;
                padding: 10px;
                margin: 10px;
                width: 100%;
                max-width: 8500px;
                font-family: Arial, sans-serif;
              }
             .labble{
              font-weight: ;
              font-size: 12px;
             }
             .Value-Lable{
              font-weight:bold;
              font-size: 12px;
             }
             table{
               margin-bottom:6px;
             margin-top:5px;
               border-bottom: 1px solid black;
             }.dotted-line-container {
              position: relative;
              height: 10px; /* set the height of the dotted line */
            }
            
            hr {
              border: none;
              border-top: 1px dotted #999;
              color: #999;
              overflow: visible;
              text-align: center;
              height: 4px;
            }
            
            hr::before {
              content: "✂";
              display: inline-block;
              position: relative;
              top: -15px;
              padding: 0 10px;
              background: #fff;
              color: #999;
              font-size: 20px;
              font-weight: bold;
            }
          .A4Copy{
            margin-top = 100px;
          }
               </style>   
         </head>
         <body>
           <div class="container">
           <div class="slip">
             <div class="slip-header">
               <p style="font-weight: bolder; font-size: 18px;  margin-top: -10;">${title}</p>
               <p style="font-weight: bolder; font-size: 14px">${s_title}</p>
               <p style="font-weight: bolder; font-size: 12px"><u>Weighment Slip</u></p>
               <p style="font-weight: bolder; font-size: 12px; text-align: right;">${printType}</p>
             </div>     
             <div class="slip-body">
               <table width="100%">
                        <tr>
                           <td class="labble">Slip No</td>
                           <td class="Value-Lable"> <b>:</b>&ensp;${slipNo}</td>
                           <td class="labble">Vehicle No</td>
                           <td class="Value-Lable"> <b>:</b>&ensp;${data[0].VEHICLENUMBER}</td>
                       </tr>
                       <tr>
                           <td class="labble">Material</td>
                           <td class="Value-Lable"> <b>:</b>&ensp;${data[0].MATERIAL}</td>
                           <td class="labble">Party</td>
                           <td class="Value-Lable"> <b>:</b>&ensp;${data[0].PARTYNAME}</td>
                       </tr>
                         <tr>
                           <td class="labble">Remarks</td>
                           <td class="Value-Lable"><b>:</b>&ensp;${data[0].REMARKS}</td>
                           <td class="labble">Agent</td>
                           <td class="Value-Lable"><b>:</b>&ensp;${data[0].AGENT}</td>
                       </tr>
                       <tr style="height:10px;">
                         &ensp;
                       </tr>
                       <tr>
                           <td>&nbsp;</td>
                            <td class="labble"> &ensp;<b>Weight (In KGS)</b></td>
                            <td class="labble"><b>Date</b></td>
                            <td class="labble"><b>Time</b></td>
                       </tr>
                       <tr>
                           <td class="labble">Gross</td>
                           <td class="Value-Lable"> <b>:</b>&ensp;${data[0].GROSSWEIGHT}</td>
                           <td class="Value-Lable">${data[0].GROSSDATE}</td>
                           <td class="Value-Lable"> &ensp;${data[0].GROSSTIME}</td>
                       </tr>
                       <tr>
                           <td class="labble">Tare</td>
                           <td class="Value-Lable"><b>:</b>&ensp;${data[0].TAREWEIGHT}</td>
                           <td class="Value-Lable">${data[0].TAREDATE}</td>
                           <td class="Value-Lable"> &ensp;${data[0].TARETIME}</td>
                       </tr>
                       <tr>
                           <td class="labble">Net</td>
                           <td class="Value-Lable"><b>:</b>&ensp;${data[0].NETTWEIGHT}</td>
                       </tr>  
                </table>
             </div>`;

             if(data[0].STATUS === 1){
             
              printBody += `
<div class="imageBox">
  <p class="Value-Lable" align="center">Tare Vehicle Images</p>`;

if (tarevehicle1 !== "no Image" && tarevehicle1 !== "") {
  printBody += `<img src="temp/${tarevehicle1}" alt="No Image" width="31%" height="33%" class="image">`;
} else {
  printBody += `<img src="css/images/dummy.png" alt="No Image" width="31%" height="33%" class="image">`;
}

if (tarevehicle2 !== "no Image" && tarevehicle2 !== "") {
  printBody += `<img src="temp/${tarevehicle2}" alt="No Image" width="31%" height="33%" class="image">`;
} else {
  printBody += `<img src="css/images/dummy.png" alt="No Image" width="31%" height="33%" class="image">`;
}

if (tarevehicle3 !== "no Image" && tarevehicle3 !== "") {
  printBody += `<img src="temp/${tarevehicle3}" alt="No Image" width="31%" height="33%" class="image">`;
} else {
  printBody += `<img src="css/images/dummy.png" alt="No Image" width="31%" height="33%" class="image">`;
}

printBody += `</div> <br><br>`;

printBody += `
<div class="imageBox">
  <p class="Value-Lable" align="center">Gross Vehicle Images</p>`;

if (grossvehicle1 !== "no Image" && grossvehicle1 !== "") {
  printBody += `<img src="temp/${grossvehicle1}" alt="No Image" width="31%" height="33%" class="image">`;
} else {
  printBody += `<img src="css/images/dummy.png" alt="No Image" width="31%" height="33%" class="image">`;
}

if (grossvehicle2 !== "no Image" && grossvehicle2 !== "") {
  printBody += `<img src="temp/${grossvehicle2}" alt="No Image" width="31%" height="33%" class="image">`;
} else {
  printBody += `<img src="css/images/dummy.png" alt="No Image" width="31%" height="33%" class="image">`;
}

if (grossvehicle3 !== "no Image" && grossvehicle3 !== "") {
  printBody += `<img src="temp/${grossvehicle3}" alt="No Image" width="31%" height="33%" class="image">`;
} else {
  printBody += `<img src="css/images/dummy.png" alt="No Image" width="31%" height="33%" class="image">`;
}

printBody += `</div>`;

              
             }else{
              if(tarevehicle1 != null && tarevehicle2 != null && tarevehicle3 != null){
               
                printBody += `
                <div class="imageBox">
                  <p class="Value-Lable" align="center">Tare Vehicle Images</p>`;
                
                if (tarevehicle1 === "no Image" || tarevehicle1 === "") {
                  printBody += `<img src="css/images/dummy.png" alt="No Image" width="31%" height="33%" class="image">`;
                } else {
                  printBody += `<img src="temp/${tarevehicle1}" alt="No Image" width="31%" height="33%" class="image">`;
                }
                
                if (tarevehicle2 === "no Image" || tarevehicle2 === "") {
                  printBody += `<img src="css/images/dummy.png" alt="No Image" width="31%" height="33%" class="image">`;
                } else {
                  printBody += `<img src="temp/${tarevehicle2}" alt="No Image" width="31%" height="33%" class="image">`;
                }
                
                if (tarevehicle3 === "no Image" || tarevehicle3 === "") {
                  printBody += `<img src="css/images/dummy.png" alt="No Image" width="31%" height="33%" class="image"></div>`;
                } else {
                  printBody += `<img src="temp/${tarevehicle3}" alt="No Image" width="31%" height="33%" class="image"></div>`;
                }
                
              }
               
               if(grossvehicle1 != null && grossvehicle2 != null && grossvehicle3 != null){

                printBody += `
                <div class="imageBox">
                  <p align="center" class="Value-Lable"> Gross Vehicle Images</p>`;
                
                if (grossvehicle1 === "no Image" || grossvehicle1 === "") {
                  printBody += `<img src="css/images/dummy.png" alt="No Image" width="31%" height="33%" class="image">`;
                } else {
                  printBody += `<img src="temp/${grossvehicle1}" alt="No Image" width="31%" height="33%" class="image">`;
                }
                
                if (grossvehicle2 === "no Image" || grossvehicle2 === "") {
                  printBody += `<img src="css/images/dummy.png" alt="No Image" width="31%" height="33%" class="image">`;
                } else {
                  printBody += `<img src="temp/${grossvehicle2}" alt="No Image" width="31%" height="33%" class="image">`;
                }
                
                if (grossvehicle3 === "no Image" || grossvehicle3 === "") {
                  printBody += `<img src="css/images/dummy.png" alt="No Image" width="31%" height="33%" class="image"></div>`;
                } else {
                  printBody += `<img src="temp/${grossvehicle3}" alt="No Image" width="31%" height="33%" class="image"></div>`;
                }
                
                }
             }
            
                  printBody += `<p  class="Value-Lable" style="margin-bottom :-10px; margin-top:25px; ">Operator Signature</p>
                </div> 
              </div>
            </body>
          </html> `;
          if(noOfCopys % 2 === 0 ){
                if(data[0].STATUS === 0){
                  if(i === 0 || i === 2 || i === 4){
                    printBody += `<br><br><hr>
                     <br><br>`;
                 }else if(i === 3 || i === 5){
                  printBody += `<br><br>
                  <br><br>`;               
                 }
               }else{
                printBody += `<br><br><br><br><br><br><br><br><br>
                <br><br><br><br><br><br><br><br><br><br><br>`;
               }
            }
        }
      }else{
        for (var i = 0; i < noOfCopys; i++){
           if((data[0].STATUS === 0 && data[0].PRINT_STATUS === 0 && i === 0 ) || (data[0].STATUS === 1 && data[0].PRINT_STATUS === 1 && i === 0 )){
         
            printType = "Original";
          }else{
          
            printType = "Duplicate";
          }

            printBody += `<html>
            <head> 
              <style>
                  .container {
                    display: flex;
                    align-items: center;
                  }
                  .slip {
                    border: 2px solid black;
                    border-radius: 5px;
                    padding: 10px;
                    margin: 0px;
                    width: 100%;
                    max-width: 8500px;
                    font-family: Arial, sans-serif;
                  }
                  
                  .slip-header {
                    border-bottom: 1px solid black; 
                  }    
                  .slip-header p{
                    margin: -2;
                    text-align: center;
                  }
                  
                  .slip-body {
                    margin-bottom: 10px;
                    margin-top: -25px;
                  }
              
                  .slip-footer {
                  border: 2px solid black;
                    border-radius: 5px;
                    padding: 10px;
                    margin: 10px;
                    width: 100%;
                    max-width: 8500px;
                    font-family: Arial, sans-serif;
                  }
                .labble{
                  font-weight: ;
                  font-size: 12px;
                }
                .Value-Lable{
                  font-weight:bold;
                  font-size: 12px;
                }
                table{
                  margin-bottom:6px;
                margin-top:5px;
                  border-bottom: 1px solid black;
                }
                hr {
                  border: none;
                  border-top: 1px dotted #999;
                  color: #999;
                  overflow: visible;
                  text-align: center;
                  height: 4px;
                }
                
                hr::before {
                  content: "✂";
                  display: inline-block;
                  position: relative;
                  top: -15px;
                  padding: 0 10px;
                  background: #fff;
                  color: #999;
                  font-size: 20px;
                  font-weight: bold;
                }
                  </style>   
            </head>
            <body>
              <div class="container">
              <div class="slip">
                <div class="slip-header">
                  <p style="font-weight: bolder; font-size: 18px;  margin-top: -10;">${title}</p>
                  <p style="font-weight: bolder; font-size: 14px">${s_title}</p>
                  <p style="font-weight: bolder; font-size: 12px"><u>Weighment Slip</u></p>
                  <p style="font-weight: bolder; font-size: 12px; text-align: right;">${printType}</p>
                </div>     
                <div class="slip-body">
                  <table width="100%">
                            <tr>
                              <td class="labble">Slip No</td>
                              <td class="Value-Lable"> <b>:</b>&ensp;${slipNo}</td>
                              <td class="labble">Vehicle No</td>
                              <td class="Value-Lable"> <b>:</b>&ensp;${data[0].VEHICLENUMBER}</td>
                          </tr>
                          <tr>
                              <td class="labble">Material</td>
                              <td class="Value-Lable"> <b>:</b>&ensp;${data[0].MATERIAL}</td>
                              <td class="labble">Party</td>
                              <td class="Value-Lable"> <b>:</b>&ensp;${data[0].PARTYNAME}</td>
                          </tr>
                            <tr>
                              <td class="labble">Remarks</td>
                              <td class="Value-Lable"><b>:</b>&ensp;${data[0].REMARKS}</td>
                              <td class="labble">Agent</td>
                              <td class="Value-Lable"><b>:</b>&ensp;${data[0].AGENT}</td>
                          </tr>
                          <tr style="height:10px;">
                            &ensp;
                          </tr>
                          <tr>
                              <td>&nbsp;</td>
                                <td class="labble"> &ensp;<b>Weight (In KGS)</b></td>
                                <td class="labble"><b>Date</b></td>
                                <td class="labble"><b>Time</b></td>
                          </tr>
                          <tr>
                              <td class="labble">Gross</td>
                              <td class="Value-Lable"> <b>:</b>&ensp;${data[0].GROSSWEIGHT}</td>
                              <td class="Value-Lable">${data[0].GROSSDATE}</td>
                              <td class="Value-Lable"> &ensp;${data[0].GROSSTIME}</td>
                          </tr>
                          <tr>
                              <td class="labble">Tare</td>
                              <td class="Value-Lable"><b>:</b>&ensp;${data[0].TAREWEIGHT}</td>
                              <td class="Value-Lable">${data[0].TAREDATE}</td>
                              <td class="Value-Lable"> &ensp;${data[0].TARETIME}</td>
                          </tr>
                          <tr>
                              <td class="labble">Net</td>
                              <td class="Value-Lable"><b>:</b>&ensp;${data[0].NETTWEIGHT}</td>
                          </tr>
                      
                    </table>
                    <p   class="Value-Lable" style="margin-bottom: -20px; margin-top:25px; ">Operator Signature</p>
                </div>
              </div> 
            </div>
          </body>
          </html>`
          if(noOfCopys == 2|| noOfCopys == 3 || noOfCopys == 4){
            let j =  i+1 
            if(i === 0 || i === 1 ){
          printBody += `<br><br><hr>
          <br><br>`;
         }else{
          printBody += `<br><br><br>`
         }  
        }; 
        }  
      }
    
      const printWindow = window.open("", "PrintWindow");
      printWindow.document.write(printBody);
      // printWindow.print();
      // printWindow.close();
      setTimeout(function() {
        printWindow.print();
       window.location="weighmentsList.html"
      }, 2000);
      setTimeout(function() {
        printWindow.close();
      }, 5000);
      printBody = "";

     
     $.when(app.database.tables.weighment.checkPrintStatus(slipNo))
     .done(function (data) {
       
       if((data[0].STATUS === 0 && data[0].PRINT_STATUS === 0) || (data[0].STATUS === 1 && data[0].PRINT_STATUS === 1 )){
         let printStatus = data[0].PRINT_STATUS+1
         app.database.tables.weighment.updatePrintStatus(slipNo,printStatus);
       }
     });
    }
    });
    
    //location.href='weighmentsList.html';
  },

  getNumber : ()=>{
    $.when(app.database.tables.weighment.getCount())
    .done(function (result) {
     if(result == null || result[0].maxnum == null){
      generateRecordNumber(0);
     }else{
      // alert(parseInt(result[0].maxnum.slice(6))) 
      generateRecordNumber(parseInt(result[0].maxnum.slice(6)));
     }    
    });
  },

  updateWeighment :(image)=>{
    const Grosscheckbox = document.getElementById('gross');
    let statusval = "";
    if (Grosscheckbox.checked) {
      statusval = "Gorss";
    } else {
      statusval = "Tare";
    }
    let  images = image[0];
    let  imagesTwo = image[1];
    let  imagesThree = image[2];

    const data = {
      userid : $('#user_hdn').val(),
      slipNumber: $('#slip_no').val(),
      vehicleNo: $('#Vehicle_no').val().toUpperCase(),
      material: $('#material').val(),
      partyname: $('#party_name').val(),
      Agent: $('#agent').val(),
      Remark: $('#remark').val(),
      wieghmentType: statusval,
      grossWeight: $('#gross_weight').val(),
      tareWeight: $('#tare_weight').val(),
      nettWeight: $('#net_weight').val(),
      qty: $('#qty').val(),
      grossDate: $('#gross_date').val(),
      tareDate: $('#tare_date').val(),
      grossTime: $('#gross_time').val(),
      tareTime: $('#tare_time').val(),
      currentDate : new Date().toISOString().slice(0, 10),
      imagevar : images,
      imagevarTwo : imagesTwo,
      imagevarThree : imagesThree,
      newMetereal :$("#newMetereal").val(),
      newParty_name :$("#newParty_name").val(),
      newAgent :$("#newAgent").val(),
      entryType:$("#entryType").val()
    };

    if($('#material').val()==0 && $('#newMetereal').val() != ""){
      fieldData ={
        fieldVal: $('#newMetereal').val(),
        fieldName:"material",
        date : new Date().toISOString().slice(0, 10)
      }
     app.database.tables.weighment.addMasterFieldVal(fieldData);
  }
  if($('#party_name').val()==0 && $('#newParty_name').val() != ""){
    fieldData ={
      fieldVal: $('#newParty_name').val(),
      fieldName:"party_name",
      date : new Date().toISOString().slice(0, 10)
    }
    app.database.tables.weighment.addMasterFieldVal(fieldData);
  }
  if($('#agent').val()==0 && $('#newAgent').val() != ""){
    fieldData ={
      fieldVal: $('#newAgent').val(),
      fieldName:"agent",
      date : new Date().toISOString().slice(0, 10)
    }
    app.database.tables.weighment.addMasterFieldVal(fieldData);
  }

    $.when(app.database.tables.weighment.updateDataById(data))
      .done(function () {       
        toastr.options = {
          positionClass: 'toast-bottom-right'
        };
      toastr.success('Updated Success...👍');
      app.weighments.printConfirmation(data.slipNumber); 
      });

  },
  
  getWeighmentsList : (sVal)=>{
    $.when(app.database.tables.weighment.getList(sVal))
    .done(function (data) {
      console.log(data);
      if(data != null || data != ""){
       // console.log("hello world");
     //  return data;
      $("#tableBody").empty();
     let dataContainer ="";
     for (let i = 0; i < data.length; i++) {
      dataContainer += `<tr>
      <td>
      <a href="weighmentListEdit.html?id=${data[i].SLIPNUMBER}"><p class="text-xs text-center font-weight-bold mb-0">${i+1}</p></a>
    </td>
      <td>
      <a href="weighmentListEdit.html?id=${data[i].SLIPNUMBER}"><p class="text-xs text-center font-weight-bold mb-0">${data[i].SLIPNUMBER}</p></a>
    </td>
    <td>
    <a href="weighmentListEdit.html?id=${data[i].SLIPNUMBER}"> <p class="text-xs font-weight-bold mb-0">${data[i].VEHICLENUMBER}</p>
    </a>  
    </td>
    <td class="align-middle text-center">
    <a href="weighmentListEdit.html?id=${data[i].SLIPNUMBER}"><p class="text-xs font-weight-bold mb-0">${data[i].MATERIAL}</p></a>
    </td>
     <td class="align-middle text-center">
     <a href="weighmentListEdit.html?id=${data[i].SLIPNUMBER}"> 
      <p class="text-xs font-weight-bold mb-0">${data[i].NETTWEIGHT}</p></a>
    </td>
     <td class="align-middle text-center">
     <a href="weighmentListEdit.html?id=${data[i].SLIPNUMBER}"> 
      <p class="text-xs font-weight-bold mb-0">${data[i].GROSSTIME}</p></a>
    </td>
     <td class="align-middle text-center">
     <a href="weighmentListEdit.html?id=${data[i].SLIPNUMBER}"> 
     <p class="text-xs font-weight-bold mb-0">${data[i].TARETIME}</p></a>
    </td>
    <td>
    <a href="weighmentListEdit.html?id=${data[i].SLIPNUMBER}"><p class="text-xs text-center text-${data[i].STATUS == 0 ? 'danger':'success'} font-weight-bold mb-0">${data[i].STATUS == 0 ?'Pending':'Completed'}</p></a>
    </td>
    <td class="align-middle text-center">           
    <a href="weighmentListEdit.html?id=${data[i].SLIPNUMBER}"  title="Edit"><i class="fa-solid ${data[i].STATUS == 0 ? 'fa-file-pen':'fa-eye'}"></i></a>&ensp;
    
    <a href="javascript:void(0);" onclick="printConfirmation('${data[i].SLIPNUMBER}','${data[i].STATUS}')"  title="Print" ><i class="fa-solid fa-print"></i></a>&ensp;
    `
    if(localStorage.getItem('role') == "Admin"){
      dataContainer += `<a href="javascript:void(0);" onclick="DeleteRecById('${data[i].SLIPNUMBER}');" title="Delete"><i class="fa-solid fa-trash-can"></i></a>`
    }
    dataContainer += `</td></tr>`;
    }
    $("#tableBody").append(dataContainer);
      }
    });
  },
  
  getSingleWeighmentRecord : (rid)=>{
    
    $.when(app.database.tables.weighment.getRecordById(rid))
    .done(function (data) {
      
      if(data && data == null){
        console.log(data);
        
          alert("Failed to Fetch Record");
      }else{
        document.getElementById("user_hdn").value=data[0].USERID;
        document.getElementById("slip_no").value=data[0].SLIPNUMBER;
        document.getElementById("Vehicle_no").value=data[0].VEHICLENUMBER;
        document.getElementById("material").value=data[0].MATERIAL;
        document.getElementById("party_name").value=data[0].PARTYNAME;
        document.getElementById("agent").value=data[0].AGENT;
        document.getElementById("remark").value=data[0].REMARKS;
        document.getElementById("gross_weight").value=data[0].GROSSWEIGHT;
        document.getElementById("tare_weight").value=data[0].TAREWEIGHT;
        document.getElementById("net_weight").value=data[0].NETTWEIGHT;
        document.getElementById("qty").value=data[0].QUANTITY;
        document.getElementById("tare_date").value=data[0].TAREDATE;
        document.getElementById("gross_date").value=data[0].GROSSDATE;
        document.getElementById("tare_time").value=data[0].TARETIME;
        document.getElementById("gross_time").value=data[0].GROSSTIME;
        if(data[0].ENTRY_TYPE =="INWARD"){
          document.getElementById("entryType").value ="OUTWARD";
          document.getElementById("typeOfEntrylable").value ="INWARD";          
        }
        if(data[0].ENTRY_TYPE =="OUTWARD"){
          document.getElementById("entryType").value ="INWARD";
          document.getElementById("typeOfEntrylable").value ="OUTWARD";          

        }
        
        if(data[0].STATUS === 1){
          document.getElementById("updateWeieghment").style.display="none";
          document.getElementById("liveWeight").style.display="none";
          
        }
        if(data[0].TARE_CAMERAONE !="" && data[0].TARE_CAMERAONE != null && data[0].TARE_CAMERAONE != "null"){
          if(data[0].TARE_CAMERAONE == "no Image" ){
            document.getElementById("cam1Img").src = "css/images/turck.jpeg";
          }else{
            document.getElementById("cam1Img").src = "./temp/"+data[0].TARE_CAMERAONE;

          }
        }
        if(data[0].TARE_CAMERATWO !="" && data[0].TARE_CAMERATWO != null){
          if(data[0].TARE_CAMERATWO == "no Image" ){
            document.getElementById("cam2Img").src = "css/images/turck.jpeg";
          }else{
            document.getElementById("cam2Img").src = "./temp/"+data[0].TARE_CAMERATWO;
          }
        }
        if(data[0].TARE_CAMERATHREE !="" && data[0].TARE_CAMERATHREE != null){
          if(data[0].TARE_CAMERATHREE == "no Image" ){
            document.getElementById("cam3Img").src = "css/images/turck.jpeg";
          }else{
            document.getElementById("cam3Img").src = "./temp/"+data[0].TARE_CAMERATHREE;
          }
        }
        if(data[0].GROSS_CAMERAONE !="" && data[0].GROSS_CAMERAONE != null){
          if(data[0].GROSS_CAMERAONE == "no Image" ){
            document.getElementById("cam4Img").src = "css/images/turck.jpeg";
          }else{
            document.getElementById("cam4Img").src = "./temp/"+data[0].GROSS_CAMERAONE;
          }
        }
        if(data[0].GROSS_CAMERATWO !="" && data[0].GROSS_CAMERATWO != null ){
          if(data[0].GROSS_CAMERATWO == "no Image" ){
            document.getElementById("cam5Img").src = "css/images/turck.jpeg";
          }else{
            document.getElementById("cam5Img").src = "./temp/"+data[0].GROSS_CAMERATWO;
          }

        }
        if(data[0].GROSS_CAMERATHREE !="" && data[0].GROSS_CAMERATHREE != null){
          if(data[0].GROSS_CAMERATHREE == "no Image" ){
            document.getElementById("cam6Img").src = "css/images/turck.jpeg";
          }else{
            document.getElementById("cam6Img").src = "./temp/"+data[0].GROSS_CAMERATHREE;
          }
        
        }


       let currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false});
        let currentDate = new Date();
        if(data[0].WEIGHMENTTYPE == "Tare"){
          document.getElementById('gross').checked = true;
          document.getElementById("grossLabel").innerHTML = "Gross";
          if(data[0].GROSSTIME == "" && data[0].GROSSDATE == ""){
            // document.getElementById('gross_date').valueAsDate = currentDate;
            // document.getElementById("gross_time").value = currentTime;
          }
        }else{
          if(data[0].TARETIME == "" && data[0].TAREDATE == ""){
            // document.getElementById('tare_date').valueAsDate = currentDate;
            // document.getElementById("tare_time").value = currentTime;
          }
        }
      }
    });
  },
  
  DeleteRecordById : (rid)=>{
    $.when(app.database.tables.weighment.deleteRecordById(rid))
    .done(function (result) {
      if(result == 0){
        alert("Failed to Delete");
        location.reload();
      }else{
      toastr.options = {
        positionClass: 'toast-bottom-right'
      };
      toastr.success('Deleted Success...👍', '', {timeOut: 1000});
      setTimeout(function(){
        location.reload();
      },1300);
      }      
    });
  },

  loadPartyDropdowns:()=>{
    $.when(app.database.tables.weighment.getPartyNamesList())
    .done(function (partyList) {
     if(partyList != null || partyList.length != 0 ){
        var dropdown = document.getElementById("party_name");
        console.log(partyList[0])
        var options = partyList;
        for(var i = 0; i < options.length; i++) {
          var option = document.createElement("option");
          option.text = options[i].FEILDTEXT; 
          option.value = options[i].FEILDTEXT; 
          dropdown.add(option);
        }
      }
    });
  },

  loadAgentDropdowns:()=>{
    $.when(app.database.tables.weighment.getAgentList())
    .done(function (partyList) {
     if(partyList != null || partyList.length != 0 ){
        var dropdown = document.getElementById("agent");
        console.log(partyList[0])
        var options = partyList;
        for(var i = 0; i < options.length; i++) {
          var option = document.createElement("option");
          option.text = options[i].FEILDTEXT; 
          option.value = options[i].FEILDTEXT; 
          dropdown.add(option);
        }
      }
    });
  },

  loadMaterialDropdowns:()=>{
    $.when(app.database.tables.weighment.getMaterialList())
    .done(function (partyList) {
     if(partyList != null || partyList.length != 0 ){
        var dropdown = document.getElementById("material");
        console.log(partyList[0])
        var options = partyList;
        for(var i = 0; i < options.length; i++) {
          var option = document.createElement("option");
          option.text = options[i].FEILDTEXT; 
          option.value = options[i].FEILDTEXT; 
          dropdown.add(option);
        }
      }
  });
},

};