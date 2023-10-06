package entity

import (
	"gorm.io/gorm"
)

type User_account struct {
	gorm.Model
	Title_name string
	First_name string
	Last_name  string
	User_email string
	User_pass  string
	Experience string
	Skill      string
	Address    string
}
