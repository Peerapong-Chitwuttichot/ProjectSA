package entity

import (
    "gorm.io/gorm"
)


type Resume struct {
    gorm.Model
    file string

    WorkHasUserID  *uint
    WorkHasUser WorkHasUser `gorm:"foreignKey:WorkHasUserID"`
}