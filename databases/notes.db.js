import { v4 as uuidv4 } from 'uuid'; // for generating random ids

const notesdb = [
    {
        id: uuidv4(),
        title: 'random title 1',
        content: 'random content 1',
        createdAt: new Date().toISOString() 
    },
    {
        id: uuidv4(),
        title: 'random title 2',
        content: 'random content 2',
        createdAt: new Date().toISOString() 
    },
    {
        id: uuidv4(),
        title: 'random title 3',
        content: 'random content 3',
        createdAt: new Date().toISOString() 
    },
    {
        id: uuidv4(),
        title: 'random title 4',
        content: 'random content 4',
        createdAt: new Date().toISOString() 
    },
];

export default notesdb;