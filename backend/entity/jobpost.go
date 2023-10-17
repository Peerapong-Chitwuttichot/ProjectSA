package entity

import (
    "gorm.io/gorm"
)

type Jobpost struct {
    gorm.Model

    Position string
    Salary   int
    Description string
    Matched  string

	OperatorID *uint
	Operator Operator `gorm:"foreignKey:OperatorID"`

	CandidateSelections []CandidateSelection `gorm:"foreignKey:JobpostID"`
	Notifications []Notification `gorm:"foreignKey:JobpostID"`
	WorkHasUsers []WorkHasUser `gorm:"foreignKey:JobpostID"`




}
