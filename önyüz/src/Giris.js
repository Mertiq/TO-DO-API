import React, {useState, useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Nav} from 'react-bootstrap'
import { kullanicilarContext, aktifKullaniciContext } from './Store';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function SignIn() {
  const classes = useStyles();
  const [mail,setMail] = useState();
  const [sifre, setSifre] = useState();
  
const upmail = event => {
  setMail(event.target.value);
};
const upsifre = event => {
  setSifre(event.target.value);
};



const [kullanicilar] = useContext(kullanicilarContext); 
const [   setAktifKullanici] = useContext(aktifKullaniciContext);

const history = useHistory();



  onsubmit = e =>{
    
  

      for(var i = 0; i<kullanicilar.length; i++){
        if(kullanicilar[i].mail === mail && kullanicilar[i].sifre === sifre){
          
          setAktifKullanici(kullanicilar[i].id)
          if(kullanicilar[i].yetki_id === 1){
            history.push("/app");
          }else{
            history.push("/calisan");
          }
          
        
        }
      }
      
  }



  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          
        </Avatar>
        <Typography component="h1" variant="h5">
          Giriş Yap
        </Typography>
        <form className={classes.form}  onSubmit={onsubmit} >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="mail"
            autoComplete="email"
            autoFocus
            onChange={upmail}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="sifre"
            label="Şifre"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={upsifre}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Giriş Yap
          </Button>
          <Grid container>
            <Grid item>
              <Nav.Link href="/kayit" variant="body2">
                {"Hesabın yok mu? Kayıt ol"}
              </Nav.Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}