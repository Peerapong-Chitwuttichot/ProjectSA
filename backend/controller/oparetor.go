package controller

import (
	"net/http"

	"github.com/Peerapong-Chitwuttichot/oparetor-jobjob/entity"
	"github.com/gin-gonic/gin"
)

// POST /oparetor
func CreateOparetor(c *gin.Context) {
	var oparetor entity.Oparetor_account
	if err := c.ShouldBindJSON(&oparetor); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&oparetor).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": oparetor})
}

// GET /oparetor/:id
func GetOparetor(c *gin.Context) {
	var oparetor entity.Oparetor_account
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM oparetor_account WHERE oparetor_id = ?", id).Scan(&oparetor).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": oparetor})
}

// GET /oparetors
func ListOparetors(c *gin.Context) {
	var oparetors []entity.Oparetor_account
	if err := entity.DB().Raw("SELECT * FROM oparetor_account").Scan(&oparetors).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": oparetors})
}

// DELETE /oparetors/:id
func DeleteOparetor(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM oparetor_account WHERE oparetor_id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "oparetor not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /oparetors
func UpdateOparetor(c *gin.Context) {
	var oparetor entity.Oparetor_account
	if err := c.ShouldBindJSON(&oparetor); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("oparetor_id = ?", oparetor.ID).First(&oparetor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "oparetor not found"})
		return
	}

	if err := entity.DB().Save(&oparetor).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": oparetor})
}
