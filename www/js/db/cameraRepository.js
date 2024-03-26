app.database.tables.cameraSettings = {

    insertCamData: function (data) {
        
          return $.Deferred(function (deferred) {
            var sql = "INSERT INTO CameraSettings \
            ( \
                DVRIP_ONE, \
                DVRIP_TWO, \
                DVRIP_THREE, \
                DVRIP_ONE_USERNAME, \
                DVRIP_TWO_USERNAME, \
                DVRIP_THREE_USERNAME, \
                DVRIP_ONE_PASSWORD, \
                DVRIP_TWO_PASSWORD,\
                DVRIP_THREE_PASSWORD, \
                DVRPORT_ONE, \
                DVRPORT_TWO, \
                DVRPORT_THREE, \
                DVR_ONE_ACTIVATE, \
                DVR_TWO_ACTIVATE, \
                DVR_THREE_ACTIVATE, \
                IPPORT_ONE, \
                IPPORT_TWO, \
                IPPORT_THREE, \
                IP_ONE_USERNAME, \
                IP_TWO_USERNAME, \
                IP_THREE_USERNAME, \
                IP_ONE_PASSWORD, \
                IP_TWO_PASSWORD, \
                IP_THREE_PASSWORD, \
                IP_ONE_ACTIVATE, \
                IP_TWO_ACTIVATE, \
                IP_THREE_ACTIVATE, \
                RTSPCAMURL_ONE, \
                RTSPCAMURL_TWO, \
                RTSPCAMURL_THREE, \
                RTSP_ONE_ACTIVATE, \
                RTSP_TWO_ACTIVATE, \
                RTSP_THREE_ACTIVATE \
            ) \
            VALUES ('"+data.dvrIP1+"','"+data.dvrIP2+"','"+data.dvrIP3+"','"+ data.dvrUsername1+"','"+data.dvrUsername2+"','"+data.dvrUsername3+"','"+data.dvrPassword1+"','"+data.dvrPassword2+"','"+data.dvrPassword3+"','"+data.dvrPort1+"','"+data.dvrPort2+"','"+data.dvrPort3+"','"+data.dvrActive1+"','"+data.dvrActive2+"','"+data.dvrActive3+"','"+data.ipPortNo1+"','"+data.ipPortNo2+"','"+data.ipPortNo3+"','"+data.ipUsername1+"','"+data.ipUsername2+"','"+data.ipUsername3+"','"+data.ipPassword1+"','"+data.ipPassword2+"','"+data.ipPassword3+"','"+data.ipCameraActive1+"','"+data.ipCameraActive2+"','"+data.ipCameraActive3+"','"+data.rtspURL1+"','"+data.rtspURL2+"','"+data.rtspURL3+"','"+data.rtspActive1+"','"+data.rtspActive2+"','"+data.rtspActive3+"')";
            var params = [];
                app.log(sql);
            app.database.commands.executeNonQuery(
              sql,
              params,
              function () {
                app.log("task saved successfully.");
                deferred.resolve();
              },
              function () {
               
                app.log("task save error.");
                deferred.reject();
              }
            );
          }).promise();
        },   


        getCamData : function(){
            return $.Deferred(function (deferred) {
              var sql = "SELECT * FROM CameraSettings ";
              var params = [];
              app.database.commands.executeReader(
                sql,
                params,
                function (ex, data) {
                  app.log("data select successful");
                  if (data.rows.length > 0) {
                    deferred.resolve(data.rows);
                  } else {
                    deferred.resolve(null);
                  }
                },
                function () {
                  app.log("data select failed");
                  deferred.reject();
                }
              );
            }).promise();
        },


        updateCamData: function (data) {
            
            return $.Deferred(function (deferred) {
              var sql = "UPDATE CameraSettings SET \
                          DVRIP_ONE = '"+data.dvrIP1+"', \
                          DVRIP_TWO = '"+data.dvrIP2+"', \
                          DVRIP_THREE = '"+data.dvrIP3+"', \
                          DVRIP_ONE_USERNAME = '"+data.dvrUsername1+"', \
                          DVRIP_TWO_USERNAME = '"+data.dvrUsername2+"', \
                          DVRIP_THREE_USERNAME = '"+data.dvrUsername3+"', \
                          DVRIP_ONE_PASSWORD = '"+data.dvrPassword1+"', \
                          DVRIP_TWO_PASSWORD = '"+data.dvrPassword2+"', \
                          DVRIP_THREE_PASSWORD = '"+data.dvrPassword3+"', \
                          DVRPORT_ONE = '"+data.dvrPort1+"', \
                          DVRPORT_TWO = '"+data.dvrPort2+"', \
                          DVRPORT_THREE = '"+data.dvrPort3+"', \
                          DVR_ONE_ACTIVATE = '"+data.dvrActive1+"', \
                          DVR_TWO_ACTIVATE = '"+data.dvrActive2+"', \
                          DVR_THREE_ACTIVATE = '"+data.dvrActive3+"', \
                          IPPORT_ONE = '"+data.ipPortNo1+"', \
                          IPPORT_TWO = '"+data.ipPortNo2+"', \
                          IPPORT_THREE = '"+data.ipPortNo3+"', \
                          IP_ONE_USERNAME = '"+data.ipUsername1+"', \
                          IP_TWO_USERNAME = '"+data.ipUsername2+"', \
                          IP_THREE_USERNAME = '"+data.ipUsername3+"', \
                          IP_ONE_PASSWORD = '"+data.ipPassword1+"', \
                          IP_TWO_PASSWORD = '"+data.ipPassword2+"', \
                          IP_THREE_PASSWORD = '"+data.ipPassword3+"', \
                          IP_ONE_ACTIVATE = '"+data.ipCameraActive1+"', \
                          IP_TWO_ACTIVATE = '"+data.ipCameraActive2+"', \
                          IP_THREE_ACTIVATE = '"+data.ipCameraActive3+"', \
                          RTSPCAMURL_ONE = '"+data.rtspURL1+"', \
                          RTSPCAMURL_TWO = '"+data.rtspURL2+"', \
                          RTSPCAMURL_THREE = '"+data.rtspURL3+"', \
                          RTSP_ONE_ACTIVATE = '"+data.rtspActive1+"', \
                          RTSP_TWO_ACTIVATE = '"+data.rtspActive2+"', \
                          RTSP_THREE_ACTIVATE = '"+data.rtspActive3+"' where ID ='"+data.hiddenId+"'";
              var params = [];
              app.log(sql);
              app.database.commands.executeNonQuery(
                sql,
                params,
                function () {
                  app.log("data updated successfully.");
                  deferred.resolve();
                },
                function () {
                  app.log("data update error.");
                  deferred.reject();
                }
              );
            }).promise();
          },
        
    };