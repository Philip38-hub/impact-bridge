package server

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func checkConnection() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	dbUsername := os.Getenv("DB_USERNAME")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbName := os.Getenv("DB_NAME")

	//Prepare the database
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", dbUsername, dbPassword, dbHost, dbPort, dbName)

	db, err := sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal("Error opening database: ", err)
	}
	defer db.Close()

	// Ping the database
	err = db.Ping()
	if err != nil {
		log.Fatal("Error connecting to the database: ", err)
	}
	fmt.Println("Database connection successful")
}

func Start() *gin.Engine {
	checkConnection()
	router := gin.Default()

	router.GET("/api/data", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{"message": "Hello from GIN!"})
	})

	// Serve static
	router.Static("/static", "./frontend/build")

	// Call React App
	router.NoRoute(func(ctx *gin.Context) {
		ctx.File("./frontend/build/index.html")
	})

	return router
}