package entity

import "gorm.io/gorm"

type Oparetor_Account struct {
	gorm.Model
	Op_email    string `gorm:"uniqueIndex"`
	Op_password string
	Com_name    string `gorm:"uniqueIndex"`
	Address     string
	Avatar      string
}
