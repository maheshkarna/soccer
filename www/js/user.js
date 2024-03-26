$(document).ready(() => {
    app.database.createDB();
    app.database.getAdminLog();

    
});
  
  app.user = {
  
    getUserData: () => {
        var username = $("#username").val();
        var password = $("#password").val();
        var userType = $("#userType").val();
        var description = $("#userDescription").val();
        
        var isValid = true;
    
        if (username.trim() == '') {
          isValid = false;
          $("#username").addClass("is-invalid");
          $("#usernameError").text("Please enter a username.");
        } else {
          $("#username").removeClass("is-invalid");
          $("#usernameError").text("");
        }
    
        if (password.trim() == '') {
          isValid = false;
          $("#password").addClass("is-invalid");
          $("#passwordError").text("Please enter a password.");
        } else {
          $("#password").removeClass("is-invalid");
          $("#passwordError").text("");
        }
    
        if (userType.trim() == '') {
          isValid = false;
          $("#userType").addClass("is-invalid");
          $("#userTypeError").text("Please select a user type.");
        } else {
          $("#userType").removeClass("is-invalid");
          $("#userTypeError").text("");
        }
    
        if (description.trim() == '') {
          isValid = false;
          $("#userDescription").addClass("is-invalid");
          $("#userDescriptionError").text("Please enter a description.");
        } else {
          $("#userDescription").removeClass("is-invalid");
          $("#userDescriptionError").text("");
        }
    
        if (isValid) {
          $.when(
            app.database.tables.user.getMaxId()  
        ).done(function(data){
            console.log(data);         
            let formdata ={};
            if(data[0].maxId == 0 || data[0].maxId == null || data == null){
                formdata.userId = "USER1";
            }else{
                formdata.userId = "USER"+(data[0].maxId +1);
            }
            const currentDateTime = new Date();
            const formattedDateTime = `${currentDateTime.getDate().toString().padStart(2, '0')}/${(currentDateTime.getMonth() + 1).toString().padStart(2, '0')}/${currentDateTime.getFullYear()} ${currentDateTime.getHours().toString().padStart(2, '0')}:${currentDateTime.getMinutes().toString().padStart(2, '0')}:${currentDateTime.getSeconds().toString().padStart(2, '0')}`;
            formdata.username = document.getElementById("username").value;
            formdata.password = document.getElementById("password").value;
            formdata.userType = document.getElementById("userType").value;
            formdata.userDescription = document.getElementById("userDescription").value;
            formdata.createDate = formattedDateTime;
            formdata.status = 1;
            app.database.tables.user.save(formdata);
            toastr.options = {
              positionClass: 'toast-bottom-right'
             };
             toastr.success('Saved Successfully...😀👍', '', {timeOut: 1000});
             setTimeout(function(){
               location.reload();
             },1300); 
          }); 
        }
    },

    userList:()=>{
      $.when(
        app.database.tables.user.getUserList()  
      ).done(
        function(userData){
    
          if(userData == null || userData.length == 0){
       
            return;
          }else{
          
            app.user.showUsers(userData);   
          }
        });
    },

    showUsers : (userData)=>{
      
      if (!userData) {
        return;
      }
      for (let i = 0; i < userData.length; i++) {
        let j = i + 1;
       
        $("#userListBody").append(`
          <tr>
              <td>
                  <div class="d-flex px-2">
                      <div></div>
                      <div class="my-auto">
                          <h6 class="mb-0 text-xs">${j}</h6>
                      </div>
                  </div>
              </td>
              <td>
              <input class="form-control" type="text" value="${userData[i].USERID}" id="fieldtext${j}" readonly="true" style="background:#d2dedf;">
              <input class="form-control" type="hidden" value="${userData[i].ID}" id="fieldId${j}">
              </td>

              <td>
              <input class="form-control" type="text" value="${userData[i].USERNAME}" id="username${j}">
              </td>
              
              <td>
              <input class="form-control" type="text" value="${userData[i].PASSWORD}" id="password${j}">
              </td>  
            <td>
            <div class="row">
            <div class="col-md-4 form-switch">
            <input class=" form-check-input ms-auto" type="checkbox" value="${userData[i].STATUS}" onclick="app.user.status(${j},this.value)" id="isMandetory${j}" ${userData[i].STATUS == 1 ? 'checked' : ''}><br>
            <lable style ="color: ${userData[i].STATUS  == 1 ? 'green' : 'red'}; ">${userData[i].STATUS  == 1 ? 'Active' : 'Inactive'}</lable>
            </div>
          <div class="col-md-4">
          <button value="${userData[i].ID}" class="btn btn-danger" onclick="app.user.deleteUser(this.value);">Delete</button>
          </div>
          <div class="col-md-4 ">
          <button class="btn btn-dark" onclick="app.user.update(${j})" >Update</button>
          </div>
            </div>
              
          
              </td>
          </tr>
      `);
        
      }
    },

    deleteUser:(id)=>{
      $.when(
        app.database.tables.user.deleteUserById(id)
      ).done(function(){
      
         toastr.options = {
          positionClass: 'toast-bottom-right'
         };
         toastr.success('Deleted Successfully...😀👍', '', {timeOut: 1000});
       
      })

    },

    update:(i)=>{
        let data = {};
        data.username = document.getElementById("username"+i).value;
        data.password = document.getElementById("password"+i).value;
        data.id = document.getElementById("fieldId"+i).value;
        
        $.when(
          app.database.tables.user.updateUserById(data)
        ).done(function(){
         
        })
    },

    status:(i,val)=>{
      const confirmed = confirm('Are you sure you want to make this change?');
      let id = document.getElementById("fieldId"+i).value;
      statsusVal ="";
      if (val == 1){
          statsusVal = 0;
      }
      if(val == 0){
        statsusVal = 1;
      }

      if(confirmed){
        $.when(
          app.database.tables.user.updateStatus(statsusVal,id)
        ).done(function(){
          //alert("status Updated Successfully....👍")
          location.reload();  
        })
      }else{
        location.reload();     
       }
    },
    
    getAdminLog:()=>{
      $.when(
        app.database.tables.user.getAdminLog()
      ).done(function(data){
            if(data != null){   
              $("#username").val(data[0].ADMUSERNAME);
              $("#password").val(data[0].ADMPASSWORD);
              $("#hidenId").val(data[0].ID);
            }
      })
    },

    
    changePassword:(newPassword,id)=>{
      $.when(
        app.database.tables.user.changePassword(newPassword,id)
      ).done(function(){
        let passData = {
           newPass : newPassword,
           cc : localStorage.getItem('cc'),
           email : localStorage.getItem('email'),
           wbs : localStorage.getItem('wbs'),
           action : 'changePass'
        }
      
          $.ajax({
          url: "http://localhost:8686/changePassword_API",
          type: "GET",
          cache: false,
          data: {'passData' : passData},
          success: function (res) {
          if(res ="true"){
            toastr.options = {
              positionClass: 'toast-bottom-right'
             };
             toastr.success('Password Updated Successfully...😀👍', '', {timeOut: 1000}); 
             location.reload();
          }else{
            toastr.error('Password not Updated In the Server', '', {timeOut: 1000}); 
          }
        }
      });
       
      })
    },

  };
  