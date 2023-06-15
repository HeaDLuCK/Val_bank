import { useEffect, useRef, useState } from 'react'
import './MoreInfo.css'
import axios from 'axios'
import Icon from '@mdi/react'
import { mdiClose, mdiTrayArrowUp } from '@mdi/js'

const MoreInfo = (props) => {
    const targetFile = useRef(null);
    const [file, setFile] = useState()
    const handleFile = () => {
        targetFile.current.click()
    }

    const closeWindow = () => {
        props.setWindow(false)
    }
    const handleSubmit = () => {
        let data = { facture: file }
        axios.post('api/data/agent/bills', data,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    'content-type': 'multipart/form-data'
                }
            }).then(promise => { console.log(promise.data.payload) })
            .catch(err => { console.log(err); })
    }
    if (!props.window) return null
    return (
        <>
            <div className="overlay" onClick={() => { props.setWindow(false) }}>
                <div className='newModelA' onClick={(e) => { e.stopPropagation() }}>
                    <div className='modelChild'>
                        <Icon onClick={closeWindow} path={mdiClose} size={1} />
                        <h2>IMPORT FILE</h2>
                    </div>
                    <div onClick={handleFile} className='import'>
                        <Icon path={mdiTrayArrowUp} size={3} />
                        <p>EXCEL FILE</p>
                    </div>
                    <button onClick={handleSubmit}>SUBMIT</button>
                    <input type="file" ref={targetFile} name="facture" onChange={(e) => { setFile(e.target.files[0]) }} accept='xls,xlsx' hidden />
                </div>
            </div>
        </>


    )
}
export default MoreInfo;