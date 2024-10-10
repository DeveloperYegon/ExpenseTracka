
    // Initialize tables
 function initializeTables(db) {
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
module.exports = { initializeTables }; // Export the function
                    