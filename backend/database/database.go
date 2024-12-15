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

var db *sql.DB

type Startups struct {
	gorm.Model
	// Core Business Information
	Name                     string    `json:"name" gorm:"type:varchar(255);notnull"`
	Email                    string    `json:"email" gorm:"type:varchar(255);notnull"`
	Logo                     string    `json:"logo" gorm:"type:varchar(255)"`
	ShortDescription         string    `json:"short_description" gorm:"type:text"`
	Description              string    `json:"description" gorm:"type:text"`
	Industry                 []string  `json:"industry" gorm:"type:json"`
	FundingGoal              float64   `json:"funding_goal"gorm:"type:decimal(15,2)"`
	Revenue                  float64   `json:"revenue"gorm:"type:decimal(15,2)"`
	Valuation                float64   `json:"valuation"gorm:"type:decimal(15,2)"`
	EquityOffered            float64   `json:"equity_offered"gorm:"type:decimal(10,2)"`
	Location                 string    `json:"location" gorm:"type:varchar(255)"`
	FoundedAt                time.Time `json:"founded_at"`
	UserID                   uint      `json:"user_id"`
	Team                     string    `json:"team" gorm:"type:text"`
	Traction                 string    `json:"traction" gorm:"type:text"`
}

type Investors struct {
	gorm.Model
	Name                     string    `json:"name" gorm:"type:varchar(255);notnull"`
	Email                    string    `json:"email" gorm:"type:varchar(255);notnull"`
	Title                    string    `json:"title" gorm:"type:varchar(255)"`
	Background               string    `json:"background" gorm:"type:text"`
	Interests                []string  `json:"interests" gorm:"type:json"`
	LinkedIn                 string    `json:"linkedin" gorm:"type:varchar(255)"`
	UserID                   uint      `json:"user_id"`
	minInvestment            float64   `json:"min_investment"gorm:"type:decimal(15,2)"`
	maxInvestment            float64   `json:"max_investment"gorm:"type:decimal(15,2)"`
	Portfolio                string    `json:"portfolio" gorm:"type:text"`
	PhotoURL                 string    `json:"photo_url" gorm:"type:varchar(255)"`
}

type User struct {
	Email    string
	ID       int
    Password string
    Class    string
}

var query string

func CheckUser() bool {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
		return false
	}

	dbUsername := os.Getenv("DB_USERNAME")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbName := os.Getenv("DB_NAME")

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", dbUsername, dbPassword, dbHost, dbPort, dbName)

	db, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal("Error opening database: ", err)
		return false
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		log.Fatal(err)
		return false
	}
	return true
} 

func FetchInvestors(limit int) (*[]Investors, error) {
	var investors []Investors

	query = "SELECT * FROM investors LIMIT ?"
	rows, err := db.Query(query, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var investor Investors
		err := rows.Scan(&investor.ID,
			&investor.Name,
			&investor.Email,
			&investor.Background,
			&investor.Interests,
			&investor.LinkedIn,
			&investor.UserID,
			&investor.minInvestment,
			&investor.maxInvestment,
			&investor.Portfolio,
			&investor.PhotoURL)
		if err != nil {
			return nil, err
		}

		investors = append(investors, investor)
	}

	return &investors, nil
}

func FetchStartups(limit int) (*[]Startups, error) {
	var startups []Startups

	query = "SELECT * FROM startups LIMIT ?"
	rows, err := db.Query(query, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var startup Startups
		err := rows.Scan(&startup.ID,
			&startup.Name,
			&startup.Email,
			&startup.Description,
			&startup.Industry,
			&startup.FundingGoal,
			&startup.Revenue,
			&startup.Valuation,
			&startup.EquityOffered,
			&startup.Location,
			&startup.FoundedAt,
			&startup.UserID,
			&startup.Team,)
		if err != nil {
			return nil, err
		}

		startups = append(startups, startup)
	}
	return &startups, nil
}

func FindUserByEmail(email string, pass string) (*User, error) {
	var user User
	var password string
	var id int

	// Check 'investors' table
    query = "SELECT password FROM investors WHERE email = ?"
    err := db.QueryRow(query, email).Scan(&id, &password)
    if err == nil {
		if pass == password {
			user = User{Email: email, ID: id, Password: password, Class: "investor"}
			return &user, nil
		} else {
			return nil, fmt.Errorf("invalid password")
		}
    } else if err != sql.ErrNoRows {
        return nil, err
    }

	// Check 'startup' table
    query = "SELECT password FROM startups WHERE email = ?"
    err = db.QueryRow(query, email).Scan(&password)
    if err == nil {
        if pass == password {
			user = User{Email: email, Password: password, Class: "investor"}
			return &user, nil
		} else {
			return nil, fmt.Errorf("invalid password")
		}
    } else if err != sql.ErrNoRows {
        return nil, err
    }

    return nil, fmt.Errorf("user not found")

}

func FetchStartupDetails(id int) (*Startups, error) {
	var startup Startups

	query = "SELECT * FROM startups WHERE id = ?"
	err := db.QueryRow(query, id).Scan(&startup.ID, &startup.Name, &startup.Location, &startup.FoundedAt, &startup.UserID)
	if err != nil {
		return nil, err
	}

	return &startup, nil
}

func FetchInvestorDetails(id int) (*Investors, error) {
	var investor Investors

	query = "SELECT * FROM investors WHERE id = ?"
	err := db.QueryRow(query, id).Scan(&investor.ID,
		&investor.Name,
		&investor.Email,
		&investor.Background,
		&investor.Interests,
		&investor.LinkedIn,
		&investor.UserID,
		&investor.minInvestment,
		&investor.maxInvestment,
		&investor.Portfolio,
		&investor.PhotoURL)
	if err != nil {
		return nil, err
	}

	return &investor, nil
}

func SignUpStartup(c *gin.Context) {
	var startup Startups

    // Bind JSON to the Startup struct
    if err := c.ShouldBindJSON(&startup); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
        return
    }

    // Validate required fields
    if startup.Name == "" || startup.Email == "" || startup.Description == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Name, Email, and Description are required"})
        return
    }

    // Insert the startup into the database
    query := `INSERT INTO startups 
        (name, email, description, industry, founded_at, revenue, logo, valuation, equity_offered, funding_goal, location) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

    result, err := db.Exec(query, 
        startup.Name, 
        startup.Email, 
        startup.Description, 
        startup.Industry, 
        startup.FoundedAt, 
        startup.Revenue, 
        startup.Logo, 
        startup.Valuation,
		startup.EquityOffered,
		startup.FundingGoal,
		startup.Location,
		startup.UserID,
    )

    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save startup"})
        return
    }

    // Return success response
    id, _ := result.LastInsertId()
    c.JSON(http.StatusOK, gin.H{
        "message": "Startup saved successfully",
        "id":      id,
    })
}