import React, { useState, useEffect } from 'react';

export const gorevlerContext = React.createContext('gorevler');
export const girisContext = React.createContext('girisYapildi');
export const kullanicilarContext = React.createContext('kullanicilar');
export const aktifKullaniciContext = React.createContext('aktifKullanici');
export const aktifGorevContext = React.createContext('aktifgorevler');

const Store = ({children}) => {

    const[gorevler, setGorevler] = useState([]);
    const[girisYapildi, setGirisYapildi] = useState("true");
    const[kullanicilar, setKullanicilar] = useState([]);
    const[aktifKullanici, setAktifKullanici] = useState("");
    const [aktifgorevler, setaktifgorevler] = useState([]);


    useEffect(() => {

        fetch('https://todoapi20200818171548.azurewebsites.net/api/gorev', {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
      
          })
        .then(data => data.json()).then(gorev =>{
            
            setGorevler(gorev);
            
        })


    }, []);


    useEffect(() => {

        fetch('https://todoapi20200818171548.azurewebsites.net/api/kullanici', {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
      
          })
        .then(data => data.json()).then(kullanici =>{
            
            setKullanicilar(kullanici)

           kullanici.forEach(element => {

               if(element.aktif){
                   setAktifKullanici(element)
               }

           });
            
            
            
            
        })


    }, []);

    /*
    useEffect(() => {

        fetch(`https://todoapi20200818171548.azurewebsites.net/api/gorev/${aktifKullanici.kullanici_id}`, {
                headers : { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                 }
          
              })
            .then(data => data.json()).then(gorev =>{
                
                setaktifgorevler(gorev)
                
            })

        }, []);
     */
    return(

        <gorevlerContext.Provider value= {[gorevler, setGorevler]}>
            <girisContext.Provider value = {[girisYapildi, setGirisYapildi]}>
                <kullanicilarContext.Provider value = {[kullanicilar, setKullanicilar]}>
                    <aktifKullaniciContext.Provider value = {[aktifKullanici, setAktifKullanici]}>
                        <aktifGorevContext.Provider value = {[aktifgorevler, setaktifgorevler]}>
                            {children}
                        </aktifGorevContext.Provider>
                    </aktifKullaniciContext.Provider>
                </kullanicilarContext.Provider>
            </girisContext.Provider>
        </gorevlerContext.Provider>
        
    )

}



export default Store