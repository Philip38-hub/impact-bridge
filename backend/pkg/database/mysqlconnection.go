package database

import (
	"fmt"
	"log"
	"os"
	"time"

	"impactbridge/internal/models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func NewMySQLConnection() (*gorm.DB, error) {
	// Use the working DSN format from db.go
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		os.Getenv("DB_USER"),     // hack
		os.Getenv("DB_PASSWORD"), // My_pass2
		os.Getenv("DB_HOST"),     // msheesh.webhop.me
		os.Getenv("DB_PORT"),     // 3306
		os.Getenv("DB_NAME"),     // impact_bridge
	)

	// Create custom logger
	newLogger := logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags),
		logger.Config{
			SlowThreshold: time.Second,
			LogLevel:      logger.Info,
			Colorful:      true,
		},
	)

	// Open connection
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: newLogger,
	})
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %v", err)
	}

	// Test connection (similar to Ping() in db.go)
	sqlDB, err := db.DB()
	if err != nil {
		return nil, err
	}
	if err := sqlDB.Ping(); err != nil {
		return nil, err
	}
	fmt.Println("Connected to MySQL!")

	// Connection pool settings
	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)
	sqlDB.SetConnMaxLifetime(time.Hour)

	// Auto-migrate schemas
	err = db.AutoMigrate(&models.BusinessModel{})
	if err != nil {
		return nil, fmt.Errorf("failed to auto-migrate database: %v", err)
	}

	// Optional: Add test data insertion (like in db.go)
	// This should probably be moved to a separate seed function
	/*
		result := db.Create(&models.BusinessModel{
			Name: "Test Business",
			Email: "test@example.com",
			// ... other fields
		})
		if result.Error != nil {
			log.Printf("Warning: Could not insert test data: %v", result.Error)
		}
	*/

	return db, nil
}
