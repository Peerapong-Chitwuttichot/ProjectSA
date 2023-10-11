package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/top002200/ProjectSA/entity"
)

// POST /candidateposts
func CreateCandidatepost(c *gin.Context) {
	var candidatepost entity.Candidatepost
	if err := c.ShouldBindJSON(&candidatepost); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&candidatepost).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": candidatepost})
}

// GET /candidatepost/:id
func GetCandidatepost(c *gin.Context) {
	var candidatepost entity.Candidatepost
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM candidatepost_account WHERE candidatepost_id = ?", id).Scan(&candidatepost).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": candidatepost})
}

// GET /candidateposts
func ListCandidateposts(c *gin.Context) {
	var candidateposts []entity.Candidatepost
	if err := entity.DB().Raw("SELECT * FROM candidatepost_account").Scan(&candidateposts).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": candidateposts})
}

// DELETE /candidateposts/:id
func DeleteCandidatepost(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM candidatepost_account WHERE candidatepost_id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "candidatepost not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /candidateposts
func UpdateCandidatepost(c *gin.Context) {
	var candidatepost entity.Candidatepost
	if err := c.ShouldBindJSON(&candidatepost); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("candidatepost_id = ?", candidatepost.ID).First(&candidatepost); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "candidatepost not found"})
		return
	}

	if err := entity.DB().Save(&candidatepost).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": candidatepost})
}
