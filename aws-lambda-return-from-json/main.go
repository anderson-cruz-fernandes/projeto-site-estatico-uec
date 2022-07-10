package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
)

func main() {

	// Open our jsonFile
	jsonFile, err := os.Open("links.json")
	// if we os.Open returns an error then handle it
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("Successfully Opened links.json")
	// defer the closing of our jsonFile so that we can parse it later on
	defer jsonFile.Close()

	/*	type Usuario struct {
		Nome   string `json:"nome"`
		Turma  string `json:"turma"`
		Link   string `json:"link"`
		Pedido string `json:"pedido"`
		Hash   string `json:"hash"`
	}*/
	type Usuario struct {
		Nome   string
		Turma  string
		Link   string
		Pedido string
		Hash   string
	}

	/*type Usuarios struct {
		//Usuarios []Usuario `json:"usuarios"`
		Usuarios []Usuario `json:""`
	}*/

	byteValue, _ := ioutil.ReadAll(jsonFile)

	var usuarios []Usuario

	err = json.Unmarshal(byteValue, &usuarios)
	if err != nil {
		fmt.Println(err)
	}

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
}
