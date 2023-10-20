package entity

import (
	"gorm.io/gorm"
)

type Resume struct {
	gorm.Model
	File string

	Whu_id      *uint
	WorkHasUser WorkHasUser `gorm:"foreignKey:Whu_id"`
}
