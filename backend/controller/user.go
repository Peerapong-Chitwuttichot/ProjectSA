package controller

import (
	"net/http"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/supachaicharoen/jobjob-project/entity"
)

// POST /users
func CreateUser(c *gin.Context) {
	var user entity.User_account
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": user})
}

// GET /user/:id
func GetUser(c *gin.Context) {
	var user entity.User_account
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM user_accounts WHERE id = ?", id).Scan(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": user})
}

// GET /users
func ListUsers(c *gin.Context) {
	var users []entity.User_account
	if err := entity.DB().Raw("SELECT * FROM user_accounts").Scan(&users).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": users})
}

// DELETE /users/:id
func DeleteUser(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM user_account WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /users
func UpdateUser(c *gin.Context) {
	var user entity.User_account
	var result entity.User_account

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", user.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	if err := entity.DB().Save(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": user})
}

// POST /users/login
func UserLogin(c *gin.Context) {
	var user entity.User_account
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// if err := entity.DB().Raw("SELECT * FROM user_accounts WHERE user_email = ? AND user_pass = ?", user.User_email, user.User_pass).Scan(&user).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }
	// c.JSON(http.StatusOK, gin.H{"data": user})
	if err := entity.DB().Where("user_email = ? AND user_pass = ?", user.User_email, user.User_pass).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"status": "error", "message": "อีเมลหรือรหัสผ่านไม่ถูกต้อง"})
		// c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	// สร้าง accessToken ที่คุณต้องการส่ง
	accessToken, err := generateAccessToken(user)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"status": "error", "message": "ไม่สามารถสร้าง accessToken"})
		return
	}

	// ส่งคำตอบพร้อม accessToken
	c.JSON(http.StatusOK, gin.H{"status": "success", "message": "เข้าสู่ระบบสำเร็จ", "accessToken": accessToken, "id": user.ID})

	// ตรวจสอบคู่อีเมลและรหัสผ่านในฐานข้อมูล
	// นี่คือตัวอย่างเบื้องต้น คุณต้องเขียนโค้ดเพิ่มเติมในส่วนนี้
	// เพื่อตรวจสอบข้อมูลจริงในฐานข้อมูลของคุณ
	// if user.User_email == "user@example.com" && user.User_pass == "password123" {
	// 	// หากคู่อีเมลและรหัสผ่านถูกต้อง
	// 	c.JSON(http.StatusOK, gin.H{"status": "success", "message": "เข้าสู่ระบบสำเร็จ", "id": user.ID})
	// } else {
	// 	// หากไม่ตรงกับข้อมูลในฐานข้อมูล
	// 	c.JSON(http.StatusUnauthorized, gin.H{"status": "error", "message": "อีเมลหรือรหัสผ่านไม่ถูกต้อง"})
	// }
}

func generateAccessToken(user entity.User_account) (string, error) {
	// สร้างข้อมูลที่จะเก็บใน accessToken
	claims := jwt.MapClaims{
		"user_id":    user.ID,
		"user_email": user.User_email,
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
