import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Importa o React Router
import AddAluno from './AddAluno';
import ListAlunos from './ListarAluno';
import EditarAluno from './EditarAluno';  // Importa o componente de edição

function App() {
    return (
        <Router>
            <div className="App">
                <center><h1>Gerenciamento de Alunos</h1></center>
                <AddAluno />  {/* Mantém o componente de adicionar aluno */}
                <Routes>
                    <Route path="/" element={<ListAlunos />} />  {/* Rota para listagem de alunos */}
                    <Route path="/editar-aluno/:id" element={<EditarAluno />} />  {/* Rota para edição */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
