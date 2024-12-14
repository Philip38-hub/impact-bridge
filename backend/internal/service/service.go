package service

import (
	"fmt"
	"impactbridge/internal/models"
	"impactbridge/internal/repository"
)

type BusinessService struct {
	repo *repository.BusinessRepository
}

func NewBusinessService(repo *repository.BusinessRepository) *BusinessService {
	return &BusinessService{repo: repo}
}

func (s *BusinessService) CreateBusiness(business *models.BusinessModel) error {
	// Validate business model
	if err := validateBusinessModel(business); err != nil {
		return err
	}
	return s.repo.Create(business)
}

func (s *BusinessService) GetBusinessByID(id uint) (*models.BusinessModel, error) {
	return s.repo.FindByID(id)
}

func (s *BusinessService) UpdateBusiness(business *models.BusinessModel) error {
	// Validate business model
	if err := validateBusinessModel(business); err != nil {
		return err
	}
	return s.repo.Update(business)
}

func (s *BusinessService) DeleteBusiness(id uint) error {
	return s.repo.Delete(id)
}

func (s *BusinessService) ListBusinesses(filters map[string]interface{}) ([]models.BusinessModel, error) {
	return s.repo.List(filters)
}

// Validation function
func validateBusinessModel(business *models.BusinessModel) error {
	if business.Name == "" {
		return fmt.Errorf("business name is required")
	}

	if business.Sector == "" {
		return fmt.Errorf("business sector is required")
	}

	if business.MoneyRaised < 0 {
		return fmt.Errorf("money raised cannot be negative")
	}

	return nil
}