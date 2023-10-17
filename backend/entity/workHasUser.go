package entity

import (
    "gorm.io/gorm"
)


type WorkHasUser struct {
    gorm.Model
    Status bool

    Resumes []Resume `gorm:"foreignKey:WorkHasUserID"`

	JobpostID *uint
	Jobpost Jobpost `gorm:"foreignKey:JobpostID"`

	UserID *uint
	User User `gorm:"foreignKey:UserID"`
	
}