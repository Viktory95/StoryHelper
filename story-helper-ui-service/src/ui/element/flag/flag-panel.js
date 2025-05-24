import React, {useState, useEffect} from 'react'
import FlagAdd from './flag-add'
import FlagView from './flag-view'

const FlagPanel = () => {
    const [flags, setFlags] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if(!loaded) {
            //TODO: add rest request
            setFlags([{id: 1, icon: "test"}])
            setLoaded(true)
        }
    }, [flags])

    const reload = () => {
        //TODO: reload data
    }

    if(!loaded)
        return (<></>)

    return (
        <div>
            <div>Flags</div>
            <FlagAdd reload={reload.bind(this)}/>
            <>
                {flags.map(flag => {
                    return <FlagView flag={flag}
                                     reload={reload.bind(this)}/>
                })}
            </>
        </div>
    )
}

export default FlagPanel