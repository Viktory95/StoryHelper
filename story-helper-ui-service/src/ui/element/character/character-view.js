import React, {useState, useEffect} from 'react'
import CharacterEdit from './character-edit'
import CharacterDelete from './character-delete'

const CharacterView = (props) => {
//TODO: add placeholder with info about character

    const reload = () => {
        props.reload()
    }

    return (
        <div>
            <div>{props.character.name}</div>
            <CharacterEdit character={props.character}
                                      reload={reload.bind(this)}/>
            <CharacterDelete id={props.character.id}
                                      reload={reload.bind(this)}/>
        </div>
    )
}

export default CharacterView