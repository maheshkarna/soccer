$(document).ready(() => {
    app.database.createDB();
    app.Registration.GetData();
    app.Registration.getSpAdminData();
  });
  

  app.Registration = {
    getSpAdminData:()=>{
      $.when(
        app.database.tables.Registration.getSpAdminData()
      ).done(function (data) { 
          if(data == null || data.lenght == 0){
            app.database.tables.Registration.InsertSpLogin();  
          }
    });
    },
   

    
    SaveData: () => { 
      function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }
      function isValidNumber(value) {
        return /^\d+$/.test(value);
      }

      const companyName = document.getElementById("company_name").value.trim();
      const address = document.getElementById("address").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const wbs = document.getElementById("wbs").value.trim();
      const AdmUsername = document.getElementById("AdmUsername").value.trim();
      const AdmPassword = document.getElementById("AdmPassword").value.trim();
      const cc = document.getElementById("cc").value.trim();

      const registaionKey = document.getElementById("registaion_key").value.trim();
      let isValid = true;
      
      if (companyName === '') {
        isValid = false;
        $("#company_name").addClass("is-invalid");
        $("#companyNameError").text("Please enter a company name.");
      } else {
        $("#company_name").removeClass("is-invalid");
        $("#companyNameError").text("");
      }
      
      if (address === '') {
        isValid = false;
        $("#address").addClass("is-invalid");
        $("#addressError").text("Please enter an address.");
      } else {
        $("#address").removeClass("is-invalid");
        $("#addressError").text("");
      }
     
      if (email === '') {
        isValid = false;
        $("#email").addClass("is-invalid");
        $("#emailError").text("Please enter an email.");
      } else if (!isValidEmail(email)) {
        isValid = false;
        $("#email").addClass("is-invalid");
        $("#emailError").text("Please enter a valid email address.");
      } else {
        $("#email").removeClass("is-invalid");
        $("#emailError").text("");
      }
      
      if (phone === '') {
        isValid = false;
        $("#phone").addClass("is-invalid");
        $("#phoneError").text("Please enter a phone number.");
      } else {
        $("#phone").removeClass("is-invalid");
        $("#phoneError").text("");
      }
    
      if (wbs === '') {
        isValid = false;
        $("#wbs").addClass("is-invalid");
        $("#wbsError").text("Please enter a WBS number.");
      } else {
        $("#wbs").removeClass("is-invalid");
        $("#wbsError").text("");
      }
  
      
      if (AdmUsername === '') {
        isValid = false;
        $("#AdmUsername").addClass("is-invalid");
        $("#UsernameErr").text("Please enter a Username.");
      } else {
        $("#AdmUsername").removeClass("is-invalid");
        $("#UsernameErr").text("");
      }

      if (AdmPassword === '') {
        isValid = false;
        $("#AdmPassword").addClass("is-invalid");
        $("#passwordErr").text("Please enter a Password.");
      } else {
        $("#AdmPassword").removeClass("is-invalid");
        $("#passwordErr").text("");
      }
      if (cc === '') {
        isValid = false;
        $("#cc").addClass("is-invalid");
        $("#ccError").text("Please enter Compeny Code.");
      } else {
        $("#cc").removeClass("is-invalid");
        $("#ccError").text("");
      }
      
      if (isValid) {         
          app.Registration.isValidRegkey(registaionKey);
          //alert(isValid)
        }    
      },
      
      isValidRegkey:(encryptRegKey)=>{
        //app.Registration.regDataAPI();
        $.ajax({
          url: "http://localhost:8686/decryptString",
          type: "GET",
          cache: false,
          data: {'encregkey': encryptRegKey,'skey':'machineId_endDate' },
          success: function (decryptRegKey) {
         
            if(decryptRegKey == ""){
              $("#registaionKeyError").text("Pleese Enter Valid Key");
            }else if(!decryptRegKey.includes('.')){
              $("#registaionKeyError").text("Key havn't dot(.) identity");
            }else{   
              let keyMachineId = (decryptRegKey).split('.')[0];
              let endDate = (decryptRegKey).split('.')[1];              
                $('#hdnOrgMechId').val(keyMachineId);
                $('#hdnOrgEndDate').val(endDate);
              app.Registration.matchKey(keyMachineId)
            }
        }})
      },  

      matchKey:(keyMachineId)=>{
        $.ajax({
          url: "http://localhost:8686/getMechineId", 
          type: "GET",
          cache: false,
          success: function (localMechineId) {
            
            if(localMechineId == keyMachineId){

             let data = {};
             data.company_name = $('#company_name').val();
             data.address = $('#address').val();
             data.email = $('#email').val();
             data.phone = $('#phone').val();
             data.AdmUsername = $('#AdmUsername').val();
             data.AdmPassword = $('#AdmPassword').val();
             data.registaion_key = $('#registaion_key').val();
             data.cc = $('#cc').val();
             data.wbs = $('#wbs').val();

             
             app.database.tables.Registration.saveCompany(data);
             app.Registration.createEncRegKeyFile(data.registaion_key);
             app.Registration.createCheckDateFile();


              toastr.success('Key Updated Successfully', '', {timeOut: 1000});
              setTimeout(function(){
              window.location = "index.html";
                },2000); 
            }else{
                $("#registaionKeyError").text("Keys Are Not Matching ");
            }
          }}) 
      },

      

      createEncRegKeyFile:(encryptRegKey)=>{
        $.ajax({
          // url: "http://localhost:8686/getMechineId",
           url: "http://localhost:8686/createFile", 
           type: "GET",
           cache: false,
           data: {'encregkey': encryptRegKey,'skey':'machineId_endDate'},
           success: function (OrgMachineId) {
             console.log(OrgMachineId);
             $('#registaion_key').val(OrgMachineId);
           },
         });
         app.Registration.regDataAPI();
      },

       
      createCheckDateFile:()=>{
        let currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit',second:'2-digit',hour12: false });
        let currentDate = new Date().toISOString().split('T')[0];
        let currentDateTime = currentDate+''+currentTime;
        $.ajax({
           // url: "http://localhost:8686/getMechineId",
           url: "http://localhost:8686/createCheckDateFile", 
           type: "GET",
           cache: false,
           data: {'currentDateTime': currentDateTime},
           success: function (OrgMachineId) {
             console.log(OrgMachineId);
             $('#registaion_key').val(OrgMachineId);
           },
         });
        },



      GetData: () => {      
        $.when(
            app.database.tables.Registration.getData()
        ).done(function (data) {   
              if(data != null || data.lenght > 0){
                document.getElementById("save").style.display = "none";
                document.getElementById("update").style.display = "block";
                app.Registration.appendData(data);
              }
        });
      },
      
      appendData:(data)=>{
        $('#company_name').val(data[0].COMPANYNAME);
        $('#address').val(data[0].ADDRESS);
        $('#email').val(data[0].EMAIL);
        $('#phone').val( data[0].PHONENUMBER);
        $('#noWeighbridge').val(data[0].NOOFWEIGHBRIDGES);
        $('#registaion_key').val(data[0].REGISTRATIONKEY);  
        $('#AdmUsername').val(data[0].ADMUSERNAME);  
        $('#AdmPassword').val(data[0].ADMPASSWORD);
        $('#hiddenId').val(data[0].ID);  
      },

      updateData:()=>{
        let data = {};
        data.company_name = $('#company_name').val();
        data.address = $('#address').val();
     
        data.email = $('#email').val();
        data.phone = $('#phone').val();
    
        data.noWeighbridge = $('#noWeighbridge').val();
        data.registaion_key = $('#registaion_key').val();
        data.AdmUsername = $('#AdmUsername').val();
        data.AdmPassword = $('#AdmPassword').val();
        data.Id = $('#hiddenId').val();

        app.database.tables.Registration.updateCompany(data);

        toastr.options = {
          positionClass: 'toast-bottom-right'
         };
         toastr.success('Updated Successfully...😀👍', '', {timeOut: 1000});
        setTimeout(function(){
        location.reload();
       },1300);   
      },

      
///send Registration Data To API 
regDataAPI:()=>{
      
  let regData = {
    cc : $('#cc').val(),
    company_name:$('#company_name').val(),
    address :$('#address').val(),
    email : $('#email').val(),
    phone: $('#phone').val(),
    wbs : $('#wbs').val(),
    AdmUsername: $('#AdmUsername').val(),
    AdmPassword: $('#AdmPassword').val(),
    registaion_key: $('#registaion_key').val(),
    orgMachID: $('#hdnOrgMechId').val(),
    orgEndDate: $('#hdnOrgEndDate').val(),
    action : 'saveNewCopeny'
  }


    $.ajax({
      url: "http://localhost:8686/regAPI",
      type: "GET",
      cache: false,
      data: regData,
      success: function (){
        toastr.options = {
          positionClass: 'toast-bottom-right'
          };
          toastr.success('Saved Successfully...😀👍', '', {timeOut: 1000});
          setTimeout(function(){
         window.location="index.html"
          },1300);
      }

  });
},

    }