package database

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	"gorm.io/gorm"
)

type StartUp struct {
	gorm.Model
	// Core Business Information
	Name string `json:"name" gorm:"type:varchar(255);notnull"`
	Sector        string `json:"sector" gorm:"type:varchar(100)"`
	Location      string `json:"location" gorm:"type:varchar(255)"`
	BusinessStage string `json:"business_stage"gorm:"type:varchar(50)"`

	// Financial Metrics
	RevenueModel string `json:"revenue_model"gorm:"type:varchar(100)"`
	MoneyRaised float64 `json:"money_raised"gorm:"type:decimal(15,2)"`
	AnnualRevenue float64 `json:"annual_revenue"gorm:"type:decimal(15,2)"`
	ProjectedGrowth float64 `json:"projected_growth"gorm:"type:decimal(10,2)"`

	// Impact-Specific Metrics
	SocialImpactGoals   string   `json:"social_impact_goals" gorm:"type:text"`
	SDGAlignment        []string `json:"sdg_alignment" gorm:"type:json"`
	JobsCreated         int      `json:"jobs_created"`
	LocalEmploymentRate float64  `json:"local_employment_rate"gorm:"type:decimal(5,2)"`

	// Environmental Impact
	EnvironmentalInitiatives string `json:"environmental_initiatives"gorm:"type:text"`
	CarbonFootprintReduction float64 `json:"carbon_footprint_reduction"gorm:"type:decimal(10,2)"`

	// Community Impact
	CommunityBeneficiaries   int     `json:"community_beneficiaries"`
	EconomicEmpowermentScore float64 `json:"economic_empowerment_score"gorm:"type:decimal(5,2)"`

	// Additional Contextual Information
	ValueProposition    string `json:"value_proposition" gorm:"type:text"`
	KeyChallengesSolved string `json:"key_challenges_solved"gorm:"type:text"`

	// Funding and Support Needs
	FundingNeeds float64 `json:"funding_needs"gorm:"type:decimal(15,2)"`
	SupportAreasRequired string `json:"support_areas_required"gorm:"type:text"`

	// Verification and Credibility
	ImpactReports         []string `json:"impact_reports" gorm:"type:json"`
	ThirdPartyValidations string   `json:"third_party_validations"gorm:"type:text"`

	// Metadata
	FoundedAt time.Time `json:"founded_at"`
	UserID    uint      `json:"user_id"`
}

type Investor struct {
	ID          int    `json:"id"`
    Name        string `json:"name"`
    Description string `json:"description"`
}

func CheckConnection() *sql.DB{
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	dbUsername := os.Getenv("DB_USERNAME")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbName := os.Getenv("DB_NAME")

	//Prepare the database
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", dbUsername, dbPassword, dbHost, dbPort, dbName)

	db, err := sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal("Error opening database: ", err)
	}
	defer db.Close()

	// Ping the database
	err = db.Ping()
	if err != nil {
		log.Fatal("Error connecting to the database: ", err)
	}
	fmt.Println("Database connection successful")
	return db
}

func SignupStartup(c *gin.Context) {
	var user StartUp
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	
}

func GetInvestors(c *gin.Context) {
	rows, err := db.Query("SELECT * FROM investor")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch investors"})
		return
	}
	defer rows.Close()

	var investors []Investor
	for rows.Next() {
		var investor Investor
		err = rows.Scan(&investor.ID, &investor.Name, &investor.Description, &investor.Industry, &investor.FundingRange)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch investors"})
			return
		}
		investors = append(investors, investor)
	}

	c.JSON(http.StatusOK, investors)
}

func SignupInvestor(c *gin.Context) {

}