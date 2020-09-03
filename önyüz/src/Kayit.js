import React, { useContext,useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {kullanicilarContext} from './Store'

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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp() {


  const classes = useStyles();
  const [kullanicilar] = useContext(kullanicilarContext);


  const [kayit, setkayit] = useState("");

  const handleInputChange = event => {
    const { name, value } = event.target;
    setkayit({ ...kayit, [name]: value });
};

  const findId = m =>{
    var x = 1;
    for(var i = 0; i < kullanicilar.length; i++){
        if(x < kullanicilar[i].kullanici_id){
            x = kullanicilar[i].kullanici_id
        }
    }
    x= x+1;
    return x; 
  }


  const handleSubmit = e => {
    fetch('https://todoapi20200818171548.azurewebsites.net/api/kullanici', {
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            kullanici_id:findId(),
            ad:kayit.ad,
            soyadi:kayit.soyad,
            mail :kayit.email,
            sifre: kayit.sifre,
            birim_id: 22
        })
    })
        .then(res => res.JSON())
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Kayıt Ol
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="ad"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="İsim"
                autoFocus
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Soy isim"
                name="soyad"
                autoComplete="lname"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Adres"
                name="email"
                autoComplete="email"
                onChange= {handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="sifre"
                label="Şifre"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange = {handleInputChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Kayıt Ol
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Zaten hesabın var mı? Giriş yap
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default SignUp