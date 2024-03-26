$(document).ready(()=>{
    app.database.createDB();
    app.reports.getWeighmentsList();
});
app.reports = {
getWeighmentsList : ()=>{

    $.when(app.database.tables.weighment.getWBGList())
    .done(function (data) {
        
     if(data != null && data != ""){
        let WBGCount = data[0].NOOFWEIGHBRIDGES;
      
     let dataContainer ="";
     for (let i = 0; i < WBGCount; i++) {
      dataContainer += `
      <div class="col-sm-6 col-md-6">
        <a href="#" onclick="getWBG('WBG${i+1}')">
        <div class="card overflow-hidden">
          <div class="card-content">
            <div class="card-body cleartfix">
              <div class="media align-items-stretch">
                <div class="align-self-center">
                  <img src="css/images/Wt.jpg">
                </div>
                <div class="align-self-center">
                  <h1>Weighbridge WBG${i+1}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
      </div>
      `;
    }
    $("#WBGbody").append(dataContainer);
      }
    });
  }
} 
