var mysql = require("mysql");
var inquirer = require("inquirer");
require(".env").config();

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "---",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    readyToGo();
});

function readyToGo() {
    inquirer.prompt({
        name: "purchase",
        type: "list",
        message: "Would you like to buy anything you see here?",
        choices: ["YES", "NO", "EXIT"]
    })
        .then(function (answer) {
            if (answer.purchase === "YES") {
                
            }
            else if (answer.purchase === "NO") {
                connection.end();
            }
        });
}
