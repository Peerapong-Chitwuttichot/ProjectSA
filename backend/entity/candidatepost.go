package entity

import (
	"gorm.io/gorm"
)

type Candidatepost struct {
	gorm.Model

	Position      string
	Salary        string
	Dsecrition    string
	// Posttimestamp string
	Matched       string
	Address		  string
}
