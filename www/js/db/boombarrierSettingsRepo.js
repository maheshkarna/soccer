app.database.tables.boombarrier = {

    insertData: function () {
      
          return $.Deferred(function (deferred) {
            let sql = `INSERT INTO boomBarrierSettings (BOOMBARRIER_NO, FEILDNAME, FEILDTEXT, ISMANDATORY, ISVISIBLE, CREATED_DATE, UPDATED_DATE) VALUES
              ('BB001', 'document_no', 'document_no', 1, 1, '2022-01-01', '2022-01-01'),
              ('BB001', 'date', 'date', 0, 1, '2022-01-02', '2022-01-02'), 
              ('BB001',  'GateEntryType', 'GateEntryType', 1, 0, '2022-01-03', '2022-01-03'), 
              ('BB002',  'Department', 'Department', 0, 0, '2022-01-04', '2022-01-04'), 
              ('BB002', 'Outlet', 'Outlet', 1, 1, '2022-01-05', '2022-01-05'), 
              ('BB002', 'flowClassify', 'flowClassify', 1, 0, '2022-01-06', '2022-01-06'),
              ('BB002', 'Gate', 'Gate', 1, 1, '2022-01-05', '2022-01-05'), 
              ('BB002', 'isWeighmentRequired', 'isWeighmentRequired', 1, 1, '2022-01-05', '2022-01-05'), 
              ('BB002', 'weighbridge', 'weighbridge', 1, 1, '2022-01-05', '2022-01-05'), 
              ('BB002', 'weighmentType', 'weighmentType', 1, 1, '2022-01-05', '2022-01-05'), 
              ('BB002', 'weighingType', 'weighingType', 1, 1, '2022-01-05', '2022-01-05'), 
              ('BB002', 'materialTransaction', 'materialTransaction', 1, 1, '2022-01-05', '2022-01-05'), 
              ('BB002', 'materialType', 'materialType', 1, 1, '2022-01-05', '2022-01-05'), 
              ('BB002', 'agent', 'agent', 1, 1, '2022-01-05', '2022-01-05'), 
              ('BB002', 'Vechile', 'Vechile', 1, 1, '2022-01-05', '2022-01-05'), 
              ('BB002', 'VendorORCustName', 'VendorORCustName', 1, 1, '2022-01-05', '2022-01-05'), 
              ('BB002', 'VendorORCustVillageName', 'VendorORCustVillageName', 1, 1, '2022-01-05', '2022-01-05'), 
              ('BB002', 'BillReferenceNo', 'BillReferenceNo', 1, 1, '2022-01-05', '2022-01-05'), 
              ('BB002', 'bill_date', 'bill_date', 1, 1, '2022-01-05', '2022-01-05'), 
              ('BB002', 'staffName', 'staffName', 1, 1, '2022-01-05', '2022-01-05'), 
              ('BB002', 'Visitor', 'Visitor', 1, 1, '2022-01-05', '2022-01-05'), 
              ('BB002', 'gateIn_date', 'gateIn_date', 1, 1, '2022-01-05', '2022-01-05'), 
              ('BB002', 'gateIn_time', 'gateIn_time', 1, 1, '2022-01-05', '2022-01-05'), 
              ('BB002', 'gateOut_Date', 'gateOut_Date', 1, 1, '2022-01-05', '2022-01-05'), 
              ('BB002', 'gateOut_time', 'gateOut_time', 1, 1, '2022-01-05', '2022-01-05'), 
              ('BB002', 'gate_status', 'gate_status', 1, 1, '2022-01-05', '2022-01-05'),
              ('BB002', 'scanner_time', 'scanner_time', 1, 1, '2022-01-05', '2022-01-05'),
              ('BB002', 'narration', 'narration', 1, 1, '2022-01-05', '2022-01-05'),
              ('BB002', 'attachment_one', 'attachment_one', 1, 1, '2022-01-05', '2022-01-05'),
              ('BB002', 'attachment_two', 'attachment_two', 1, 1, '2022-01-05', '2022-01-05'),
              ('BB002', 'attachment_three', 'attachment_three', 1, 1, '2022-01-05', '2022-01-05'),
              ('BB002', 'attachment_four', 'attachment_four', 1, 1, '2022-01-05', '2022-01-05'),
              ('BB002', 'vehicle_no', 'vehicle_no', 1, 1, '2022-01-05', '2022-01-05'); `;
           
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
            "UPDATE boomBarrierSettings SET " +
            "FEILDTEXT = '" + fieldlval + "', " +
            "ISMANDATORY = '" + isMandetory + "', " +
            "ISVISIBLE = '" + isVisbleVal + "' " +
            "WHERE ID = '" + fieldId + "'; ";
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
  
  
        checkFieldsData : function(){
          return $.Deferred(function (deferred) {
            var sql = "SELECT * FROM boomBarrierSettings ";
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
        }
  
    };