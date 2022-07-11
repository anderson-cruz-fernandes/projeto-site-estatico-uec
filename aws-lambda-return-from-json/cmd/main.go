package main

import (
	"handlers/pkg/handlers"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func main() {
	lambda.Start(handler)
}

/*func handler(req events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {

switch req.HTTPMethod {
case "GET":
	return
}*/

//start := time.Now()
// Open our jsonFile

/*jsonFile, err := os.Open("links.json")
// if we os.Open returns an error then handle it
if err != nil {
	fmt.Println(err)
}
fmt.Println("Successfully Opened links.json")
// defer the closing of our jsonFile so that we can parse it later on
defer jsonFile.Close()*/

//byteValue, _ := ioutil.ReadAll(jsonFile)
func handler(req events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	switch req.HTTPMethod {
	case "POST":
		return handlers.BuscaAluno(req)
	default:
		return handlers.UnhandledMethod()
	}
}

//#############################
//https://stackoverflow.com/a/38654444
//http://www.inanzzz.com/index.php/post/1rwm/including-and-reading-static-files-with-embed-directive-at-compile-time-in-golang
