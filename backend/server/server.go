package server

import (
	database "impactbridge/server/Database"
	"impactbridge/server/routes"

	"github.com/gin-gonic/gin"
)

func Start() *gin.Engine {
	db := database.CheckConnection()
	router := gin.Default()

	routes.Router(router, db)

	return router
}
