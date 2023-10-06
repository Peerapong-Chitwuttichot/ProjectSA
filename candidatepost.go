package entity

import(  "time"
		"gorm.io/gorm"
)	   

type Candidatepost struct {
	gorm.Model
	postID *uint
	position string
	salary int
	dsecrition string
	posttimestamp time.Time
	matched bool
}