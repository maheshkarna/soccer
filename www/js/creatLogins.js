$(document).ready(() => {
  app.database.createDB();
  //app.logins.loadTask();
  app.creatLogins.loadLogins();
  $("#createLogin").click(function () {
    app.creatLogins.addLogin();
  });

  $("#updateLogin").click(function () {
    app.creatLogins.updateLogin();
  });
});

app.creatLogins = {
  addLogin: () => {
    let data = {};
    let password = document.getElementById("password").value;
    let username = document.getElementById("username").value;
    data.password = password;
    data.username = username;
    app.database.tables.creatLogins.save(data.password, data.username);
    $.when(
      app.database.tables.creatLogins.save(data.password, data.username)
    ).done(function () {
      app.creatLogins.loadLogins();
    });
  },

  loadLogins: () => {
    $.when(app.database.tables.creatLogins.getLoginsList()).done(function (
      result
    ) {
      app.log(result);
      app.creatLogins.showLogins(result);
    });
  },

  showLogins: (result) => {
    $("#loginsTableBody").empty();
    if (!result) {
      return;
    }
    for (let i = 0; i < result.length; i++) {
      let j = i + 1;
      $("#loginsTableBody").append(
        '<tr><th scope="row">' +
          j +
          "</th>" +
          "<td>" +
          result[i].USERNAME +
          "</td>" +
          "<td>" +
          result[i].PASSWORD +
          "</td>" +
          /* "<input type=\"hidden\"  value="+result[i].ID+" id=\"LoginId\">"+*/
          "<td><button value=" +
          result[i].ID +
          " class=\"btn btn-danger\" onclick='app.creatLogins.deleteLogin(this.value)'>Delete</button>" +
          "&nbsp;<button value=" +
          result[i].ID +
          " class=\"btn btn-primary\" onclick='app.creatLogins.viewLogin(this.value)'>Edit</button></td></tr>"
      );
    }
  },

  viewLogin: (id) => {
    /*alert(id);*/
    $.when(app.database.tables.creatLogins.getLoginById(id)).done(function (
      result
    ) {
      app.log(result);
      app.creatLogins.showLoginById(result);
    });
  },

  showLoginById: (result) => {
    let username = result[0].USERNAME;
    let password = result[0].PASSWORD;
    let loginId = result[0].ID;
    document.getElementById("username").value = username;
    document.getElementById("password").value = password;
    document.getElementById("loginId").value = loginId;
    document.getElementById("updateLogin").style.display = "block";
    document.getElementById("createLogin").style.display = "none";
  },

  updateLogin: (id) => {
    let data = {};
    let password = document.getElementById("password").value;
    let username = document.getElementById("username").value;
    let loginId = document.getElementById("loginId").value;
    data.password = password;
    data.username = username;
    data.loginId = loginId;
    app.database.tables.creatLogins.update(
      data.password,
      data.username,
      data.loginId
    );

    $.when(
      app.database.tables.creatLogins.update(data.password, data.username)
    ).done(function () {
      alert("Updated Successfully...😀👍");
      app.creatLogins.loadLogins();
    });
  },

  deleteLogin: (eleObj) => {
    app.database.tables.creatLogins.deleteLoginById(eleObj);
    app.creatLogins.loadLogins();
  },
};
