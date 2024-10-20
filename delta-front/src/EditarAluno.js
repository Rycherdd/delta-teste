import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';  // Usamos useParams para capturar o ID da URL

function EditarAluno() {
    const { id } = useParams();  // Captura o ID do aluno da URL
    const navigate = useNavigate();  // Usado para redirecionar após a edição
    const [aluno, setAluno] = useState({
        nome: '',
        email: '',
        telefone: '',
        endereco: ''
    });

    useEffect(() => {
        // Buscar os dados do aluno pelo ID
        axios.get(`http://localhost:8080/api/alunos/${id}`)
            .then(response => {
                setAluno(response.data);  // Preencher o formulário com os dados do aluno
            })
            .catch(error => {
                console.error('Erro ao buscar aluno:', error);
            });
    }, [id]);

    // Função para capturar mudanças nos campos de texto
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAluno({ ...aluno, [name]: value });
    };

    // Função para salvar as alterações
    const handleSave = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/api/alunos/${id}`, aluno)
            .then(response => {
                alert('Aluno atualizado com sucesso!');
                navigate('/');  // Redireciona de volta para a lista de alunos após a edição
            })
            .catch(error => {
                console.error('Erro ao atualizar aluno:', error);
            });
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Editar Aluno</h2>
            <form onSubmit={handleSave} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Nome:</label>
                    <input 
                        style={styles.input} 
                        name="nome" 
                        value={aluno.nome} 
                        onChange={handleInputChange} 
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Email:</label>
                    <input 
                        style={styles.input} 
                        type="email" 
                        name="email" 
                        value={aluno.email} 
                        onChange={handleInputChange} 
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Telefone:</label>
                    <input 
                        style={styles.input} 
                        name="telefone" 
                        value={aluno.telefone} 
                        onChange={handleInputChange} 
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Endereço:</label>
                    <input 
                        style={styles.input} 
                        name="endereco" 
                        value={aluno.endereco} 
                        onChange={handleInputChange} 
                    />
                </div>
                <button type="submit" style={styles.button}>Salvar Alterações</button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        textAlign: 'center',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        marginBottom: '5px',
        fontWeight: 'bold',
        color: '#555',
    },
    input: {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
    },
    button: {
        padding: '10px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
        marginTop: '10px',
    }
};

export default EditarAluno;
