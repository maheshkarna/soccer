app.database.tables.bmrmaster={
        
    saveMaster:function(data){
          return $.Deferred(function (deferred) {    
            var sql = "INSERT INTO BmrMasterSettings (FEILDNAME,FEILDTEXT,FEILDVALUE,CREATED_DATE) VALUES ('"+data.fieldName+"','"+data.fieldText+"','"+data.fieldVal+"','"+data.currentDate+"')";
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
        
        
        getFieldsData : function(val){
          return $.Deferred(function (deferred) {
            var sql = "SELECT * FROM BmrMasterSettings where FEILDNAME='"+val+"'";
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
            var sql = "DELETE FROM BmrMasterSettings WHERE ID = '"+id+"' ";
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
            var sql = "UPDATE BmrMasterSettings SET  FEILDTEXT='"+data.fieldText +"',FEILDVALUE='"+data.fieldVal +"',UPDATED_DATE='"+data.currentDate+"' WHERE ID ='"+data.id+"' ";
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