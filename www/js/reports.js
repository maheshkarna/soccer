$(document).ready(() => {
    app.database.createDB();
    app.itemWise.saveReportVal();
  });
  
  app.itemWise = {
//////////// Report Header  Settings /////////////
saveReportVal:function(){
  $.when(
    app.database.tables.itemWiseReport.getHeaderData())
    .done(function(data){
    if(data == null || data.length == 0){
      app.database.tables.itemWiseReport.saveReportVal();
    }else{
      $.when(app.database.tables.itemWiseReport.getHeaderData()).done(function(headerData){
        $('#Title').val(headerData[0].TITLE);
        $('#sTitle').val(headerData[0].SUBTITLE);
        $('#hdnId').val(headerData[0].ID);
      })
    }
  })
},
updateHeader :function(){
        
  let data={}
  data.title = $('#Title').val();
  data.sitle = $('#sTitle').val();
  data.hdnId = $('#hdnId').val();
  app.database.tables.itemWiseReport.updateHeader(data);
 
},

    //////////////////////////     Item Report    //////////////////////////  
      getItemList:function(){
        $.when(app.database.tables.itemWiseReport.getItemList()).
          done(function(data){
            if(data != null || data.length != 0 ){
              var dropdown = document.getElementById("item_name");
              console.log(data[0])
              var options = data;
              for(var i = 0; i < options.length; i++) {
                var option = document.createElement("option");
                option.text = options[i].MATERIAL; 
                option.value = options[i].MATERIAL; 
                dropdown.add(option);
              }
            }
            console.log(data);
          }); 
      },
      
      getData: (Key) => {
        let item = $('#item_name').val();
        let data = {};
            data.item = $('#item_name').val();
            data.fromDate = $('#from_date').val();
            data.toDate = $('#to_date').val();
            data.status = $('#status').val();

        $.when(
            app.database.tables.itemWiseReport.getItemWise(data)
        ).done(function (data) {   
          console.log(data);  
          if(data !=null && data.length > 0 ){
            if(Key == "V"){
              app.itemWise.showItemsReport(data);
            }
           if(Key == 'P'){

          let dates = [];
          for(let i=0; i<data.length; i++ ){
            dates.push(data[i].CREATED_DATE);
          }
          let minDate = dates[0];
          let maxDate = dates[0];

          for (let i = 1; i < dates.length; i++) {
            let currentDate = dates[i];
            if (currentDate < minDate) {
            minDate = currentDate;
            }

            if (currentDate > maxDate) {
            maxDate = currentDate;
            }
            }
          
            app.itemWise.ItemWisePrint(data,minDate,maxDate,item);
           }

          }else{
            toastr.options = {
              positionClass: 'toast-bottom-right'
             };
             toastr.error('No Data Available..', '', {timeOut: 1000});
             $("#itemsReport").empty();
          }
        });
    },
    
     //Print Item Report Data
    ItemWisePrint : (data,minDate,maxDate,item)=>{
      
      $.when(app.database.tables.itemWiseReport.getHeaderData()).done(function(headerData){
      let title = headerData[0].TITLE;
      let subTitle = headerData[0].SUBTITLE;
           
      let total_tare = 0;
      let total_net= 0;
      let total_gross = 0;
      let printBody = "";
        
printBody +=`<html>
<head> 
  <style>
        .container {
          align-items: center;
      }
  
      .slip-header p{
        margin: -2;
        text-align: center;
      }
      
      .slip-body {
        margin-top:12px;
      }

      table, td, th {  
      /*border: 1px solid black;*/
      text-align: center;
      font-family: unset;
      }
      td{
        font-size: 12px;
      }
      th{
        font-size: 12px;
      }

      table {
      border-collapse: collapse;
      width: 100%;
      }
      table thead tr {
          border:1px solid black;
          border-left: none;
          border-right: none;
          /* border: block end width 2px; */
        }
       table tbody tr {
          border-bottom-style:dotted;
          border-block-end-width:1px;
        }
        table tfoot .foot {
          border-bottom-style: double;
        }
        .tftr{
            border-bottom: 1px solid;
        }
        .td-bold
        {
            font-weight: bold;
            font-size: 15px;
        }
      th, td {
      padding: 5px;
      }
      tbody tr .td{
        text-align: right;
      }
        </style>   
  </head>
  <body>
    <div class="container">
    <div class="slip">
      <div class="slip-header">
        <p style="font-weight: bolder; font-size: 20px;  margin-top: -10;">${title}</p>
        <p style="font-weight: bolder; font-size: 18px">${subTitle}</p>
        <p style="font-weight: bolder; font-size: 14px">${item} Item Weighment Detailed Report From ${minDate} 00:00:00 To ${maxDate} 23:59:59</p>     
      </div>     
      <div class="slip-body">
        <table>
          <thead>
          <p align="right" style=" font-size: 14px"> Weight Interms : KGS</p>
          <tr>
          <th width="8%">Serial</th>
          <th width="11%">In Date<br>In time</th>
          <th width="11%">Out Date<br>Out time</th>
          <th width="8%">Vehicle No</th>
          <th width="12%">Party Name</th>
          <th width="12%">Material<br>Remarks</th>
          <th width="8%">Qty</th>
          <th width="10%">Gross</th>
          <th width="10%">Tare</th>
          <th width="10%">Net</th>
        </tr>
          </thead>
          <tbody>`
          for(let i =0; i< data.length; i++){
            let indate="";
            let intime="";
            let outDate="";
            let outtime="";
            if(data[i].TAREWEIGHT !="")
            {
              total_tare += data[i].TAREWEIGHT;
            }
            if(data[i].GROSSWEIGHT !=""){
              total_gross += data[i].GROSSWEIGHT;
            }
            if(data[i].NETTWEIGHT !=""){
              total_net += data[i].NETTWEIGHT;
            }
            if(data[i].FIRST_WT == "Tare")
            {
              outDate = data[i].GROSSDATE;
              outtime = data[i].GROSSTIME;
              indate = data[i].TAREDATE;
              intime = data[i].TARETIME;
            }else {
              indate = data[i].GROSSDATE;
              intime = data[i].GROSSTIME;
              outDate = data[i].TAREDATE;
              outtime = data[i].TARETIME;   
            }
            printBody +=`<tr>
            <td>${data[i].SLIPNUMBER}</td>
            <td>${indate}<br>${intime}</td>
            <td>${outDate}<br>${outtime}</td>
            <td>${data[i].VEHICLENUMBER}</td>
            <td>${data[i].PARTYNAME}</td>
            <td>${data[i].MATERIAL}<br><br> ${data[i].REMARKS}</td>
            <td></td>
            <td class="td">${data[i].GROSSWEIGHT}</td>
            <td class="td">${data[i].TAREWEIGHT}</td>
            <td class="td">${data[i].NETTWEIGHT}</td>
            </tr>`
          }
        

            printBody +=`</tbody>
          <tfoot>
            <tr class="foot">
                <th></th>
                <th></th>
                <th></th>
                <th>Total Vehicles</th>
                <th></th> 
                <th></th>
                <th>Qty</th>
                <th>Total Gross</th>
                <th>Total Tare</th>
                <th>Total Net</th>
            </tr>
            <tr class="foot">
              <td class="td-bold">Grand Totals:</td>
              <td class="td-bold"></td>
              <td class="td-bold"></td>
              <td class="td-bold">${data.length}</td>
              <td class="td-bold"></td>
              <td class="td-bold"></td>
              <td class="td-bold"></td>
              <td class="td-bold">${total_gross}</td>
              <td class="td-bold">${total_tare}</td>
              <td class="td-bold">${total_net}</td>
          </tr>
            
          </tfoot>

        </table> 
  </div>
</body>
</html>`
  
    
      const printWindow = window.open("", "PrintWindow");
      printWindow.document.write(printBody);
      // printWindow.print();
      // printWindow.close();
      setTimeout(function() {
        printWindow.print();
      }, 2000);
      setTimeout(function() {
        printWindow.close();
      }, 5000);
      printBody = "";
      })
  
    },


    showItemsReport: (data) => {
      if (!data) {
          return;
      }
      $("#itemsReport").empty();
      for (let i = 0; i < data.length; i++) {
          let fw = data[i].FIRST_WT;
          let j = i + 1;
          // Determine test time and test date values
          let testIn = "";
          let testOut = "";
        if(fw == 'Gorss'){
          testIn = data[i].GROSSDATE +'<br>'+data[i].GROSSTIME;
          testOut = data[i].TAREDATE+'<br>'+ data[i].TARETIME; 
        }else{
           testOut = data[i].GROSSDATE+'<br>'+data[i].GROSSTIME;
           testIn  = data[i].TAREDATE+'<br>'+data[i].TARETIME; 
        }
      
          $("#itemsReport").append(`
              <tr>
              <th scope="row">${j}</th>
              <td>${data[i].SLIPNUMBER}</td>
  
              <td>${testIn}</td>
  
              <td>${testOut}</td>
  
              <td>${data[i].MATERIAL}</td>
              <td>${data[i].PARTYNAME}</td>
              <td class="text-end">${data[i].TAREWEIGHT}</td>
              <td class="text-end">${data[i].GROSSWEIGHT}</td>
              <td class="text-end">${data[i].NETTWEIGHT}</td>
              <td>${data[i].VEHICLENUMBER}</td>
              <td>${data[i].STATUS == 0 ? 'Pending' : 'Completed'}</td>
              
              </tr>
          `);
      }
  },

    //////////////////////////      All Reports    //////////////////////////
 
      getAllData: (key) => {
        let entryType = $('#entryType').val();
        let item_name = $('#item_name').val();
        let partyName = $('#partyName').val();

        let data = {};
            data.entryType = $('#entryType').val();
            data.status = $('#status').val();
            data.fromDate = $('#from_date').val();
            data.toDate = $('#to_date').val();
            data.weight = $('#weight').val();
            data.weihtType = $('#weihtType').val();
            data.item_name = $('#item_name').val();
            data.partyName = $('#partyName').val();
         
        $.when(
            app.database.tables.itemWiseReport.getWeightWise(data)
        ).done(function (data) {   
          // console.log(data);  
          if(data !=null && data.length > 0 ){

            if(key == 'V'){  
            app.itemWise.showWeightReport(data);
            }
            if(key == 'P'){
              
          let dates = [];
          for(let i=0; i<data.length; i++ ){
            dates.push(data[i].CREATED_DATE);
          }
          let minDate = dates[0];
          let maxDate = dates[0];

          for (let i = 1; i < dates.length; i++) {
            let currentDate = dates[i];
            if (currentDate < minDate) {
            minDate = currentDate;
            }

            if (currentDate > maxDate) {
            maxDate = currentDate;
            }
            }
              app.itemWise.allprintReport(data,minDate,maxDate,partyName,item_name,entryType);
            }

          }else{
            toastr.options = {
              positionClass: 'toast-bottom-right'
             };
             toastr.error('No Data Available..', '', {timeOut: 1000});
             $("#weightBody").empty();

          }
        });
    },
   
allprintReport : (data,minDate,maxDate,partyName,item_name,entryType)=>{
     
  $.when(app.database.tables.itemWiseReport.getHeaderData()).done(function(headerData){
    let msg=""
      
    let total_tare = 0;
    let total_net= 0;
    let total_gross = 0;
    let printBody = "";

    let  title = headerData[0].TITLE;
    let subTitle = headerData[0].SUBTITLE;

            
printBody +=`<html>
<head> 
  <style>
        .container {
        
        align-items: center;
      }
  
      .slip-header p{
        margin: -2;
        text-align: center;
      }
      
      .slip-body {
        margin-top:12px;
      }

      table, td, th {  
      /*border: 1px solid black;*/
      text-align: center;
      font-family: unset;
      }
      td{
        font-size: 12px;
      }
      th{
        font-size: 12px;
      }

      table {
      border-collapse: collapse;
      width: 100%;
      }
      table thead tr {
          border:1px solid black;
          border-left: none;
          border-right: none;
          /* border: block end width 2px; */
        }
       table tbody tr {
          border-bottom-style:dotted;
          border-block-end-width:1px;
        }
        table tfoot .foot {
          border-bottom-style: double;
        }
        .tftr{
            border-bottom: 1px solid;
        }
        .td-bold
        {
            font-weight: bold;
            font-size: 15px;
        }
      th, td {
      padding: 5px;
      }
      tbody tr .td{
        text-align: right;
      }
        </style>   
  </head>
  <body>
    <div class="container">
    <div class="slip">
      <div class="slip-header">
      <p style="font-weight: bolder; font-size: 20px;  margin-top: -10;">${title}</p>
      <p style="font-weight: bolder; font-size: 18px">${subTitle}</p>
        <p style="font-weight: bolder; font-size: 14px">ET:${entryType} and PN:${partyName} and IN:${item_name} Weighment Detailed Report From ${minDate} 00:00:00 To ${maxDate} 23:59:59</p>     
      </div>     
      <div class="slip-body">
        <table>
          <thead>
          <p align="right" style=" font-size: 14px"> Weight Interms : KGS</p>
          <tr>
          <th width="8%">Serial</th>
          <th width="11%">In Date<br>In time</th>
          <th width="11%">Out Date<br>Out time</th>
          <th width="8%">Vehicle No</th>
          <th width="12%">Party Name</th>
          <th width="12%">Material<br>Remarks</th>
          <th width="8%">Qty</th>
          <th width="10%">Gross</th>
          <th width="10%">Tare</th>
          <th width="10%">Net</th>
        </tr>
          </thead>
          <tbody>`
          for(let i =0; i< data.length; i++){
            let indate="";
            let intime="";
            let outDate="";
            let outtime="";
            if(data[i].TAREWEIGHT !="")
            {
              total_tare += data[i].TAREWEIGHT;
            }
            if(data[i].GROSSWEIGHT !=""){
              total_gross += data[i].GROSSWEIGHT;
            }
            if(data[i].NETTWEIGHT !=""){
              total_net += data[i].NETTWEIGHT;
            }
            if(data[i].FIRST_WT == "Tare")
            {
              outDate = data[i].GROSSDATE;
              outtime = data[i].GROSSTIME;
              indate = data[i].TAREDATE;
              intime = data[i].TARETIME;
            }else {
              indate = data[i].GROSSDATE;
              intime = data[i].GROSSTIME;
              outDate = data[i].TAREDATE;
              outtime = data[i].TARETIME;   
            }
            printBody +=`<tr>
            <td>${data[i].SLIPNUMBER}</td>
            <td>${indate}<br>${intime}</td>
            <td>${outDate}<br>${outtime}</td>
            <td>${data[i].VEHICLENUMBER}</td>
            <td>${data[i].PARTYNAME}</td>
            <td>${data[i].MATERIAL}<br><br> ${data[i].REMARKS}</td>
            <td></td>
            <td class="td">${data[i].GROSSWEIGHT}</td>
            <td class="td">${data[i].TAREWEIGHT}</td>
            <td class="td">${data[i].NETTWEIGHT}</td>
            </tr>`
          }
        

        printBody +=`</tbody>
          <tfoot>
            <tr class="foot">
                <th></th>
                <th></th>
                <th></th>
                <th>Total Vehicles</th>
                <th></th> 
                <th></th>
                <th>Qty</th>
                <th>Total Gross</th>
                <th>Total Tare</th>
                <th>Total Net</th>
            </tr>
            <tr class="foot">
              <td class="td-bold">Grand Totals:</td>
              <td class="td-bold"></td>
              <td class="td-bold"></td>
              <td class="td-bold">${data.length}</td>
              <td class="td-bold"></td>
              <td class="td-bold"></td>
              <td class="td-bold"></td>
              <td class="td-bold">${total_gross}</td>
              <td class="td-bold">${total_tare}</td>
              <td class="td-bold">${total_net}</td>
            </tr>
          </tfoot>
        </table> 
  </div>
</body>
</html>`
  
    
      const printWindow = window.open("", "PrintWindow");
      printWindow.document.write(printBody);
      // printWindow.print();
      // printWindow.close();
      setTimeout(function() {
        printWindow.print();
      }, 2000);
      setTimeout(function() {
        printWindow.close();
      }, 5000);
      printBody = "";
      })
  

    },
    showWeightReport: (data) => {

        if (!data) {
          return;
        }
        $("#weightBody").empty();
        for (let i = 0; i < data.length; i++) {
        let j = i + 1;
        let fw = data[i].FIRST_WT;
        let testIn = "";
        let testOut = "";
        if(fw == 'Gorss'){
          testIn = data[i].GROSSDATE +'<br>'+data[i].GROSSTIME;
          testOut = data[i].TAREDATE+'<br>'+ data[i].TARETIME; 
        }else{
           testOut = data[i].GROSSDATE+'<br>'+data[i].GROSSTIME;
           testIn  = data[i].TAREDATE+'<br>'+data[i].TARETIME; 
        }

          $("#weightBody").append(`
          <tr>
          <th class="tbColl" scope="row">${j}</th>
          <td class="tbColl">${data[i].SLIPNUMBER}</td>
          <td class="tbColl">${testIn}</td>
          <td class="tbColl">${testOut}</td>
          <td class="tbColl" >${data[i].MATERIAL}</td>
          <td class="tbColl">${data[i].AGENT}</td>
          <td class="tbColl">${data[i].PARTYNAME}</td> 
          <td class="tbColl text-end">${data[i].TAREWEIGHT}</td>
          <td class="tbColl text-end">${data[i].GROSSWEIGHT}</td>
          <td class="tbColl text-end">${data[i].NETTWEIGHT}</td>
          <td class="tbColl">${data[i].VEHICLENUMBER}</td>
          <td class="tbColl">${data[i].STATUS == 0 ?'Pending':'Completed' }</td>
          <td class="tbColl">${data[i].ENTRY_TYPE}</td>
          </tr>
        `);

        }
      },

    //////////////////////////    Vehicle Report    //////////////////////////

    getVehicleData: (Key) => {
     let VehicleNO = $('#vehicleNo').val();
        let data = {};
            data.vehicleNo = $('#vehicleNo').val();
            data.fromDate = $('#from_date').val();
            data.toDate = $('#to_date').val();
            data.status = $('#status').val();
        $.when(
            app.database.tables.itemWiseReport.getVehicleWise(data)
        ).done(function (data) {   
          console.log(data);  
          if(data !=null && data.length > 0 ){
            
            if(Key == "V"){
              app.itemWise.vehivllListShow(data);
            }if(Key == "P"){
          let dates = [];
          for(let i=0; i<data.length; i++ ){
            dates.push(data[i].CREATED_DATE);
          }
          let minDate = dates[0];
          let maxDate = dates[0];

          for (let i = 1; i < dates.length; i++) {
            let currentDate = dates[i];
            if (currentDate < minDate) {
            minDate = currentDate;
            }
            if (currentDate > maxDate) {
            maxDate = currentDate;
            }
            }
              app.itemWise.vehiclePrint(data,minDate,maxDate,VehicleNO);
            }
          }else{
            $("#vehicleBody").empty();
            toastr.options = {
              positionClass: 'toast-bottom-right'
             };
             toastr.error('No Data Available..', '', {timeOut: 1000});
             $("#vehicleBody").empty();
          }
        });
    },

    vehiclePrint : (data,minDate,maxDate,VehicleNO)=>{
      $.when(app.database.tables.itemWiseReport.getHeaderData()).done(function(headerData){
        let msg="";
        if(VehicleNO != ""){
        msg = VehicleNO;
        } else{
        msg = "All Vehicles"
        }  
        let total_tare = 0;
        let total_net= 0;
        let total_gross = 0;
        let printBody = "";

        let title = headerData[0].TITLE;
        let subTitle = headerData[0].SUBTITLE;

        
printBody +=`<html>
<head> 
  <style>
        .container {
        align-items: center;
      }
  
      .slip-header p{
        margin: -2;
        text-align: center;
      }
      
      .slip-body {
        margin-top:12px;
      }

      table, td, th {  
      /*border: 1px solid black;*/
      text-align: center;
      font-family: unset;
      }
      td{
        font-size: 12px;
      }
      th{
        font-size: 12px;
      }

      table {
      border-collapse: collapse;
      width: 100%;
      }
      table thead tr {
          border:1px solid black;
          border-left: none;
          border-right: none;
          /* border: block end width 2px; */
        }
       table tbody tr {
          border-bottom-style:dotted;
          border-block-end-width:1px;
        }
        table tfoot .foot {
          border-bottom-style: double;
        }
        .tftr{
            border-bottom: 1px solid;
        }
        .td-bold
        {
            font-weight: bold;
            font-size: 15px;
        }
      th, td {
      padding: 5px;
      }
      tbody tr .td{
        text-align: right;
      }
        </style>   
  </head>
  <body>
    <div class="container">
    <div class="slip">
      <div class="slip-header">
      <p style="font-weight: bolder; font-size: 20px;  margin-top: -10;">${title}</p>
      <p style="font-weight: bolder; font-size: 18px">${subTitle}</p>
        <p style="font-weight: bolder; font-size: 14px">${msg} Weighment Detailed Report From ${minDate} 00:00:00 To ${maxDate} 23:59:59</p>     
      </div>     
      <div class="slip-body">
        <table>
          <thead>
          <p align="right" style=" font-size: 14px"> Weight Interms : KGS</p>
          <tr>
          <th width="8%">Serial</th>
          <th width="11%">In Date<br>In time</th>
          <th width="11%">Out Date<br>Out time</th>
          <th width="8%">Vehicle No</th>
          <th width="12%">Party Name</th>
          <th width="12%">Material<br>Remarks</th>
          <th width="8%">Qty</th>
          <th width="10%">Gross</th>
          <th width="10%">Tare</th>
          <th width="10%">Net</th>
        </tr>
          </thead>
          <tbody>`
          for(let i =0; i< data.length; i++){
            let indate="";
            let intime="";
            let outDate="";
            let outtime="";
            if(data[i].TAREWEIGHT !="")
            {
              total_tare += data[i].TAREWEIGHT;
            }
            if(data[i].GROSSWEIGHT !=""){
              total_gross += data[i].GROSSWEIGHT;
            }
            if(data[i].NETTWEIGHT !=""){
              total_net += data[i].NETTWEIGHT;
            }
            if(data[i].FIRST_WT == "Tare")
            {
              outDate = data[i].GROSSDATE;
              outtime = data[i].GROSSTIME;
              indate = data[i].TAREDATE;
              intime = data[i].TARETIME;
            }else {
              indate = data[i].GROSSDATE;
              intime = data[i].GROSSTIME;
              outDate = data[i].TAREDATE;
              outtime = data[i].TARETIME;   
            }
            printBody +=`<tr>
            <td>${data[i].SLIPNUMBER}</td>
            <td>${indate}<br>${intime}</td>
            <td>${outDate}<br>${outtime}</td>
            <td>${data[i].VEHICLENUMBER}</td>
            <td>${data[i].PARTYNAME}</td>
            <td>${data[i].MATERIAL}<br><br> ${data[i].REMARKS}</td>
            <td></td>
            <td class="td">${data[i].GROSSWEIGHT}</td>
            <td class="td">${data[i].TAREWEIGHT}</td>
            <td class="td">${data[i].NETTWEIGHT}</td>
            </tr>`
          }
        

       printBody +=`</tbody>
          <tfoot>
            <tr class="foot">
                <th></th>
                <th></th>
                <th></th>
                <th>Total Vehicles</th>
                <th></th> 
                <th></th>
                <th>Qty</th>
                <th>Total Gross</th>
                <th>Total Tare</th>
                <th>Total Net</th>
            </tr>
            <tr class="foot">
              <td class="td-bold">Grand Totals:</td>
              <td class="td-bold"></td>
              <td class="td-bold"></td>
              <td class="td-bold">${data.length}</td>
              <td class="td-bold"></td>
              <td class="td-bold"></td>
              <td class="td-bold"></td>
              <td class="td-bold">${total_gross}</td>
              <td class="td-bold">${total_tare}</td>
              <td class="td-bold">${total_net}</td>
          </tr>
          </tfoot>
        </table> 
  </div>
</body>
</html>`
  
    
      const printWindow = window.open("", "PrintWindow");
      printWindow.document.write(printBody);
      // printWindow.print();
      // printWindow.close();
      setTimeout(function() {
        printWindow.print();
      }, 2000);
      setTimeout(function() {
        printWindow.close();
      }, 5000);
      printBody = "";

      })


    },

    vehivllListShow: (data) => {

      if (!data) {
        return;
      }
      $("#vehicleBody").empty();

      for(let i = 0; i < data.length; i++) {
        let j = i + 1;
        let fw = data[i].FIRST_WT;
        let testIn = "";
        let testOut = "";
        if(fw == 'Gorss'){
          testIn = data[i].GROSSDATE +'<br>'+data[i].GROSSTIME;
          testOut = data[i].TAREDATE+'<br>'+ data[i].TARETIME; 
        }else{
           testOut = data[i].GROSSDATE+'<br>'+data[i].GROSSTIME;
           testIn  = data[i].TAREDATE+'<br>'+data[i].TARETIME; 
        }

        $("#vehicleBody").append(`
          <tr>
          <th scope="row">${j}</th>
          <td>${data[i].SLIPNUMBER}</td>
          <td class="tbColl">${testIn}</td>
          <td class="tbColl">${testOut}</td>
          <td>${data[i].MATERIAL}</td>
          <td>${data[i].AGENT}</td>
          <td class="text-end">${data[i].TAREWEIGHT}</td>
          <td class="text-end">${data[i].GROSSWEIGHT}</td>
          <td class="text-end">${data[i].NETTWEIGHT}</td>
          <td>${data[i].VEHICLENUMBER}</td>
          <td>${data[i].STATUS == 0 ?'Pending':'Completed' }</td>
          </tr>
      `);  
      }
    },

    //////////////////////////    Party Report    //////////////////////////

        getPartyList: () => {
          $.when(app.database.tables.itemWiseReport.getPartyList()).
          done(function(data){
            if(data != null || data.length != 0 ){
              var dropdown = document.getElementById("partyName");
              console.log(data[0])
              var options = data;
              for(var i = 0; i < options.length; i++) {
                var option = document.createElement("option");
                option.text = options[i].PARTYNAME; 
                option.value = options[i].PARTYNAME; 
                dropdown.add(option);
              }
            }
          }); 
        },

        getPartyData: (Key) => {

            let  partyName = $('#partyName').val();
            let data = {};
              data.partyName = $('#partyName').val();
              data.fromDate = $('#from_date').val();
              data.toDate = $('#to_date').val();
              data.status = $('#status').val();

          $.when(
              app.database.tables.itemWiseReport.getPartyWise(data)
          ).done(function (data) {   
            console.log(data);  
            if(data !=null && data.length > 0 ){
              if(Key == 'V'){
              app.itemWise.partyListShow(data);
              }if(Key == 'P'){                   
          let dates = [];
          for(let i=0; i<data.length; i++ ){
            dates.push(data[i].CREATED_DATE);
          }

          let minDate = dates[0];
          let maxDate = dates[0];

            for (let i = 1; i < dates.length; i++) {
            let currentDate = dates[i];
            if (currentDate < minDate) {
            minDate = currentDate;
            }

              if (currentDate > maxDate) {
              maxDate = currentDate;
              }
              }
              app.itemWise.partyPrint(data,minDate,maxDate,partyName);
              }
            }else{
            toastr.options = {
              positionClass: 'toast-bottom-right'
              };
              toastr.error('No Data Available..', '', {timeOut: 1000});
              $("#partyBody").empty();
          }
          });
        },
  
//print Party Data
    partyPrint : (data,minDate,maxDate,partyName)=>{
      $.when(app.database.tables.itemWiseReport.getHeaderData()).done(function(headerData){
        let msg = "";
      if(partyName !="all"){
        msg = partyName;
      }else{
        msg = "All Parties"
      }     
      let total_tare = 0;
      let total_net= 0;
      let total_gross = 0;
      let printBody = "";
      
      let title = headerData[0].TITLE;
      let subTitle = headerData[0].SUBTITLE;

printBody +=`<html>
<head> 
  <style>
        .container {
          align-items: center;
      }
  
      .slip-header p{
        margin: -2;
        text-align: center;
      }
      
      .slip-body {
        margin-top:12px;
      }

      table, td, th {  
      /*border: 1px solid black;*/
      text-align: center;
      font-family: unset;
      }
      td{
        font-size: 12px;
      }
      th{
        font-size: 12px;
      }

      table {
      border-collapse: collapse;
      width: 100%;
      }
      table thead tr {
          border:1px solid black;
          border-left: none;
          border-right: none;
          /* border: block end width 2px; */
        }
       table tbody tr {
          border-bottom-style:dotted;
          border-block-end-width:1px;
        }
        table tfoot .foot {
          border-bottom-style: double;
        }
        .tftr{
            border-bottom: 1px solid;
        }
        .td-bold
        {
            font-weight: bold;
            font-size: 15px;
        }
      th, td {
      padding: 5px;
      }
      tbody tr .td{
        text-align: right;
      }
        </style>   
  </head>
  <body>
    <div class="container">
    <div class="slip">
      <div class="slip-header">
        <p style="font-weight: bolder; font-size: 20px; margin-top: -10;">${title}</p>
        <p style="font-weight: bolder; font-size: 18px">${subTitle}</p>
        <p style="font-weight: bolder; font-size: 14px">${msg} Weighment Detailed Report From ${minDate} 00:00:00 To ${maxDate} 23:59:59</p>     
      </div>     
      <div class="slip-body">
        <table>
          <thead>
          <p align="right" style=" font-size: 14px"> Weight Interms : KGS</p>
          <tr>
          <th width="8%">Serial</th>
          <th width="11%">In Date<br>In time</th>
          <th width="11%">Out Date<br>Out time</th>
          <th width="8%">Vehicle No</th>
          <th width="12%">Party Name</th>
          <th width="12%">Material<br>Remarks</th>
          <th width="8%">Qty</th>
          <th width="10%">Gross</th>
          <th width="10%">Tare</th>
          <th width="10%">Net</th>
        </tr>
          </thead>
          <tbody>`
          for(let i =0; i< data.length; i++){
            let indate="";
            let intime="";
            let outDate="";
            let outtime="";
            if(data[i].TAREWEIGHT !="")
            {
              total_tare += data[i].TAREWEIGHT;
            }
            if(data[i].GROSSWEIGHT !=""){
              total_gross += data[i].GROSSWEIGHT;
            }
            if(data[i].NETTWEIGHT !=""){
              total_net += data[i].NETTWEIGHT;
            }
            if(data[i].FIRST_WT == "Tare")
            {
              outDate = data[i].GROSSDATE;
              outtime = data[i].GROSSTIME;
              indate = data[i].TAREDATE;
              intime = data[i].TARETIME;
            }else {
              indate = data[i].GROSSDATE;
              intime = data[i].GROSSTIME;
              outDate = data[i].TAREDATE;
              outtime = data[i].TARETIME;   
            }
            printBody +=`<tr>
            <td>${data[i].SLIPNUMBER}</td>
            <td>${indate}<br>${intime}</td>
            <td>${outDate}<br>${outtime}</td>
            <td>${data[i].VEHICLENUMBER}</td>
            <td>${data[i].PARTYNAME}</td>
            <td>${data[i].MATERIAL}<br><br> ${data[i].REMARKS}</td>
            <td></td>
            <td class="td">${data[i].GROSSWEIGHT}</td>
            <td class="td">${data[i].TAREWEIGHT}</td>
            <td class="td">${data[i].NETTWEIGHT}</td>
            </tr>`
          }
        

          printBody +=`</tbody>
          <tfoot>
            <tr class="foot">
                <th></th>
                <th></th>
                <th></th>
                <th>Total Vehicles</th>
                <th></th> 
                <th></th>
                <th>Qty</th>
                <th>Total Gross</th>
                <th>Total Tare</th>
                <th>Total Net</th>
            </tr>
            <tr class="foot">
              <td class="td-bold">Grand Totals:</td>
              <td class="td-bold"></td>
              <td class="td-bold"></td>
              <td class="td-bold">${data.length}</td>
              <td class="td-bold"></td>
              <td class="td-bold"></td>
              <td class="td-bold"></td>
              <td class="td-bold">${total_gross}</td>
              <td class="td-bold">${total_tare}</td>
              <td class="td-bold">${total_net}</td>
          </tr>
          </tfoot>
        </table> 
  </div>
</body>
</html>`
  
    
    const printWindow = window.open("", "PrintWindow");
    printWindow.document.write(printBody);
    // printWindow.print();
    // printWindow.close();
    setTimeout(function() {
      printWindow.print();
    }, 2000);
    setTimeout(function() {
      printWindow.close();
    }, 5000);
    printBody = "";
      })
    },
      partyListShow: (data) =>{
        if (!data) {
          return;
        }
        $("#partyBody").empty();
        for (let i = 0; i < data.length; i++) {
          let j = i + 1;
          let fw = data[i].FIRST_WT;
          let testIn = "";
          let testOut = "";
          if(fw == 'Gorss'){
            testIn = data[i].GROSSDATE +'<br>'+data[i].GROSSTIME;
            testOut = data[i].TAREDATE+'<br>'+ data[i].TARETIME; 
          }else{
             testOut = data[i].GROSSDATE+'<br>'+data[i].GROSSTIME;
             testIn  = data[i].TAREDATE+'<br>'+data[i].TARETIME; 
          }
          $("#partyBody").append(`
            <tr>
            <th scope="row">${j}</th>
            <td>${data[i].SLIPNUMBER}</td>
            <td class="tbColl">${testIn}</td>
            <td class="tbColl">${testOut}</td>
            <td>${data[i].MATERIAL}</td>
            <td>${data[i].PARTYNAME}</td>
            <td class="text-end">${data[i].TAREWEIGHT}</td>
            <td class="text-end">${data[i].GROSSWEIGHT}</td>
            <td class="text-end">${data[i].NETTWEIGHT}</td>
            <td>${data[i].VEHICLENUMBER}</td>
            <td>${data[i].STATUS == 0 ?'Pending':'Completed' }</td>
            
            </tr>
        `);  
        }
      },

 ////////////////////  Agent Report  ////////////////
      
       getAgentList: () => {
        $.when(app.database.tables.itemWiseReport.getAgentList()).
        done(function(data){
          if(data != null || data.length != 0 ){
            var dropdown = document.getElementById("agenName");
       
            var options = data;
            for(var i = 0; i < options.length; i++) {
              var option = document.createElement("option");
              option.text = options[i].AGENT; 
              option.value = options[i].AGENT; 
              dropdown.add(option);
            }
          }
          console.log(data);
        }); 
      },

       getAgentData: () => {
          let data = {};
          data.agenName = $('#agenName').val();
          data.fromDate = $('#from_date').val();
          data.toDate = $('#to_date').val();
        $.when(
          app.database.tables.itemWiseReport.getAgentWise(data)
        ).done(function (data) {   
          console.log(data);  
          if(data !=null && data.length > 0 ){
            app.itemWise.agentListShow(data);
          }else{
            $("#agentBody").empty();
            toastr.options = {
              positionClass: 'toast-bottom-right'
             };
             toastr.error('No Data Available..', '', {timeOut: 1000});
          }
        });
    },

    agentListShow: (data) => {
      if (!data) {
        return;
      }
      $("#agentBody").empty();
      for (let i = 0; i < data.length; i++) {
        let j = i + 1;
        $("#agentBody").append(`
          <tr>
          <th scope="row">${j}</th>
          <td>${data[i].SLIPNUMBER}</td>
          <td>${data[i].MATERIAL}</td>
          <td>${data[i].PARTYNAME}</td>
          <td class="text-end">${data[i].TAREWEIGHT}</td>
          <td class="text-end">${data[i].GROSSWEIGHT}</td>
          <td class="text-end">${data[i].NETTWEIGHT}</td>
          <td>${data[i].VEHICLENUMBER}</td>
          <td>${data[i].STATUS == 0 ?'Pending':'Completed' }</td>
          <td>${data[i].CREATED_DATE}</td>
          </tr>
      `);  
      }
    },
      
  };
  