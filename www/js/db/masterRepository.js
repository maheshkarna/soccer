app.database.tables.master={
        
  saveMaster:function(data){
        return $.Deferred(function (deferred) {    
          var sql = "INSERT INTO MasterSettings (FEILDNAME,FEILDTEXT,CREATED_DATE) VALUES ('"+data.fieldName+"','"+data.fieldText+"','"+data.currentDate+"')";
          var params = [];
          console.log(sql);
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
      
      
      getFieldsData : function(){
        return $.Deferred(function (deferred) {
          var sql = "SELECT * FROM MasterSettings ";
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


      DeleteRecord:function(id){
        return $.Deferred(function (deferred) {    
          var sql = "DELETE FROM MasterSettings WHERE ID = '"+id+"' ";
          var params = [];
          console.log(sql);
            app.database.commands.executeNonQuery(
            sql,
            params,
            function () {
              app.log("task Deleted successfully.");
              deferred.resolve();
            },
            function () {  
              app.log("task save error.");
              deferred.reject();
            }
          );
        }).promise();
      }, 

      
       UpdateRecord:function(data){
        return $.Deferred(function (deferred) {    
          var sql = "UPDATE MasterSettings SET  FEILDTEXT='"+data.fieldText +"',UPDATED_DATE='"+data.currentDate+"' WHERE ID ='"+data.id+"' ";
          var params = [];
          console.log(sql);
            app.database.commands.executeNonQuery(
            sql,
            params,
            function () {
              app.log("task Updated successfully.");
              deferred.resolve();
            },
            function () {  
              app.log("task save error.");
              deferred.reject();
            }
          );
        }).promise();
      }, 
  }