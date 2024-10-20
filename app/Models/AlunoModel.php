<?php

namespace App\Models;

use CodeIgniter\Model;

class AlunoModel extends Model
{
    protected $table = 'alunos';          // Tabela no banco de dados
    protected $primaryKey = 'id';         // Chave primária
    protected $allowedFields = ['nome', 'email', 'telefone', 'endereco', 'foto']; // Campos permitidos para CRUD
}
