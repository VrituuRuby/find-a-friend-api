### Requisitos Funcionais da Aplicação

- [X] Deve ser possível cadastrar um pet
- [X] Deve ser possível remover um pet
- [X] Deve ser possível editar um pet
- [X] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [X] Deve ser possível filtrar pets por suas características
- [X] Deve ser possível visualizar detalhes de um pet para adoção
- [X] Deve ser possível se cadastrar como uma ORG
- [X] Deve ser possível realizar login como uma ORG

### Regras de negócio

- [X] Para cadastrar uma Organização precisa validar a existência da cidade e estado
- [X] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [X] Uma ORG precisa ter um endereço e um número de WhatsApp
- [X] A Organização não pode cadastrar com email duplicado
- [X] Um pet deve estar ligado a uma ORG
- [X] Não deve ser possível registrar um pet á uma organização não existente
- [] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [] Todos os filtros, além da cidade, são opcionais
- [] Para uma ORG acessar a aplicação como admin, ela precisa estar logada


### Regras Não Funcionais
 - [X] Senha da organização deve ser criptografada ao armazenar
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

😎 Realizando um Desafio Novo - Find A Friend API 🚀

Olá, pessoal! Estou vindo aqui compartilhar que estou prestes a iniciar um novo projeto de desafio como parte do curso Ignite da Rocketseat. Neste projeto, vou criar uma API REST Node de adoções de animais do zero e decidi que vou documentar todo o processo aqui no LinkedIn.

Iniciando pelo backend, o projeto consiste na construção de uma plataforma onde organizações podem se cadastrar e cadastrar pets para que outros possam entrar em contato e adotá-los. Para stack do backend eu escolhi:

- Fastify: Framework node HTTP
- TypeScript;
- Eslint;
- Prisma.io;
- PostgreSQL ;
- Vitest;

Qualquer adição de bibliotecas serão informadas durante criação do projeto.

Hoje, já dei início configurando o projeto com TypeScript, ESLint e fiz a modelagem do banco de dados com relações no Prisma. Além disso, criei o README que contém as regras e requisitos da aplicação.

Vou tentar manter posts regulares sobre o projeto, compartilhando os desafios que enfrento e as soluções que encontro ao longo do desenvolvimento. Qualquer feedback é bem-vindo! 🤙

Repositório Git: https://lnkd.in/e4C_jPhf

### 24/10
- Finalizado todos os Services junto com testes unitários!
- Authenticate: Autenticação para organizações que cadastram os pets, utiliza email e senha, essa senha é verificada com o hash no banco de dados utilizando o bcrypt

- Delete Pet: Remove um pet do sistema baseado no IP

- Fetch Pets for Adoption: Necessita informar uma UF e uma Cidade, busca todos os pets da área selecionada com paginação de 20 em 20. E tem filtros que usuário pode selecionar como: Idade, Nivel de Atividade, Nivel de Independencia, Tamanho e tipo (Gato ou Cachorro).

- Get Pet: Retorna os dados específicos de um pet, requisitos, localização, etc...

- Register Organization: Cadastro de organizações, cadastra-se com os seguintes dados:
    - Cidade e UF
    - Endereço
    - Número do Endereço
    - CEP 
    - Telefone Whatsapp
    - E-mail
    - Senha
    - Nome Representante

- Register Pet: Cadastro de Pets para adoção, utilizamos os seguintes dados:
    - Nome
    - Descrição
    - Tipo (Cachorro ou Gato)
    - Idade (Filhote, Adulto ou Idoso)
    - Tamanho (Pequeno, Médio, Grande ou Gigante)
    - Nível de Atividade (Baixo, Médio ou Alto)
    - Nível de Independencia (Baixo, Médio ou Alto)
    - Requisitos - Uma lista de informações extras sobre o pet.

- Update Pet: Atualiza algum dado ou informação de um pet.

- Validate City: Procura em uma API externa a existência e validação do nome de UFs e cidades

