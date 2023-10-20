package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mzstrong01/sa-final-project/entity"
)

// GET /post
func GetUser(c *gin.Context) {
	var user []entity.User

	// Corrected SQL query with placeholders
	query := "SELECT * FROM users LIMIT 100 OFFSET 0"

	if err := entity.DB().Raw(query).Find(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"user": user})
}


// GET /post
func SearchUser(c *gin.Context) {
	var search_u []entity.User
	key := c.Param("key")

	// Corrected SQL query with placeholders
	query := "SELECT * FROM users WHERE experience LIKE ? OR skill LIKE ? LIMIT 100 OFFSET 0"
	keyWithWildcards := "%" + key + "%"

	if err := entity.DB().Raw(query, keyWithWildcards, keyWithWildcards, keyWithWildcards).Find(&search_u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"user": search_u})
}
