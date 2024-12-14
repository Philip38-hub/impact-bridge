package handlers

import (
	"net/http"

	"impactbridge/internal/models"
	"impactbridge/internal/service"

	"github.com/gin-gonic/gin"
)

type AuthHandler struct {
	userService *service.UserService
}

func NewAuthHandler(userService *service.UserService) *AuthHandler {
	return &AuthHandler{userService: userService}
}

type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

type SignupRequest struct {
	Email         string  `json:"email" binding:"required,email"`
	Password      string  `json:"password" binding:"required"`
	UserType      string  `json:"type" binding:"required,oneof=startup investor"`
	Name          string  `json:"name" binding:"required"`
	StartupName   string  `json:"startupName"`
	FounderName   string  `json:"founderName"`
	Industry      string  `json:"industry"`
	Description   string  `json:"description"`
	FundingNeeded string  `json:"fundingNeeded"`
	Revenue       float64 `json:"revenue"`
	Valuation    float64 `json:"valuation"`
}

// Login handles POST /api/auth/login
func (h *AuthHandler) Login(c *gin.Context) {
	var req LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Authenticate user
	user, err := h.userService.AuthenticateUser(req.Email, req.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	// Generate token
	token, err := h.userService.GenerateToken(user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token": token,
		"user": gin.H{
			"id":           user.ID,
			"email":        user.Email,
			"type":         user.UserType,
			"name":         user.Name,
			"startupName":  user.StartupName,
			"founderName":  user.FounderName,
			"industry":     user.Industry,
			"description":  user.Description,
			"fundingNeeded": user.FundingNeeded,
		},
	})
}

// SignupStartup handles POST /api/auth/signup/startup
func (h *AuthHandler) SignupStartup(c *gin.Context) {
	var req SignupRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create user
	user := &models.User{
		Email:         req.Email,
		Password:      req.Password,
		UserType:      "startup",
		Name:          req.Name,
		StartupName:   req.StartupName,
		FounderName:   req.FounderName,
		Industry:      req.Industry,
		Description:   req.Description,
		FundingNeeded: req.FundingNeeded,
	}

	if err := h.userService.CreateUser(user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Generate token
	token, err := h.userService.GenerateToken(user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"token": token,
		"user": gin.H{
			"id":           user.ID,
			"email":        user.Email,
			"type":         user.UserType,
			"name":         user.Name,
			"startupName":  user.StartupName,
			"founderName":  user.FounderName,
			"industry":     user.Industry,
			"description":  user.Description,
			"fundingNeeded": user.FundingNeeded,
		},
	})
}

// SignupInvestor handles POST /api/auth/signup/investor
func (h *AuthHandler) SignupInvestor(c *gin.Context) {
	var req SignupRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create user
	user := &models.User{
		Email:    req.Email,
		Password: req.Password,
		UserType: "investor",
		Name:     req.Name,
	}

	if err := h.userService.CreateUser(user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Generate token
	token, err := h.userService.GenerateToken(user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"token": token,
		"user": gin.H{
			"id":    user.ID,
			"email": user.Email,
			"type":  user.UserType,
			"name":  user.Name,
		},
	})
} 