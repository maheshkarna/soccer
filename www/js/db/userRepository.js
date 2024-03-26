app.database.tables.user={
        
    save: function (formdata) {
    
        return $.Deferred(function (deferred) {
        let wbs = localStorage.getItem('wbs')
          var sql = "INSERT INTO Users (CC,USERID, USERROLE, USERNAME,PASSWORD,DESCRIPTION,CREATEDAT,STATUS,WBS) VALUES "+
          "(?,?,?,?,?,?,?,?,? )"
         ;
          var params = [localStorage.getItem('cc'),formdata.userId,formdata.userType,formdata.username,formdata.password,formdata.userDescription,formdata.createDate,formdata.status,wbs];
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

      getMaxId : function(){
        return $.Deferred(function (deferred) {
          var sql = "SELECT MAX(ID) as maxId FROM Users";
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
      
      getUserList:function(){
        return $.Deferred(function (deferred) {
          var sql = "SELECT * FROM Users";
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

      deleteUserById: function (id) {
        return $.Deferred(function (deferred) {
          let sql = "DELETE FROM Users WHERE ID = ?";
          let params = [id];
          app.database.commands.executeNonQuery(
            sql,
            params,
            function () {
              app.log("task have been successfully deleted");
              deferred.resolve();
            },
            function () {
              app.log("task have NOT been deleted");
              deferred.reject();
            }
          );
        }).promise();
      },

      updateStatus:function(status,id){
        return $.Deferred(function (deferred) {
          let sql = "update Users set  STATUS = '"+status+"' where ID = '"+id+"'";
          let params = [];
          app.database.commands.executeNonQuery(
            sql,
            params,
            function () { 
              app.log("Update successfully ");
              deferred.resolve();
            },
            function () {
              app.log("Data Not Update");
              deferred.reject();
            }
          );
        }).promise();
      },

      updateUserById: function (data) {
        return $.Deferred(function (deferred) {
          let sql = "update Users set USERNAME = '"+data.username+"' , PASSWORD = '"+data.password+"' where ID = '"+data.id+"'";
          let params = [];
          app.database.commands.executeNonQuery(
            sql,
            params,
            function () {
              app.log("Update successfully ");
              deferred.resolve();
            },
            function () {
              app.log("Data Not Update");
              deferred.reject();
            }
          );
        }).promise();
      },


      getAdminLog : function(){
        return $.Deferred(function (deferred) {
          var sql = "SELECT * FROM Registration";
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
      

      changePassword: function (newPassword,id) {
          return $.Deferred(function (deferred) {
          let sql = "update Registration set ADMPASSWORD = '"+newPassword+"' where ID = '"+id+"'";
          let params = [];
          app.database.commands.executeNonQuery(
            sql,
            params,
            function () {
              app.log("Update successfully ");
              deferred.resolve();
            },
            function () {
              app.log("Data Not Update");
              deferred.reject();
            }
          );
        }).promise();
      },
      
}