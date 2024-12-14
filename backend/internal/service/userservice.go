package service

import (
	"fmt"
	"impactbridge/internal/models"
	"impactbridge/internal/repository"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type UserService struct {
	repo *repository.UserRepository
}

func NewUserService(repo *repository.UserRepository) *UserService {
	return &UserService{repo: repo}
}

func (s *UserService) GetUserByID(id uint) (*models.User, error) {
	user, err := s.repo.FindByID(id)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, fmt.Errorf("user not found")
		}
		return nil, err
	}
	return user, nil
}

func (s *UserService) GetUserByEmail(email string) (*models.User, error) {
	user, err := s.repo.FindByEmail(email)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, fmt.Errorf("user not found")
		}
		return nil, err
	}
	return user, nil
}

func (s *UserService) CreateUser(user *models.User) error {
	// Check if user already exists
	existingUser, err := s.repo.FindByEmail(user.Email)
	if err != nil && err != gorm.ErrRecordNotFound {
		return err
	}
	if existingUser != nil {
		return fmt.Errorf("user with email %s already exists", user.Email)
	}

	// Hash password
	if user.Password != "" {
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
		if err != nil {
			return fmt.Errorf("failed to hash password: %v", err)
		}
		user.Password = string(hashedPassword)
	}

	// Create new user
	return s.repo.Create(user)
}

func (s *UserService) UpdateUser(user *models.User) error {
	// Check if user exists and get current data
	existingUser, err := s.repo.FindByID(user.ID)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return fmt.Errorf("user not found")
		}
		return err
	}

	// Update only provided fields
	if user.Email != "" {
		existingUser.Email = user.Email
	}
	if user.Password != "" {
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
		if err != nil {
			return fmt.Errorf("failed to hash password: %v", err)
		}
		existingUser.Password = string(hashedPassword)
	}
	if user.UserType != "" {
		existingUser.UserType = user.UserType
	}
	if user.StartupName != "" {
		existingUser.StartupName = user.StartupName
	}
	if user.FounderName != "" {
		existingUser.FounderName = user.FounderName
	}
	if user.Name != "" {
		existingUser.Name = user.Name
	}
	if user.Industry != "" {
		existingUser.Industry = user.Industry
	}
	if user.Description != "" {
		existingUser.Description = user.Description
	}
	if user.FundingNeeded != "" {
		existingUser.FundingNeeded = user.FundingNeeded
	}

	// Update user
	return s.repo.Update(existingUser)
}

func (s *UserService) DeleteUser(id uint) error {
	return s.repo.Delete(id)
}

func (s *UserService) ListUsers(filters map[string]interface{}) ([]models.User, error) {
	return s.repo.List(filters)
}

// Authentication methods

func (s *UserService) AuthenticateUser(email, password string) (*models.User, error) {
	user, err := s.repo.FindByEmail(email)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, fmt.Errorf("invalid email or password")
		}
		return nil, err
	}

	// Compare passwords
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return nil, fmt.Errorf("invalid email or password")
	}

	return user, nil
}

func (s *UserService) GenerateToken(user *models.User) (string, error) {
	// Create claims
	claims := jwt.MapClaims{
		"userId":   user.ID,
		"userType": user.UserType,
		"exp":      time.Now().Add(time.Hour * 24).Unix(), // Token expires in 24 hours
	}

	// Create token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Get JWT secret from environment variable
	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		return "", fmt.Errorf("JWT_SECRET not set")
	}

	// Sign and get the complete encoded token as a string
	tokenString, err := token.SignedString([]byte(jwtSecret))
	if err != nil {
		return "", fmt.Errorf("failed to generate token: %v", err)
	}

	return tokenString, nil
} 