
# [API-NodeJs-MySQL-DockerCompose](https://github.com/guglieelmor/API-NodeJs-MySQL-DockerCompose)

> Esse projeto consiste no desenvolvimento de API (endpoints) para o agendamento via comunicação


- **Node**
- **Docker Compose**
- **MySQL**

[Linkedin](https://www.linkedin.com/in/guglieelmor/).

## Quickstart

Depois de clonar o repositório, para rodar localmente basta seguir os passos abaixo.

Certifique se você possui o [Docker](https://docs.docker.com/get-docker/) instalado na sua máquina.

1. Instalar os módulos do Node

    ```
    npm i
    ```

2. Dentro do diretório do projeto, execute o comando

    ```
    docker-compose up
    ```
3. Espere o servidor subir, você pode validar isso com o log ``` Server on! ```

## Path

Estrutura de pastas:


```
├── API-NodeJs-MySQL-DockerCompose
│   ├── node_modules
│   ├── config
│   │   └── default.json
│   ├── www
│   │   ├── controllers
│   │   │   └── scheduling.js
│   │   ├── database
│   │   │   ├── models
│   │   │   │   ├── scheduling.js
│   │   │   │   └── status.js
│   │   │   ├── scripts
│   │   │   │   └── createTables.js
│   │   │   └── database.js
│   │   └── index.js
│   ├── log
│   │   └── log.js
│   ├── server
│   │   └── server.js
│   ├── test
│   │   └── index.spec.js
│   ├──.gitignore
│   ├── docker-compose.yml
│   ├── Dockerfile
│   ├── init.sql
│   ├── LICENSE
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
└──

```

1. ``` /config ``` Configurações de conexão da aplicação no server/database
2. ``` /www ``` Diretório relacionado a aplicação 
3. ``` /www/controllers ``` Onde ficam as rotas e a lógica na chamada das API
4. ``` /www/database ``` Configurações e modelagem do banco de dados em Sequelize
5. ``` /www/database/models ``` Modelagem das tabelas
6. ``` /www/database/scripts ``` Scripts que rodam automaticamente na criação das tabelas
7. ``` /www/database/database.js ``` Seta/criação do objeto Sequelize e estabelece conexão
8. ``` /www/server/server.js ``` Iniciando o servidor
8. ``` /www/log/log.js ``` Configurando logs com pino
8. ``` /www/test/index.spec.js.js ``` Teste automatizado nos endpoints usando Jest 
9. ``` /docker-compose.yml && /Docker'file``` Configurações necessárias para a criações dos containers
10. ```/init.sql``` Criando o banco de dados

## Containers

Estrutura dos arquivos:

```
├── api-nodejs-mysql-dockercompose
│   ├── adminer - PORT: 8080
│   ├── schedule_database - PORT: 6603
│   └── schedule_api- PORT: 3000
└──

```

1. ``` adminer ``` Você pode acessar o servidor MySQL na parte administrativa pelo  ``` http://localhost:8080/ ```
2. ``` schedule_database ``` Servidor MySQL ``` http://localhost:6603/ ```
3. ``` schedule_api ``` Servidor HTTP / API ``` http://localhost:3000/ ``` 

## Endpoints


1. Agendamento de envio de comunicação.
   ``` POST ```
    ```
     http://localhost:3000/api/scheduling/create
    ```
   
    a .Exemplo de ``` POST ``` aceito ``` HTTP Status Code 201 ```:

    ```
    {
      "recipient": "guilherme@email.com.br", 
      "message": "Reunião sobre o DEV", 
      "scheduling_date": "10/11/2023",
      "scheduling_hour": "10:00"
    }
    ```
   b. ```recipient:string``` E-mail de quem está agendando 

   c. ```message:string``` Um preve resumo do que se tratará nesse agendamento 

   d. ```scheduling_date:string``` Data do evento

   e. ```scheduling_hour:string``` Hora do evento


3. Consulta do envio da comunicação. ``` GET ```
    ```
    http://localhost:3000/api/scheduling/list/1
    ``` 
   a .Exemplo de Callback ``` HTTP Status Code 200 ```:

    ```
      {
        "status": 1,
        "message": "Find aged!",
        "aged": {
        "id": 1,
        "recipient": "guilherme@email.com.br",
        "message": "Reunião sobre o DEV",
        "status": 1,
        "scheduling_date": "2021-11-10",
        "scheduling_hour": "10:00",
        "createdAt": "2021-11-28T00:38:48.000Z",
        "updatedAt": "2021-12-03T01:36:19.000Z"
        }
      }
    ```
   
    b. ``` Params ``` Passando na URL o ID do agendamento que deseja visualizar


5. Cancelamento do envio da comunicação.  ``` PATCH ```
    ```
    http://localhost:3000/api/scheduling/cancel/1
    ```
   a .Exemplo de Callback ``` HTTP Status Code 200 ```:

    ```
   {
     "status": 1,
     "message": "Schedule 1 canceled successfully!"
   }
    ```

   a. ``` Params ``` Passando na URL o ID do agendamento que deseja cancelar

## Status Monitor Application

1. Você também pode monitorar a aplicação acessando  ``` GET ```
    ```
     http://localhost:3000/status
    ```

   a . Você poderá visualizar: ``` CPU Usage ``` ``` Memory Usage ``` ``` Heap Usage ``` ``` One Minute Load Avg ``` ``` Spent in Event Loop ``` ``` Response Time ``` ``` Requests per Second ``` ``` Status Codes
   2xx
   3xx
   4xx
   5xx ```


## License

API-NodeJs-MySQL-DockerCompose is licensed under the [MIT](https://en.wikipedia.org/wiki/MIT_License) license.

