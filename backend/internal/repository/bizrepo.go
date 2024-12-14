package repository

import (
	"impactbridge/internal/models"

	"gorm.io/gorm"
)

type BusinessRepository struct {
	db *gorm.DB
}

func NewBusinessRepository(db *gorm.DB) *BusinessRepository {
	return &BusinessRepository{db: db}
}

func (r *BusinessRepository) Create(business *models.BusinessModel) error {
	return r.db.Create(business).Error
}

func (r *BusinessRepository) FindByID(id uint) (*models.BusinessModel, error) {
	var business models.BusinessModel
	err := r.db.First(&business, id).Error
	return &business, err
}

func (r *BusinessRepository) Update(business *models.BusinessModel) error {
	return r.db.Save(business).Error
}

func (r *BusinessRepository) Delete(id uint) error {
	return r.db.Delete(&models.BusinessModel{}, id).Error
}

func (r *BusinessRepository) List(filters map[string]interface{}) ([]models.BusinessModel, error) {
	var businesses []models.BusinessModel
	query := r.db

	// Apply filters if provided
	for key, value := range filters {
		query = query.Where(key+" = ?", value)
	}

	err := query.Find(&businesses).Error
	return businesses, err
}
