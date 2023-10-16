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

	// Operator Routes
	r.GET("/oparators", controller.ListOparators)
	r.GET("/oparators/:id", controller.GetOparator)
	r.POST("/oparators", controller.CreateOparator)
	r.PATCH("/oparators", controller.UpdateOparator)
	r.DELETE("/oparators/:id", controller.DeleteOparator)
	// Operator Login
	r.POST("/oparators/login", controller.OparatorLogin)
	

	// Run the server
	r.Run(":8080")
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
