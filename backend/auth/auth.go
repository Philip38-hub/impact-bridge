package auth

import (
	"impact_bridge/database"
	"net/http"

	"github.com/gin-gonic/gin"
)

func SignIn(c *gin.Context) {
	email := c.Query("email")
	password := c.Query("password")
    if email == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Email is required"})
        return
    }

	user, err := database.FindUserByEmail(email, password)
    if err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or user not found"})
        return
    }

	c.JSON(http.StatusOK, gin.H{
        "email":    user.Email,
		"id":       user.ID,
        "password": user.Password,
        "class":    user.Class,
    })
}

func SignUpInvestor(c *gin.Context) {

}

