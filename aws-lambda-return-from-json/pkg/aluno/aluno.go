package aluno

import (
	_ "embed"
	"encoding/json"
	"errors"
)

var (
	ErrorFailedToFetchRecord = "falha ao buscar o registro"
)

type Aluno struct {
	Nome   string `json:"nome"`
	Turma  string `json:"turma"`
	Link   string `json:"link"`
	Pedido string `json:"pedido"`
	Hash   string `json:"hash"`
}

//go:embed links.json
var alunosFile []byte
var alunosFunc = func() (alunos []Aluno) {
	if err := json.Unmarshal(alunosFile, &alunos); err != nil {
		panic(err)
	}
	return
}()

var alunos = alunosFunc

func BuscaAluno(acesso string) (*string, error) {

	hash := "0"
	for i := range alunos {
		if alunos[i].Pedido == acesso {
			//fmt.Println(alunos[i].Hash)
			hash = alunos[i].Hash
			break
		}
	}

	if hash == "0" {
		return nil, errors.New(ErrorFailedToFetchRecord)
	}
	return &hash, nil
}
