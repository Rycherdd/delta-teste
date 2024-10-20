import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ListAlunos() {
    const [alunos, setAlunos] = useState([]);
    const [error, setError] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [alunoEditado, setAlunoEditado] = useState({ id: '', nome: '', email: '', telefone: '', endereco: '' });
    const [alunoIdToDelete, setAlunoIdToDelete] = useState(null);
    const [notification, setNotification] = useState('');  // Estado para a mensagem de notificação

    // Função para buscar a lista de alunos
    const fetchAlunos = () => {
        axios.get('http://localhost:8080/api/alunos')
            .then(response => {
                setAlunos(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar alunos:', error);
                setError('Erro ao carregar a lista de alunos.');
            });
    };

    // Buscar os alunos quando o componente for montado
    useEffect(() => {
        fetchAlunos();
    }, []);

    // Função para abrir o modal de edição e preencher os dados do aluno
    const handleEdit = (aluno) => {
        setShowEditModal(true);
        setAlunoEditado(aluno);
    };

    // Função para salvar as alterações e fechar o modal
    const handleSaveEdit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/api/alunos/${alunoEditado.id}`, alunoEditado)
            .then(response => {
                setShowEditModal(false);  // Fecha o modal após salvar
                fetchAlunos();  // Atualiza a lista de alunos
                showNotification('Aluno atualizado com sucesso!');  // Mostra notificação de sucesso
            })
            .catch(error => {
                console.error('Erro ao atualizar aluno:', error);
            });
    };

    // Função para abrir o modal de confirmação de deleção
    const handleDeleteConfirmation = (id) => {
        setAlunoIdToDelete(id);  // Armazena o ID do aluno que será deletado
        setShowDeleteModal(true);  // Mostra o modal de confirmação
    };

    // Função para confirmar a deleção
    const handleConfirmDelete = () => {
        axios.delete(`http://localhost:8080/api/alunos/${alunoIdToDelete}`)
            .then(response => {
                setShowDeleteModal(false);  // Fecha o modal após deletar
                fetchAlunos();  // Atualiza a lista após deletar
                showNotification('Aluno deletado com sucesso!');  // Mostra notificação de sucesso
            })
            .catch(error => {
                console.error('Erro ao deletar aluno:', error);
            });
    };

    // Função para exibir uma notificação visual
    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => {
            setNotification('');  // Remove a notificação após 3 segundos
        }, 3000);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Lista de Alunos</h2>
            <ul style={styles.list}>
                {alunos.length > 0 ? (
                    alunos.map(aluno => (
                        <li key={aluno.id} style={styles.listItem}>
                            <div>
                                <strong>Nome:</strong> {aluno.nome} <br />
                                <strong>Email:</strong> {aluno.email} <br />
                                <strong>Telefone:</strong> {aluno.telefone} <br />
                                <strong>Endereço:</strong> {aluno.endereco}
                            </div>
                            <div style={styles.actions}>
                                <button 
                                    style={styles.editButton} 
                                    onClick={() => handleEdit(aluno)}>
                                    Editar
                                </button>
                                <button 
                                    style={styles.deleteButton} 
                                    onClick={() => handleDeleteConfirmation(aluno.id)}>
                                    Deletar
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p style={styles.noData}>Nenhum aluno encontrado.</p>
                )}
            </ul>

            {/* Modal de Edição */}
            {showEditModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <h2 style={styles.modalTitle}>Editar Aluno</h2>
                        <form onSubmit={handleSaveEdit} style={styles.form}>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Nome:</label>
                                <input 
                                    style={styles.input} 
                                    name="nome" 
                                    value={alunoEditado.nome} 
                                    onChange={(e) => setAlunoEditado({ ...alunoEditado, nome: e.target.value })} 
                                />
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Email:</label>
                                <input 
                                    style={styles.input} 
                                    type="email" 
                                    name="email" 
                                    value={alunoEditado.email} 
                                    onChange={(e) => setAlunoEditado({ ...alunoEditado, email: e.target.value })} 
                                />
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Telefone:</label>
                                <input 
                                    style={styles.input} 
                                    name="telefone" 
                                    value={alunoEditado.telefone} 
                                    onChange={(e) => setAlunoEditado({ ...alunoEditado, telefone: e.target.value })} 
                                />
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Endereço:</label>
                                <input 
                                    style={styles.input} 
                                    name="endereco" 
                                    value={alunoEditado.endereco} 
                                    onChange={(e) => setAlunoEditado({ ...alunoEditado, endereco: e.target.value })} 
                                />
                            </div>
                            <div style={styles.modalActions}>
                                <button type="submit" style={styles.saveButton}>Salvar Alterações</button>
                                <button type="button" style={styles.cancelButton} onClick={() => setShowEditModal(false)}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal de Confirmação de Deleção */}
            {showDeleteModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <h2 style={styles.modalTitle}>Deletar Aluno</h2>
                        <p style={styles.modalText}>Você tem certeza que deseja deletar este aluno?</p>
                        <div style={styles.modalActions}>
                            <button style={styles.saveButton} onClick={handleConfirmDelete}>Sim, Deletar</button>
                            <button style={styles.cancelButton} onClick={() => setShowDeleteModal(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Notificação Flutuante */}
            {notification && (
                <div style={styles.notification}>
                    {notification}
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '600px',
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
    list: {
        listStyleType: 'none',
        padding: 0,
    },
    listItem: {
        backgroundColor: '#fff',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    actions: {
        display: 'flex',
        gap: '10px',
    },
    editButton: {
        padding: '8px 12px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    deleteButton: {
        padding: '8px 12px',
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    noData: {
        textAlign: 'center',
        color: '#555',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        width: '400px',
    },
    modalTitle: {
        marginBottom: '20px',
        fontSize: '20px',
        color: '#333',
        textAlign: 'center',
    },
    modalText: {
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '16px',
        color: '#555',
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
    modalActions: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
    saveButton: {
        padding: '10px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    cancelButton: {
        padding: '10px',
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    notification: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        fontSize: '16px',
    },
};

export default ListAlunos;
