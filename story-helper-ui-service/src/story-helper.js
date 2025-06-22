import React, {useState, useEffect} from 'react'
import StoryPanel from './ui/element/story/story-panel'
import Diagram from './ui/graph/diagram'
import Diagram from './ui/login/login'
import axios from 'axios'

import config from './ui/config/config.json'

const StoryHelper = () => {
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if(!loaded && localStorage.getItem('token') == null) {
            axios.get('${config.configServer}/story_helper_ui')
              .then(function (response) {
                localStorage.setItem('addresses-login', response.data.addresses.login)
                localStorage.setItem('addresses-register', response.data.addresses.register)
                localStorage.setItem('addresses-tokenCheck', response.data.addresses.tokenCheck)
                localStorage.setItem('addresses-character', response.data.addresses.character)
                localStorage.setItem('addresses-flag', response.data.addresses.flag)
                localStorage.setItem('addresses-genre', response.data.addresses.genre)
                localStorage.setItem('addresses-node', response.data.addresses.node)
                localStorage.setItem('addresses-story', response.data.addresses.story)
                localStorage.setItem('addresses-style', response.data.addresses.style)
                localStorage.setItem('addresses-view', response.data.addresses.view)
                localStorage.setItem('addresses-log', response.data.addresses.log)
                setLoaded(true)
              })
              .catch(function (error) {
                console.error(error);
              })
        } else if(!loaded && localStorage.getItem('token') != null) {
            setLoaded(true)
        }
    }, [loaded])

    const reload = () => {
        setLoaded(false)
    }

    if(!loaded)
        return (<>Error with config loading.</>)

    if(localStorage.getItem('token'))
      return (<>
          <StoryPanel/>
          <Diagram/>
      </>)

    return (<Login reload={reload.bind(this)}/>)
}

export default StoryHelper