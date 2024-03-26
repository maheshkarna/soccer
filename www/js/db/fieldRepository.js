app.database.tables.fields = {

  insertData: function () {
    
        return $.Deferred(function (deferred) {

          let sql =`INSERT INTO FeildsMasterSettings 
          (WEIGHBRDIGE_NO, FEILDNAME, FEILDTEXT, ISMANDATORY, ISVISIBLE, CREATED_DATE, UPDATED_DATE) VALUES 
          ('WB001', 'Vehicle_no', 'Vehicle No', 1, 1, '2022-01-01', '2022-01-01'), 
          ('WB001', 'material', 'Material', 1, 1, '2022-01-02', '2022-01-02'), 
          ('WB001', 'partyname', 'Party Name', 1, 1, '2022-01-03', '2022-01-03'), 
          ('WB002', 'Agent', 'Agent', 1, 1, '2022-01-04', '2022-01-04'), 
          ('WB002','qty', 'Quantity', 1, 1, '2022-01-05', '2022-01-05'), 
          ('WB002','Remark', 'Remark', 1, 1, '2022-01-06', '2022-01-06');`;
         
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
    

      updateData :function(fieldlval,isVisbleVal,isMandetory,fieldId){
        return $.Deferred(function (deferred) {
          var sql =
          "UPDATE FeildsMasterSettings SET " +
          "FEILDTEXT = '" + fieldlval + "', " +
          "ISMANDATORY = '" + isMandetory + "', " +
          "ISVISIBLE = '" + isVisbleVal + "' " +
          "WHERE ID = '" + fieldId + "'; ";
          var params = [];
          //console.log(sql);
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


      checkFieldsData : function(){
        return $.Deferred(function (deferred) {
          var sql = "SELECT * FROM FeildsMasterSettings ";
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

      FetchAll : function(){
        return $.Deferred(function (deferred) {
          var sql = "SELECT * FROM FeildsMasterSettings";
          var params = [];
          app.database.commands.executeReader(
            sql,
            params,
            function (ex, data) {
              app.log("Data Select Successful");
              if (data.rows.length > 0) {
                deferred.resolve(data.rows);
              } else {
                deferred.resolve(null);
              }
            },
            function () {
              app.log("Data Select Failed");
              deferred.reject();
            }
          );
        }).promise();
      }
  };