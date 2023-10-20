package entity

import (
	"gorm.io/gorm"
)

type WorkHasUser struct {
	gorm.Model
	Status  bool
	User_id int
	PostID  int
}
