app.database.tables.GateEntry = {



  

  getCount : ()=>{
  
    return $.Deferred(function (deferred) {
     
      var sql = "SELECT MAX(ID) as maxnum FROM GateEntry;";
      var params = [];
      app.database.commands.executeReader(
        sql,
        params,
        function (ex, data) {
          app.log("data select successful");
          //console.log(data);
            app.log(data);
         
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


    save: function (data) {
      
        return $.Deferred(function (deferred) {
          console.log(data);
          var sql =
                "INSERT INTO GateEntry \
                ( \
                    USERID, \
                    SLIPNUMBER, \
                    DATE, \
                    GATE_ENTRY_TYPE, \
                    DEPARTMENT, \
                    OUTLET, \
                    FLOWCLASSIFY, \
                    GATE,\
                    ISWEIGHMENT_REQUIRED, \
                    WEIGHBRIDGE, \
                    WEIGHMENT_TYPE, \
                    WEIGHINGTYPE, \
                    MATERIAL_TRANSACTION, \
                    MATERIAL_TYPE, \
                    AGENT, \
                    VEHICLE, \
                    VENDOR_OR_CUSTNAME, \
                    CUST_VILLAGE_OR_CITY, \
                    BILL_REFERENCE_NO, \
                    BILL_DATE, \
                    STAFF_NAME, \
                    VISITOR, \
                    GATE_IN_DATE, \
                    GATE_OUT_DATE, \
                    GATE_IN_TIME, \
                    GATE_OUT_TIME, \
                    GATE_STATUS, \
                    SCANNER_TIMER, \
                    NARRATION, \
                    ATTACHMENT_ONE, \
                    ATTACHMENT_TWO, \
                    ATTACHMENT_THREE, \
                    ATTACHMENT_FOUR, \
                    VEHICLE_NUMBER ,\
                    QR_PATH ,\
                    QR_CODE ,\
                    QR_STATUS\
                ) \
                VALUES ('"+data.userid+"','"+data.document_no+"','"+data.date+"','"+data.GateEntryType+"','"+data.Department+"','"+data.Outlet+"','"+data.flowClassify+"','"+data.gate+"','"+data.isWeighmentRequired+"','"+data.weighbridge+"','"+data.weighmentType+"','"+data.weighingType+"','"+data.materialTransaction+"','"+data.materialType+"','"+data.agent+"','"+data.Vechile+"','"+data.VendorORCustName+"','"+data.VendorORCustVillageName+"','"+data.BillReferenceNo+"','"+data.bill_date+"','"+data.staffName+"','"+data.Visitor+"','"+data.gateIn_date+"','"+data.gateOut_Date+"','"+data.gateIn_time+"','"+data.gateOut_time+"','"+data.gate_status+"','"+data.scanner_time+"','"+data.narration+"','"+data.attachment_one+"','"+data.attachment_two+"','"+data.attachment_three+"','"+data.attachment_four+"','"+data.vehicle_no+"','"+data.filePath+"','"+data.QRPathval+"','"+data.QR_Status+"')";
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

    getList : (sVal)=>{
      return $.Deferred(function (deferred) {
        var sql ="";
        if(sVal === ""){
          sql = "SELECT * FROM GateEntry";
        }else{
          sql = "SELECT * FROM GateEntry where SLIPNUMBER LIKE '%"+sVal+"%' OR VEHICLE LIKE '%"+sVal+"%'";
        }
     console.log(sql);
      var params = [];
      app.database.commands.executeReader(
        sql,
        params,
        function (ex, data) {
          app.log("Data select successful");
          console.log(data);
          if (data.rows.length > 0) {
            deferred.resolve(data.rows);
          } else {
            deferred.resolve(null);
          }
        },
        function () {
          app.log("Data select failed");
          deferred.reject();
        }
      );
    }).promise();
    },

    deleteRecordById: function (rid) {
      return $.Deferred(function (deferred) {
        let sql = "DELETE FROM GateEntry WHERE SLIPNUMBER = ?";
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
    
    getRecordById : (rid)=>{
      return $.Deferred(function (deferred) {
        var sql = "SELECT * FROM GateEntry WHERE SLIPNUMBER = ?";
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



    GetRecByDocNo : (rid)=>{
      return $.Deferred(function (deferred) {
        var sql = "SELECT * FROM GateEntry WHERE SLIPNUMBER = ?";
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
        //var sql = "update Weighments set WHERE SLIPNUMBER = '"+data.slipNumber+"'";
        var sql = "update GateEntry \
        set \
             DATE = '"+data.date+"', \
             GATE_ENTRY_TYPE = '"+data.GateEntryType+"', \
             DEPARTMENT = '"+data.Department+"', \
             OUTLET = '"+data.Outlet+"', \
             FLOWCLASSIFY = '"+data.flowClassify+"', \
             GATE = '"+data.Gate+"', \
             ISWEIGHMENT_REQUIRED = '"+data.isWeighmentRequired+"', \
             WEIGHBRIDGE = '"+data.weighbridge+"', \
             WEIGHMENT_TYPE = '"+data.weighmentType+"', \
             WEIGHINGTYPE = '"+data.weighingType+"', \
             MATERIAL_TRANSACTION = '"+data.materialTransaction+"', \
             MATERIAL_TYPE = '"+data.materialType+"', \
             AGENT = '"+data.agent+"', \
             VEHICLE = '"+data.Vechile+"', \
             VENDOR_OR_CUSTNAME = '"+data.VendorORCustName+"', \
             CUST_VILLAGE_OR_CITY = '"+data.VendorORCustVillageName+"', \
             BILL_REFERENCE_NO = '"+data.BillReferenceNo+"', \
             BILL_DATE = '"+data.bill_date+"', \
             STAFF_NAME = '"+data.staffName+"', \
             VISITOR = '"+data.Visitor+"', \
             GATE_IN_DATE = '"+data.gateIn_date+"', \
             GATE_OUT_DATE = '"+data.gateOut_Date+"', \
             GATE_IN_TIME = '"+data.gateIn_time+"', \
             GATE_OUT_TIME = '"+data.gateOut_time+"', \
             GATE_STATUS = '"+data.gate_status+"', \
             SCANNER_TIMER = '"+data.scanner_time+"', \
             NARRATION = '"+data.narration+"', \
             VEHICLE_NUMBER = '"+data.vehicle_no+"' \
        where \
        SLIPNUMBER = '"+data.document_no+"'";

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


    FetchAll : ()=>{
      return $.Deferred(function (deferred) {
        var sql = "SELECT * FROM boomBarrierSettings";
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



    getDrpdownVal : function(val){
       return $.Deferred(function (deferred) {
       var sql = "SELECT * FROM BmrMasterSettings where FEILDNAME = '"+val+"'";
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


   checkQRCode  : function(QRval){
    return $.Deferred(function (deferred) {
    var sql = "SELECT * FROM GateEntry where QR_STATUS = 0 AND QR_CODE ='"+QRval+"'";
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


updateQRCode: function (QRval) {
  return $.Deferred(function (deferred) {

    var sql ="UPDATE GateEntry set QR_STATUS = 1 WHERE QR_CODE='"+QRval+"'";
        
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

  updatePicturePath:(imgPath,slpno)=>{
    return $.Deferred(function (deferred) {
      var sql ="UPDATE GateEntry set  VEHICLE_PHOTO_IN ='"+imgPath+"' WHERE SLIPNUMBER ='"+slpno+"'";
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
  }

}