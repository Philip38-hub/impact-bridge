package handlers

import (
	"net/http"
	"strconv"

	"impactbridge/internal/models"
	"impactbridge/internal/repository"
	"impactbridge/internal/service"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type BusinessHandler struct {
	service *service.BusinessService
}
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
func NewBusinessHandler(db *gorm.DB) *BusinessHandler {
	repo := repository.NewBusinessRepository(db)
	srv := service.NewBusinessService(repo)
	return &BusinessHandler{service: srv}
}

func (h *BusinessHandler) CreateBusiness(c *gin.Context) {
	var business models.BusinessModel
	if err := c.ShouldBindJSON(&business); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.service.CreateBusiness(&business); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, business)
}

func (h *BusinessHandler) GetBusinessByID(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	business, err := h.service.GetBusinessByID(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Business not found"})
		return
	}

	c.JSON(http.StatusOK, business)
}

func (h *BusinessHandler) ListBusinesses(c *gin.Context) {
	// Parse query parameters for filtering
	filters := make(map[string]interface{})
	
	if sector := c.Query("sector"); sector != "" {
		filters["sector"] = sector
	}
	
	if stage := c.Query("stage"); stage != "" {
		filters["business_stage"] = stage
	}

	businesses, err := h.service.ListBusinesses(filters)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, businesses)
}

func (h *BusinessHandler) UpdateBusiness(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	var business models.BusinessModel
	if err := c.ShouldBindJSON(&business); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	business.ID = uint(id)
	if err := h.service.UpdateBusiness(&business); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, business)
}

func (h *BusinessHandler) DeleteBusiness(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	if err := h.service.DeleteBusiness(uint(id)); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Business deleted successfully"})
}

