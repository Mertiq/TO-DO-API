import React, {useContext, useState}from 'react'
import {Table, Button, Form, Modal, Row, Col} from 'react-bootstrap'
import {kullanicilarContext} from '../Store'
import Navigation from '../Navigation';
import './Gorevler.css'

function Kullanicilar () {

    const [kullanicilar] = useContext(kullanicilarContext);

    const [show, setShow] = useState(false);
    const [rutbeId, setrutbeId] = useState(0);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [rutbe, setrutbe] = useState("");

    
    const [x, setx] = useState();
    

    const handleInputChange = event => {
        var a = event.target.value
        if(a === "Amir"){
            setrutbeId(2);
        }
        if(a === "Çalışan"){
            setrutbeId(3);
        }
        console.log(rutbeId)
        };


    const modalAc = e => {
        
        setx(e)
        console.log(e)
        handleShow();
        
        
    }

    const yetkilendir = e => {
        
        
    fetch(`https://todoapi20200818171548.azurewebsites.net/api/kullanici/yetkilendir/${x}/${rutbeId}`, {
        method: 'PUT'
       
        })
        
       
    }

    

    

    function yetkii(x){
        if(x === 0){
            return "Yetkisiz"
        }else if (x === 1){
            return "Super Amir"
        } else if(x === 2){
            return "Amir"
        } else if(x === 3){
            return "Çalışan"
        }
    }

    
    
        return (
            <div>
                <Navigation/>
                <div className="genel">
                    <Table className="mt-4" stripped="true" bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Kullanıcı ID</th>
                                <th>Kullanıcı Adı</th>
                                <th>Kullanıcı Soyadı</th>
                                <th>Kullanıcı Mail</th>
                                <th>Kullanıcı Birim ID</th>
                                <th>Kullanıcı Yetki</th>
                                <th>Yetkilendir</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                                kullanicilar.map(kullanici => 
                                    <tr key = {kullanici.kullanici_id}>
                                        <td>{kullanici.kullanici_id}</td>
                                        <td>{kullanici.ad}</td>
                                        <td>{kullanici.soyadi}</td>
                                        <td>{kullanici.mail}</td>
                                        <td>{kullanici.birim_id}</td>
                                        <td>{yetkii(kullanici.yetki_id)}</td>
                                        <td><Button variant="success" onClick={() => modalAc(kullanici.kullanici_id)}>Yetkilendir</Button></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>

                    <Modal show={show} onHide={handleClose} size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                        <Modal.Header closeButton>
                        <Modal.Title>Yetkilendir</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Col>
                                    <Form>
                                        <Form.Group name="rutbe" onChange={handleInputChange}>
                                            <Form.Control as="select" size="lg">
                                                <option></option>
                                                <option>Amir</option>
                                                <option>Çalışan</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <br/>
                                        <br/>
                                    </Form>
                                </Col>
                            </Row>


                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="primary" onClick={() => yetkilendir()}>
                            Yetki Ver
                        </Button>
                        </Modal.Footer>
                    </Modal>
                    </div>
            </div>
        )
}


export default Kullanicilar
  