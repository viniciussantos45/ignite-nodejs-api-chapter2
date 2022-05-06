<!--prettier-ignore-->
# Cadastro de carros

**Requisitos funcionais**

* Deve ser possível cadastrar um novo carro.

* Deve ser possível listar todas as categorias.

**Regras de negócio**

* Não deve ser possível cadastrar um carro com uma placa já existente.
* Não deve ser possível alterar a placa de um carro já cadastrado.
* O carro deve ser cadastrado por padrão como disponível.
* Somente um administrador pode fazer o cadastro de um carro.

# Listagem de carros

**Requisitos funcionais**

* Deve ser possível listar todos os carros disponíveis.

* Deve ser possível listar todos os carros disponíveis pelo nome da categoria.

* Deve ser possível listar todos os carros disponíveis pelo nome da marca.

* Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**Regras de negócio**

* O usuário não precisa estar logado no sistema.

# Cadastro de especificação do carro

**Requisitos funcionais**

* Deve ser possivel cadastrar uma especificação para um carro.
* Deve ser possível listar todas as especificações.
* Deve ser possível listar todos os carros.

**Regras de negócio**

* Não deve ser possível cadastrar uma especificação para um carro não cadastrado.

* Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
* Somente um administrador pode fazer o cadastro de uma especificação.

# Cadastro de imagens do carro

**Requisitos funcionais**

* Deve ser possível cadastrar imagem do carro.

**Requisitos não funcionais**

* Utilizar multer para upload dos arquivos.

**Regras de negócio**

* O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
* O usuário responsável pelo cadastro deve ser um usuário administrador.

# Aluguel de carro

**Requisitos funcionais**

* Deve ser possível cadastrar um aluguel.

**Regras de negócio**

* O aluguel deve ter duração miníma de 24 horas.
* Não é possível fazer um aluguel caso já exista um em aberto para o usuário em questão.
* Apenas é possível fazer aluguel de carro disponível (carros disponíveis)
* O usuário deve estar logado na aplicação
