import React, {useContext } from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import {aktifKullaniciContext} from './Store'
import './Navigation.css';


 function Navigation () {

    const [aktifKullanici] = useContext(aktifKullaniciContext);

    

        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Nav className="mr-auto"  >
                    <Nav.Link  href="/gorevler" >Gorevler</Nav.Link>
                    <Nav.Link href="/gorevver">Gorev ver</Nav.Link>
                    <Nav.Link  href="/istatistik">İstatistik</Nav.Link>
                    <Nav.Link href="/kullanicilar">Kullanıcılar</Nav.Link>
                    <Nav.Link href="/" >Çıkış Yap</Nav.Link>
                    <Nav.Link>{aktifKullanici}</Nav.Link>
                    </Nav>
                </Navbar>
                
            </div>
        )
    
}

export default Navigation