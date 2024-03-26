app.database.tables.serialPosrt  = {

    insertData: function () {
      
          return $.Deferred(function (deferred) {
  
            let sql =`INSERT INTO FilePath (filePath, CREATEDATE) VALUES 
            ('./www/temp','2023/05/23')`;
         
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
      
  
        


        updatePortData :function(FilePath,currentDate,ID){
          return $.Deferred(function (deferred) {
            var sql =
            "UPDATE FilePath SET " +
            "filePath = '" + FilePath + "', " +
            "CREATEDATE = '" + currentDate + "' " +
            "WHERE ID = '" +ID+ "'; ";
            var params = [];
            // console.log(sql);
            app.database.commands.executeNonQuery(
              sql,
              params,
              function () {
                app.log("Task saved successfully.");
                deferred.resolve();
              },
              function () {
                app.log("Task save error.");
                deferred.reject();
              }
            );
          }).promise();
  
        },
        
  
        CheckData : function(){
          return $.Deferred(function (deferred) {
            var sql = "SELECT * FROM FilePath ORDER BY ID DESC";
            
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
  
        // FetchAll : function(){
        //   return $.Deferred(function (deferred) {
        //     var sql = "SELECT * FROM FeildsMasterSettings";
        //     var params = [];
        //     app.database.commands.executeReader(
        //       sql,
        //       params,
        //       function (ex, data) {
        //         app.log("Data Select Successful");
        //         if (data.rows.length > 0) {
        //           deferred.resolve(data.rows);
        //         } else {
        //           deferred.resolve(null);
        //         }
        //       },
        //       function () {
        //         app.log("Data Select Failed");
        //         deferred.reject();
        //       }
        //     );
        //   }).promise();
        // }
    };