import React from 'react';

const PetfulContext = React.createContext({
    people: [],
    cats: [],
    dogs: []
});

export default PetfulContext;