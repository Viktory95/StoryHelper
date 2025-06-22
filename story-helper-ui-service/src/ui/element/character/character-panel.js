import React, {useState, useEffect} from 'react'
import CharacterAdd from './character-add'
import CharacterView from './character-view'

const CharacterPanel = () => {
    const [characters, setCharacters] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if(!loaded) {
            axios.get(localStorage.getItem('addresses-character'), {
                            params: {
                              token: localStorage.getItem('token'),
                              username: localStorage.getItem('username'),
                              ids: props.characters
                            }
                          })
                          .then(function (response) {
                            setCharacters(response.data)
                          })
                          .catch(function (error) {
                            console.error(error);
                          })
                          .finally(function () {
                            setLoaded(true)
                          })
        }
    }, [characters])

    const reload = () => {
        setCharacters([])
        setLoaded(false)
    }

    if(!loaded)
        return (<></>)

    return (
        <div>
            <div>Characters</div>
            <CharacterAdd storyId={props.storyId}
                          reload={reload.bind(this)}/>
            <>
                {characters.map(character => {
                    return <CharacterView character={character}
                                          storyId={props.storyId}
                                          reload={reload.bind(this)}/>
                })}
            </>
        </div>
    )
}

export default CharacterPanel