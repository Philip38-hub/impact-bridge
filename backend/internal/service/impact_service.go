package service

import (
	"errors"
	"impactbridge/internal/models"
	"impactbridge/internal/repository"
)

type ImpactService struct {
	repo *repository.ImpactRepository
}

func NewImpactService(repo *repository.ImpactRepository) *ImpactService {
	return &ImpactService{repo: repo}
}

func (s *ImpactService) CreateBusiness(business *models.ImpactBusinessModel) error {
	if err := validateBusiness(business); err != nil {
		return err
	}
	return s.repo.Create(business)
}

func (s *ImpactService) GetBusinessByID(id uint) (*models.ImpactBusinessModel, error) {
	return s.repo.FindByID(id)
}

func (s *ImpactService) UpdateBusiness(business *models.ImpactBusinessModel) error {
	if err := validateBusiness(business); err != nil {
		return err
	}
	return s.repo.Update(business)
}

func (s *ImpactService) DeleteBusiness(id uint) error {
	return s.repo.Delete(id)
}

func (s *ImpactService) ListBusinesses(filters map[string]interface{}) ([]models.ImpactBusinessModel, error) {
	return s.repo.ListByImpactCriteria(filters)
}

// Helper function to validate business data
func validateBusiness(business *models.ImpactBusinessModel) error {
	if business.Name == "" {
		return errors.New("business name is required")
	}

	if business.Sector == "" {
		return errors.New("sector is required")
	}

	if business.JobsCreated < 0 {
		return errors.New("jobs created cannot be negative")
	}

	if business.LocalEmploymentRate < 0 || business.LocalEmploymentRate > 100 {
		return errors.New("local employment rate must be between 0 and 100")
	}

	return nil
}
