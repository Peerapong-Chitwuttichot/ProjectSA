package entity

import (
	
	"gorm.io/gorm"
)

type Operator struct {
	gorm.Model

	avatar 			string
	op_email 		string `gorm:"uniqueIndex"`
	op_pass  		string `gorm:"uniqueIndex"`
	company 		string
	company_address string	

	Jobposts []Jobpost `gorm:"foreignKey:OperatorID"`

}