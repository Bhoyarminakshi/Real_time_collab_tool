import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DocumentForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const user = JSON.parse(localStorage.getItem('user'));
            // Extract the token from the parsed object
            const token = user ? user.token : null;

            // Check if the token exists
            if (!token) {
                console.error('No token found');
                return;
            }

            // Create the document
            const { data } = await axios.post(
                'http://localhost:5000/api/documents',
                { title, content },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Log the response data to check if the document was created successfully
            console.log('Document created:', data);

            if (data && data._id) {
                // If the document has an ID, navigate to the new document page
                navigate(`/document/${data._id}`, {
                    state: { message: 'Document created successfully!' },
                });
            } else {
                console.error('Document creation failed, no ID found in response');
            }
        } catch (error) {
            console.error('Failed to create document:', error);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Create New Document</h2>
            <form onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                    <label htmlFor="title" style={styles.label}>Title</label>
                    <input
                        type="text"
                        style={styles.input}
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder="Enter document title"
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="content" style={styles.label}>Content</label>
                    <textarea
                        style={styles.input}
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        placeholder="Enter document content"
                    />
                </div>
                <button type="submit" style={styles.button}>Create Document</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        background: '#f7f7f7',
        padding: '20px',
        borderRadius: '12px',
        maxWidth: '600px',
        margin: '30px auto',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    },
    heading: {
        fontSize: '30px',
        fontWeight: 'bold',
        color: '#4c6ef5',
        textAlign: 'center',
        marginBottom: '20px',
        textTransform: 'uppercase',
        background: 'linear-gradient(45deg, #4c6ef5, #ff6f61)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        animation: 'headingFadeIn 1s ease-out',
    },
    formGroup: {
        marginBottom: '20px',
    },
    label: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#333',
    },
    input: {
        padding: '12px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        fontSize: '16px',
        width: '100%',
        transition: 'all 0.3s ease-in-out',
        resize: 'vertical',
    },
    button: {
        padding: '12px',
        fontSize: '16px',
        backgroundColor: '#4c6ef5',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        transition: 'all 0.3s ease-in-out',
        cursor: 'pointer',
        width: '100%',
    },
};

// CSS Animations
const keyframes = `
@keyframes headingFadeIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;

// Adding keyframes to document head dynamically
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default DocumentForm;
