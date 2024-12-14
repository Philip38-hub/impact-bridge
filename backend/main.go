package main

import (
	"log"
	"os"

	"impactbridge/internal/handlers"
	"impactbridge/pkg/database"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using system environment")
	}

	// Initialize database connection
	db, err := database.NewMySQLConnection()
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	// Setup Gin router
	r := gin.Default()

	// CORS Middleware
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	// Business Model Routes
	businessHandler := handlers.NewBusinessHandler(db)
	v1 := r.Group("/api/v1")
	{
		v1.POST("/businesses", businessHandler.CreateBusiness)
		v1.GET("/businesses", businessHandler.ListBusinesses)
		v1.GET("/businesses/:id", businessHandler.GetBusinessByID)
		v1.PUT("/businesses/:id", businessHandler.UpdateBusiness)
		v1.DELETE("/businesses/:id", businessHandler.DeleteBusiness)
	}

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Starting server on port %s", port)
	r.Run(":" + port)
}
