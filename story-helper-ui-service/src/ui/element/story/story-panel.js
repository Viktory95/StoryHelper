import React, {useState, useEffect} from 'react'
import StoryAdd from './story-add'
import StoryView from './story-view'
import axios from 'axios'

const StoryPanel = () => {
    const [stories, setStories] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if(!loaded) {
            axios.get(localStorage.getItem('addresses-story'), {
                params: {
                  token: localStorage.getItem('token'),
                  username: localStorage.getItem('username')
                }
              })
              .then(function (response) {
                setStories(response.data)
              })
              .catch(function (error) {
                console.error(error);
              })
              .finally(function () {
                setLoaded(true)
              })
        }
    }, [stories])

    const reload = () => {
        setStories([])
        setLoaded(false)
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