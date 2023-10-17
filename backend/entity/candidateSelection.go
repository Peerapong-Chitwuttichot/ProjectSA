package entity

import (
    "gorm.io/gorm"
)

type CandidateSelection struct {
    gorm.Model

    PassOrRejectionDetails string `gorm:"type:longtext"`
    Candidate              string `gorm:"type:longtext"`


	JobpostID *uint
	Jobpost Jobpost `gorm:"foreignKey:JobpostID"`


}
