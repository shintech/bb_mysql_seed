## bb_mysql_seed

### Synopsis

    REST API - GET, POST, PUT and DELETE
    
    Example database entry:
    
      {
        attribute: <integer>,
        created_at: <timestamp> # created automatically,
        id: <integer> # primary key - created automatically,
        name: <string
      }

### Installation

    git clone https://github.com/shintech/bb_mysql_seed
    
    ./install
    
### Usage

    NODE_ENV=development PORT=<port> TZ='America/Chicago' DB_USER=<user> DB_HOST=<host> DB_NAME=<database> DB_PASSWORD=<password> npm start
    
    # to run tests
    
    PORT=<port> TZ='America/Chicago' DB_USER=<user> DB_HOST=<host> DB_NAME=<database> DB_PASSWORD=<password> npm test
    
#### Routes

Note: use curl, httpie or postman - examples here are given using httpie

#### GET /api/models

    http http://<host>:<port>/api/models
    
#### GET /api/models/:id

    http http://<host>:<port>/api/models/<id>

#### POST /api/models

    http -f POST http://<host>:<port>/api/models name=<string> attribute=<integer>
    
#### PUT /api/models/:id
  
    http PUT http://<host>:<port>/api/models/<id> name=<string> attribute=<integer>
    
#### DELETE /api/models/:id

    http DELETE http://<host>:<port>/api/models/<id>