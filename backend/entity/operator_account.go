package entity

import (
	"gorm.io/gorm"
)

type Operator_account struct {
	gorm.Model
	Operator_email    string 
	Operator_pass string
	Com_name    string
	Address     string
}
