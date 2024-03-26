$(document).ready(() => {
    app.database.createDB();

  });
  
  app.masterSettings = {
 
    SaveData: () => {
       
        let data = {};
        data.fieldName = $('#fieldName').val();
        data.fieldText = $('#fieldText').val();
        data.fieldVal = $('#fieldVal').val();
        data.currentDate = new Date().toISOString().slice(0, 10);

            app.database.tables.bmrmaster.saveMaster(data);
            // alert("Data Saved Successfully ...");
            // location.reload();
            toastr.options = {
              positionClass: 'toast-bottom-right'
             };
             toastr.success('Saved Successfully...😀👍', '', {timeOut: 1000});
             setTimeout(function(){
               location.reload();
             },1300); 
      },

      GetData: (val) => {
      
        $.when(
            app.database.tables.bmrmaster.getFieldsData(val)
        ).done(function (data) {   
              if(data != null){
                app.masterSettings.showList(data); 
              }else{
                $("#fieldBody").empty();
                
              }
        });
      },

        showList: (data) => {
            if (!data) {
              return;
            }
            $("#fieldBody").empty();
            for (let i = 0; i < data.length; i++) {
              let j = i + 1;
             
              $("#fieldBody").append(`
                <tr>
                    <td>
                        <div class="d-flex px-2">
                            <div></div>
                            <div class="my-auto">
                                <h6 class="mb-0 text-xs">${j}</h6>
                            </div>
                        </div>
                    </td>
                    <td>
                    <lable> ${data[i].FEILDNAME}</lable>
                        <input class="form-control" type="hidden" value="${data[i].ID}" id="fieldId${j}">
                    </td>

                    <td>
                         <input class="form-control"   type="text" value="${data[i].FEILDTEXT}" id="fieldTewxt${j}" >
                    </td>

                    <td>
                    <input class="form-control"   type="text" value="${data[i].FEILDVALUE}" id="fieldVal${j}" >
                    </td>

                    <td>
                    <button class="btn btn-dark btn-sm mb-0 me-3" onclick="app.masterSettings.UpdateRec(${data[i].ID},${j})">Update</button>
                    <button  class="btn btn-dark btn-sm mb-0 me-3" onclick="app.masterSettings.deleteRec(${data[i].ID},${j})">Delete</button>
                    </td>
                </tr>
            `);
              
            }
          },

          deleteRec:(id,i)=>{
            
            app.database.tables.bmrmaster.DeleteRecord(id);
            toastr.options = {
              positionClass: 'toast-bottom-right'
             };
             toastr.success('Updated Successfully...😀👍', '', {timeOut: 1000});
             setTimeout(function(){
               location.reload();
             },1300); 
             
          },

          UpdateRec:(id,i)=>{
            let data = {};
            data.fieldText = $("#fieldTewxt"+i).val();
            data.fieldVal = $("#fieldVal"+i).val();
            data.id = id;
            data.currentDate = new Date().toISOString().slice(0, 10);
            
            app.database.tables.bmrmaster.UpdateRecord(data);
             alert("data Updated Successfully..")
            // toastr.options = {
            //   positionClass: 'toast-bottom-right'
            //  };
            //  toastr.success('Updated Successfully...😀👍', '', {timeOut: 1000});
            
          },

  };
  