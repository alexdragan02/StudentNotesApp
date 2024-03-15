import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './finaltoolbar.css';

const Home = () => {
    const [notes, setNotes] = useState([]);
    const [filterCriteria, setFilterCriteria] = useState('');
    const [sortCriteria, setSortCriteria] = useState('');

    useEffect(() => {
        const fetchNotes = async () => {
            const userId = localStorage.getItem('userId');

            try {
                const response = await fetch(`http://localhost:9000/notes/user/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setNotes(data.data);
                } else {
                    console.error('Error fetching notes');
                }
            } catch (error) {
                console.error('Error fetching notes', error);
            }
        };

        fetchNotes();
    }, []);

    useEffect(() => {
        applyFilterAndSort();
    }, [filterCriteria, sortCriteria]);

    const handleFilterChange = (event) => {
        setFilterCriteria(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortCriteria(event.target.value);
    };

    const applyFilterAndSort = () => {
        let updatedNotes = [...notes];
    
        if (filterCriteria) {
            updatedNotes = updatedNotes.filter(note => {
                if (filterCriteria === 'titlu' && note.titlu) {
                    return note.titlu.toLowerCase().includes(filterCriteria.toLowerCase());
                }
                if (filterCriteria === 'continut' && note.descriere) {
                    return note.descriere.toLowerCase().includes(filterCriteria.toLowerCase());
                }
                return true;
            });
        }
    
        if (sortCriteria === 'newest') {
            updatedNotes.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (sortCriteria === 'longest') {
            updatedNotes.sort((a, b) => b.continut.length - a.continut.length);
        }
    
        setNotes(updatedNotes);
    };

    const handlerRemove = async (id) => {

        try {
            const response = await fetch(`http://localhost:9000/notes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('Nota a fost ștearsă cu succes!');
                setNotes(notes.filter(note => note.id !== id));
            } else {
                alert('A apărut o eroare la ștergerea notei.');
            }
        } catch (error) {
            console.error('Eroare la ștergerea notei:', error);
            alert('Eroare la ștergerea notei.');
        }

    }

    return (
        <div>
            <div className="toolbar">
                <Link to="/">Acasă</Link>
                <Link to="/add">Adaugă</Link>

                <div className="dropdown">
                    <select id="filter-options" onChange={handleFilterChange}>
                        <option value="">Filtrează</option>
                        <option value="titlu">După Titlu</option>
                        <option value="description">După Descriere</option>
                    </select>
                </div>

                <div className="dropdown">
                    <select id="sort-options" onChange={handleSortChange}>
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

            <div className="allNotes">
                {notes.map((note) => (
                    <div key={note.id} className="note">
                        <h2>{note.titlu}</h2>
                        <p>Tag: {note.tag}</p>
                        <p>{note.continut}</p>
                        <span className='button__remove' onClick={() => handlerRemove(note.id)}>X</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;

   
