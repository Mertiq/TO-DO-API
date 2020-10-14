import React, {useContext, useState}from 'react'
import {Table, Button, Form, Modal, Row, Col} from 'react-bootstrap'
import {kullanicilarContext} from '../Store'
import Navigation2 from '../Navigation2';
import './Gorevler.css'
function Kullanicilar () {

    const [kullanicilar] = useContext(kullanicilarContext);

    const [show, setShow] = useState(false);
    const [id, setId] = useState();
    const [rutbeId, setrutbeId] = useState(0);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [rutbe, setrutbe] = useState("");

    const [ad, setad] = useState("");
    const [soyadi, setsoyadi] = useState("");
    const [mail, setmail] = useState("");
    const [sifre, setsifre] = useState("");
    const [birim_id, setbirim_id] = useState();
    

    const handleInputChange = event => {
        const { name, value } = event.target;
        setrutbe({ ...rutbe, [name]: value });
        };

    const modalAc = e => {
        handleShow();
        let x = kullanicilar.map(kullanici => {
            if(kullanici.kullanici_id === e){
                setId(kullanici.kullanici_id); ////// kontrol et
                setad(kullanici.ad);
                setsoyadi(kullanici.soyadi);
                setmail(kullanici.mail);
                setsifre(kullanici.sifre);
                setbirim_id(kullanici.birim_id);
            }
            return id;
        })
        return x;
    }

    const yetkilendir = e => {
        if(rutbe.rutbe === "Amir"){
            setrutbeId(2);
        }
        if(rutbe.rutbe === "Çalışan"){
            setrutbeId(3);
        }
        bilgiAl(id);
        Guncelle(id);
    }

    const bilgiAl = id => {
        for (var i = 0; i < kullanicilar.length; i++){
            if(id === kullanicilar[i].kullanici_id){
                setId(kullanicilar[i].id);  
                setad(kullanicilar[i].ad);
                setsoyadi(kullanicilar[i].soyadi);
                setmail(kullanicilar[i].mail);
                setsifre(kullanicilar[i].sifre);
                setbirim_id(kullanicilar[i].birim_id);
            }
        }
    }

    const Guncelle = id => {
        fetch(`https://todoapi20200818171548.azurewebsites.net/api/kullanici/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                kullanici_id:id,
                ad: ad,
                soyadi:soyadi,
                mail:mail,
                sifre :sifre,
                birim_id: birim_id,
                yetki_id:rutbeId
            })
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
                <Navigation2/>
                <div className="genel">
                    <Table className="mt-4" stripped="true" bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Kullanıcı ID</th>
                                <th>Kullanıcı Adı</th>
                                <th>Kullanıcı Soyadı</th>
                                <th>Kullanıcı Mail</th>
                                <th>Kullanıcı Yetki</th>
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
                                        <td>{yetkii(kullanici.yetki_id)}</td>
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
                        <Button variant="primary" onClick={yetkilendir}>
                            Yetki Ver
                        </Button>
                        </Modal.Footer>
                    </Modal>
                    </div>
            </div>
        )
}


export default Kullanicilar
  