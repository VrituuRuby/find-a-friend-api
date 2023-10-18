### Requisitos Funcionais da Aplicação

- [] Deve ser possível cadastrar um pet
- [] Deve ser possível remover um pet
- [] Deve ser possível editar um pet
- [] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [] Deve ser possível filtrar pets por suas características
- [] Deve ser possível visualizar detalhes de um pet para adoção
- [] Deve ser possível se cadastrar como uma ORG
- [] Deve ser possível realizar login como uma ORG

### Regras de negócio

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
 