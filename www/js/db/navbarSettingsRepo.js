app.database.tables.navbar = {

    insertData: function () {
          return $.Deferred(function (deferred) {
  
            let sql =`INSERT INTO Navbar 
            (TITLE,SUBTITLE,LOGO,UPDATED_DATE) VALUES 
            ('HINDUSTAN AGRO PRODUCTS LIMITED', 'Machavaram','./logo/logo.jpg',"test")`;
           
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
      
  
        updateData :function(data){
          
          return $.Deferred(function (deferred) {
            var sql =
            "UPDATE Navbar SET " +
            "TITLE = '" + data.title + "', " +
            "SUBTITLE = '" + data.subtitle + "'," +
            "LOGO = '" + data.filename + "'" +
            "WHERE ID = '" + data.hiddenId + "'";
        
            var params = [];
            // console.log(sql);
            // alert(sql);
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
  
  
        checknavbarData : function(){
          return $.Deferred(function (deferred) {
            var sql = "SELECT * FROM Navbar";
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

        checkAdminLogin : function(username,password){
          return $.Deferred(function (deferred) {
            var sql = "SELECT * FROM SPAdminLogin where USERNAME ='"+username+"' and PASSWORD='"+password+"'";
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
    };