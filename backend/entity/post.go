package entity

import (
	"gorm.io/gorm"
)

type Post struct {
	gorm.Model
	ID            int
	Position      string
	CompanyName   string
	Description   string
	PostTimestamp string
	Matched       bool
}
