app.database.tables.itemWiseReport={

///report Header ///

saveReportVal:function(){
  return $.Deferred(function (deferred) {
  let title = "HINDUSTAN AGRO PRODUCTS LIMITED";
  let subTitle = "Machavaram(V),RAyavaram(M),East Godavari(D),A.P.-533261";
  let date = new Date();

    let sql =`INSERT INTO reportHeader (TITLE, SUBTITLE, UPDATED_DATE) VALUES 
    ('${title}', '${subTitle}', '${date}')`;
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


getHeaderData:function(){
  return $.Deferred(function (deferred) {    
    var sql = "SELECT * FROM reportHeader";
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

updateHeader:function(data){
  return $.Deferred(function (deferred) {
    let date = new Date();
    var sql =
    "UPDATE reportHeader SET " +
    "TITLE = '" + data.title + "', " +
    "SUBTITLE = '" + data.sitle + "', " +
    "UPDATED_DATE = '" + date + "'" +
    "WHERE ID = '" + data.hdnId + "';";
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



  getItemList:function(){
    return $.Deferred(function (deferred) {    
      var sql = "SELECT DISTINCT MATERIAL FROM Weighments ORDER BY MATERIAL ASC";
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

    getItemWise:function(data){
        return $.Deferred(function (deferred) { 
          var sql ="";
        
           if( data.fromDate != "" && data.toDate !="" && data.item == "" && data.status == ""){
              sql = "SELECT * FROM Weighments WHERE CREATED_DATE BETWEEN '"+data.fromDate+"' AND '"+data.toDate+"' ORDER BY ID DESC";
           }if(data.item != "" && data.status == ""){
              sql = "SELECT * FROM Weighments WHERE MATERIAL = '"+data.item+"' AND CREATED_DATE BETWEEN '"+data.fromDate+"' AND '"+data.toDate+"' ORDER BY ID DESC";
           }if(data.status != "" && data.item == "" ){
            sql = "SELECT * FROM Weighments WHERE STATUS = '"+data.status+"' AND CREATED_DATE BETWEEN '"+data.fromDate+"' AND '"+data.toDate+"' ORDER BY ID DESC";
           }if(data.status != "" && data.item != ""){
            sql = "SELECT * FROM Weighments WHERE STATUS = '"+data.status+"' AND MATERIAL = '"+data.item+"' AND CREATED_DATE BETWEEN '"+data.fromDate+"' AND '"+data.toDate+"' ORDER BY ID DESC";
           }
          
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

      // Vehicle Report
      getVehicleWise:function(data){
        return $.Deferred(function (deferred) {
          var sql = "";
          if(data.vehicleNo == "" && data.fromDate != "" && data.toDate !="" && data.status == "" ){ 
            sql = "SELECT * FROM Weighments Where CREATED_DATE BETWEEN '"+data.fromDate+"' AND '"+data.toDate+"' ORDER BY ID DESC";
          }else if(data.vehicleNo != "" && data.status == ""){
            sql = "SELECT * FROM Weighments WHERE VEHICLENUMBER = '"+data.vehicleNo+"' AND CREATED_DATE BETWEEN '"+data.fromDate+"' AND '"+data.toDate+"' ORDER BY ID DESC"; 
          }else if(data.vehicleNo == "" && data.status != ""){
            sql = "SELECT * FROM Weighments WHERE STATUS = '"+data.status+"' AND CREATED_DATE BETWEEN '"+data.fromDate+"' AND '"+data.toDate+"' ORDER BY ID DESC"; 
          }else if(data.vehicleNo != "" && data.status != ""){
            sql = "SELECT * FROM Weighments WHERE STATUS = '"+data.status+"' AND VEHICLENUMBER = '"+data.vehicleNo+"' AND CREATED_DATE BETWEEN '"+data.fromDate+"' AND '"+data.toDate+"' ORDER BY ID DESC"; 
          }
  
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

// Weight Report
      getWeightWise:function(data){
          return $.Deferred(function (deferred) {
            let FD = data.fromDate;
            let TD = data.toDate;
            let ET =  data.entryType;
            let WT =  data.weihtType;
            let S  = data.status;
            let W  = data.weight;
            let IN =  data.item_name;
            let PN = data.partyName;

            var sql = "";
            if(ET == "all" && S =="all" && FD == "" && W == 0 && WT == "EQUAL" && IN == "all" && PN =="all"){
            sql = "SELECT * FROM Weighments ";
            }else 
            if(ET == "all" && S =="all" && FD != "" && TD !="" && W == 0 && WT == "EQUAL" && IN == "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'"; 
            }else
            if(ET == "all" && S =="all" && FD == "" && W == 0 && WT == "EQUAL" && IN != "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where MATERIAL = '"+IN+"'"; 
            }else if(ET == "all" && S =="all" && FD == "" && W == 0 && WT == "EQUAL" && IN == "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where PARTYNAME = '"+PN+"'"; 
            }
            if(FD == ""){
            if(ET != "all" && S =="all" && W == 0 && WT == "EQUAL" && IN == "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where ENTRY_TYPE = '"+ET+"'";
            }else 
            if(ET == "all" && S !="all" && W == 0 && WT == "EQUAL" && IN == "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"'";
            }else  
            if(ET != "all" && S !="all" && W == 0 && WT == "EQUAL" && IN == "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and ENTRY_TYPE = '"+ET+"'";
            } else  
            if(ET == "all" && S =="all" && W > 0 && WT == "EQUAL" && IN == "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where NETTWEIGHT = '"+W+"'";
            } else  
            if(ET == "all" && S =="all" && W > 0 && WT == "BELOW" && IN == "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where NETTWEIGHT < '"+W+"'";
            } else  
            if(ET == "all" && S =="all" && W > 0 && WT == "BELOW" && IN == "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where NETTWEIGHT > '"+W+"'";
            }else

            if(ET != "all" && S =="all" && W > 0 && WT == "EQUAL" && IN == "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where ENTRY_TYPE = '"+ET+"'";
            }else
            if(ET != "all" && S =="all" && W >0 && WT == "BELOW" && IN == "all" && PN =="all"){
              sql = "SELECT * FROM Weighments WHERE ENTRY_TYPE = '"+ET+"' AND CAST(NETTWEIGHT AS INTEGER) < '"+W+"'";
            }else 
            if(ET != "all" && S =="all" && W >0 && WT == "ABOVE" && IN == "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where ENTRY_TYPE = '"+ET+"' and NETTWEIGHT > '"+W+"'";
            }else 

            if(ET == "all" && S !="all" && W >0 && WT == "EQUAL" && IN == "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and NETTWEIGHT ='"+W+"'";
            }else 
            if(ET == "all" && S !="all" && W >0 && WT == "ABOVE" && IN == "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and NETTWEIGHT > '"+W+"'";
            } else 
            if(ET == "all" && S !="all" && W >0 && WT == "BELOW" && IN == "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and NETTWEIGHT < '"+W+"'";
            }else 
            if(ET != "all" && S !="all" && W > 0 && WT == "EQUAL" && IN == "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and ENTRY_TYPE = '"+ET+"' and NETTWEIGHT ='"+W+"'";
            } else
            if(ET != "all" && S !="all" && W > 0 && WT == "ABOVE" && IN == "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and ENTRY_TYPE = '"+ET+"' and NETTWEIGHT > '"+W+"'";
            }else     
            if(ET != "all" && S !="all" && W > 0 && WT == "BELOW" && IN == "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and ENTRY_TYPE = '"+ET+"' and NETTWEIGHT < '"+W+"'";
            }else

            //second
            if(ET != "all" && S =="all" && W == 0 && WT == "EQUAL" && IN != "all" && PN =="all" ){
              sql = "SELECT * FROM Weighments where ENTRY_TYPE = '"+ET+"' and MATERIAL = '"+IN+"' ";
            }else 
            if(ET == "all" && S !="all" && W == 0 && WT == "EQUAL" && IN != "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and MATERIAL = '"+IN+"' ";
            }else  
            if(ET != "all" && S !="all" && W == 0 && WT == "EQUAL" && IN != "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and ENTRY_TYPE = '"+ET+"' and MATERIAL = '"+IN+"'";
            } else  
            if(ET == "all" && S =="all" && W > 0 && WT == "EQUAL" && IN != "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where NETTWEIGHT = '"+W+"' and MATERIAL = '"+IN+"'";
            } else  
            if(ET == "all" && S =="all" && W > 0 && WT == "BELOW" && IN != "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where NETTWEIGHT < '"+W+"' and MATERIAL = '"+IN+"'";
            } else  
            if(ET == "all" && S =="all" && W > 0 && WT == "BELOW" && IN != "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where NETTWEIGHT > '"+W+"' and MATERIAL = '"+IN+"'";
            }else

            
            if(ET != "all" && S =="all" && W > 0 && WT == "EQUAL" && IN != "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where ENTRY_TYPE = '"+ET+"' and MATERIAL = '"+IN+"'";
            }else
            if(ET != "all" && S =="all" && W >0 && WT == "BELOW" && IN != "all" && PN =="all"){
              sql = "SELECT * FROM Weighments WHERE ENTRY_TYPE = '"+ET+"' AND CAST(NETTWEIGHT AS INT!GER) < '"+W+"' and MATERIAL = '"+IN+"'";
            }else 
            if(ET != "all" && S =="all" && W >0 && WT == "ABOVE" && IN != "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where ENTRY_TYPE = '"+ET+"' and NETTWEIGHT > '"+W+"' and MATERIAL = '"+IN+"'";
            }else 

            if(ET == "all" && S !="all" && W >0 && WT == "EQUAL" && IN != "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and NETTWEIGHT ='"+W+"' and MATERIAL = '"+IN+"'";
            }else 
            if(ET == "all" && S !="all" && W >0 && WT == "ABOVE" && IN != "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and NETTWEIGHT > '"+W+"' and MATERIAL = '"+IN+"'";
            } else 
            if(ET == "all" && S !="all" && W >0 && WT == "BELOW" && IN != "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and NETTWEIGHT < '"+W+"' and MATERIAL = '"+IN+"'";
            }else 
            if(ET != "all" && S !="all" && W > 0 && WT == "EQUAL" && IN != "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and ENTRY_TYPE = '"+ET+"' and NETTWEIGHT ='"+W+"' and MATERIAL = '"+IN+"'";
            } else
            if(ET != "all" && S !="all" && W > 0 && WT == "ABOVE" && IN == "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and ENTRY_TYPE = '"+ET+"' and NETTWEIGHT > '"+W+"' and MATERIAL = '"+IN+"'";
            }else     
            if(ET != "all" && S !="all" && W > 0 && WT == "BELOW" && IN == "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and ENTRY_TYPE = '"+ET+"' and NETTWEIGHT < '"+W+"' and MATERIAL = '"+IN+"'";
            } else

            //third
    
            if(ET != "all" && S =="all" && W == 0 && WT == "EQUAL" && IN == "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where ENTRY_TYPE = '"+ET+"' and PARTYNAME ='"+PN+"' and PARTYNAME ='"+PN+"'";
            }else 
            if(ET == "all" && S !="all" && W == 0 && WT == "EQUAL" && IN == "all" && PN !="all" ){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and PARTYNAME ='"+PN+"'";
            }else  
            if(ET != "all" && S !="all" && W == 0 && WT == "EQUAL" && IN == "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and ENTRY_TYPE = '"+ET+"' and PARTYNAME ='"+PN+"'";
            } else  
            if(ET == "all" && S =="all" && W > 0 && WT == "EQUAL" && IN == "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where NETTWEIGHT = '"+W+"' and PARTYNAME ='"+PN+"'";
            } else  
            if(ET == "all" && S =="all" && W > 0 && WT == "BELOW" && IN == "all" && PN !="all" ){
              sql = "SELECT * FROM Weighments where NETTWEIGHT < '"+W+"' and PARTYNAME ='"+PN+"'";
            } else  
            if(ET == "all" && S =="all" && W > 0 && WT == "BELOW" && IN == "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where NETTWEIGHT > '"+W+"' and PARTYNAME ='"+PN+"'";
            }else
            if(ET != "all" && S =="all" && W > 0 && WT == "EQUAL" && IN == "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where ENTRY_TYPE = '"+ET+"' and PARTYNAME ='"+PN+"'";
            }else
            if(ET != "all" && S =="all" && W >0 && WT == "BELOW" && IN == "all" && PN !="all"){
              sql = "SELECT * FROM Weighments WHERE ENTRY_TYPE = '"+ET+"' AND CAST(NETTWEIGHT AS INTEGER) < '"+W+"' and PARTYNAME ='"+PN+"'";
            }else 
            if(ET != "all" && S =="all" && W >0 && WT == "ABOVE" && IN == "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where ENTRY_TYPE = '"+ET+"' and NETTWEIGHT > '"+W+"' and PARTYNAME ='"+PN+"'";
            }else 
            if(ET == "all" && S !="all" && W >0 && WT == "EQUAL" && IN == "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and NETTWEIGHT ='"+W+"' and PARTYNAME ='"+PN+"'";
            }else 
            if(ET == "all" && S !="all" && W >0 && WT == "ABOVE" && IN == "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and NETTWEIGHT > '"+W+"' and PARTYNAME ='"+PN+"'";
            } else 
            if(ET == "all" && S !="all" && W >0 && WT == "BELOW" && IN == "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and NETTWEIGHT < '"+W+"' and PARTYNAME ='"+PN+"'";
            }else 
            if(ET != "all" && S !="all" && W > 0 && WT == "EQUAL" && IN == "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and ENTRY_TYPE = '"+ET+"' and NETTWEIGHT ='"+W+"' and PARTYNAME ='"+PN+"'";
            } else
            if(ET != "all" && S !="all" && W > 0 && WT == "ABOVE" && IN == "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and ENTRY_TYPE = '"+ET+"' and NETTWEIGHT > '"+W+"' and PARTYNAME ='"+PN+"'";
            }else     
            if(ET != "all" && S !="all" && W > 0 && WT == "BELOW" && IN == "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and ENTRY_TYPE = '"+ET+"' and NETTWEIGHT < '"+W+"' and PARTYNAME ='"+PN+"'";
            }else
            if(ET != "all" && S =="all" && W == 0 && WT == "EQUAL" && IN != "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where ENTRY_TYPE = '"+ET+"' and MATERIAL = '"+IN+"' and PARTYNAME ='"+PN+"'";
            }else 
            if(ET == "all" && S !="all" && W == 0 && WT == "EQUAL" && IN != "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and MATERIAL = '"+IN+"' and PARTYNAME ='"+PN+"'";
            }else  
            if(ET != "all" && S !="all" && W == 0 && WT == "EQUAL" && IN != "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and ENTRY_TYPE = '"+ET+"' and MATERIAL = '"+IN+"' and PARTYNAME ='"+PN+"'";
            } else  
            if(ET == "all" && S =="all" && W > 0 && WT == "EQUAL" && IN != "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where NETTWEIGHT = '"+W+"' and MATERIAL = '"+IN+"' and PARTYNAME ='"+PN+"'";
            } else  
            if(ET == "all" && S =="all" && W > 0 && WT == "BELOW" && IN != "all"){
              sql = "SELECT * FROM Weighments where NETTWEIGHT < '"+W+"' and MATERIAL = '"+IN+"' and PARTYNAME ='"+PN+"'";
            } else  
            if(ET == "all" && S =="all" && W > 0 && WT == "BELOW" && IN != "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where NETTWEIGHT > '"+W+"' and MATERIAL = '"+IN+"' and PARTYNAME ='"+PN+"'";
            }else    
            if(ET != "all" && S =="all" && W > 0 && WT == "EQUAL" && IN != "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where ENTRY_TYPE = '"+ET+"' and MATERIAL = '"+IN+"' and PARTYNAME ='"+PN+"'";
            }else
            if(ET != "all" && S =="all" && W >0 && WT == "BELOW" && IN != "all" && PN !="all"){
              sql = "SELECT * FROM Weighments WHERE ENTRY_TYPE = '"+ET+"' AND CAST(NETTWEIGHT AS INT!GER) < '"+W+"' and MATERIAL = '"+IN+"' and PARTYNAME ='"+PN+"'";
            }else 
            if(ET != "all" && S =="all" && W >0 && WT == "ABOVE" && IN != "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where ENTRY_TYPE = '"+ET+"' and NETTWEIGHT > '"+W+"' and MATERIAL = '"+IN+"' and PARTYNAME ='"+PN+"'";
            }else 
            if(ET == "all" && S !="all" && W >0 && WT == "EQUAL" && IN != "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and NETTWEIGHT ='"+W+"' and MATERIAL = '"+IN+"' and PARTYNAME ='"+PN+"'";
            }else 
            if(ET == "all" && S !="all" && W >0 && WT == "ABOVE" && IN != "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and NETTWEIGHT > '"+W+"' and MATERIAL = '"+IN+"' and PARTYNAME ='"+PN+"'";
            } else 
            if(ET == "all" && S !="all" && W >0 && WT == "BELOW" && IN != "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and NETTWEIGHT < '"+W+"' and MATERIAL = '"+IN+"' and PARTYNAME ='"+PN+"'";
            }else 
            if(ET != "all" && S !="all" && W > 0 && WT == "EQUAL" && IN != "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and ENTRY_TYPE = '"+ET+"' and NETTWEIGHT ='"+W+"' and MATERIAL = '"+IN+"' and PARTYNAME ='"+PN+"'";
            } else
            if(ET != "all" && S !="all" && W > 0 && WT == "ABOVE" && IN == "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and ENTRY_TYPE = '"+ET+"' and NETTWEIGHT > '"+W+"' and MATERIAL = '"+IN+"' and PARTYNAME ='"+PN+"'";
            }else     
            if(ET != "all" && S !="all" && W > 0 && WT == "BELOW" && IN == "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and ENTRY_TYPE = '"+ET+"' and NETTWEIGHT < '"+W+"' and MATERIAL = '"+IN+"' and PARTYNAME ='"+PN+"'";
            }   
          }else 
          /////along With Date //////  
          if(FD != ""  ){
            if(ET != "all" && S =="all" && W == 0 && WT == "EQUAL" && IN == "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where ENTRY_TYPE = '"+ET+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            }else 
            if(ET == "all" && S !="all" && W == 0 && WT == "EQUAL" && IN == "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            }else  
            if(ET != "all" && S !="all" && W == 0 && WT == "EQUAL" && IN == "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and ENTRY_TYPE = '"+ET+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            } else  
            if(ET == "all" && S =="all" && W > 0 && WT == "EQUAL" && IN == "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where NETTWEIGHT = '"+W+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            } else  
            if(ET == "all" && S =="all" && W > 0 && WT == "BELOW" && IN == "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where NETTWEIGHT < '"+W+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            } else  
            if(ET == "all" && S =="all" && W > 0 && WT == "BELOW" && IN == "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where NETTWEIGHT > '"+W+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            }else

            if(ET != "all" && S =="all" && W > 0 && WT == "EQUAL" && IN == "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where ENTRY_TYPE = '"+ET+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            }else
            if(ET != "all" && S =="all" && W >0 && WT == "BELOW" && IN == "all" && PN =="all"){
              sql = "SELECT * FROM Weighments WHERE ENTRY_TYPE = '"+ET+"' AND CAST(NETTWEIGHT AS INTEGER) < '"+W+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            }else 
            if(ET != "all" && S =="all" && W >0 && WT == "ABOVE" && IN == "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where ENTRY_TYPE = '"+ET+"' and NETTWEIGHT > '"+W+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            }else 

            if(ET == "all" && S !="all" && W >0 && WT == "EQUAL" && IN == "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and NETTWEIGHT ='"+W+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            }else 
            if(ET == "all" && S !="all" && W >0 && WT == "ABOVE" && IN == "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and NETTWEIGHT > '"+W+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            } else 
            if(ET == "all" && S !="all" && W >0 && WT == "BELOW" && IN == "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and NETTWEIGHT < '"+W+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            }else 
            if(ET != "all" && S !="all" && W > 0 && WT == "EQUAL" && IN == "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and ENTRY_TYPE = '"+ET+"' and NETTWEIGHT ='"+W+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            } else
            if(ET != "all" && S !="all" && W > 0 && WT == "ABOVE" && IN == "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and ENTRY_TYPE = '"+ET+"' and NETTWEIGHT > '"+W+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            }else     
            if(ET != "all" && S !="all" && W > 0 && WT == "BELOW" && IN == "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and ENTRY_TYPE = '"+ET+"' and NETTWEIGHT < '"+W+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            }else

            //second
            if(ET != "all" && S =="all" && W == 0 && WT == "EQUAL" && IN != "all" && PN =="all" ){
              sql = "SELECT * FROM Weighments where ENTRY_TYPE = '"+ET+"' and MATERIAL = '"+IN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            }else 
            if(ET == "all" && S !="all" && W == 0 && WT == "EQUAL" && IN != "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and MATERIAL = '"+IN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            }else  
            if(ET != "all" && S !="all" && W == 0 && WT == "EQUAL" && IN != "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and ENTRY_TYPE = '"+ET+"' and MATERIAL = '"+IN+"'";
            } else  
            if(ET == "all" && S =="all" && W > 0 && WT == "EQUAL" && IN != "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where NETTWEIGHT = '"+W+"' and MATERIAL = '"+IN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            } else  
            if(ET == "all" && S =="all" && W > 0 && WT == "BELOW" && IN != "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where NETTWEIGHT < '"+W+"' and MATERIAL = '"+IN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            } else  
            if(ET == "all" && S =="all" && W > 0 && WT == "BELOW" && IN != "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where NETTWEIGHT > '"+W+"' and MATERIAL = '"+IN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            }else

            
            if(ET != "all" && S =="all" && W > 0 && WT == "EQUAL" && IN != "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where ENTRY_TYPE = '"+ET+"' and MATERIAL = '"+IN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            }else
            if(ET != "all" && S =="all" && W >0 && WT == "BELOW" && IN != "all" && PN =="all"){
              sql = "SELECT * FROM Weighments WHERE ENTRY_TYPE = '"+ET+"' AND CAST(NETTWEIGHT AS INT!GER) < '"+W+"' and MATERIAL = '"+IN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            }else 
            if(ET != "all" && S =="all" && W >0 && WT == "ABOVE" && IN != "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where ENTRY_TYPE = '"+ET+"' and NETTWEIGHT > '"+W+"' and MATERIAL = '"+IN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            }else 

            if(ET == "all" && S !="all" && W >0 && WT == "EQUAL" && IN != "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and NETTWEIGHT ='"+W+"' and MATERIAL = '"+IN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            }else 
            if(ET == "all" && S !="all" && W >0 && WT == "ABOVE" && IN != "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and NETTWEIGHT > '"+W+"' and MATERIAL = '"+IN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            } else 
            if(ET == "all" && S !="all" && W >0 && WT == "BELOW" && IN != "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and NETTWEIGHT < '"+W+"' and MATERIAL = '"+IN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            }else 
            if(ET != "all" && S !="all" && W > 0 && WT == "EQUAL" && IN != "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and ENTRY_TYPE = '"+ET+"' and NETTWEIGHT ='"+W+"' and MATERIAL = '"+IN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            } else
            if(ET != "all" && S !="all" && W > 0 && WT == "ABOVE" && IN == "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and ENTRY_TYPE = '"+ET+"' and NETTWEIGHT > '"+W+"' and MATERIAL = '"+IN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            }else     
            if(ET != "all" && S !="all" && W > 0 && WT == "BELOW" && IN == "all" && PN =="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and ENTRY_TYPE = '"+ET+"' and NETTWEIGHT < '"+W+"' and MATERIAL = '"+IN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            } else

            //third

            if(ET != "all" && S =="all" && W == 0 && WT == "EQUAL" && IN == "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where ENTRY_TYPE = '"+ET+"' and PARTYNAME ='"+PN+"' and PARTYNAME ='"+PN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            }else 
            if(ET == "all" && S !="all" && W == 0 && WT == "EQUAL" && IN == "all" && PN !="all" ){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and PARTYNAME ='"+PN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            }else  
            if(ET != "all" && S !="all" && W == 0 && WT == "EQUAL" && IN == "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and ENTRY_TYPE = '"+ET+"' and PARTYNAME ='"+PN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            } else  
            if(ET == "all" && S =="all" && W > 0 && WT == "EQUAL" && IN == "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where NETTWEIGHT = '"+W+"' and PARTYNAME ='"+PN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            } else  
            if(ET == "all" && S =="all" && W > 0 && WT == "BELOW" && IN == "all" && PN !="all" ){
              sql = "SELECT * FROM Weighments where NETTWEIGHT < '"+W+"' and PARTYNAME ='"+PN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            } else  
            if(ET == "all" && S =="all" && W > 0 && WT == "BELOW" && IN == "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where NETTWEIGHT > '"+W+"' and PARTYNAME ='"+PN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            }else
            if(ET != "all" && S =="all" && W > 0 && WT == "EQUAL" && IN == "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where ENTRY_TYPE = '"+ET+"' and PARTYNAME ='"+PN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            }else
            if(ET != "all" && S =="all" && W >0 && WT == "BELOW" && IN == "all" && PN !="all"){
              sql = "SELECT * FROM Weighments WHERE ENTRY_TYPE = '"+ET+"' AND CAST(NETTWEIGHT AS INTEGER) < '"+W+"' and PARTYNAME ='"+PN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            }else 
            if(ET != "all" && S =="all" && W >0 && WT == "ABOVE" && IN == "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where ENTRY_TYPE = '"+ET+"' and NETTWEIGHT > '"+W+"' and PARTYNAME ='"+PN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            }else 
            if(ET == "all" && S !="all" && W >0 && WT == "EQUAL" && IN == "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and NETTWEIGHT ='"+W+"' and PARTYNAME ='"+PN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            }else 
            if(ET == "all" && S !="all" && W >0 && WT == "ABOVE" && IN == "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and NETTWEIGHT > '"+W+"' and PARTYNAME ='"+PN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            } else 
            if(ET == "all" && S !="all" && W >0 && WT == "BELOW" && IN == "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and NETTWEIGHT < '"+W+"' and PARTYNAME ='"+PN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            }else 
            if(ET != "all" && S !="all" && W > 0 && WT == "EQUAL" && IN == "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and ENTRY_TYPE = '"+ET+"' and NETTWEIGHT ='"+W+"' and PARTYNAME ='"+PN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            } else
            if(ET != "all" && S !="all" && W > 0 && WT == "ABOVE" && IN == "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and ENTRY_TYPE = '"+ET+"' and NETTWEIGHT > '"+W+"' and PARTYNAME ='"+PN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            }else     
            if(ET != "all" && S !="all" && W > 0 && WT == "BELOW" && IN == "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and ENTRY_TYPE = '"+ET+"' and NETTWEIGHT < '"+W+"' and PARTYNAME ='"+PN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            }else
            if(ET != "all" && S =="all" && W == 0 && WT == "EQUAL" && IN != "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where ENTRY_TYPE = '"+ET+"' and MATERIAL = '"+IN+"' and PARTYNAME ='"+PN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            }else 
            if(ET == "all" && S !="all" && W == 0 && WT == "EQUAL" && IN != "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and MATERIAL = '"+IN+"' and PARTYNAME ='"+PN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            }else  
            if(ET != "all" && S !="all" && W == 0 && WT == "EQUAL" && IN != "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and ENTRY_TYPE = '"+ET+"' and MATERIAL = '"+IN+"' and PARTYNAME ='"+PN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            } else  
            if(ET == "all" && S =="all" && W > 0 && WT == "EQUAL" && IN != "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where NETTWEIGHT = '"+W+"' and MATERIAL = '"+IN+"' and PARTYNAME ='"+PN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            } else  
            if(ET == "all" && S =="all" && W > 0 && WT == "BELOW" && IN != "all"){
              sql = "SELECT * FROM Weighments where NETTWEIGHT < '"+W+"' and MATERIAL = '"+IN+"' and PARTYNAME ='"+PN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            } else  
            if(ET == "all" && S =="all" && W > 0 && WT == "BELOW" && IN != "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where NETTWEIGHT > '"+W+"' and MATERIAL = '"+IN+"' and PARTYNAME ='"+PN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            }else    
            if(ET != "all" && S =="all" && W > 0 && WT == "EQUAL" && IN != "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where ENTRY_TYPE = '"+ET+"' and MATERIAL = '"+IN+"' and PARTYNAME ='"+PN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            }else
            if(ET != "all" && S =="all" && W >0 && WT == "BELOW" && IN != "all" && PN !="all"){
              sql = "SELECT * FROM Weighments WHERE ENTRY_TYPE = '"+ET+"' AND CAST(NETTWEIGHT AS INT!GER) < '"+W+"' and MATERIAL = '"+IN+"' and PARTYNAME ='"+PN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            }else 
            if(ET != "all" && S =="all" && W >0 && WT == "ABOVE" && IN != "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where ENTRY_TYPE = '"+ET+"' and NETTWEIGHT > '"+W+"' and MATERIAL = '"+IN+"' and PARTYNAME ='"+PN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            }else 
            if(ET == "all" && S !="all" && W >0 && WT == "EQUAL" && IN != "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and NETTWEIGHT ='"+W+"' and MATERIAL = '"+IN+"' and PARTYNAME ='"+PN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            }else 
            if(ET == "all" && S !="all" && W >0 && WT == "ABOVE" && IN != "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and NETTWEIGHT > '"+W+"' and MATERIAL = '"+IN+"' and PARTYNAME ='"+PN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            } else 
            if(ET == "all" && S !="all" && W >0 && WT == "BELOW" && IN != "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and NETTWEIGHT < '"+W+"' and MATERIAL = '"+IN+"' and PARTYNAME ='"+PN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            }else 
            if(ET != "all" && S !="all" && W > 0 && WT == "EQUAL" && IN != "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and ENTRY_TYPE = '"+ET+"' and NETTWEIGHT ='"+W+"' and MATERIAL = '"+IN+"' and PARTYNAME ='"+PN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            } else
            if(ET != "all" && S !="all" && W > 0 && WT == "ABOVE" && IN == "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and ENTRY_TYPE = '"+ET+"' and NETTWEIGHT > '"+W+"' and MATERIAL = '"+IN+"' and PARTYNAME ='"+PN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            }else     
            if(ET != "all" && S !="all" && W > 0 && WT == "BELOW" && IN == "all" && PN !="all"){
              sql = "SELECT * FROM Weighments where STATUS = '"+S+"' and ENTRY_TYPE = '"+ET+"' and NETTWEIGHT < '"+W+"' and MATERIAL = '"+IN+"' and PARTYNAME ='"+PN+"' and CREATED_DATE BETWEEN '"+FD+"' AND '"+TD+"'";
            }   
          }
         
          // sql = "SELECT * FROM Weighments WHERE  NETTWEIGHT BETWEEN '"+data.fromWeight+"' AND '"+data.toWeight+"' AND CREATED_DATE BETWEEN '"+data.fromDate+"' AND '"+data.toDate+"'";
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


// Party Report   

      getPartyList:function(){
       
        return $.Deferred(function (deferred) {
          var sql = "SELECT DISTINCT PARTYNAME FROM Weighments ORDER BY PARTYNAME ASC";
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
      getPartyWise:function(data){
        return $.Deferred(function (deferred) {
          var sql ="";

            if( data.fromDate != "" && data.toDate !="" && data.partyName == "" && data.status == "" ){
              sql = "SELECT * FROM Weighments WHERE CREATED_DATE BETWEEN '"+data.fromDate+"' AND '"+data.toDate+"' ORDER BY ID DESC";
            }
            if(data.partyName != "" && data.status == ""){
              sql = "SELECT * FROM Weighments WHERE PARTYNAME = '"+data.partyName+"' AND CREATED_DATE BETWEEN '"+data.fromDate+"' AND '"+data.toDate+"' ORDER BY ID DESC";
            }
            if(data.partyName == "" && data.status != ""){
               sql = "SELECT * FROM Weighments WHERE STATUS = '"+data.status+"'AND CREATED_DATE BETWEEN '"+data.fromDate+"' AND '"+data.toDate+"' ORDER BY ID DESC";
            }
            if(data.partyName != "" && data.status != ""){
              sql = "SELECT * FROM Weighments WHERE PARTYNAME = '"+data.partyName+"' AND STATUS = '"+data.status+"' AND CREATED_DATE BETWEEN '"+data.fromDate+"' AND '"+data.toDate+"' ORDER BY ID DESC";
            }
         
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

      
      // Gent Agent
      getAgentList : function(){
        return $.Deferred(function (deferred) {
          var sql = "SELECT DISTINCT AGENT FROM Weighments  ORDER BY AGENT ASC";
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

      getAgentWise:function(data){
        return $.Deferred(function (deferred) {
          var sql ="" 
          if(data.agenName != "" && data.fromDate == "" && data.toDate !="" ){
            if(data.agenName == "all"){
              sql = "SELECT * FROM Weighments";
            }else{
              sql = "SELECT * FROM Weighments where AGENT = '"+data.agenName+"'";
            }
            }if(data.agenName != "" && data.fromDate != "" && data.toDate !=""){
            if(data.agenName != "all"){
              sql = "SELECT * FROM Weighments WHERE AGENT = '"+data.agenName+"' AND CREATED_DATE BETWEEN '"+data.fromDate+"' AND '"+data.toDate+"'";
            }else{
             sql = "SELECT * FROM Weighments WHERE CREATED_DATE BETWEEN '"+data.fromDate+"' AND '"+data.toDate+"'";
            }
          }
          
          // if(data.val===1){
          //   sql = "SELECT * FROM Weighments WHERE AGENT = '"+data.agenName+"' AND CREATED_DATE BETWEEN '"+data.fromDate+"' AND '"+data.toDate+"'";
          // }else{
          //   sql = "SELECT * FROM Weighments";
          // }

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
        
}