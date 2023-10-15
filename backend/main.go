package main

import (
	"github.com/Peerapong-Chitwuttichot/oparator-jobjob/controller"
	"github.com/Peerapong-Chitwuttichot/oparator-jobjob/entity"
	"github.com/gin-gonic/gin"
)

func main() {
	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())
	// Oparator Routes
	r.GET("/oparators/get", controller.ListOparators)
	r.GET("/oparator/:id", controller.GetOparator)
	r.POST("/oparators", controller.CreateOparator)
	r.POST("/oparators/login", controller.OparatorLogin)
	r.PATCH("/oparators", controller.UpdateOparator)
	r.DELETE("/oparators/:id", controller.DeleteOparator)
	// Run the server
	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
