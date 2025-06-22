import React, {useState, useEffect} from 'react'
import Modal from 'react-modal'

const NodeEdit = (props) => {
    const [modalIsOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    const submit = (data) => {
        axios.post(localStorage.getItem('addresses-node'),
                        {
                            id: props.node.id,
                            name: data.name,
                            textt: data.textt,
                            description: data.description,
                            isDeleted: false
                        },
                        {
                            params: {
                                token: localStorage.getItem('token'),
                                username: localStorage.getItem('username'),
                                storyId: props.storyId
                            }
                        })
                        .then(function (response) {

                        })
                        .catch(function (error) {
                            console.error(error);
                        })
                        .finally(function () {
                            closeModal()
                            props.reload()
                        })
    }

    return (
        <div id={'node-edit-' + props.node.id}>
            <button onClick={openModal}>Edit</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel='Edit Node'
            >
                <button onClick={closeModal}>Close</button>
                <form action={submit}>
                    <input name={'name'}
                           defaultValue={props.node.name}/>
                    <input name={'textt'}
                           defaultValue={props.node.textt}/>
                    <input name={'description'}
                           defaultValue={props.node.description}/>
                    <button type='submit'>Submit</button>
                </form>
              </Modal>
            </div>
    )
}

export default NodeEdit