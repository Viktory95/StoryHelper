import React, {useState, useEffect} from 'react'
import Modal from 'react-modal'

const CharacterEdit = (props) => {
    const [modalIsOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    const submit = (data) => {
        axios.post(localStorage.getItem('addresses-character'),
                {
                    id: props.character.id,
                    name: data.name,
                    gender: data.gender,
                    birthday: data.birthday,
                    appearance: data.appearance,
                    features: data.features,
                    characterDescription: data.characterDescription,
                    importanceRate: data.importanceRate,
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
        <div id={'character-edit-' + props.character.id}>
            <button onClick={openModal}>Edit</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel='Edit Character'
            >
                <button onClick={closeModal}>Close</button>
                <form action={submit}>
                    <input name={'name'}
                           defaultValue={props.character.name}/>
                    <input name={'gender'}
                           defaultValue={props.character.gender}/>
                    <input name={'birthday'}
                           defaultValue={props.character.birthday}/>
                    <input name={'appearance'}
                           defaultValue={props.character.appearance}/>
                    <input name={'features'}
                           defaultValue={props.character.features}/>
                    <input name={'characterDescription'}
                           defaultValue={props.character.characterDescription}/>
                    <input name={'importanceRate'}
                           defaultValue={props.character.importanceRate}/>
                    <button type='submit'>Submit</button>
                </form>
              </Modal>
            </div>
    )
}

export default CharacterEdit