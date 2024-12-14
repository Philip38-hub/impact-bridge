package routes

import (
	"database/sql"
	database "impactbridge/server/Database"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB

func Router(router *gin.Engine, datbase *sql.DB) {
	db = datbase
	
	router.GET("/api/data", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{"message": "Hello from GIN!"})
	})

	// Serve static
	router.Static("/static", "./frontend/build")

	// Call React App
	router.NoRoute(func(ctx *gin.Context) {
		ctx.File("./frontend/build/index.html")
	})

	router.GET("/login", login)
	router.POST("/signup/investor", database.SignupInvestor)
	router.POST("/signup/startup", database.SignupStartup)
	router.GET("/api/investors", database.GetInvestors)
}

func login(c *gin.Context) {
	email := c.Query("email")
	password := c.Query("password")

	var storedPass string
	err := db.QueryRow("SELECT password FROM startup WHERE username = ?", email).Scan(&storedPass)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
		return
	}

	if storedPass != password {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Login successfu"})
}