package main

import (
	"github.com/Peerapong-Chitwuttichot/ProjectSA/controller"
	"github.com/Peerapong-Chitwuttichot/ProjectSA/entity"
	"github.com/gin-gonic/gin"
)

func main() {
	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())
	// Oparetor Routes
	r.GET("/oparetor", controller.ListOparetors)
	r.GET("/oparetor/:id", controller.GetOparetor)
	r.POST("/oparetor", controller.CreateOparetor)
	r.PATCH("/oparetor", controller.UpdateOparetor)
	r.DELETE("/oparetor/:id", controller.DeleteOparetor)
	// Run the server
	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
