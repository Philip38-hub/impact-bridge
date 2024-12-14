package handlers

import (
	"net/http"
	"strconv"

	"impactbridge/internal/models"
	"impactbridge/internal/service"

	"github.com/gin-gonic/gin"
)

type ImpactHandler struct {
	service *service.ImpactService
}

func NewImpactHandler(service *service.ImpactService) *ImpactHandler {
	return &ImpactHandler{service: service}
}

func (h *ImpactHandler) CreateBusiness(c *gin.Context) {
	var business models.ImpactBusinessModel
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

func (h *ImpactHandler) GetBusinessByID(c *gin.Context) {
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

func (h *ImpactHandler) ListBusinesses(c *gin.Context) {
	filters := make(map[string]interface{})

	// Parse impact-specific filters
	if minScore := c.Query("min_score"); minScore != "" {
		if score, err := strconv.ParseFloat(minScore, 64); err == nil {
			filters["min_impact_score"] = score
		}
	}

	if sector := c.Query("sector"); sector != "" {
		filters["sector"] = sector
	}

	if sdgs := c.QueryArray("sdg"); len(sdgs) > 0 {
		filters["sdg_alignment"] = sdgs
	}

	businesses, err := h.service.ListBusinesses(filters)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, businesses)
}

func (h *ImpactHandler) UpdateBusiness(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	var business models.ImpactBusinessModel
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

func (h *ImpactHandler) DeleteBusiness(c *gin.Context) {
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
