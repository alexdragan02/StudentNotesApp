import React, { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import './finaltoolbar.css';

const AddNote = () => {
    const [titlu,setTitlu] = useState('');  
    const [tag,setTag] = useState('');
    const [continut,setContinut] = useState('');
    const [note, setNote] = useState({
        titlu: '',
        tag: '',
        continut: '',
        userId: localStorage.getItem('userId')
    });

   useEffect(() => {
        setNote({
            titlu: titlu,
            tag: tag,
            continut: continut,
            userId: localStorage.getItem('userId')
        });

    }, [titlu, tag, continut]);

    const handleSubmit = async (event) => {
        event.preventDefault();
console.log(note);
        try {
            const response = await fetch('http://localhost:9000/notes/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(note)
            });

            if (response.ok) {
                alert('Nota a fost adăugată cu succes!');
            } else {
                alert('A apărut o eroare la adăugarea notei.');
            }
        } catch (error) {
            console.error('Eroare la adăugarea notei:', error);
            alert('Eroare la adăugarea notei.');
        }
    };

    return (
        <div>
            <div className="toolbar">
                <Link to="/">Acasă</Link>
                <Link to="/add">Adaugă</Link>

                <div className="dropdown">
                    <select id="filter-options">
                        <option value="">Filtrează</option>
                        <option value="title">După Titlu</option>
                        <option value="tag">După Tag</option>
                    </select>
                </div>

                <div className="dropdown">
                    <select id="sort-options">
                        <option value="">Sortează</option>
                        <option value="newest">Cele mai noi</option>
                        <option value="longest">Cele mai lungi</option>
                    </select>
                </div>

                <div className="login-shortcut">
                {localStorage.getItem('isAuthenticated') === 'true' ? (
                        <Link to="/login" onClick={() => localStorage.clear()}>
                            Delogare
                        </Link>
                    ) : (
                        <Link to="/login">Logare</Link>
                    )}
                </div>
            </div>

            <div className="add-note-container">
                <form className="add-note-form" onSubmit={handleSubmit}>
                    <h2>Adaugă o Notiță Nouă</h2>

                    <label htmlFor="title">Titlul Notiței:</label>
                    <input type="text" id="title" name="title" required onChange={(e)=>setTitlu(e.target.value)} />

                    <label htmlFor="tag">Tag:</label>
                    <input type="text" id="tag" name="tag" required onChange={(e)=>setTag(e.target.value)} />

                    <label htmlFor="content">Conținutul Notiței:</label>
                    <textarea id="content" name="content" required onChange={(e)=>setContinut(e.target.value)}></textarea>

                    <button type="submit">Adaugă Notița</button>
                </form>
            </div>
        </div>
    );
};

export default AddNote;