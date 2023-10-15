package entity

import (
	"gorm.io/gorm"
)

type Oparator_account struct {
	gorm.Model
	Oparator_email    string 
	Oparator_pass string
	Com_name    string
	Address     string
}
