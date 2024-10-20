<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->group('api', ['namespace' => 'App\Controllers'], function($routes) {
    $routes->get('alunos', 'AlunoController::index');          // Listar alunos
    $routes->get('alunos/(:num)', 'AlunoController::show/$1');  // Visualizar detalhes
    $routes->post('alunos', 'AlunoController::create');         // Criar aluno
    $routes->put('alunos/(:num)', 'AlunoController::update/$1');// Atualizar aluno
    $routes->delete('alunos/(:num)', 'AlunoController::delete/$1'); // Excluir aluno
});

