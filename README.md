
# [API-NodeJs-MySQL-DockerCompose](https://github.com/guglieelmor/API-NodeJs-MySQL-DockerCompose)

> Esse projeto consiste no desenvolvimento de API (endpoints) para o agendamento via comunicação


- **Node**
- **Docker Compose**
- **MySQL**

[Linkedin](https://www.linkedin.com/in/guglieelmor/).

## Quickstart

Depois de clonar o repositório, para rodar localmente basta seguir os passos abaixo.

Certifique se você possui o [Docker](https://docs.docker.com/get-docker/) instalado na sua máquina.

1. Instalar os módulos do node

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
│   ├── server
│   │   └── server.js
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
9. ``` /docker-compose.yml && /Docker'file``` Configurações necessárias para a criações dos containers
10. ```/init.sql``` Criando o banco de dados

## Containers

Estrutura de pastas:

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

    ```
    POST http://localhost:3000/api/scheduling/create
    ```
   
    a .Exemplo de POST aceito:

    ```
    {
      "recipient": "guilherme@email.com.br", 
      "message": "Reunião sobre o DEV", 
      "scheduling_date": "2021-11-10", 
      "scheduling_hour": "10:00"
    }
    ```
   
2. Consulta do envio da comunicação.
    ```
    GET http://localhost:3000/api/scheduling/list/1
    ``` 
    a. Passando na URL o ID do agendamento que deseja visualizar

3. Cancelamento do envio da comunicação.
    ```
    PUT http://localhost:3000/api/scheduling/update/1
    ```
   a. Passando na URL o ID do agendamento que deseja cancelar


## License

API-NodeJs-MySQL-DockerCompose is licensed under the [MIT](https://en.wikipedia.org/wiki/MIT_License) license.

