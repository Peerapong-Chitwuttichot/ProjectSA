package controller

import (
	"net/http"

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
	if err := entity.DB().Raw("SELECT * FROM user_account WHERE user_id = ?", id).Scan(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": user})
}

// GET /users
func ListUsers(c *gin.Context) {
	var users []entity.User_account
	if err := entity.DB().Raw("SELECT * FROM user_account").Scan(&users).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": users})
}

// DELETE /users/:id
func DeleteUser(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM user_account WHERE user_id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /users
func UpdateUser(c *gin.Context) {
	var user entity.User_account
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("user_id = ?", user.ID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	if err := entity.DB().Save(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": user})
}
