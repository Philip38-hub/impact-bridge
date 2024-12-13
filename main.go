package main

import (
	"impactbridge/server"
	"log"
	"net/http"
)

func main() {
	router := server.Start()
	port := ":8080"

	log.Println("Starting server on port", port)
	err := http.ListenAndServe(port, router)
	if err != nil {
		log.Fatal(err)
	}
}