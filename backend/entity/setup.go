package entity

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("JOBJOB.db"), &gorm.Config{})
	if err != nil {
		panic("Failed to conect database")
	}

	database.AutoMigrate(
		&CandidateSelection{},
		&Jobpost{},
		&Notification{},
		&Operator{},
		&Resume{},
		&WorkHasUser{},
		&User{},
	)

	db = database
}
