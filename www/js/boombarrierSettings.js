$(document).ready(() => {
    app.database.createDB();

    app.boombarrier.insertFieldsData();

    // $("#updateFields").click(function () {
    //   app.index.getformData();
    // });
  
  });
  
app.boombarrier = {
   
getformData:() =>{
let fieldlvals = [];
let fieldIds = [];
let isVisibleVals = [];
let isMandatoryVals = [];

// populate the arrays with 32 elements
for (let i = 1; i <= 33; i++) {
  fieldlvals.push($("#fieldtext" + i).val());
  fieldIds.push($("#fieldId" + i).val());
  isVisibleVals.push(($("#isVisble" + i).prop("checked") ? 1 : 0));
  isMandatoryVals.push(($("#isMandetory" + i).prop("checked") ? 1 : 0));
}

// loop through the arrays and update the data
    for (let i = 0; i < 33; i++) {
    let fieldlval = fieldlvals[i];
    let fieldId = fieldIds[i];
    let isVisbleVal = isVisibleVals[i];
    let isMandetory = isMandatoryVals[i];
    app.database.tables.boombarrier.updateData(fieldlval, isVisbleVal, isMandetory, fieldId);
    }

    toastr.options = {
        positionClass: 'toast-bottom-right'
    };
    toastr.success('Settings Updated Successfully...😀👍', '', {timeOut: 1000},)

    },
  



    insertFieldsData:()=>{
        $.when(
            app.database.tables.boombarrier.checkFieldsData()
          ).done(function (data) {   
            console.log(data); 
            
            if(data == null || data.length == 0){
           
                app.database.tables.boombarrier.insertData();
            }else{
          
              app.boombarrier.showFields(data);
              
            }   
          });    
    },
       
    showFields: (data) => {
     
        if (!data) {
          return;
        }
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
                    <input class="form-control"   type="text" value="${data[i].FEILDTEXT}" id="fieldtext${j}" >
                    <input class="form-control" type="hidden" value="${data[i].ID}" id="fieldId${j}">
                </td>
                <td class="align-middle text-center">
                    <div class="form-check form-switch ps-0">
                        <input class="form-check-input ms-auto" type="checkbox" onchange="checkVis('isVisble${i+1}','isMandetory${i+1}')" value="${data[i].ISVISIBLE}" id="isVisble${j}" ${data[i].ISVISIBLE == 1 ? 'checked' : ''}>
                      
                    </div>
                </td>
                <td class="align-middle">
                    <div class="form-check form-switch ps-0">
                        <input class="form-check-input ms-auto" type="checkbox" onchange="checkMandatory('isVisble${i+1}','isMandetory${i+1}')" value="${data[i].ISMANDATORY}" id="isMandetory${j}" ${data[i].ISMANDATORY == 1 ? 'checked' : ''}>
  
                    </div>
                </td>
            </tr>
        `);
          
        }
      },
    
  
  };
  