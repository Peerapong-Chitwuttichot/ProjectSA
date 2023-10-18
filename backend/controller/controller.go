package controller

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/NaruebeTh1/JOBJOB/entity"
)


// GET /user/job/:id
func GetUserByJobID(c *gin.Context) {
    jobID := c.Param("id")

    var userData entity.User

    if err := entity.DB().Raw("SELECT u.* FROM users u "+
        "INNER JOIN work_has_users wu ON u.id = wu.user_id "+
        "WHERE wu.jobpost_id = ?", jobID).Find(&userData).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": userData})
}

// GET /jobpost/user/:id
func GetJobpostByUserID(c *gin.Context) {
    userID := c.Param("id")

    var jobpostData entity.Jobpost

    if err := entity.DB().Raw("SELECT jp.* FROM jobposts jp "+
        "INNER JOIN work_has_users wu ON jp.id = wu.jobpost_id "+
        "WHERE wu.user_id = ?", userID).Find(&jobpostData).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": jobpostData})
}


// GET /WGU
func ListCandidate(c *gin.Context) {
    var workHasUsers []entity.WorkHasUser

    if err := entity.DB().Preload("User").Preload("Jobpost").Find(&workHasUsers).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // สร้างข้อมูลที่จะแสดงในหน้าเว็บ
    var result []gin.H
    for _, workHasUser := range workHasUsers {
        data := gin.H{
            "UserID"  :  workHasUser.User.ID,
            "UserName":  workHasUser.User.Title_name + ". " + workHasUser.User.First_name + " " + workHasUser.User.Last_name,
            "Position":  workHasUser.Jobpost.Position,
            "Detail"  :  workHasUser.User.Experience + ", " + workHasUser.User.Skill,
        }
        result = append(result, data)
    }

    c.JSON(http.StatusOK, gin.H{"data": result})
}



// POST /notification
func CreateNotification(c *gin.Context) {
    var inputData struct {
        UserID     *uint   `json:"user_id"`
        JobpostID  *uint   `json:"jobpost_id"`
        Content    string `json:"content"`
    }

    if err := c.ShouldBindJSON(&inputData); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // สร้าง Notification จากข้อมูลที่รับมา
    notification := entity.Notification{
        UserID:    inputData.UserID,
        JobpostID: inputData.JobpostID,
        Content:   inputData.Content,
        Read:      false, // รองรับการอ่านหรือไม่ (อาจต้องแก้ไขตามความต้องการ)
    }

    if err := entity.DB().Create(&notification).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": notification})
}

// POST /candidates
func CreateCandidate(c *gin.Context) {
    var candidate entity.User

    if err := c.ShouldBindJSON(&candidate); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // สร้างผู้สมัครใหม่ในฐานข้อมูล
    if err := entity.DB().Create(&candidate).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusCreated, gin.H{"data": candidate})
}

