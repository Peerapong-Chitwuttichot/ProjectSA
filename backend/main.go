package main

import (
	"github.com/Peerapong-Chitwuttichot/oparetor-jobjob/controller"
	"github.com/gin-gonic/gin"
	"github.com/Peerapong-Chitwuttichot/oparetor-jobjob/entity"
)

func main() {
	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())
	// oparetor Routes
	r.GET("/oparetors", controller.ListOparetors)
	r.GET("/oparetor/:id", controller.GetOparetor)
	r.POST("/oparetors", controller.CreateOparetor)
	r.PATCH("/oparetors", controller.UpdateOparetor)
	r.DELETE("/oparetors/:id", controller.DeleteOparetor)
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
