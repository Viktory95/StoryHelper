import React, {useState, useEffect} from 'react'
import Modal from 'react-modal'

const NodeDelete = (props) => {
    const [modalIsOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    const submit = () => {
        axios.delete(localStorage.getItem('addresses-node'),
                        {
                            params: {
                                token: localStorage.getItem('token'),
                                username: localStorage.getItem('username'),
                                id: props.id
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
        <div id={'node-delete-' + props.id}>
            <button onClick={openModal}>Delete</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel='Delete Node'
            >
                <>Are you sure?</>
                <button onClick={closeModal}>Close</button>
                <button onClick={submit}>Delete</button>
              </Modal>
            </div>
    )
}

export default NodeDelete