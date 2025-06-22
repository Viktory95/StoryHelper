import React, {useState, useEffect} from 'react'
import Modal from 'react-modal'

const NodeAdd = (props) => {
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
                            id: null,
                            name: data.name,
                            textt: data.textt,
                            birthday: data.description,
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
        <div id={'node-add'}>
            <button onClick={openModal}>Add</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel='Add Node'
            >
                <button onClick={closeModal}>Close</button>
                <form action={submit}>
                    <input name={'name'}/>
                    <input name={'textt'}/>
                    <input name={'description'}/>
                    <button type='submit'>Submit</button>
                </form>
              </Modal>
            </div>
    )
}

export default NodeAdd