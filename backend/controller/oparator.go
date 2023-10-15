package controller

import (
	"net/http"

	"github.com/Peerapong-Chitwuttichot/oparator-jobjob/entity"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

// POST /oparators
func CreateOparator(c *gin.Context) {
	var oparator entity.Oparator_account
	if err := c.ShouldBindJSON(&oparator); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&oparator).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": oparator})
}

// GET /oparator/:id
func GetOparator(c *gin.Context) {
	var oparator entity.Oparator_account
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM oparator_accounts WHERE id = ?", id).Scan(&oparator).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": oparator})
}

// GET /oparators
func ListOparators(c *gin.Context) {
	var oparators []entity.Oparator_account
	if err := entity.DB().Raw("SELECT * FROM oparator_accounts").Scan(&oparators).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": oparators})
}

// DELETE /oparators/:id
func DeleteOparator(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM oparator_account WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "oparator not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /oparators
func UpdateOparator(c *gin.Context) {
	var oparator entity.Oparator_account
	var result entity.Oparator_account

	if err := c.ShouldBindJSON(&oparator); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา oparator ด้วย id
	if tx := entity.DB().Where("id = ?", oparator.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "oparator not found"})
		return
	}

	if err := entity.DB().Save(&oparator).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": oparator})
}

// POST /oparators/login
func OparatorLogin(c *gin.Context) {
	var oparator entity.Oparator_account
	if err := c.ShouldBindJSON(&oparator); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// if err := entity.DB().Raw("SELECT * FROM oparator_accounts WHERE oparator_email = ? AND oparator_pass = ?", oparator.Oparator_email, oparator.Oparator_pass).Scan(&oparator).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }
	// c.JSON(http.StatusOK, gin.H{"data": oparator})
	if err := entity.DB().Where("oparator_email = ? AND oparator_pass = ?", oparator.Oparator_email, oparator.Oparator_pass).First(&oparator).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"status": "error", "message": "อีเมลหรือรหัสผ่านไม่ถูกต้อง"})
		// c.JSON(http.StatusBadRequest, gin.H{"error": "oparator not found"})
		return
	}
	// สร้าง accessToken ที่คุณต้องการส่ง
	accessToken, err := generateAccessToken(oparator)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"status": "error", "message": "ไม่สามารถสร้าง accessToken"})
		return
	}

	// ส่งคำตอบพร้อม accessToken
	c.JSON(http.StatusOK, gin.H{"status": "success", "message": "เข้าสู่ระบบสำเร็จ", "accessToken": accessToken, "id": oparator.ID})

	// ตรวจสอบคู่อีเมลและรหัสผ่านในฐานข้อมูล
	// นี่คือตัวอย่างเบื้องต้น คุณต้องเขียนโค้ดเพิ่มเติมในส่วนนี้
	// เพื่อตรวจสอบข้อมูลจริงในฐานข้อมูลของคุณ
	// if oparator.Oparator_email == "oparator@example.com" && oparator.Oparator_pass == "password123" {
	// 	// หากคู่อีเมลและรหัสผ่านถูกต้อง
	// 	c.JSON(http.StatusOK, gin.H{"status": "success", "message": "เข้าสู่ระบบสำเร็จ", "id": oparator.ID})
	// } else {
	// 	// หากไม่ตรงกับข้อมูลในฐานข้อมูล
	// 	c.JSON(http.StatusUnauthorized, gin.H{"status": "error", "message": "อีเมลหรือรหัสผ่านไม่ถูกต้อง"})
	// }
}

func generateAccessToken(oparator entity.Oparator_account) (string, error) {
	// สร้างข้อมูลที่จะเก็บใน accessToken
	claims := jwt.MapClaims{
		"oparator_id":    oparator.ID,
		"oparator_email": oparator.Oparator_email,
		// เพิ่มข้อมูลอื่น ๆ ที่คุณต้องการ
	}

	// สร้าง token โดยใช้ claims และรหัสลับ (secret key)
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	accessToken, err := token.SignedString([]byte("sa66g02"))
	if err != nil {
		return "", err
	}

	return accessToken, nil
}
