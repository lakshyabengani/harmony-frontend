import './App.css';
import React from 'react';
import { withStyles,MuiThemeProvider,createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  rightToolbar: {
    marginLeft: "auto",
    marginRight: theme.spacing(5),
  },
});

const outerTheme = createMuiTheme({
  palette:{
    primary:{
      main: '#FFFFFF'
    }
  },
  typography:{
    fontFamily : 'Noto Sans',
  }
});


class App extends React.Component{

  showAppBar = () =>{

    const { classes } = this.props;

    return(
      <div>
      <Toolbar />
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
            <Typography variant="h4" className={classes.title} color="primary" style={{
              flex : 1 , fontFamily:'Libre Baskerville' , color:'#DADADA' , fontSize : '48px' , width : '240px', height : '60px' , fontWeight : '400', marginLeft: '78px'
              }}>
              Harmony
            </Typography>
          <MuiThemeProvider theme={outerTheme} >
            <Button color="primary" style={{fontSize : '24px' , fontWeight: '500' , marginRight: '41px'}}>Privacy</Button>
            <Button color="primary" style={{fontSize : '24px' , fontWeight: '500' , marginRight: '41px'}}>About</Button>
            <Button variant="contained" style={{backgroundColor : '#A04A4A' , color:'white' , fontSize : '25px' , marginRight : '117px'}}>LOGIN</Button>
          </MuiThemeProvider>
        </Toolbar>
      </AppBar>
      </div>    
    );
  }
  
  render(){
    return(
      <div style={{backgroundImage : "url(/assets/landingPage.jpg)" , width : "100vw" , height : "100vh" , backgroundSize : 'cover'}}>
          {this.showAppBar()}
          <Typography color="primary" style={{ 
            fontFamily:'Libre Baskerville' , color:'#FFFFFF',fontWeight : '500', fontSize : "160px" , marginLeft: '110px' , width: '1272px', height: '179px' , marginTop : '30vh' 
            }} >
              Find Your Rythm
          </Typography>
          <br />
          <Button variant="contained" style={{background : 'linear-gradient(91.28deg, #A04A4A 0%, #601616 100%)' , borderRadius: '100px' ,color:'white' , width : "366px" , height : '69px' , marginLeft: '537px' }}>
            <div style={{width : "122px" , height : '41px' , fontSize : '25px' , fontWeight : '600' }}>SIGN UP</div>
          </Button>
      </div>
    )
  }
}

export default withStyles(useStyles)(App);
