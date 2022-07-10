package main

import (
	_ "embed"
	"encoding/json"
	"fmt"
)

/*func main() {
	lambda.Start(handler)
}*/

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

type usuario struct {
	Nome   string
	Turma  string
	Link   string
	Pedido string
	Hash   string
}

//go:embed links.json
var usuariosFile []byte
var usuariosFunc = func() (usuarios []usuario) {
	if err := json.Unmarshal(usuariosFile, &usuarios); err != nil {
		panic(err)
	}
	return
}()

//byteValue, _ := ioutil.ReadAll(jsonFile)
func main() {
	//var usuarios []Usuario
	var usuarios = usuariosFunc

	//fmt.Printf("%+v\n", usuariosFunc)
	//fmt.Println("tipo: \n", reflect.TypeOf(usuariosFunc))

	/*err = json.Unmarshal(byteValue, &usuarios)
	if err != nil {
		fmt.Println(err)
	}*/

	busca := "A03CJL9T"
	resultado := "0"

	//#############################
	for i := range usuarios {
		if usuarios[i].Pedido == busca {
			//fmt.Println(usuarios[i].Hash)
			resultado = usuarios[i].Hash
			break
		}
	}

	fmt.Println(resultado)
	//elapsed := time.Since(start)
	//fmt.Printf("Executou em %s", elapsed)

	//OU se for muito usada usar a de baixo
	//Also if this is a frequent operation
	// Build a config map:
	/*confMap := map[string]string{}
	for _, v := range usuarios {
		confMap[v.Pedido] = v.Hash
	}

	// And then to find values by key:
	if v, ok := confMap[x]; ok {
		fmt.Println(v)
	}*/
	//#############################
	//https://stackoverflow.com/a/38654444
	//http://www.inanzzz.com/index.php/post/1rwm/including-and-reading-static-files-with-embed-directive-at-compile-time-in-golang

}
