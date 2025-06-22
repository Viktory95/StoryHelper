import React, {useState, useEffect} from 'react'
import StoryEdit from './story-edit'
import StoryDelete from './story-delete'
import CharacterPanel from '../character/character-panel'
import NodePanel from '../node/node-panel'

const StoryView = (props) => {
//TODO: add placeholder with info about story

    const reload = () => {
        props.reload()
    }

    return (
        <div>
            <div>{props.story.name}</div>
            <StoryEdit story={props.story}
                       reload={reload.bind(this)}/>
            <StoryDelete id={props.story.id}
                         reload={reload.bind(this)}/>
            <CharacterPanel storyId={props.story.id}
                            characters={props.story.characters}/>
            <NodePanel storyId={props.story.id}
                       nodes={props.story.nodes}/>
        </div>
    )
}

export default StoryView