package main

import (
	"log"
	"os"

	"impactbridge/internal/handlers"
	"impactbridge/internal/middleware"
	"impactbridge/internal/repository"
	"impactbridge/internal/service"
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

	// Initialize repositories
	userRepo := repository.NewUserRepository(db)
	businessRepo := repository.NewBusinessRepository(db)

	// Initialize services
	userService := service.NewUserService(userRepo)
	businessService := service.NewBusinessService(businessRepo)

	// Initialize handlers
	authHandler := handlers.NewAuthHandler(userService)
	userHandler := handlers.NewUserHandler(userService)
	businessHandler := handlers.NewBusinessHandler(businessService)

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

	// API Routes
	v1 := r.Group("/api/v1")
	{
		// Auth routes (no auth required)
		auth := v1.Group("/users")
		{
			auth.POST("/signup/startup", authHandler.SignupStartup)
			auth.POST("/signup/investor", authHandler.SignupInvestor)
			auth.POST("/login", authHandler.Login)
		}

		// Protected routes (auth required)
		protected := v1.Group("")
		protected.Use(middleware.AuthMiddleware())
		{
			// User routes
			users := protected.Group("/users")
			{
				users.GET("/profile", userHandler.GetUserProfile)
				users.PUT("/profile", userHandler.UpdateUserProfile)
				users.GET("/:id", userHandler.GetUserByID)
				users.GET("", userHandler.ListUsers)
			}

			// Business routes
			businesses := protected.Group("/businesses")
			{
				businesses.POST("", businessHandler.CreateBusiness)
				businesses.GET("", businessHandler.ListBusinesses)
				businesses.GET("/:id", businessHandler.GetBusinessByID)
				businesses.PUT("/:id", businessHandler.UpdateBusiness)
				businesses.DELETE("/:id", businessHandler.DeleteBusiness)
			}
		}
	}

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Starting server on port %s", port)
	r.Run(":" + port)
}
