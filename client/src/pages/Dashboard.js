import { useEffect, useState } from "react";

import axios from 'axios';

function Dashboard() {
    const [vocabList, setVocabList] = useState([]);
    const [newWord, setNewWord] = useState('');
    const [POS, setPOS] = useState('');
    const [definition, setDefinition] = useState('');
    const [example, setExample] = useState('');

    useEffect(() => {
    const fetchVocab = async () => {
        const { data } = await axios.get('http://localhost:3070/api/vocab', {
            headers: { Authorization: localStorage.getItem('token') }
        });
        setVocabList(data);
    };
    fetchVocab();
    }, []);

    const handleAddVocab = async () => {
    const { data } = await axios.post('http://localhost:3070/api/vocab', {
        word: newWord,
        partOfSpeech: POS,
        definition,
        example,
    }, {
        headers: { Authorization: localStorage.getItem('token') }
    });
    setVocabList([...vocabList, data]);
    setPOS('');
    setNewWord('');
    setDefinition('');
    setExample('');
    };

    return (
    <div>
        <h1>Vocabulary List</h1>
        <ul>
            {vocabList.map((vocab) => (
                <li key={vocab._id}>{vocab.word} [{vocab.partOfSpeech}] : {vocab.definition} : {vocab.example}</li>
            ))}
        </ul>
        <h2>Add New Word</h2>
        <input
            type="text"
            placeholder="Word"
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
        />
        <input
            type="text"
            placeholder="Part of Speech"
            value={POS}
            onChange={(e) => setPOS(e.target.value)}
        />
        <input
            type="text"
            placeholder="Definition"
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
        />
        <input
            type="text"
            placeholder="Example"
            value={example}
            onChange={(e) => setExample(e.target.value)}
        />
        <button onClick={handleAddVocab}>Add</button>
    </div>
    );
}

export { Dashboard };