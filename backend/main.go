package main

import (
	"github.com/gin-gonic/gin"
	"github.com/top002200/ProjectSA/controller"
	"github.com/top002200/ProjectSA/entity"
)

func main() {
	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())
	// User Routes
	r.GET("/candidateposts", controller.ListCandidateposts)
	r.GET("/candidatepost/:id", controller.GetCandidatepost)
	r.POST("/candidateposts", controller.CreateCandidatepost)
	r.PATCH("/candidateposts", controller.UpdateCandidatepost)
	r.DELETE("/candidateposts/delete/:id", controller.DeleteCandidatepost)

	// Run the server
	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
