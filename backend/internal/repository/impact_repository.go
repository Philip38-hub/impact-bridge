package repository

import (
	"impactbridge/internal/models"

	"gorm.io/gorm"
)

type ImpactRepository struct {
	db *gorm.DB
}

func NewImpactRepository(db *gorm.DB) *ImpactRepository {
	return &ImpactRepository{db: db}
}

func (r *ImpactRepository) Create(business *models.ImpactBusinessModel) error {
	// Calculate impact score before saving
	business.ImpactScore = business.ComputeImpactScore()
	return r.db.Create(business).Error
}

func (r *ImpactRepository) FindByID(id uint) (*models.ImpactBusinessModel, error) {
	var business models.ImpactBusinessModel
	err := r.db.First(&business, id).Error
	return &business, err
}

func (r *ImpactRepository) Update(business *models.ImpactBusinessModel) error {
	// Recalculate impact score before updating
	business.ImpactScore = business.ComputeImpactScore()
	return r.db.Save(business).Error
}

func (r *ImpactRepository) Delete(id uint) error {
	return r.db.Delete(&models.ImpactBusinessModel{}, id).Error
}

func (r *ImpactRepository) ListByImpactCriteria(filters map[string]interface{}) ([]models.ImpactBusinessModel, error) {
	var businesses []models.ImpactBusinessModel
	query := r.db

	if minImpact, ok := filters["min_impact_score"].(float64); ok {
		query = query.Where("impact_score >= ?", minImpact)
	}

	if sdgs, ok := filters["sdg_alignment"].([]string); ok {
		query = query.Where("sdg_alignment @> ?", sdgs)
	}

	if sector, ok := filters["sector"].(string); ok {
		query = query.Where("sector = ?", sector)
	}

	err := query.Find(&businesses).Error
	return businesses, err
}
