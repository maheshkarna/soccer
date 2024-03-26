app.database.tables.weighment = {
  save: function (taskName) {
    return $.Deferred(function (deferred) {
      console.log(taskName);
      let imageColOneName = "";
      let imageColTwoName = "";
      let imageColThreeName="";
      let matereal = "";
      let partyName = "";
      let agent = "";
if(taskName.newMetereal != "" && taskName.material == 0 ){
  matereal = taskName.newMetereal;
}
else{
  matereal = taskName.material;
}
if(taskName.newParty_name != "" && taskName.partyname == 0 ){
  partyName = taskName.newParty_name;
}else{
  partyName = taskName.partyname;
}
if(taskName.newAgent != "" && taskName.Agent == 0 ){
  agent = taskName.newAgent;
}else{
  agent = taskName.Agent;
}
      if(taskName.wieghmentType == "Gorss"){
        imageColOneName= "GROSS_CAMERAONE";
        imageColTwoName= "GROSS_CAMERATWO";
        imageColThreeName= "GROSS_CAMERATHREE";
      }else{
        imageColOneName= "TARE_CAMERAONE";
        imageColTwoName= "TARE_CAMERATWO";
        imageColThreeName= "TARE_CAMERATHREE";
      }
      var sql =
            "INSERT INTO Weighments \
            ( \
                USERID, \
                CC,\
                SLIPNUMBER, \
                VEHICLENUMBER, \
                MATERIAL, \
                PARTYNAME, \
                AGENT, \
                REMARKS, \
                WEIGHMENTTYPE, \
                GROSSWEIGHT, \
                TAREWEIGHT, \
                NETTWEIGHT, \
                QUANTITY, \
                GROSSDATE, \
                TAREDATE, \
                GROSSTIME, \
                TARETIME, \
                CREATED_DATE, \
                "+imageColOneName+",\
                "+imageColTwoName+",\
                "+imageColThreeName+",\
                WBS ,\
                STATUS,\
                PRINT_STATUS,\
                ENTRY_TYPE,\
                FIRST_WT\
            ) \
            VALUES ('"+taskName.userid+"','"+localStorage.getItem('cc')+"','"+taskName.slipNumber+"','"+taskName.vehicleNo+"','"+matereal+"','"+partyName+"','"+agent+"','"+taskName.Remark+"','"+taskName.wieghmentType+"','"+taskName.grossWeight+"','"+taskName.tareWeight+"','"+taskName.nettWeight+"','"+taskName.qty+"','"+taskName.grossDate+"','"+taskName.tareDate+"','"+taskName.grossTime+"','"+taskName.tareTime+"','"+taskName.currentDate+"','"+taskName.imagevar+"','"+taskName.imagevarTwo+"','"+taskName.imagevarThree+"','"+taskName.WBS+"',0,0,'"+taskName.entryType+"','"+taskName.wieghmentType+"')";
              //console.log(sql);
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

  addMasterFieldVal: function (fieldData) {
    return $.Deferred(function (deferred) {
      var sql =
            "INSERT INTO MasterSettings \
            ( \
              FEILDNAME, \
              FEILDTEXT, \
              CREATED_DATE\
            ) \
            VALUES ('"+fieldData.fieldName+"','"+fieldData.fieldVal+"','"+fieldData.date+"')";
              //console.log(sql);
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


  countOfRecords : () =>{
    return $.Deferred(function (deferred) {
      var sql = "SELECT * FROM Weighments";
      var params = [];
      app.database.commands.executeReader(
        sql,
        params,
        function (ex, data) {
          //app.log("data select successful");
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


  getCount : ()=>{
    return $.Deferred(function (deferred) {
      var sql = "select max(SLIPNUMBER)as maxnum from Weighments";
      var params = [];
      app.database.commands.executeReader(
        sql,
        params,
        function (ex, data) {
          app.log("data select successful");
          //console.log(data);
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

  getList : (sVal)=>{
      return $.Deferred(function (deferred) {
        var sql ="";
        if(sVal === ""){
          sql = "SELECT * FROM Weighments ORDER BY SLIPNUMBER DESC";
        }else{
          sql = "SELECT * FROM Weighments where SLIPNUMBER LIKE '%"+sVal+"%' OR VEHICLENUMBER LIKE '%"+sVal+"%'";
        }
        
      var params = [];
      app.database.commands.executeReader(
        sql,
        params,
        function (ex, data) {
          app.log("data select successful");
          console.log(data);
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
  getRecordById : (rid)=>{
    return $.Deferred(function (deferred) {
      //var sql = "SELECT * FROM Weighments WHERE SLIPNUMBER = ?";
      var sql = "SELECT w.*, rh.TITLE, rh.SUBTITLE FROM Weighments w, reportHeader rh WHERE w.SLIPNUMBER = ?"
      var params = [rid];
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

  updateDataById : (data)=>{
    return $.Deferred(function (deferred) {
      let imageColOneName = "";
      let imageColTwoName = "";
      let imageColThreeName="";

      if(data.wieghmentType == "Gorss"){
        imageColOneName= "GROSS_CAMERAONE";
        imageColTwoName= "GROSS_CAMERATWO";
        imageColThreeName= "GROSS_CAMERATHREE";
      }else{
        imageColOneName= "TARE_CAMERAONE";
        imageColTwoName= "TARE_CAMERATWO";
        imageColThreeName= "TARE_CAMERATHREE";
      }
      let matereal = "";
      let partyName = "";
      let agent = "";
      if(data.newMetereal != "" && data.material == 0 ){
        matereal = data.newMetereal;
      }
      else{
        matereal = data.material;
      }
      if(data.newParty_name != "" && data.partyname == 0 ){
        partyName = data.newParty_name;
      }else{
        partyName = data.partyname;
      }
      if(data.newAgent != "" && data.Agent == 0 ){
        agent = data.newAgent;
      }else{
        agent = data.Agent;
      }

      //var sql = "update Weighments set WHERE SLIPNUMBER = '"+data.slipNumber+"'"; 
      var sql = "update Weighments \
           set \
           VEHICLENUMBER = '"+data.vehicleNo+"', \
           MATERIAL = '"+matereal+"', \
           PARTYNAME = '"+partyName+"', \
           AGENT = '"+agent+"', \
           REMARKS = '"+data.Remark+"', \
           WEIGHMENTTYPE = '"+data.wieghmentType+"', \
           GROSSWEIGHT = '"+data.grossWeight+"', \
           TAREWEIGHT = '"+data.tareWeight+"', \
           NETTWEIGHT = '"+data.nettWeight+"', \
           QUANTITY = '"+data.qty+"', \
           GROSSDATE = '"+data.grossDate+"', \
           TAREDATE = '"+data.tareDate+"', \
           GROSSTIME = '"+data.grossTime+"', \
           TARETIME = '"+data.tareTime+"', \
           "+imageColOneName+" = '"+data.imagevar+"',\
           "+imageColTwoName+" = '"+data.imagevarTwo+"',\
           "+imageColThreeName+"= '"+data.imagevarThree+"',\
           STATUS = 1,\
           CREATED_DATE = '"+data.currentDate+"'\
           where \
          SLIPNUMBER = '"+data.slipNumber+"'";
     var params = [];
     // var params = [rid];
      app.database.commands.executeReader(
        sql,
        params,
        function (ex, data) {
          app.log("Data updated Successfully");
          deferred.resolve();
        },
        function () {
          app.log("Data update Failed");
          deferred.reject();
        }
      );
    }).promise();
  },

  deleteRecordById: function (rid) {
    return $.Deferred(function (deferred) {
      let sql = "DELETE FROM Weighments WHERE SLIPNUMBER = ?";
      let params = [rid];
      app.database.commands.executeNonQuery(
        sql,
        params,
        function () {
          app.log("Record have been successfully deleted");
          deferred.resolve(1);
        },
        function () {
          app.log("Record has Not been Deleted");
          deferred.reject(0);
        }
      );
    }).promise();
  },




  getPartyNamesList:()=>{
    return $.Deferred(function (deferred) {
      var sql = "SELECT * FROM MasterSettings WHERE FEILDNAME = 'party_name' ORDER BY FEILDTEXT ASC";
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

  getAgentList:()=>{
    return $.Deferred(function (deferred) {
      var sql = "SELECT * FROM MasterSettings WHERE FEILDNAME = 'agent' ORDER BY FEILDTEXT ASC";
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
  } ,


  getMaterialList:()=>{
    return $.Deferred(function (deferred) {
      var sql = "SELECT * FROM MasterSettings WHERE FEILDNAME = 'material' ORDER BY FEILDTEXT ASC";
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
  
  getPorts:()=>{
    return $.Deferred(function (deferred) {
      var sql = "SELECT * FROM SerialPortData Where WEIGHBRIDGE ='WB01'";
      var params = [];
      app.database.commands.executeReader(
        sql,
        params,
        function (ex, data) {
          //app.log("data select successful");
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


  getcamData:()=>{    
    return $.Deferred(function (deferred) {
      var sql = "SELECT * FROM CameraSettings as c LEFT JOIN FilePath AS f ON c.ID = f.ID";

      var params = [];
      app.database.commands.executeReader(
        sql,
        params,
        function (ex, data) {
          //app.log("data select successful");
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

  
  getWBGList:()=>{
  
    return $.Deferred(function (deferred) {
      var sql = "SELECT * FROM CompanySettings";
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

  checkPrintStatus:(slpNo)=>{
    return $.Deferred(function (deferred) {
      var sql = "SELECT STATUS,PRINT_STATUS FROM Weighments WHERE SLIPNUMBER='"+slpNo+"'";
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

  updatePrintStatus:(slipNo,printStatus)=>{
    return $.Deferred(function (deferred) {
      let sql = "UPDATE Weighments SET PRINT_STATUS='"+printStatus+"' WHERE SLIPNUMBER='"+slipNo+"'";
      let params = [];
      app.database.commands.executeNonQuery(
        sql,
        params,
        function () {
          app.log("Record have been successfully deleted");
          deferred.resolve(1);
        },
        function () {
          app.log("Record has Not been Deleted");
          deferred.reject(0);
        }
      );
    }).promise();
  }
  

};