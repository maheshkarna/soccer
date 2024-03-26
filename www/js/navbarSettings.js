$(document).ready(() => {
    app.database.createDB();
    app.navbarSettings.insertnavbarData();

  });
  
  
  app.navbarSettings = {
   
    checkData: ()=>{
      //app.navbarSettings.FetchAll();
     // alert("Hey Man");
      $.when(app.database.tables.navbar.FetchAll())
      .done(function (data) {
        if(data != null || data != ""){
        
        }
      });
    },

    insertnavbarData:()=>{
        $.when(
            app.database.tables.navbar.checknavbarData()
          ).done(function (data) {   
            console.log(data); 
            
            if(data == null || data.length == 0){
                app.database.tables.navbar.insertData();
            }else{
                    $("#title").val(data[0].TITLE);
                    $("#subtTitle").val(data[0].SUBTITLE);
                    $("#hiddenId").val(data[0].ID)
                    $("#hdnlogoPath").val(data[0].LOGO)

                    document.getElementById("preImage").src = data[0].LOGO;
            }   
          });    
    },

    updateNavbar:()=>{
      let data ={};
      data.title = $("#title").val();
      data.subtitle = $("#subtTitle").val();
      data.hiddenId = $("#hiddenId").val();
      if($("#logo").val() != ""){
        data.filename = "./logo/"+document.getElementById("logo").files[0].name;
      }else{
        data.filename = $("#hdnlogoPath").val();
      }
  
      app.database.tables.navbar.updateData(data)
      
      var formData = new FormData();
      formData.append("logo", $("#logo")[0].files[0]);
      $.ajax({
        url: "http://localhost:8686/uploadLogo",
        type: "POST",
        data: formData,
        processData: false, 
        contentType: false,
        success: function (logoPath) {
         }
        });   
    },
  };
  