
$(document).ready(() => {
    
    app.database.createDB();
    app.gateEntry.getNumber();
    // app.gateEntry.loadDropdowns();
    app.gateEntry.loadAgentDropdowns();
    
    
    // $("#createWeieghment").click(function () {
    //   app.gateEntry.createGateEntry();
    // });
   
    // $("#updateWeieghment").click(function () {
    //   app.gateEntry.updateWeighment();
    // });
  
});
  
  app.gateEntry = {

    getNumber : ()=>{
      $.when(app.database.tables.GateEntry.getCount())
      .done(function (result) {
      
       if(result == null){
        alert('DOCNO'+result[0].maxnum+1) 
        document.getElementById("document_no").value = 'DOCNO'+(1);
       }else{
      
          let num = result[0].maxnum + 1;
        document.getElementById("document_no").value= `${'DOCNO'}`+num;
       }
      });
    },


        createGateEntry: () => {
    
          $.when(app.database.tables.GateEntry.FetchAll())
          .done(function (data) { 
            let validate = true;
            if(data != null){
              let fieldsIds =["document_no", "date", "GateEntryType", "Department", "Outlet", "flowClassify", "Gate", "isWeighmentRequired", "weighbridge", "weighmentType", "weighingType", "materialTransaction", "materialType", "agent", "Vechile", "VendorORCustName", "VendorORCustVillageName", "BillReferenceNo", "bill_date", "staffName", "Visitor", "gateIn_date", "gateIn_time", "gateOut_Date", "gateOut_time", "gate_status", "scanner_time", "narration", "attachment_one", "attachment_two", "attachment_three", "attachment_four", "vehicle_no"];
              let ErrorIds = ["document_noErr", "dateErr", "GateEntryTypeErr", "DepartmentErr", "OutletErr", "flowClassifyErr", "GateErr", "isWeighmentRequiredErr", "weighbridgeErr", "weighmentTypeErr", "weighingTypeErr", "materialTransactionErr", "materialTypeErr", "agentErr", "VechileErr", "VendorORCustNameErr", "VendorORCustVillageNameErr", "BillReferenceNoErr", "bill_dateErr", "staffNameErr", "VisitorErr", "gateIn_dateErr", "gateIn_timeErr", "gateOut_DateErr", "gateOut_timeErr", "gate_statusErr", "scanner_timeErr", "narrationErr", "attachment_oneErr", "attachment_twoErr", "attachment_threeErr", "attachment_fourErr", "vehicle_noErr"];
  
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
              }
              if(validate){   
            //saving QR Code
            let document_no = $('#document_no').val()
            let randomNum = Math.random();
            let QRid = String(randomNum).substring(2);
            let QRPathval = document_no+'-'+QRid;
            let filePath =  './qrcode/'+QRPathval+'.png';
            $.ajax({
            url: "/makeQR",
            type: "POST",
            data: {'QRPath' : QRPathval},
            // contentType: 'application/json',
            // data: JSON.stringify({"QRPath": QRPathval}),
            success: function(data) {
              //  console.log(data);
            },
            error: function(error) {
              console.log(error);
            }
            });


          //saving Attachements
          var formData = new FormData();
          formData.append("docnum", $('#document_no').val());
          formData.append("attachment_one", $("#attachment_one")[0].files[0]);
          formData.append("attachment_two", $("#attachment_two")[0].files[0]);
          formData.append("attachment_three", $("#attachment_three")[0].files[0]);
          formData.append("attachment_four", $("#attachment_four")[0].files[0]);
        $.ajax({
          url: "/uploadAttachments",
          type: "POST",
          data: formData,
          processData: false, // tell jQuery not to process the data
          contentType: false, // tell jQuery not to set contentType
          success: function (attchData) {
            let attchone = "";
            let attchtwo = "";
            let attchthree = "";
            let attchfour  = "";
            for(i=0; i<attchData.length; i++){
              if(i === 0){
                attchone = attchData[0];
              }else if(i === 1){
                attchtwo = attchData[1];
              }else if(i === 2){
                attchthree = attchData[2];
              }else if(i === 3){
                attchfour = attchData[3];
              }
            }
          
            const data = {
              userid : "USER01",
              document_no: $('#document_no').val(),
              date: $('#date').val(),
              GateEntryType: $('#GateEntryType').val(),
              Department: $('#Department').val(),
              Outlet: $('#Outlet').val(),
              flowClassify: $('#flowClassify').val(),
              gate: $('#Gate').val(),
              isWeighmentRequired: $('#isWeighmentRequired').val(),
              weighbridge: $('#weighbridge').val(),
              weighmentType: $('#weighmentType').val(),
              weighingType: $('#weighingType').val(),
              materialTransaction: $('#materialTransaction').val(),
              materialType: $('#materialType').val(),
              agent: $('#agent').val(),
              Vechile: $('#Vechile').val(),
              VendorORCustName: $('#VendorORCustName').val(),
              VendorORCustVillageName: $('#VendorORCustVillageName').val(),
              BillReferenceNo: $('#BillReferenceNo').val(),
              bill_date: $('#bill_date').val(),
              staffName : $("#staffName").val(),
              Visitor : $("#Visitor").val(),
              gateIn_date : $("#gateIn_date").val(),
              gateIn_time : $("#gateIn_time").val(),
              gateOut_Date : $("#gateOut_Date").val(),
              gateOut_time : $("#gateOut_time").val(),
              gate_status : $("#gate_status").val(),
              scanner_time : $("#scanner_time").val(),
              narration : $("#narration").val(),
              attachment_one : attchone,
              attachment_two : attchtwo,
              attachment_three : attchthree,
              attachment_four : attchfour,
              vehicle_no : $("#vehicle_no").val(),
              filePath : filePath,
              QRPathval : QRPathval,
              QR_Status : 0,
            };
        
            $.when(
              app.database.tables.GateEntry.save(data)
            ).done(function () {
              toastr.options = {
                positionClass: 'toast-bottom-right'
              };
              toastr.success('Saved Successfully','',{timeOut:1000});
              // location.reload();
              setTimeout(function(){
                window.location="boomBarrierList.html";
              },1000)
            });
          },
          error: function (error) {
            console.log(error);
          },
          }); 
        }
      });
      },

    printQRslip :(slipNo)=> {
    
      $.when( app.database.tables.GateEntry.GetRecByDocNo(slipNo)
      ).done(function (data) {
        if(data && data == null){
          alert("Failed to Fetch Record");
         }else{
        console.log(data[0]);
        var printBody ="";
        const printWindow = window.open("", "PrintWindow");
        printBody = `<html>
        <head>
            <style>
                .header{
                    padding :30px 5px 0px 50px;
                    text-align: center;
                }  
                img {
                  height: 200px;
                  width: 200px;
                  border: 2px solid black;
                }
            
            </style>
        </head>
        <body>
            <div class="header">
                <h2>Hindhustan Agro Private Lmtd</h2>  
                <h5>Atchutapuram Rd, Machavaram, Andhra Pradesh 533261</h5> 
                <h4>QR CODE SLIP</h4> 
                <div>
                <img src="${data[0].QR_PATH}">
                </div>
                <h6> Vehicle NO : ${data[0].VEHICLE_NUMBER}</h6> 
                </div>
        
        </body>
   </html>`;
   
        // Write the Hello World message to the print window
        printWindow.document.write("<h1>"+printBody+"</h1>");
   
        // Call the print method to open the print dialog window
        printWindow.print();
        printBody ="";
        } 
      });
    },



    getGateEntriesList : (sVal)=>{
      $.when(app.database.tables.GateEntry.getList(sVal))
      .done(function (data) {
        if(data != null || data != ""){
          
          $("#tableBody").empty();
       
          let dataContainer ="";
       for (let i = 0; i < data.length; i++) {
        dataContainer += `<tr>
        <td>
        <a href="boomBarrierListEdit.html?id=${data[i].SLIPNUMBER}"><p class="text-xs text-center font-weight-bold mb-0">${i+1}</p></a>
      </td>
      <td class="align-middle text-center text-sm">
      <a href="boomBarrierListEdit.html?id=${data[i].SLIPNUMBER}"><p class="text-xs font-weight-bold mb-0">${data[i].SLIPNUMBER}</p></a>
      </td>
      <td>
      <a href="boomBarrierListEdit.html?id=${data[i].SLIPNUMBER}"> <p class="text-xs font-weight-bold mb-0">${data[i].VEHICLE_NUMBER}</p>
      </a>  
      </td>
      <td class="align-middle text-center">
      <a href="boomBarrierListEdit.html?id=${data[i].SLIPNUMBER}"> 
        <p class="text-xs font-weight-bold mb-0">${data[i].GATE}</p></a>
      </td>
       <td class="align-middle text-center">
       <a href="boomBarrierListEdit.html?id=${data[i].SLIPNUMBER}"> 
        <p class="text-xs font-weight-bold mb-0">${data[i].AGENT}</p></a>
      </td>
       <td class="align-middle text-center">
       <a href="boomBarrierListEdit.html?id=${data[i].SLIPNUMBER}"> 
        <p class="text-xs font-weight-bold mb-0">${data[i].VENDOR_OR_CUSTNAME}</p></a>
      </td>
       <td class="align-middle text-center">
       <a href="boomBarrierListEdit.html?id=${data[i].SLIPNUMBER}"> 
        <p class="text-xs font-weight-bold mb-0">${data[i].GATE_STATUS}</p></a>
      </td>
      <td class="align-middle text-center">
      ${data[i].QR_STATUS == 0 ? `<a onclick="QrCheck('${data[i].QR_CODE}')"><img src="./css/images/gateClose.png" class="icon-Image"></a>` : '<img src="./css/images/gateOpen.png" class="icon-Image">'}
    
      <a href="javascript:void(0);" onclick="printQR('${data[i].SLIPNUMBER}')"   ><i class="fa-solid fa-qrcode"></i></a>&ensp;
      <a href="boomBarrierListEdit.html?id=${data[i].SLIPNUMBER}" ><i class="fa-solid fa-file-pen"></i></a>&ensp;
      <a href="javascript:void(0);" onclick="DeleteRecById('${data[i].SLIPNUMBER}');"  ><i class="fa-solid fa-trash-can"></i></a>
     </td>
  </tr>`;
      }
      // ${data[i].QR_STATUS == 0 ? '<a ><img src="./css/images/gateClose.png" class="icon-Image"></a>':'<img src="./css/images/gateOpen.png" class="icon-Image">'}
      //<a href="javascript:void(0);" onclick="QrCheck('${data[i].QR_CODE}')"  class="" >${data[i].QR_STATUS == 0 ? 'Scan':'<i class="fa-solid fa-barcode"></i>'}</a>&ensp;
      $("#tableBody").append(dataContainer);
  
        }else{
          //console.log(data);
          $("#tableBody").append(`<tr><td colspan='9'><h6 align="center">No Data</h6></td></tr>`);
        }
  
      });
  
    },
    // ${data[i].QR_STATUS == 0 ? '<a><img src="./css/images/gateClose.png" class="icon-Image"></a>':'<img src="./css/images/gateOpen.png" class="icon-Image">'}
    getSingleEntry : (rid)=>{
      $.when(app.database.tables.GateEntry.getRecordById(rid))
      .done(function (data) {
        if(data && data == null){
            alert("Failed to Fetch Record");
        }else{
          document.getElementById("user_hdn").value=data[0].USERID;
          document.getElementById("document_no").value=data[0].SLIPNUMBER;
          document.getElementById("date").value=data[0].DATE;
          document.getElementById("GateEntryType").value=data[0].GATE_ENTRY_TYPE;
          document.getElementById("Department").value=data[0].DEPARTMENT;
          document.getElementById("Outlet").value=data[0].OUTLET;
          document.getElementById("flowClassify").value=data[0].FLOWCLASSIFY;
          document.getElementById("Gate").value=data[0].GATE;
          document.getElementById("isWeighmentRequired").value=data[0].ISWEIGHMENT_REQUIRED;
          document.getElementById("weighbridge").value=data[0].WEIGHBRIDGE;
          document.getElementById("weighmentType").value=data[0].WEIGHMENT_TYPE;
          document.getElementById("weighingType").value=data[0].WEIGHINGTYPE;
          document.getElementById("materialTransaction").value=data[0].MATERIAL_TRANSACTION;
          document.getElementById("materialType").value=data[0].MATERIAL_TYPE;
          document.getElementById("agent").value=data[0].AGENT;
          document.getElementById("Vechile").value=data[0].VEHICLE;
          document.getElementById("VendorORCustName").value=data[0].VENDOR_OR_CUSTNAME;
          document.getElementById("VendorORCustVillageName").value=data[0].CUST_VILLAGE_OR_CITY;
          document.getElementById("BillReferenceNo").value=data[0].BILL_REFERENCE_NO;
          document.getElementById("bill_date").value=data[0].BILL_DATE;
          document.getElementById("staffName").value=data[0].STAFF_NAME;
          document.getElementById("Visitor").value=data[0].VISITOR;
          document.getElementById("gateIn_date").value=data[0].GATE_IN_DATE;
          document.getElementById("gateOut_Date").value=data[0].GATE_OUT_DATE;
          document.getElementById("gateIn_time").value=data[0].GATE_IN_TIME;
          document.getElementById("gateOut_time").value=data[0].GATE_OUT_TIME;
          document.getElementById("gate_status").value=data[0].GATE_STATUS;
          document.getElementById("scanner_time").value=data[0].SCANNER_TIMER;
          document.getElementById("narration").value=data[0].NARRATION;
          document.getElementById("vehicle_no").value=data[0].VEHICLE_NUMBER;
          document.getElementById("attachmentone").src =data[0].ATTACHMENT_ONE;
          document.getElementById("attachementtwo").src =data[0].ATTACHMENT_TWO;
          document.getElementById("attachmentthree").src =data[0].ATTACHMENT_THREE;
          document.getElementById("attachmentfour").src =data[0].ATTACHMENT_FOUR;
          document.getElementById("InVehiclePhoto").src =data[0].VEHICLE_PHOTO_IN;
        }
      });
    },

    DeleteRecordById : (rid)=>{
      $.when(app.database.tables.GateEntry.deleteRecordById(rid))
      .done(function (result) {
        if(result == 0){
          alert("Failed to Delete");
          location.reload();
        }else{
          alert("Deleted Successfully");
          location.reload();
        }    
      });
    },

    updateGateEntry :()=>{

      const data = {
        userId : document.getElementById("user_hdn").value,
        document_no : document.getElementById("document_no").value,
        date : document.getElementById("date").value,
        GateEntryType: document.getElementById("GateEntryType").value,
        Department: document.getElementById("Department").value,
        Outlet: document.getElementById("Outlet").value,
        flowClassify: document.getElementById("flowClassify").value,
        Gate : document.getElementById("Gate").value,
        isWeighmentRequired :document.getElementById("isWeighmentRequired").value,
        weighbridge : document.getElementById("weighbridge").value,
        weighmentType : document.getElementById("weighmentType").value,
        weighingType : document.getElementById("weighingType").value,
        materialTransaction :document.getElementById("materialTransaction").value,
        materialType :document.getElementById("materialType").value,
        agent : document.getElementById("agent").value,
        Vechile : document.getElementById("Vechile").value,
        VendorORCustName : document.getElementById("VendorORCustName").value,
        VendorORCustVillageName :document.getElementById("VendorORCustVillageName").value,
        BillReferenceNo : document.getElementById("BillReferenceNo").value,
        bill_date : document.getElementById("bill_date").value,
        staffName : document.getElementById("staffName").value,
        Visitor : document.getElementById("Visitor").value,
        gateIn_date : document.getElementById("gateIn_date").value,
        gateOut_Date : document.getElementById("gateOut_Date").value,
        gateIn_time : document.getElementById("gateIn_time").value,
        gateOut_time : document.getElementById("gateOut_time").value,
        gate_status : document.getElementById("gate_status").value,
        scanner_time : document.getElementById("scanner_time").value,
        narration : document.getElementById("narration").value,
        vehicle_no : document.getElementById("vehicle_no").value 
      };
      $.when(app.database.tables.GateEntry.updateDataById(data))
        .done(function () {
         // app.weighment.loadLogins();
         toastr.options = {
          positionClass: 'toast-bottom-right'
        };
         toastr.success('Updated Successfully','',{timeOut:1000});
         location.href='boomBarrierList.html';
        });
  
    },
    

    getBoomBarrierFeildsData : ()=>{
      //app.fieldSettings.FetchAll();
      let FieldIds =["document_no", "date", "GateEntryType", "Department", "Outlet", "flowClassify", "Gate", "isWeighmentRequired", "weighbridge", "weighmentType", "weighingType", "materialTransaction", "materialType", "agent", "Vechile", "VendorORCustName", "VendorORCustVillageName", "BillReferenceNo", "bill_date", "staffName", "Visitor", "gateIn_date", "gateIn_time", "gateOut_Date", "gateOut_time", "gate_status", "scanner_time", "narration", "attachment_one", "attachment_two", "attachment_three", "attachment_four", "vehicle_no"];
      let FieldGroup= ["document_noGroup", "dateGroup", "GateEntryTypeGroup", "DepartmentGroup", "OutletGroup", "flowClassifyGroup", "GateGroup", "isWeighmentRequiredGroup", "weighbridgeGroup", "weighmentTypeGroup", "weighingTypeGroup", "materialTransactionGroup", "materialTypeGroup", "agentGroup", "VechileGroup", "VendorORCustNameGroup", "VendorORCustVillageNameGroup", "BillReferenceNoGroup", "bill_dateGroup", "staffNameGroup", "VisitorGroup", "gateIn_dateGroup", "gateIn_timeGroup", "gateOut_DateGroup", "gateOut_timeGroup", "gate_statusGroup", "scanner_timeGroup", "narrationGroup", "attachment_oneGroup", "attachment_twoGroup", "attachment_threeGroup", "attachment_fourGroup", "vehicle_noGroup"];


      $.when(app.database.tables.GateEntry.FetchAll())
      .done(function (data) {
        console.log(data);
        if(data != null || data != ""){
          
          
          // Hide and Display  Feilds s
          for (let i = 0; i < FieldIds.length; i++) {
            document.getElementById(FieldIds[i]).innerHTML = data[i].FEILDTEXT;
          }

          // Hide and Display  Feilds Groups
          for (let i = 0; i < FieldGroup.length; i++) {
            if(data[i].ISVISIBLE != "1"){
              document.getElementById(FieldGroup[i]).style.display ="none";
             }
          }
         
        }
      });
    },

   


//  Getting  dropdown values for Boom barrier          
loadAgentDropdowns:()=>{ 
  let FieldVal = ['Outlet','Gate','weighbridge','weighmentType','weighingType','materialTransaction','materialType','agent','Vechile','VendorORCustName','BillReferenceNo','staffName'];
  console.log(FieldVal);
  for(i=0; i < FieldVal.length; i++){
  $.when(app.database.tables.GateEntry.getDrpdownVal(FieldVal[i]))
  .done(function (list) {
   if(list != null){
    var dropdown = document.getElementById(list[0].FEILDNAME);
      var options = list;
      for(var i = 0; i < options.length; i++) {
        var option = document.createElement("option");
        option.text = options[i].FEILDTEXT; 
        option.value = options[i].FEILDTEXT; 
        dropdown.add(option);
      }
    }
  });
  }
},


    checkQR: (QRval)=>{
      let slipNum = QRval.split("-")[0];
      $.when(app.database.tables.GateEntry.checkQRCode(QRval))
      .done(function (result) {
        if(result == 0 || result == null){
          toastr.options = {
            positionClass: 'toast-bottom-right'
          };
          
          toastr.error('Invalid Qr','',{timeOut:1000})
        }else{
        app.database.tables.GateEntry.updateQRCode(QRval);
          // 'ipCamURL1': ipCamURL1,'ipCamURL2': ipCamURL2,'ipCamURL3':ipCamURL3
          $("#spinner").show()
          $.ajax({
            url: "http://localhost:8686/SaveBMRimage",
            type: "GET",
            cache: false,
            data: {'slipNum': slipNum},
            success: function (res) {
              if(res != ""){
                app.gateEntry.updatePicturePath(res);
                $("#spinner").hide();
              }
              $("#spinner").hide();
            },
            error: function(){
              $("#spinner").hide();
            }
            });      
          }
       });
     },

    updatePicturePath:(path)=>{
      let slpno = path.split("_")[0];
       let orgpath = "./bmrTemp/"+path;
       app.database.tables.GateEntry.updatePicturePath(orgpath,slpno);
      
       toastr.options = {
        positionClass: 'toast-bottom-right'
       };
         toastr.success('Qr Scanned Successefully','',{timeOut:1000})
           setTimeout(function(){
           location.reload(); 
          },1000) 
    }
  };
  