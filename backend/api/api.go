package api

import (
	"impact_bridge/database"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func FetchInvesters(c *gin.Context) {
	// Get the limit from query params
    limitStr := c.Query("limit")
    limit := 10 // Default limit
    if limitStr != "" {
        var err error
        limit, err = strconv.Atoi(limitStr)
        if err != nil || limit <= 0 {
            c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid limit parameter"})
            return
        }
    }

	investorsData, err := database.FetchInvestors(limit)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}
	c.JSON(http.StatusOK, investorsData)
}

func FetchStartups(c *gin.Context) {
	// Get the limit from query params
    limitStr := c.Query("limit")
    limit := 10 // Default limit
    if limitStr != "" {
        var err error
        limit, err = strconv.Atoi(limitStr)
        if err != nil || limit <= 0 {
            c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid limit parameter"})
            return
        }
    }

	startupsData, err := database.FetchStartups(limit)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}
	c.JSON(http.StatusOK, startupsData)
}

func FetchData(c *gin.Context) {
	idStr := c.Query("id")
    class := c.Query("class")

	id, err := strconv.Atoi(idStr)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
        return
    }

	if class == "startup" {
		userDetails, err := database.FetchStartupDetails(id)
		if err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
			return
		}
		c.JSON(http.StatusOK, userDetails)
	} else if class == "investor" {
		userDetails, err := database.FetchInvestorDetails(id)
		if err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
			return
		}
		c.JSON(http.StatusOK, userDetails)
	}

}