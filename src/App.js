import logo from './logo.svg';
import byebye from './byebye.png';
import './App.css';
import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, TextField, CardActions, Button, LinearProgress, Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import Axios from 'axios';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}


function App() {
  const [listOfNames, setListOfNames] = useState([])
  const [name, setName] = useState('Hello')
  const [newName, setNewName] = useState('')
  const [level, setLevel] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [successOpen, setSuccessOpen] = useState(false)
  const [errorOpen, setErrorOpen] = useState(false)

  useEffect(() => {
    Axios('http://localhost:2005').then(res => setListOfNames(res.data))
    .catch(err => console.log(err))
  }, [isLoading])

  useInterval(() => {
    if(level === listOfNames.length){
      setLevel(0)
      setName('Hello')
      return
    }
    setLevel(level => level + 1)
    setName(listOfNames[level].name)
  }, 800)

  const handleSubmit = () => {
    if(newName){
      setIsLoading(true)
      Axios.post('http://localhost:2005/add', {name: newName})
      .then(res => {
        setMessage(res.data)
        setNewName('')
        setSuccessOpen(true)
        setErrorOpen(false)
        setIsLoading(false)
      })
      .catch(err => {
        setMessage(err.message)
        setErrorOpen(true)
        setSuccessOpen(false)
      })

      return
    }

    setMessage('Come on ma gee...')
    setSuccessOpen(false)
    setErrorOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorOpen(false);
    setSuccessOpen(false)
  };
  

  return (
    <div className="App">
      <header className="App-header">
        <h2>React says <span style={{fontFamily: 'Pacifico'}}>Hello...</span></h2>
        <img src={logo} className="App-logo" alt="logo" />  
        <h1 className="my-name" style={{margin: '0', textTransform: 'capitalize', fontFamily: 'Pacifico'}}>{name}</h1>
      </header>

      <div style={{minHeight: '30vh', padding: '2rem 1.5rem', margin: '1.5rem 0'}}>
        <h1 style={{margin: '1.5rem 0', fontWeight: 'lighter', fontFamily: 'Pacifico'}}>Want react to Hello to you as well?</h1>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Card variant="elevation" style={{padding: '1rem 2rem', width: '500px', margin: '2rem 0'}}>
            
            <CardContent>
              <form>
                <TextField required onChange={e => setNewName(e.target.value)} fullWidth={true} id="name" label='Name' value={newName} size="small" />
              </form>
            </CardContent>
            <CardActions>
              <Button type='submit' onClick={handleSubmit} variant="outlined" color="primary" size="small">Join</Button>
            </CardActions>
            <br/>
            { isLoading ? <LinearProgress color="primary" /> : ""}
            
          </Card>
          
        </div>
        <div style={{margin: '4rem 0'}}>
          <img id="byebye" src={byebye} alt="byebye"/>    
        </div>

        <Snackbar open={successOpen} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            {message}
          </Alert>
        </Snackbar>

        <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleClose}>
          <Alert severity="error">{message}</Alert>
        </Snackbar>
        
      </div>

      
      
    </div>
  );
}

export default App;
