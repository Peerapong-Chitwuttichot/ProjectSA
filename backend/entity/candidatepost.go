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
	Topic       string
	Address		  string
}
