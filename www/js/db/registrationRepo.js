app.database.tables.Registration = {

    saveCompany: function (data) {
       
      let currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit',second:'2-digit',hour12: false });
      let currentDate = new Date().toISOString().split('T')[0];
      let currentDateTime = currentDate+''+currentTime;

          return $.Deferred(function (deferred) {
            let sql = "INSERT INTO Registration (COMPANYNAME, ADDRESS, EMAIL, PHONENUMBER, WBS,REGISTRATIONKEY,ADMUSERNAME,ADMPASSWORD,DATE_STATUS,CC,UPLOAD_MAXID) VALUES ('"+data.company_name+"', '"+data.address+"', '"+data.email+"', '"+data.phone+"','"+data.wbs+"' ,'"+data.registaion_key+"','"+data.AdmUsername+"','"+data.AdmPassword+"','"+currentDateTime+"','"+data.cc+"',0) ";   
            var params = [];
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

        updateCompany :function(data){
        return $.Deferred(function (deferred) {
          var sql =
          "UPDATE Registration SET " +
          "COMPANYNAME = '" + data.company_name + "', " +
          "ADDRESS = '" + data.address + "', " +
          "EMAIL = '" + data.email + "', " +
          "PHONENUMBER = '" + data.phone + "', " + 
          "NOOFWEIGHBRIDGES = '" + data.noWeighbridge + "', " +
          "REGISTRATIONKEY = '" + data.registaion_key + "', " +
          "ADMUSERNAME = '" + data.AdmUsername + "', " +
          "ADMPASSWORD = '" + data.AdmPassword + "' " +
          "WHERE ID = '" + data.Id + "'; ";
          var params = [];
          app.database.commands.executeNonQuery(
            sql,
            params,
            function () {
              app.log("task Updated successfully.");
              deferred.resolve();
            },
            function () {
              app.log("task Updated error.");
              deferred.reject();
            }
          );
        }).promise();
      },
    
        getData : function(){
            return $.Deferred(function (deferred) {
              var sql = "SELECT * FROM Registration ";
              var params = [];
              app.database.commands.executeReader(
                sql,
                params,
                function (ex, data) {
                  console.log("data select successful");
                  if (data.rows.length > 0) {
                  
                    deferred.resolve(data.rows);
                  } else {
                    deferred.resolve(null);
                  }
                },
                function () {
                  console.log("data select failed");
                  deferred.reject();
                }
              );
            }).promise();
          },

          //Superadmin Logic

          getSpAdminData : function(){
            return $.Deferred(function (deferred){
              var sql = "SELECT * FROM SPAdminLogin ";
              var params = [];
              app.database.commands.executeReader(
                sql,
                params,
                function (ex, data) {
                  console.log("data select successful");
                  if (data.rows.length > 0) {
                  
                    deferred.resolve(data.rows);
                  } else {
                    deferred.resolve(null);
                  }
                },
                function () {
                  console.log("data select failed");
                  deferred.reject();
                }
              );
            }).promise();
          },
          InsertSpLogin: function (data) {
            console.log(data);
              return $.Deferred(function (deferred) {
                let sql = "INSERT INTO SPAdminLogin (USERROLL, USERNAME, PASSWORD) VALUES ('SPADMIN','spondias@gmail.com','Spondias@123') ";   
                var params = [];
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

            CheckSpLogin : function(username,password){
           
              return $.Deferred(function (deferred) {
                var sql = "SELECT * FROM SPAdminLogin WHERE USERNAME='"+username+"' and PASSWORD ='"+password+"' ";
                var params = [];
                app.database.commands.executeReader(
                  sql,
                  params,
                  function (ex, data) {
                    console.log("data select successful");
                    if (data.rows.length > 0) {
                    
                      deferred.resolve(data.rows);
                    } else {
                      deferred.resolve(null);
                    }
                  },
                  function () {
                    console.log("data select failed");
                    deferred.reject();
                  }
                );
              }).promise();
            },  

            updateKey :function(newKey){
              return $.Deferred(function (deferred) {
                var sql =
                "UPDATE Registration SET REGISTRATIONKEY = '"+newKey+"'";
                var params = [];
                app.database.commands.executeNonQuery(
                  sql,
                  params,
                  function () {
                    app.log("task Updated successfully.");
                    deferred.resolve();
                  },
                  function () {
                    app.log("task Updated error.");
                    deferred.reject();
                  }
                );
              }).promise();
            },

         };