$(document).ready(() => {
    app.database.createDB();
    app.cameraSettings.CheckCamData();
  });
  
  app.cameraSettings = {
   
    getCamerasData:() =>{
    let data={};
   //DVR Camera Data
    data.dvrIP1 =  $("#dvrIP1").val(),
    data.dvrPort1 =  $("#dvrPort1").val(),
    data.dvrUsername1 = $("#dvrUsername1").val(),
    data.dvrPassword1 = $("#dvrPassword1").val(),
    
    data.dvrIP2 =  $("#dvrIP2").val(),
    data.dvrPort2 =  $("#dvrPort2").val(),
    data.dvrUsername2 = $("#dvrUsername2").val(),
    data.dvrPassword2 = $("#dvrPassword2").val(),
    
    data.dvrIP3 =  $("#dvrIP3").val(),
    data.dvrPort3 =  $("#dvrPort3").val(),
    data.dvrUsername3 = $("#dvrUsername3").val(),
    data.dvrPassword3 = $("#dvrPassword3").val(),

    data.dvrActive1 =  ($("#dvrActive1").prop("checked") ? 1 : 0),
    data.dvrActive2 =   ($("#dvrActive2").prop("checked") ? 1 : 0),
    data.dvrActive3 =  ($("#dvrActive3").prop("checked") ? 1 : 0),
    
    //IP Camera Data
    data.ipPortNo1 = $("#ipPortNo1").val(),
    data.ipPortNo2 = $("#ipPortNo2").val(),
    data.ipPortNo3 = $("#ipPortNo3").val(),

    data.ipUsername1 = $("#ipUsername1").val(),
    data.ipUsername2 = $("#ipUsername2").val(),
    data.ipUsername3 = $("#ipUsername3").val(),
    
    data.ipPassword1 = $("#ipPassword1").val(),
    data.ipPassword2 = $("#ipPassword2").val(),
    data.ipPassword3 = $("#ipPassword3").val(),

    data.ipCameraActive1 =  ($("#ipCameraActive1").prop("checked") ? 1 : 0),
    data.ipCameraActive2 =   ($("#ipCameraActive2").prop("checked") ? 1 : 0),
    data.ipCameraActive3 =  ($("#ipCameraActive3").prop("checked") ? 1 : 0),
    
    //RTSP Camera data
    data.rtspActive1 =  ($("#rtspActive1").prop("checked") ? 1 : 0),
    data.rtspActive2 =   ($("#rtspActive2").prop("checked") ? 1 : 0),
    data.rtspActive3 =  ($("#rtspActive3").prop("checked") ? 1 : 0),

    data.rtspURL1 = $("#rtspURL1").val(),
    data.rtspURL2 = $("#rtspURL2").val(),
    data.rtspURL3 = $("#rtspURL3").val(),
    
    console.log(data);
    $.when(
        app.database.tables.cameraSettings.insertCamData(data)
    ).done(function(){
      toastr.options = {
        positionClass: 'toast-bottom-right'
       };
       toastr.success('Saved Successfully...😀👍', '', {timeOut: 1000});
       setTimeout(function(){
        location.reload();
      },1300);  
    }); 
    },


    
  CheckCamData: () => {

      $.when(
        app.database.tables.cameraSettings.getCamData()
      ).done(function (data) {   
        console.log(data);  
        if(data !=null && data.length > 0 ){
            //alert("Data Avilable");
         document.getElementById("save").style.display = "none";
         document.getElementById("update").style.display = "block";
         app.cameraSettings.appendData(data);

        }else{
            document.getElementById("save").style.display = "block";
            document.getElementById("update").style.display = "none";
            app.cameraSettings.UpdateCamerasData();
        }
       
      });
  },

  appendData:(data)=>{
    $("#hiddenId").val(data[0].ID);
    $("#dvrIP1").val(data[0].DVRIP_ONE);
    $("#dvrIP2").val(data[0].DVRIP_TWO);
    $("#dvrIP3").val(data[0].DVRIP_THREE);

    $("#dvrPort1").val(data[0].DVRPORT_ONE);
    $("#dvrPort2").val(data[0].DVRPORT_TWO);
    $("#dvrPort3").val(data[0].DVRPORT_THREE);

    $("#dvrUsername1").val(data[0].DVRIP_ONE_USERNAME);
    $("#dvrUsername2").val(data[0].DVRIP_TWO_USERNAME);
    $("#dvrUsername3").val(data[0].DVRIP_THREE_USERNAME);
    
    $("#dvrPassword1").val(data[0].DVRIP_ONE_PASSWORD);
    $("#dvrPassword2").val(data[0].DVRIP_TWO_PASSWORD);
    $("#dvrPassword3").val(data[0].DVRIP_THREE_PASSWORD);
    
    $("#dvrActive1").prop("checked", data[0].DVR_ONE_ACTIVATE == 1);
    $("#dvrActive2").prop("checked", data[0].DVR_TWO_ACTIVATE == 1);
    $("#dvrActive3").prop("checked", data[0].DVR_THREE_ACTIVATE == 1);


    $("#ipPortNo1").val(data[0].IPPORT_ONE);
    $("#ipPortNo2").val(data[0].IPPORT_TWO);
    $("#ipPortNo3").val(data[0].IPPORT_THREE);

    $("#ipUsername1").val(data[0].IP_ONE_USERNAME);
    $("#ipUsername2").val(data[0].IP_TWO_USERNAME);
    $("#ipUsername3").val(data[0].IP_THREE_USERNAME);

    $("#ipPassword1").val(data[0].IP_ONE_PASSWORD);
    $("#ipPassword2").val(data[0].IP_TWO_PASSWORD);
    $("#ipPassword3").val(data[0].IP_THREE_PASSWORD);
 

    $("#ipCameraActive1").prop("checked", data[0].IP_ONE_ACTIVATE == 1);
    $("#ipCameraActive2").prop("checked", data[0].IP_TWO_ACTIVATE == 1);
    $("#ipCameraActive3").prop("checked", data[0].IP_THREE_ACTIVATE == 1);

    
    $("#rtspActive1").prop("checked", data[0].RTSP_ONE_ACTIVATE == 1);
    $("#rtspActive2").prop("checked", data[0].RTSP_TWO_ACTIVATE == 1);
    $("#rtspActive3").prop("checked", data[0].RTSP_THREE_ACTIVATE == 1);


    $("#rtspURL1").val(data[0].RTSPCAMURL_ONE);
    $("#rtspURL2").val(data[0].RTSPCAMURL_TWO);
    $("#rtspURL3").val(data[0].RTSPCAMURL_THREE);
  },


  updateCamerasData:() =>{
    let data={};
   //DVR Camera Data
    data.hiddenId = $("#hiddenId").val()
    data.dvrIP1 =  $("#dvrIP1").val(),
    data.dvrPort1 =  $("#dvrPort1").val(),
    data.dvrUsername1 = $("#dvrUsername1").val(),
    data.dvrPassword1 = $("#dvrPassword1").val(),
    
    data.dvrIP2 =  $("#dvrIP2").val(),
    data.dvrPort2 =  $("#dvrPort2").val(),
    data.dvrUsername2 = $("#dvrUsername2").val(),
    data.dvrPassword2 = $("#dvrPassword2").val(),
    
    data.dvrIP3 =  $("#dvrIP3").val(),
    data.dvrPort3 =  $("#dvrPort3").val(),
    data.dvrUsername3 = $("#dvrUsername3").val(),
    data.dvrPassword3 = $("#dvrPassword3").val(),

    data.dvrActive1 =  ($("#dvrActive1").prop("checked") ? 1 : 0),
    data.dvrActive2 =   ($("#dvrActive2").prop("checked") ? 1 : 0),
    data.dvrActive3 =  ($("#dvrActive3").prop("checked") ? 1 : 0),
    //IP Camera Data
    data.ipPortNo1 = $("#ipPortNo1").val(),
    data.ipPortNo2 = $("#ipPortNo2").val(),
    data.ipPortNo3 = $("#ipPortNo3").val(),

    data.ipUsername1 = $("#ipUsername1").val(),
    data.ipUsername2 = $("#ipUsername2").val(),
    data.ipUsername3 = $("#ipUsername3").val(),
    
    data.ipPassword1 = $("#ipPassword1").val(),
    data.ipPassword2 = $("#ipPassword2").val(),
    data.ipPassword3 = $("#ipPassword3").val(),

    data.ipCameraActive1 =  ($("#ipCameraActive1").prop("checked") ? 1 : 0),
    data.ipCameraActive2 =   ($("#ipCameraActive2").prop("checked") ? 1 : 0),
    data.ipCameraActive3 =  ($("#ipCameraActive3").prop("checked") ? 1 : 0),
    
    //RTSP Camera data
    data.rtspActive1 =  ($("#rtspActive1").prop("checked") ? 1 : 0),
    data.rtspActive2 =   ($("#rtspActive2").prop("checked") ? 1 : 0),
    data.rtspActive3 =  ($("#rtspActive3").prop("checked") ? 1 : 0),

    data.rtspURL1 = $("#rtspURL1").val(),
    data.rtspURL2 = $("#rtspURL2").val(),
    data.rtspURL3 = $("#rtspURL3").val(),
    
    console.log(data);
    $.when(
        app.database.tables.cameraSettings.updateCamData(data)
    ).done(function(){
      toastr.options = {
        positionClass: 'toast-bottom-right'
       };
       toastr.success('Updated Successfully...😀👍', '', {timeOut: 1000});
       setTimeout(function(){
        location.reload();
      },1300);   
    }); 
    },

  };
  