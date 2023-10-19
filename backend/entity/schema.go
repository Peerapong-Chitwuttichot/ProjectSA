package entity

import (
    "gorm.io/gorm"
)

type User struct {
	gorm.Model
	Title_name string
	First_name string
	Last_name  string
	User_email string `gorm:"uniqueIndex"`
	User_pass  string `gorm:"uniqueIndex"`
	Experience string
	Skill      string
	Address    string


	Notifications []Notification `gorm:"foreignKey:UserID"`
	WorkHasUsers []WorkHasUser `gorm:"foreignKey:UserID"`


}


type WorkHasUser struct {
    gorm.Model
    Status bool

    Resumes []Resume `gorm:"foreignKey:WorkHasUserID"`

	JobpostID *uint
	Jobpost Jobpost `gorm:"foreignKey:JobpostID"`

	UserID *uint
	User User `gorm:"foreignKey:UserID"`
	
}

type Resume struct {
    gorm.Model
    file string

    WorkHasUserID  *uint
    WorkHasUser WorkHasUser `gorm:"foreignKey:WorkHasUserID"`
}


type Operator struct {
	gorm.Model

	avatar 			string
	op_email 		string `gorm:"uniqueIndex"`
	op_pass  		string `gorm:"uniqueIndex"`
	company 		string
	company_address string	

	Jobposts []Jobpost `gorm:"foreignKey:OperatorID"`

}

type Notification struct {
    gorm.Model

    Read    bool
	StatusNoti string

	PassOrRejectionDetails string `gorm:"type:longtext"`

	JobpostID *uint
	Jobpost Jobpost `gorm:"foreignKey:JobpostID"`

	UserID *uint
	User User `gorm:"foreignKey:UserID"`



}

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

type CandidateSelection struct {
    gorm.Model

	StatusCS  string
    Candidate              string `gorm:"type:longtext"`

	JobpostID *uint
	Jobpost Jobpost `gorm:"foreignKey:JobpostID"`


}
