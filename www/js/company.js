$(document).ready(() => {
    app.database.createDB();
    app.CompanySettings.GetData();
  });
  
  app.CompanySettings = {
   
    SaveData: () => { 
      function isValidEmail(email) {
        // Regex for validating email addresses
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }
      function isValidNumber(value) {
        return /^\d+$/.test(value);
      }

      const companyName = document.getElementById("company_name").value.trim();
      const companyCode = document.getElementById("company_code").value.trim();
      const address = document.getElementById("address").value.trim();
      const city = document.getElementById("city").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const gstNo = document.getElementById("gstno").value.trim();
      const noWeighbridge = document.getElementById("noWeighbridge").value.trim();
     
    
      
      let isValid = true;
      
      if (companyName === '') {
        isValid = false;
        $("#company_name").addClass("is-invalid");
        $("#companyNameError").text("Please enter a company name.");
      } else {
        $("#company_name").removeClass("is-invalid");
        $("#companyNameError").text("");
      }
      
      if (companyCode === '') {
        isValid = false;
        $("#company_code").addClass("is-invalid");
        $("#companyCodeError").text("Please enter a company code.");
      } else {
        $("#company_code").removeClass("is-invalid");
        $("#companyCodeError").text("");
      }
      
      if (address === '') {
        isValid = false;
        $("#address").addClass("is-invalid");
        $("#addressError").text("Please enter an address.");
      } else {
        $("#address").removeClass("is-invalid");
        $("#addressError").text("");
      }
      
      if (city === '') {
        isValid = false;
        $("#city").addClass("is-invalid");
        $("#cityError").text("Please enter a city.");
      } else {
        $("#city").removeClass("is-invalid");
        $("#cityError").text("");
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
      
      if (gstNo === '') {
        isValid = false;
        $("#gstno").addClass("is-invalid");
        $("#gstNoError").text("Please enter a GST number.");
      } else {
        $("#gstno").removeClass("is-invalid");
        $("#gstNoError").text("");
      }
      
      if (noWeighbridge === '') {
        isValid = false;
        $("#noWeighbridge").addClass("is-invalid");
        $("#noWeighbridgeError").text("Please enter the number of weight bridges.");
      } else if (!isValidNumber(noWeighbridge)) {
        isValid = false;
        $("#noWeighbridge").addClass("is-invalid");
        $("#noWeighbridgeError").text("Please enter a valid number for the number of weight bridges.");
      } else {
        $("#noWeighbridge").removeClass("is-invalid");
        $("#noWeighbridgeError").text("");
      }
      
   

      if (isValid) {
        let data = {};
        data.company_name = $('#company_name').val();
        data.company_code = $('#company_code').val();
        data.address = $('#address').val();
        data.city = $('#city').val();
        data.email = $('#email').val();
        data.phone = $('#phone').val();
        data.gstno = $('#gstno').val();
        data.noWeighbridge = $('#noWeighbridge').val();
    
       

      app.database.tables.compenySettings.saveCompany(data);

      toastr.options = {
       positionClass: 'toast-bottom-right'
      };
      toastr.success('Saved Successfully...😀👍', '', {timeOut: 1000});
      setTimeout(function(){
        location.reload();
      },1300); 
      }    
      },

      GetData: () => {      
        $.when(
            app.database.tables.compenySettings.getData()
        ).done(function (data) {   
              if(data != null || data.lenght > 0){
                document.getElementById("save").style.display = "none";
                document.getElementById("update").style.display = "block";
                app.CompanySettings.appendData(data);
              }
        });
      },
      
      appendData:(data)=>{
        $('#company_name').val(data[0].COMPANYNAME);
        $('#company_code').val(data[0].COMPANYCODE);
        $('#address').val(data[0].ADDRESS);
        $('#city').val(data[0].CITY);
        $('#email').val(data[0].EMAIL);
        $('#phone').val( data[0].PHONENUMBER);
        $('#gstno').val(data[0].GSTNUMBER);
        $('#noWeighbridge').val(data[0].NOOFWEIGHBRIDGES);
      
    
        $('#hiddenId').val(data[0].ID);  
      },

      updateData:()=>{
        let data = {};
        data.company_name = $('#company_name').val();
        data.company_code = $('#company_code').val();
        data.address = $('#address').val();
        data.city = $('#city').val();
        data.email = $('#email').val();
        data.phone = $('#phone').val();
        data.gstno = $('#gstno').val();
        data.noWeighbridge = $('#noWeighbridge').val();
        data.Id = $('#hiddenId').val();

        app.database.tables.compenySettings.updateCompany(data);

        toastr.options = {
          positionClass: 'toast-bottom-right'
         };
         toastr.success('Updated Successfully...😀👍', '', {timeOut: 1000});
        setTimeout(function(){
        location.reload();
       },1300);   

      }
    }