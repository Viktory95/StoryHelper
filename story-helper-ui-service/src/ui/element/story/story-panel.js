import React, {useState, useEffect} from 'react'
import StoryAdd from './story-add'
import StoryView from './story-view'

const StoryPanel = () => {
    const [stories, setStories] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if(!loaded) {
            //TODO: add rest request
            setStories([{id: 1, name: "test"}])
            setLoaded(true)
        }
    }, [stories])

    const reload = () => {
        //TODO: reload data
    }

    if(!loaded)
        return (<></>)

    return (
        <div>
            <div>Stories</div>
            <StoryAdd reload={reload.bind(this)}/>
            <>
                {stories.map(story => {
                    return <StoryView story={story}
                                      reload={reload.bind(this)}/>
                })}
            </>
        </div>
    )
}

export default StoryPanel