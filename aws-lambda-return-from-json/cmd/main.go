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

type aluno struct {
	Nome   string
	Turma  string
	Link   string
	Pedido string
	Hash   string
}

//go:embed links.json
var alunosFile []byte
var alunosFunc = func() (alunos []aluno) {
	if err := json.Unmarshal(alunosFile, &alunos); err != nil {
		panic(err)
	}
	return
}()

//byteValue, _ := ioutil.ReadAll(jsonFile)
func main() {
	//var alunos []aluno
	var alunos = alunosFunc

	//fmt.Printf("%+v\n", alunosFunc)
	//fmt.Println("tipo: \n", reflect.TypeOf(alunosFunc))

	/*err = json.Unmarshal(byteValue, &alunos)
	if err != nil {
		fmt.Println(err)
	}*/

	busca := "A03CJL9T"
	resultado := "0"

	//#############################
	for i := range alunos {
		if alunos[i].Pedido == busca {
			//fmt.Println(alunos[i].Hash)
			resultado = alunos[i].Hash
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
	for _, v := range alunos {
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
