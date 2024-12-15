package main

import (
	"fmt"
	"impact_bridge/api"
	"impact_bridge/auth"
	"impact_bridge/database"

	"github.com/gin-gonic/gin"
)

func main() {
	// Start server
	router := gin.Default()

	if !database.CheckUser() {
		fmt.Println("Error connecting to database")
		return
	}

	// API routes
	router.GET("/login", auth.SignIn)
	router.GET("/api/fetchdata", api.FetchData)
	router.GET("/api/investors", api.FetchInvesters)
	router.GET("/api/startups", api.FetchStartups)
	router.POST("/signup/startup", database.SignUpStartup)
	router.POST("/signup/investor", auth.SignUpInvestor)

	router.Run(":8080")
}