import React, { useState } from 'react';
import axios from 'axios';

function AddAluno({ onAlunoAdded }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);  // Estado para o modal de sucesso

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8080/api/alunos', {
            nome, email, telefone, endereco
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            setNome('');
            setEmail('');
            setTelefone('');
            setEndereco('');
            setShowSuccessModal(true);
            setTimeout(() => {
                setShowSuccessModal(false);  // Oculta o modal após 3 segundos
            }, 3000);
            onAlunoAdded();  // Atualiza a lista de alunos

            // Exibe o modal de sucesso
        })
        .catch(error => {
            console.error('Erro ao criar aluno', error);
        });
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Adicionar Aluno</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Nome:</label>
                    <input 
                        style={styles.input} 
                        value={nome} 
                        onChange={e => setNome(e.target.value)} 
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Email:</label>
                    <input 
                        style={styles.input} 
                        type="email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Telefone:</label>
                    <input 
                        style={styles.input} 
                        value={telefone} 
                        onChange={e => setTelefone(e.target.value)} 
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Endereço:</label>
                    <input 
                        style={styles.input} 
                        value={endereco} 
                        onChange={e => setEndereco(e.target.value)} 
                    />
                </div>
                <button type="submit" style={styles.button}>Adicionar Aluno</button>
            </form>

            {/* Modal de Sucesso */}
            {showSuccessModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <h2 style={styles.modalTitle}>Aluno criado com sucesso!</h2>
                    </div>
                </div>
            )}
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
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
    },
    modalTitle: {
        marginBottom: '10px',
        fontSize: '18px',
        color: '#333',
    },
};

export default AddAluno;
