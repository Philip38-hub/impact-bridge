package server

import (
	"net/http"
	"github.com/gin-gonic/gin"
)

func Start() *gin.Engine {
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