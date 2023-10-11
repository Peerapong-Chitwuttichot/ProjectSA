package entity

import (
	"gorm.io/gorm"
)

type Oparetor_account struct {
	gorm.Model
	Op_email    string 
	Op_password string
	Com_name    string
	Address     string
	Avatar      string
}
