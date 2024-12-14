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
	// Construct DSN (Data Source Name) for MySQL
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_NAME"),
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

	// Open connection to MySQL database with custom logger
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: newLogger,
	})
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %v", err)
	}

	// Connection pool configuration
	sqlDB, err := db.DB()
	if err != nil {
		return nil, fmt.Errorf("failed to configure database connection pool: %v", err)
	}

	// SetMaxIdleConns sets the maximum number of connections in the idle connection pool.
	sqlDB.SetMaxIdleConns(10)

	// SetMaxOpenConns sets the maximum number of open connections to the database.
	sqlDB.SetMaxOpenConns(100)

	// SetConnMaxLifetime sets the maximum amount of time a connection may be reused.
	sqlDB.SetConnMaxLifetime(time.Hour)

	// AutoMigrate will create the table if it doesn't exist
	err = db.AutoMigrate(&models.BusinessModel{})
	if err != nil {
		return nil, fmt.Errorf("failed to auto-migrate database: %v", err)
	}

	return db, nil
}