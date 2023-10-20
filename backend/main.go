package main

import (
	"github.com/gin-gonic/gin"
	"github.com/mzstrong01/sa-final-project/controller"
	"github.com/mzstrong01/sa-final-project/entity"
)

const PORT = "8080"

func main() {
	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())
	// User Routes
	r.POST("/regwork", controller.RegWork)
	r.GET("/post", controller.ListPost)
	r.GET("/whul", controller.GetLatestWHU)
	r.GET("/searchwork/:key", controller.SearchWork)
	r.POST("/upload", controller.UploadHandler)
	r.GET("/searchuser/:key", controller.SearchUser)
	r.GET("/getuser", controller.GetUser)
	// Run the server
	r.Run()

}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
