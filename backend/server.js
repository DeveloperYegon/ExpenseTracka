const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");
const bodyParser = require('body-parser');
const session = require('express-session');
//const morgan = require('morgan');
const {check, validationResult} = require('express-validator');
//initialize app
const app = express();

//middleware
//app.use(morgan('combined'));//morgan for logging
dotenv.config();
app.use(cors());

// Parse URL-encoded bodies (as sent by HTML forms) to handle incoming POST requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// Serve static files (e.g., HTML and CSS files)
app.use(express.static(path.join(__dirname, "../frontend")));

//Serve a static HTML file from the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});
// Define routes

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/register.html'));
});
app.get("/contact", (request, response) => {
    response.sendFile(path.join(__dirname, "../frontend/contact.html"));
});
app.get("/newsletter", (request, response) => {
    response.sendFile(path.join(__dirname, "../frontend/newsletter.html"));
}
);

//configure session middleware
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }//true in production
}));




// Database connection
const db = mysql.createConnection({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
});

// Test connection
db.connect((err) => {
    if (err) {
        console.log("Error connecting to database");
    } else {
        console.log(`Connected to database successfully`);
    }
});

        // Create database
        db.query(`CREATE DATABASE IF NOT EXISTS Expense2024`, (err, result) => {
            if (err) {
                console.log(`Error creating database`);
            } else {
                console.log(`Expense2024 Database created successfully `);
                
                // Use database
                db.changeUser({ database: "Expense2024" }, (err) => {
                    if (err) {
                        console.log(`Error using database Expense2024`);
                    } else {
                        console.log(`Database changed successfully to Expense2024`);
                        initializeTables();
                    }
                }
                );
            }
        }
        );

        // Initialize tables
        function initializeTables() {
            //create tables
            const categoriestable = `
            CREATE TABLE IF NOT EXISTS category(
                category_id INT PRIMARY KEY AUTO_INCREMENT,
                category_name VARCHAR(100) NOT NULL,
                user_id INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )`;
             // Create expenses table
             const expensestable = `
             CREATE TABLE IF NOT EXISTS expenses (
                 id INT PRIMARY KEY AUTO_INCREMENT,
                 Description VARCHAR(100) NOT NULL,
                 amount INT NOT NULL,
                 user_id INT NOT NULL,
                 date DATE NOT NULL,
                 category_id INT NOT NULL,
                 FOREIGN KEY (category_id) REFERENCES categories(category_id),
                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                 FOREIGN KEY (user_id) REFERENCES users(id)

             )`;
              // Create users table
              const userstable = `
              CREATE TABLE IF NOT EXISTS users(
                  id INT PRIMARY KEY AUTO_INCREMENT,
                  first_name VARCHAR(100) NOT NULL,
                  last_name VARCHAR(100) NOT NULL,
                  email VARCHAR(100) UNIQUE NOT NULL,
                  password VARCHAR(100) NOT NULL,
                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
              )`;
               //payment_method table
               const payment_method = `
               CREATE TABLE IF NOT EXISTS payment_method(
                   payment_method_id INT PRIMARY KEY AUTO_INCREMENT,
                   payment_method_name VARCHAR(100) NOT NULL,
                   user_id INT NOT NULL,
                   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                   FOREIGN KEY (user_id) REFERENCES users(id)
               )`;
                   //income table
                   const income = `create table if not exists income(
                    income_id int primary key auto_increment,
                    income_name varchar(100) not null,
                    user_id int not null,
                    created_at timestamp default current_timestamp,
                    updated_at timestamp default current_timestamp on update current_timestamp,
                    foreign key (user_id) references users(id)
                )`;
                 //budget table
                 const budget = `create table if not exists budget( 
                 budget_id int primary key auto_increment,
                 budget_name varchar(100) not null,
                 user_id int not null,
                 category_id int not null,
                 amount int not null,
                 created_at timestamp default current_timestamp,
                 updated_at timestamp default current_timestamp on update current_timestamp,
                 start_date date not null,
                 end_date date not null,
                 foreign key (user_id) references users(id),
                 foreign key (category_id) references category(category_id)
             )`; 
              // contact table
              const contact= `create table if not exists contact(
                contact_id int primary key auto_increment,
                full_name varchar(100) not null,
                email varchar(100) not null,
                message varchar(100) not null,
                created_at timestamp default current_timestamp
            )`;
              //Newsletter subscription table
              const newsletter = `create table if not exists newsletter(
                newsletter_id int primary key auto_increment,
                email varchar(100) not null,
                created_at timestamp default current_timestamp
            )`;
            // Create categories table
    
    db.query(categoriestable, (err, result) => {
        if (err) {
            console.log(`Error creating table category, ${err}`);
        } else {
            console.log(`Category Table created successfully`);
            
            
        }
    });
    
    db.query(expensestable, (err, result) => {
        if (err) {
            console.log(`Error creating expenses table: ${err}`);
        } else {
            console.log(`Expenses Table created successfully`);
        }
    });
    
    db.query(userstable, (err, result) => {
        if (err) {
            console.log(`Error creating users table, ${err}`);
        } else {
            console.log(`Users Table created successfully`);
        }
    });

    
        db.query(payment_method, (err, result) => {
            if (err) {
                console.log(`Error creating payment_method table`);
            } else {
                console.log(`Payment Method Table created successfully`);
            }
        });

    
        db.query(income, (err, result) => {
            if (err) {
                console.log(`Error creating income table`);
            } else {
                console.log(`Income Table created successfully`);
            }
        });

        
        db.query(budget, (err, result) => {
            if (err) {
                console.log(`Error creating budget table`);
            } else {
                console.log(`Budget Table created successfully`);
            }
        });

        
        db.query(newsletter, (err, result) => {
            if (err) {
                console.log(`Error creating newsletter table`);
            } else {
                console.log(`Newsletter Table created successfully`);
            }
        });

        

        db.query(contact, (err, result) => {
            if (err) {
                console.log(`Error creating contact table`);
            } else {
                console.log(`Contact Table created successfully`);
            }
        });
         

        }
                        
    
        // Register user
        app.post("/api/register", async (req, res) => {
            const { first_name, last_name, email, password,terms,country} = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            db.query(
                `INSERT INTO users (first_name, last_name, email, password,terms_accepted,country) VALUES (?, ?, ?, ?,?,?)`,
                [first_name, last_name, email, hashedPassword,terms,country],
                (err, result) => {
                    if (err) {
                      //user already exist
                        res.json({ success: false, message: 'User Already Registered!!' });

                    } else {
                        //user registered successfully
                        if(email != ""){
                            res.json({ success: true, message: 'User registered successfully' });
                        }else{
                            //Empty entries
                            res.json({ success: false, message: 'Email won\'t be empty' });
                        }
                        
                    }
                }
            );
        });
        //login user
        app.post("/api/login", async (req, res) => {
            const { email, password } = req.body;
            db.query(
                `SELECT * FROM users WHERE email = ?`,
                [email],
                async (err, result) => {
                    if (err) {
                        
                        console.log(`Error logging in user`);
                        res.status(500).send("Error logging in user");
                    } else {
                        if (result.length > 0) {
                            const user = result[0];
                            const validPassword = await bcrypt.compare(password, user.password);
                            if (validPassword) {
                                res.json({ success: true, message: 'Login successful!' });
                            } else {
                                res.json({ success: false, message: 'Invalid email or password.' });
                            }
                        } else {
                            res.status(401).send("User does not exist");
                        }
                    }
                }
            );
        });

        //newsletter subscription
        app.post("/newsletter", async (req, res) => {
            const { email } = req.body;
            db.query(
                `INSERT INTO newsletter (email) VALUES (?)`,
                [email],
                (err, result) => {
                    if (err) {
                        res.json({ success: false, message: 'User Already subscribed!!' });
                    } else {
                        res.json({ success: true, message: 'User subscriped successfully' });
                    }
                }
            );
        });

        //inserting contact form
        app.post("/contact", async (req, res) => {
            const { full_name, email, message } = req.body;
            db.query(
                `INSERT INTO contact (full_name, email, message) VALUES (?, ?, ?)`,
                [full_name, email, message],
                (err, result) => {
                    if (err) {
                        res.json({ success: false, message: 'Error sending message' });
                    } else {
                        res.json({ success: true, message: 'Message sent successfully' });
                    }
                }
            );
        });

        
app.listen(3003, () => {
    console.log("Server is running on port 3003");
});
