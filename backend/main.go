package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/api/hello", helloWorld)
	http.ListenAndServe(":8080", nil)
}

func helloWorld(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, World!")
}
