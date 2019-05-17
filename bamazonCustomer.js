var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.ROOT_KEY,
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    readyToGo();
});

function readyToGo() {
    inquirer.prompt({
        name: "initialize",
        type: "list",
        message: "Would you like to buy something from Bamazon today?",
        choices: ["YES", "NO", "EXIT"]
    })
        .then(function (answer) {
            if (answer.initialize === "YES") {
                inquirer.prompt([
                    {
                        name: "peruse",
                        type: "list",
                        message: "Please peruse our wares. Which item would you like to purchase?",
                        choices: ["Nintendo Switch", "T-shirt", "Hydroflask", "Mascara", "Concealer", "Magic Wand", "Iphone XS Max", "East of Eden", "Ender's Game", "The Golden Compass"]
                    },
                    {
                        name: "purchase",
                        type: "number",
                        message: "How many would you like to buy?"
                    }]).then(function (answer) {
                        connection.query("select * from products", function (err, res) {
                            // console.log(res);
                            var yourChoice;
                            for (let i = 0; i < res.length; i++) {
                                if (answer.peruse === res[i].product_name) {
                                    yourChoice = res[i];
                                }
                            }

                            if (answer.purchase > yourChoice.stock_quantity) {
                                console.log("We're sorry, we don't have that many right now. Please try again with a lower number.");
                                connection.end();
                            } else {
                                var newQuan = yourChoice.stock_quantity - answer.purchase;
                                
                                
                                connection.query("update products set ? where ?",
                                [
                                    {
                                        stock_quantity: newQuan
                                    },
                                    {
                                        product_name: answer.peruse
                                    }
                                ], function (err, res) {
                                    console.log("Thanks for your purchase! There are now " + newQuan + " " + answer.peruse + " left.");
                                    
                                })
                            }
                        })
                    })
            }
            else if (answer.purchase === "NO") {
                console.log("Thanks for stopping by!");
                connection.end();
            }
        });
}
