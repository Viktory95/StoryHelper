import React, {useState, useEffect} from 'react'
import CharacterAdd from './character-add'
import CharacterView from './character-view'

const CharacterPanel = () => {
    const [characters, setCharacters] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if(!loaded) {
            //TODO: add rest request
            setCharacters([{id: 1, name: "test"}])
            setLoaded(true)
        }
    }, [characters])

    const reload = () => {
        //TODO: reload data
    }

    if(!loaded)
        return (<></>)

    return (
        <div>
            <div>Characters</div>
            <CharacterAdd reload={reload.bind(this)}/>
            <>
                {characters.map(character => {
                    return <CharacterView character={character}
                                          reload={reload.bind(this)}/>
                })}
            </>
        </div>
    )
}

export default CharacterPanel