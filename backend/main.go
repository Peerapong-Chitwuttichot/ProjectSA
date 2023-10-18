package main

import (
	"github.com/NaruebeTh1/JOBJOB/controller"
	"github.com/NaruebeTh1/JOBJOB/entity"
	"github.com/gin-gonic/gin"
)

const PORT = "8080"

func main() {
	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())
	

    // User Routes
    r.GET("/candidate", controller.ListCandidate)
	// r.GET("/jobpost", controller.ListJobpost)
	// r.GET("/user", controller.GetUser)
	r.POST("/notification", controller.CreateNotification)
	r.POST("/createcandidates", controller.CreateCandidate)

	// นำเข้าเส้นทางจาก Controller
	r.GET("/user/job/:id", controller.GetUserByJobID)
	r.GET("/jobpost/user/:id", controller.GetJobpostByUserID)

   
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


