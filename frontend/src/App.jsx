import React, { useEffect, useState } from 'react';
import axios from './api';

function App() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const response = await axios.get('/items');
        setItems(response.data);
    };

    const addItem = async () => {
        await axios.post('/items', { name: newItem });
        setNewItem('');
        fetchItems();
    };

    const deleteItem = async (id) => {
        await axios.delete(`/items/${id}`);
        fetchItems();
    };

    return (
        <div>
            <h1>Todolist</h1>
            <input value={newItem} onChange={(e) => setNewItem(e.target.value)} />
            <button onClick={addItem}>Add</button>
            <ul>
                {items.map(item => (
                    <li key={item._id}>
                        {item.name} <button onClick={() => deleteItem(item._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;