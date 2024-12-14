package models

import (
	"math"
	"time"

	"gorm.io/gorm"
)

type ImpactBusinessModel struct {
	gorm.Model
	// Core Business Information
	Name          string `json:"name" gorm:"type:varchar(255);not null"`
	Sector        string `json:"sector" gorm:"type:varchar(100)"`
	BusinessStage string `json:"business_stage" gorm:"type:varchar(50)"`

	// Financial Metrics
	RevenueModel    string  `json:"revenue_model" gorm:"type:varchar(100)"`
	MoneyRaised     float64 `json:"money_raised" gorm:"type:decimal(15,2)"`
	ProjectedGrowth float64 `json:"projected_growth" gorm:"type:decimal(10,2)"`

	// Impact Metrics
	SDGAlignment        []string `json:"sdg_alignment" gorm:"type:json"`
	JobsCreated         int      `json:"jobs_created"`
	LocalEmploymentRate float64  `json:"local_employment_rate" gorm:"type:decimal(5,2)"`
	ImpactScore         float64  `json:"impact_score" gorm:"type:decimal(5,2)"`

	// Kenya-specific fields
	MobileMoneyIntegration bool   `json:"mobile_money_integration"`
	LocalCommunityNetwork  string `json:"local_community_network" gorm:"type:text"`
	MicroEnterpriseDetails string `json:"micro_enterprise_details" gorm:"type:text"`

	// Metadata
	FoundedAt time.Time `json:"founded_at"`
	UserID    uint      `json:"user_id"`
}

func (b *ImpactBusinessModel) ComputeImpactScore() float64 {
	score := 0.0

	// Jobs creation impact (20%)
	jobsScore := math.Min(float64(b.JobsCreated)*2, 20)
	score += jobsScore

	// Local employment impact (20%)
	employmentScore := math.Min(b.LocalEmploymentRate/5, 20)
	score += employmentScore

	// Growth potential (20%)
	growthScore := math.Min(b.ProjectedGrowth, 20)
	score += growthScore

	// SDG alignment (20%)
	sdgScore := float64(len(b.SDGAlignment)) * 5
	score += math.Min(sdgScore, 20)

	// Mobile Money & Local Network Bonus (20%)
	if b.MobileMoneyIntegration {
		score += 10
	}
	if b.LocalCommunityNetwork != "" {
		score += 10
	}

	return math.Min(score, 100)
}
