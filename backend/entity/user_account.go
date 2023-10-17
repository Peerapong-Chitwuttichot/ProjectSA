package entity

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Title_name string
	First_name string
	Last_name  string
	User_email string `gorm:"uniqueIndex"`
	User_pass  string `gorm:"uniqueIndex"`
	Experience string
	Skill      string
	Address    string


	Notifications []Notification `gorm:"foreignKey:UserID"`
	WorkHasUsers []WorkHasUser `gorm:"foreignKey:UserID"`


}