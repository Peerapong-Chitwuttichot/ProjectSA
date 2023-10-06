package entity

import(
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB{
	return db
}

func SetupDatabase() {
	database, err := gorm.open(sqlite.open("sa-66-db"),&gorm.Config{})
	if err != nil {
		panic("Faile to connect database")
	}

	database.AutoMigrate(
		&Candidatepost{},
	)
	db = database
}