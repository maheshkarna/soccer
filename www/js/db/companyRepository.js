app.database.tables.compenySettings = {

    saveCompany: function (data) {
        console.log(data);
          return $.Deferred(function (deferred) {
            let sql = "INSERT INTO CompanySettings (COMPANYNAME, COMPANYCODE, ADDRESS, CITY, EMAIL, PHONENUMBER, GSTNUMBER, NOOFWEIGHBRIDGES) VALUES ('"+data.company_name+"', '"+data.company_code+"', '"+data.address+"', '"+data.city+"', '"+data.email+"', '"+data.phone+"','"+data.gstno+"' ,'"+data.noWeighbridge+"') ";   
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

        // saveAdmin: function (AdmUsername,AdmPassword) {
         
        //     return $.Deferred(function (deferred) {
        //       let sql = "INSERT INTO Users (USERID,USERROLE,USERNAME,PASSWORD) VALUES ('ADMIN','ADMIN','"+AdmUsername+"','"+AdmPassword+"') ";   
        //       var params = [];
        //         app.database.commands.executeNonQuery(
        //         sql,
        //         params,
        //         function () {
        //           app.log("task saved successfully.");
        //           deferred.resolve();
        //         },
        //         function () {
        //           app.log("task save error.");
        //           deferred.reject();
        //         }
        //       );
        //     }).promise();
        //   },
      
        updateCompany :function(data){
        return $.Deferred(function (deferred) {
          var sql =
          "UPDATE CompanySettings SET " +
          "COMPANYNAME = '" + data.company_name + "', " +
          "COMPANYCODE = '" + data.company_code + "', " +
          "ADDRESS = '" + data.address + "', " +
          "CITY = '" + data.city + "', " +
          "EMAIL = '" + data.email + "', " +
          "PHONENUMBER = '" + data.phone + "', " + 
          "GSTNUMBER = '" + data.gstno + "', " +
          "NOOFWEIGHBRIDGES = '" + data.noWeighbridge + "'" +
          "WHERE ID = '" + data.Id + "';";
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
              var sql = "SELECT * FROM CompanySettings ";
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
          }
    };