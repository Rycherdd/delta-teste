Instruções para rodar o projeto


- Certifique que tenha essas dependencias instaladas:
- Nodejs;
- npm;
- Mysql;
- PHP;
- Composer;

- Rode dentro do diretorio delta-front: npm start
- Configure o CodeIgniter

- Configure as envs do banco de dados 
- Rode o serviço do backend

- Script do banco de dados:

- Poderia ter usado migrations, mas como tive tempo para fazer só hoje (20/10), algumas coisas eu fiz mais na pressa. 

CREATE DATABASE escola;

-- Selecionar o banco de dados
USE escola;

-- Criar a tabela 'alunos'
CREATE TABLE alunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    endereco VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

- Pontos de Melhoria

- Não tive tempo para trabalhar com a imagem, levaria mais tempo, logo optei por não colocar ela. 
- Trabalharia com migrations/seeders;
- Eu poderia fazer mais alguns tratamentos de dados, dos inputs. 

