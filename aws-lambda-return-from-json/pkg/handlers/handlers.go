package handlers

import (
	"handlers/pkg/aluno"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-sdk-go/aws"
)

var (
	ErrorMethodNotAllowed  = "method not allowed"
	ErrorInvalidAccessData = "access code is invalid"
)

type ErrorBody struct {
	ErrorMsg *string `json:"error,omitempty"`
}

func BuscaAluno(req events.APIGatewayProxyRequest) (
	*events.APIGatewayProxyResponse, error,
) {

	acesso := req.QueryStringParameters["acesso"]
	if len(acesso) > 0 {
		result, err := aluno.BuscaAluno(acesso)
		if err != nil {
			return apiResponse(http.StatusNotFound, ErrorBody{aws.String(err.Error())})
		}
		return apiResponse(http.StatusOK, result)
	}
	return apiResponse(http.StatusBadRequest, ErrorInvalidAccessData)
}

func UnhandledMethod() (*events.APIGatewayProxyResponse, error) {
	return apiResponse(http.StatusMethodNotAllowed, ErrorMethodNotAllowed)
}
