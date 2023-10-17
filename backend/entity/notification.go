package entity

import (
    "gorm.io/gorm"
)

type Notification struct {
    gorm.Model

    Content string
    Read    bool


	JobpostID *uint
	Jobpost Jobpost `gorm:"foreignKey:JobpostID"`

	UserID *uint
	User User `gorm:"foreignKey:UserID"`



}
