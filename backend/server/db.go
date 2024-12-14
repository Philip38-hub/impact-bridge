package server

import (
	"database/sql"
	"fmt"
	"log"
	_ "github.com/go-sql-driver/mysql"
)

func GetDB() {
	dsn := "hack:My_pass2@tcp(102.208.216.208:3306)/impact_bridge"
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Check if connection is live
	if err := db.Ping(); err != nil {
		log.Fatal(err)
	}
	fmt.Println("Connected to MySQL!")

	// To insert data
	insertQuery := "INSERT INTO users (name, email) VALUES (?, ?)"
	_, err = db.Exec(insertQuery, "John Doe",
                                  "johndoe@example.com")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("User added successfully")

	// Fetch DATA
	rows, err := db.Query("SELECT id, name, email FROM users")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	fmt.Println("Users in database:")
	for rows.Next() {
		var id int
		var name, email string
		if err := rows.Scan(&id, &name, &email); err != nil { log.Fatal(err) }
		fmt.Printf("%d: %s (%s)\n", id, name, email)
	}

	if err := rows.Err(); err != nil { log.Fatal(err) }
}
