import React, {useState, useEffect} from 'react'
import FlagAdd from './flag-add'
import FlagView from './flag-view'

const FlagPanel = () => {
    const [flags, setFlags] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if(!loaded) {
                    axios.get(localStorage.getItem('addresses-flag'), {
                                    params: {
                                      token: localStorage.getItem('token'),
                                      username: localStorage.getItem('username'),
                                      ids: props.flags
                                    }
                                  })
                                  .then(function (response) {
                                    setFlags(response.data)
                                  })
                                  .catch(function (error) {
                                    console.error(error);
                                  })
                                  .finally(function () {
                                    setLoaded(true)
                                  })
                }
    }, [flags])

    const reload = () => {
        setFlags([])
        setLoaded(false)
    }

    if(!loaded)
        return (<></>)

    return (
        <div>
            <div>Flags</div>
            <FlagAdd nodeId={props.nodeId}
                     reload={reload.bind(this)}/>
            <>
                {flags.map(flag => {
                    return <FlagView flag={flag}
                                     nodeId={props.nodeId}
                                     reload={reload.bind(this)}/>
                })}
            </>
        </div>
    )
}

export default FlagPanel