<?php

namespace App\Controllers;

use App\Models\AlunoModel;
use CodeIgniter\RESTful\ResourceController;

class AlunoController extends ResourceController
{
    protected $modelName = 'App\Models\AlunoModel';
    protected $format = 'json';  // Formato de resposta

    // Listar todos os alunos
    public function index()
    {
        return $this->respond($this->model->findAll());
    }

    // Visualizar detalhes de um aluno específico
    public function show($id = null)
    {
        $data = $this->model->find($id);
        if ($data) {
            return $this->respond($data);
        }
        return $this->failNotFound('Aluno não encontrado');
    }

    // Criar um novo aluno
    public function create()
    {
        try {
            $data = $this->request->getJSON();
            
            if ($this->model->insert($data)) {
                return $this->respondCreated($data);
            }
            return $this->failValidationError('Erro ao criar aluno');
            //code...
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    // Atualizar informações de um aluno
    public function update($id = null)
    {
        $data = $this->request->getJSON();
        if ($this->model->update($id, $data)) {
            return $this->respond($data);
        }
        return $this->failValidationError('Erro ao atualizar aluno');
    }

    // Excluir um aluno
    public function delete($id = null)
    {
        if ($this->model->delete($id)) {
            return $this->respondDeleted('Aluno excluído com sucesso');
        }
        return $this->failNotFound('Aluno não encontrado');
    }
}
