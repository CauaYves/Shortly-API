# API de Encurtamento de URLs - Documentação do Usuário
### Bem-vindo à documentação da API de encurtamento de URLs! Esta API permite que você crie URLs encurtadas e rastreie a contagem de visitas. Abaixo estão detalhadas as rotas disponíveis, os parâmetros necessários e as respostas esperadas.

# Autenticação
### Algumas rotas requerem autenticação. Para autenticar suas solicitações, você precisa incluir um cabeçalho Authorization contendo um token de acesso válido no formato Bearer TOKEN. Você receberá esse token ao fazer login ou se cadastrar na rota correspondente. Certifique-se de incluir esse cabeçalho em todas as solicitações autenticadas.

# Erros
##### Ao fazer solicitações para a API, você pode encontrar os seguintes códigos de erro:

401 Unauthorized: A solicitação não está autenticada ou o token de acesso é inválido.  
404 Not Found: O recurso solicitado não foi encontrado.  
409 Conflict: Já existe um usuário cadastrado com o e-mail fornecido.  
422 Unprocessable Entity: A solicitação possui erros de validação. Verifique a resposta para obter detalhes adicionais.
Rotas  

# 1. Cadastro de Usuário  
Método: POST  
Rota: /signup  
Autenticação: Não requerida  
Esta rota permite que você se cadastre na API fornecendo seus detalhes de usuário.  

#### Parâmetros
| Nome            | Tipo   | Descrição                |
|-----------------|--------|--------------------------|
| name            | String | Nome do usuário          |
| email           | String | E-mail do usuário        |
| password        | String | Senha do usuário         |
| confirmPassword | String | Confirmação de senha     |

### exemplo de corpo:
```
{
	"name": "João",
	"email": "joao@driven.com.br",
	"password": "driven",
	"confirmPassword": "driven"
}
```
## Respostas
#### 201 Created: O usuário foi criado com sucesso.
#### 422 Unprocessable Entity: A solicitação contém erros de validação. A resposta incluirá detalhes sobre os erros encontrados.

# 2. Login de Usuário  
Método: POST  
Rota: /signin  
Autenticação: Não requerida  
Esta rota permite que você faça login na API e obtenha um token de acesso para autenticação posterior.  

### Parâmetros

| Nome                          | Tipo    | Descrição               |
|-------------------------------|---------|-------------------------|
| email                         | String  | E-mail do usuário       |
| password                      | String  | Senha do usuário        |

## Respostas
### 200 OK: Login bem-sucedido. A resposta incluirá um token de acesso.
### 401 Unauthorized: As credenciais fornecidas são inválidas.
### 422 Unprocessable Entity: A solicitação contém erros de validação. A resposta incluirá detalhes sobre os erros encontrados.

## Exemplo de Corpo da Resposta (login bem-sucedido):  

```
{
	"token": "MEUTOKEN"
}
```
# 3. Encurtar URL
Método: POST
Rota: /urls/shorten
Autenticação: Requerida (token de acesso no cabeçalho Authorization)
Esta rota permite que você encurte uma URL fornecida.

### Parâmetros

| Nome | Tipo   | Descrição             |
|------|--------|-----------------------|
| url  | String | URL a ser encurtada   |

```
{
	"url": "https://..."
}
```

## respostas
### 201 Created: A URL foi encurtada com sucesso. A resposta incluirá o ID da URL encurtada e sua versão curta.
### 401 Unauthorized: A solicitação não está autenticada ou o token de acesso é inválido.
### 422 Unprocessable Entity: A solicitação contém erros de validação. A resposta incluirá detalhes sobre os erros encontrados.

## Exemplo de Corpo da Resposta (URL encurtada com sucesso):
```
{
	"id": 1,
	"shortUrl": "a8745bcf"
}
```

# 4. Obter Detalhes de uma URL Encurtada
Método: GET
Rota: /urls/:id
Autenticação: Não requerida
Esta rota permite que você obtenha os detalhes de uma URL encurtada.

## Parâmetros
| Nome | Tipo   | Descrição                        |
|------|--------|----------------------------------|
| id   | Number | ID da URL encurtada desejada      |

## Respostas
### 200 OK: Os detalhes da URL foram obtidos com sucesso.
### 404 Not Found: A URL encurtada especificada não existe.

Exemplo de Corpo da Resposta (URL encontrada):

```
{
	"id": 1,
	"shortUrl": "bd8235a0",
	"url": "https://..."
}
```
# 5. Abrir URL Encurtada
Método: GET  
Rota: /urls/open/:shortUrl  
Autenticação: Não requerida  
Esta rota permite que você seja redirecionado para a URL correspondente a uma URL encurtada.  

## Parâmetros

| shortUrl  | String | URL encurtada a ser redirecionada |

## Respostas
### Redirecionamento: Você será redirecionado para a URL correspondente.
### 404 Not Found: A URL encurtada especificada não existe.

# 6. Excluir URL Encurtada
Método: DELETE  
Rota: /urls/:id  
Autenticação: Requerida (token de acesso no cabeçalho Authorization)  
Esta rota permite que você exclua uma URL encurtada.  

## Parâmetros
| id    | Number | ID da URL encurtada a ser excluída |

## Respostas
### 204 No Content: A URL encurtada foi excluída com sucesso.
### 401 Unauthorized: A solicitação não está autenticada ou o token de acesso é inválido.
### 404 Not Found: A URL encurtada especificada não existe.
### 401 Unauthorized: A URL encurtada não pertence ao usuário.

# 7. Obter Dados do Usuário
Método: GET  
Rota: /users/me  
Autenticação: Requerida (token de acesso no cabeçalho Authorization)  
Esta rota permite que você obtenha os dados do usuário associados ao token de acesso.  

## Parâmetros
Nenhum parâmetro adicional necessário.

## Respostas
### 200 OK: Os dados do usuário foram obtidos com sucesso.
### 401 Unauthorized: A solicitação não está autenticada ou o token de acesso é inválido.

Exemplo de Corpo da Resposta (dados do usuário):
```
{
	"id": "ID do usuário",
	"name": "Nome do usuário",
	"visitCount": "Soma da quantidade de visitas de todos os links do usuário",
	"shortenedUrls": [
		{
			"id": 1,
			"shortUrl": "...",
			"url": "...",
			"visitCount": "Soma da quantidade de visitas do link"
		},
		{
			"id": 2,
			"shortUrl": "...",
			"url": "...",
			"visitCount": "Soma da quantidade de visitas do link"
		}
	]
}
```

# 8. Classificação de Usuários
Método: GET  
Rota: /ranking   
Autenticação: Não requerida  
Esta rota permite obter uma lista classificada de usuários com base na soma de visitas de seus links.  

## Parâmetros
Nenhum parâmetro adicional necessário.

## Respostas
### 200 OK: A lista de usuários classificados foi obtida com
























