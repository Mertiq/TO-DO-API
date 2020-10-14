import React, {  useContext, useState } from 'react'
import {Table, Form, Button, Modal, Row, Col} from 'react-bootstrap'
import {gorevlerContext, kullanicilarContext} from '../Store'
import Navigation from '../Navigation';
import './Gorevler.css'


function Gorevler () {

    const [gorevler, setGorevler] = useContext(gorevlerContext);
    const [kullanicilar, setKullanicilar] = useContext(kullanicilarContext);
    const combobox = ["Hepsi", "Bitirilen görev"];
    
    const [id, setId] = useState(1);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
  

    
    const [ad, setGorevadi] = useState("");
    const [aciklama, setGorevaciklama] = useState("");
    const [baslangic_trh, setBaslangictarihi] = useState("");
    const [bitis_trh, setBitistarihi] = useState("");
    const [bitimi,setbitimi] = useState("");
    const [aki,setaki] = useState("");
    
    

        const GorevSil = id => {
            fetch(`https://todoapi20200818171548.azurewebsites.net/api/gorev/${id}`, {
              method: 'DELETE'
            })
            setGorevler(gorevler.filter(x => x.gorev_id !== id));
        }


        const upgorevadi = event => {
            setGorevadi(event.target.value);
        };
        const upgorevaciklama = event => {
            setGorevaciklama(event.target.value);
        };
        const upbaslangictarihi = event => {
            setBaslangictarihi(event.target.value);
        };
        const upbitistarihi = event => {
            setBitistarihi(event.target.value);
        };
        


        function Guncelle  (id)  {
            fetch(`https://todoapi20200818171548.azurewebsites.net/api/gorev/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    gorev_id:id,
                    aciklama: aciklama,
                    ad: ad,
                    proje_id:5,
                    aktif_kullanici_id:aki,
                    baslangic_trh :baslangic_trh,
                    bitis_trh: bitis_trh,
                    bitimi:bitimi
                })
                })
               
        }
        

        const ModalGoster = id => {
            handleShow();
            let x = gorevler.map(gorev => {
                if(gorev.gorev_id === id){
                    setId(gorev.gorev_id);
                    setGorevadi(gorev.ad);
                    setGorevaciklama(gorev.aciklama);
                    setBaslangictarihi(gorev.baslangic_trh);
                    setBitistarihi(gorev.bitis_trh);
                    setbitimi(gorev.bitimi)
                    setaki(gorev.aktif_kullanici_id)
                }
                return id;
            })
            return x 
        }


        const ModalGoster2 = id => {
            handleShow2();
            let x = gorevler.map(gorev => {
                if(gorev.gorev_id === id){
                    setGorevaciklama(gorev.aciklama)
                }
                return id;
            })
            return x 
        }


        function tarih(metin){
            let bitis = metin.indexOf("T")
            
            let istenenKisim = metin.slice(0,bitis)
        
            return istenenKisim
        }

        function renksec (x){

            if(x){
                return "AEF0AF"
            }
        }

    const bitir = id => {

        

        let x = gorevler.map(gorev => {
            if(gorev.gorev_id === id){
                setId(gorev.gorev_id);
                setGorevadi(gorev.ad);
                setGorevaciklama(gorev.aciklama);
                setBaslangictarihi(gorev.baslangic_trh);
                setBitistarihi(gorev.bitis_trh);
                setbitimi(true)
            }
        })
        
        
        fetch(`https://todoapi20200818171548.azurewebsites.net/api/gorev${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                gorev_id:id,
                aciklama: aciklama,
                ad: ad,
                proje_id:5,
                aktif_kullanici_id:333,
                baslangic_trh :baslangic_trh,
                bitis_trh: bitis_trh,
                bitimi:bitimi
            })
            })

            
            
    }
       
    

        function kullaniciBul(id){
        var a = "a"
            kullanicilar.forEach(k => {

                if(id === k.kullanici_id){
                     a = k.ad +" "+  k.soyadi
                }
    
            });
                
            return a

            
               
        }
        const [ggorevler, setggorevler] = useState([])

        const combodegisti = event =>{
            var a = event.target.value
            if(a == "Hepsi"){
                gorevler.map(g => {
                    setggorevler(g);
                })
            }
            else if (a == "Bitirilen Görev"){
                gorevler.map(g => {
                    if(g.bitimi){
                        setggorevler(g);
                    }
                })
            }
        }

       

        return (
           
                <div > 
                    <Navigation/>
                    <br/>
                    <div className="genel">
                    <Form.Group controlId="exampleForm.ControlSelect1" >
                        <Form.Label>Görev Durumu Seçin</Form.Label>
                        <br/>
                        <Form.Control as="select" className="combo"  onChange={combodegisti}> 
                            {
                                combobox.map(x => (
                                    <option name={x} key={x} value = {x}>{x}</option>
                                ))
                            }
                        </Form.Control>
                    </Form.Group>
                    <br/>
                    <Table className="mt-4" stripped="true" bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Gorev ID</th>
                                <th>Gorev Adı</th>
                                <th>Gorev Başlangıç Tarihi</th>
                                <th>Gorev Bitiş Tarihi</th>
                                <th>Görev Sahibi</th>
                                <th>Sil</th>
                                <th>Guncelle</th>
                                <th>Detay</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                                gorevler.map(gorev => 
                                    
                                    <tr key = {gorev.gorev_id} bgcolor={renksec(gorev.bitimi)}>
                                        <td>{gorev.gorev_id}</td>
                                        <td>{gorev.ad}</td>
                                        <td>{tarih(gorev.baslangic_trh)}</td>
                                        <td>{tarih(gorev.bitis_trh)}</td>
                                        <td>{kullaniciBul(gorev.aktif_kullanici_id)}</td>
                                        <td><Button variant="danger" onClick={() => GorevSil(gorev.gorev_id)}>Sil</Button></td>
                                        <td><Button variant="warning" onClick={() => ModalGoster(gorev.gorev_id)}>Guncelle</Button></td>
                                        <td><Button variant="primary" onClick={() => ModalGoster2(gorev.gorev_id)}>Detay</Button></td>
                                    </tr>
                                    
                                )
                                
                                
                            }
                            
                        </tbody>
                    </Table>
                    </div>
                    <>
                    
                    <Modal show={show} onHide={handleClose} size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered >
                        <Modal.Header closeButton>
                        <Modal.Title>Görev Güncelle</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Col>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>
                                                Görev Adı
                                            </Form.Label>
                                            <Form.Control
                                            type = "text"
                                            name = "gorev_adi"
                                            onChange={upgorevadi}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>
                                                Görev Açıklaması
                                            </Form.Label>
                                            <Form.Control 
                                            as="textarea" 
                                            rows="6"
                                            name="gorevaciklama" 
                                            onChange={upgorevaciklama}
                                            />
                                        </Form.Group>
                                        
                                       
                                        <Form.Group>
                                            <Form.Label>
                                                Başlangıç Tarihi
                                            </Form.Label>
                                            <Form.Control
                                            type = "text"
                                            name = "baslangic"
                                            onChange={upbaslangictarihi}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>
                                                Bitiş Tarihi
                                            </Form.Label>
                                            <Form.Control
                                            type = "text"
                                            name = "bitis"
                                            onChange={upbitistarihi}
                                             />
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>


                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Kapat
                        </Button>
                        <Button variant="primary" onClick={() => Guncelle(id)}>
                            Güncelle
                        </Button>
                        </Modal.Footer>
                    </Modal>
                    </>

                    <>
                    
                    <Modal show={show2} onHide={handleClose2} size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered >
                        <Modal.Header closeButton>
                        <Modal.Title>Açıklama</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {aciklama}
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose2}>
                            Kapat
                        </Button>
                        </Modal.Footer>
                    </Modal>
                    </>
                    
                    </div>

                
               




        )
    
}

export default Gorevler
