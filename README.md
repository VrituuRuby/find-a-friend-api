### Requisitos Funcionais da Aplicação

- [X] Deve ser possível cadastrar um pet
- [] Deve ser possível remover um pet
- [] Deve ser possível editar um pet
- [] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [] Deve ser possível filtrar pets por suas características
- [] Deve ser possível visualizar detalhes de um pet para adoção
- [] Deve ser possível se cadastrar como uma ORG
- [] Deve ser possível realizar login como uma ORG

### Regras de negócio

- [X] Para cadastrar uma Organização precisa validar a existência da cidade e estado
- [] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [] Uma ORG precisa ter um endereço e um número de WhatsApp
- [] A Organização não pode cadastrar com email duplicado
- [] Um pet deve estar ligado a uma ORG
- [] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [] Todos os filtros, além da cidade, são opcionais
- [] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

### Regras Não Funcionais
 - [] Senha da organização deve ser criptografada ao armazenar
 - [] Dados devem ser persistidos em bando de dados PostgreSQL
 - [] Lista de Pets devem ser paginados em números de 20 items por página
 - [] Organizações devem ser identificadas por JWT
 

### Update dia 19/10
- Entre hoje e ontem eu fiz algumas alterações no prisma para acesso ao banco de dados PostgreSQL que atualmente roda via Docker com uma imagem da bitnami.
- Serviços: Criei dois services
    - RegisterPet: Serviço responsável pela criação de um pet
    - ValidateCity: Serviço responsável pela validação dos nomes das UF (Unidades Federativas) e cidades, pois mais pra frente será a mesma utilizada como filtro para procura de pets!

- Repository Pattern: na pasta repositories ficarão as interfaces e repositórios da aplicação. O Repository Pattern consiste em adicionar uma camada intermediaria entre a lógica das regras de negócio e o acesso e manipulação do banco de dados. Utilizo esse pattern pois ele isola a lógica do acesso ao banco de dados o que facilita a realização dos testes unitários.

- Criado Testes Unitários

