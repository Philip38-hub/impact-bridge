package models

import (
	"time"

	"gorm.io/gorm"
)

// User represents a user in the system
type User struct {
	gorm.Model
	Email        string    `json:"email" gorm:"type:varchar(255);uniqueIndex;not null"`
	Password     string    `json:"-" gorm:"type:varchar(255)"` // "-" means don't show in JSON
	GoogleID     string    `json:"googleId" gorm:"type:varchar(255);uniqueIndex"`
	UserType     string    `json:"userType" gorm:"type:enum('startup','investor');not null"`
	StartupName  string    `json:"startupName" gorm:"type:varchar(255)"`
	FounderName  string    `json:"founderName" gorm:"type:varchar(255)"`
	Name         string    `json:"name" gorm:"type:varchar(255)"`
	Industry     string    `json:"industry" gorm:"type:varchar(255)"`
	Description  string    `json:"description" gorm:"type:text"`
	FundingNeeded string   `json:"fundingNeeded" gorm:"type:varchar(255)"`
	CreatedAt    time.Time `json:"createdAt" gorm:"default:CURRENT_TIMESTAMP"`
}

type BusinessModel struct {
	gorm.Model
	Name          string `json:"name" gorm:"type:varchar(255);not null"`
	Sector        string `json:"sector" gorm:"type:varchar(100)"`
	BusinessStage string `json:"business_stage" gorm:"type:varchar(50)"`

	// Financial Metrics
	RevenueModel    string  `json:"revenue_model" gorm:"type:varchar(100)"`
	MoneyRaised     float64 `json:"money_raised" gorm:"type:decimal(15,2)"`
	ProjectedGrowth float64 `json:"projected_growth" gorm:"type:decimal(10,2)"`

	// Detailed Business Information
	ValueProposition string `json:"value_proposition" gorm:"type:text"`
	CustomerSegments string `json:"customer_segments" gorm:"type:text"`
	KeyResources     string `json:"key_resources" gorm:"type:text"`
	KeyActivities    string `json:"key_activities" gorm:"type:text"`

	// Impact and Additional Context
	ImpactAssessment  string `json:"impact_assessment" gorm:"type:text"`
	IncubatorPrograms string `json:"incubator_programs" gorm:"type:text"`
	RiskAssessment    string `json:"risk_assessment" gorm:"type:text"`

	// Metadata
	FoundedAt time.Time `json:"founded_at"`
	UserID    uint      `json:"user_id"`

	// Impact Metrics
	SDGAlignment        []string `json:"sdg_alignment" gorm:"type:json"`
	JobsCreated         int      `json:"jobs_created"`
	LocalEmploymentRate float64  `json:"local_employment_rate" gorm:"type:decimal(5,2)"`
	ImpactScore         float64  `json:"impact_score" gorm:"type:decimal(5,2)"`

	// Environmental Impact
	EnvironmentalInitiatives string  `json:"environmental_initiatives" gorm:"type:text"`
	CarbonFootprintReduction float64 `json:"carbon_footprint_reduction" gorm:"type:decimal(10,2)"`
}
