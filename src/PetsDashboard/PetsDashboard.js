import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import './PetsDashboard.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

//   const rows = [
//     { id: 1, name: 'Snow', breed: 'Husky', weight: 75, height: 300 ,color: 'white', id2: 1 },
//     { id: 2, name: 'Maya', breed: 'Retriever', weight: 40, height: 400 ,color: 'gold', id2: 2 },
//     { id: 3, name: 'Joey', breed: 'Beagle', weight: 50, height: 500 ,color: 'brown', id2: 3 }
//   ];

class PetsDashboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            doggos: this.petsDashboardRead(),
            showModal: false,
            modalDogID: 0,
            modalDogName: '',
            modalDogBreed: '',
            modalDogWeight: 0,
            modalDogHeight: 0,
            modalDogColor: '',
        }
    }
    displayPetDetails = (event,petID) => {
        event.preventDefault();
        let displayDog = this.state.doggos.filter(x => x.id === petID)[0];
        this.setState({
            showModal: true,
            modalDogID: displayDog.id,
            modalDogName: displayDog.name,
            modalDogBreed: displayDog.breed,
            modalDogWeight: displayDog.weight,
            modalDogHeight: displayDog.height,
            modalDogColor: displayDog.color
        });
    }
    modalPrepareAddDog = () => {
        this.setState({
            showModal: true,
            modalDogID: 0,
            modalDogName: '',
            modalDogBreed: '',
            modalDogWeight: 0,
            modalDogHeight: 0,
            modalDogColor: ''
        });
    }
    petsDashboardRead = () => {
        debugger
        let allDogs = [];
        var objectStore = this.props.db.transaction("dogs").objectStore("dogs");
        objectStore.openCursor().onsuccess = function(event) {
            var cursor = event.target.result;
            if (cursor) {
              allDogs.push(cursor.value);
              cursor.continue();
            }
            else {
              console.log("Got all dogs: " + allDogs);
            }
          };
        return allDogs;
    }
    handleClose = (e) => {
        e.preventDefault();
        this.setState({
            showModal: false
        });
    }
    getIncrementedDogID = () => {
        if(this.state.doggos.length > 0){
            return Math.max.apply(Math, this.state.doggos.map(function(obj) { return obj.id; })) + 1;
        }
        else{
            return 1;
        }            
    }
    saveDoggo = () => {
        if(this.state.modalDogID == 0){
            this.addDog();
        }
        else{
            this.updateDog();
        }
    }
    addDog = () => {
        let newID = this.getIncrementedDogID();
        let newDog = {id: newID, 
                    name: this.state.modalDogName, 
                    breed: this.state.modalDogBreed, 
                    weight: this.state.modalDogWeight, 
                    height: this.state.modalDogHeight,
                    color: this.state.modalDogColor, 
                    id2: newID}
        var transaction = this.props.db.transaction(["dogs"], "readwrite");
        transaction.oncomplete = function(event) {                
            this.setState({
                doggos: [...this.state.doggos].push(newDog)
            })
            console.log("Dog has been added.");
        };            
        transaction.onerror = function(event) {
            console.log(event.target.result);
        };              
        var objectStore = transaction.objectStore("dogs");            
        objectStore.add(newDog);
    }
    updateDog = () => {
        let updatedDog = {id: this.state.modalDogID, 
                        name: this.state.modalDogName, 
                        breed: this.state.modalDogBreed, 
                        weight: this.state.modalDogWeight, 
                        height: this.state.modalDogHeight,
                        color: this.state.modalDogColor, 
                        id2: this.state.modalDogID}
        var objectStore = this.props.db.transaction(["dogs"], "readwrite").objectStore("dogs");
        var request = objectStore.put(updatedDog);
        request.onerror = function(event) {
            console.log("Dog update failed.");
        };
        request.onsuccess = function(event) {
            console.log("Dog updated.");                
            let changedDoggos = [...this.state.doggos];
            let dogIndex = changedDoggos.map(function(e) {return e.id}).indexOf(updatedDog.id);
            changedDoggos[dogIndex] = updatedDog;
            this.setState({
                doggos: changedDoggos
            });
        };
    }
    handleNameChange = (event) => {
        this.setState({ modalDogName: event.target.value });
    }
    handleBreedChange = (event) => {
        this.setState({ modalDogBreed: event.target.value });
    }
    handleWeightChange = (event) => {
        this.setState({ modalDogWeight: event.target.value });
    }
    handleHeightChange = (event) => {
        this.setState({ modalDogHeight: event.target.value });
    }
    handleColorChange = (event) => {
        this.setState({ modalDogColor: event.target.value });
    }

    render(){
        

                
        

        const columns = [
            { field: 'name', headerName: 'Doggo Name', width: 300 },
            { field: 'breed', headerName: 'Breed', width: 300 },
            {
                field: 'id2',
                headerName: 'Details',
                width: 300,
                renderCell: (params) => (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={(e) => {this.displayPetDetails(e, params.value)}}
                      style={{ marginLeft: 100 }}
                    >
                      Details
                    </Button>          
                )
              }
          ];
        
        return(
            <div>
                <div className="dashboard" style={{ height: 400, width: '75%' }}>
                    <DataGrid rows={this.state.doggos} columns={columns} pageSize={5} />
                    <Button variant="contained" color="primary" size="large" onClick={this.modalPrepareAddDog} >Add Dog</Button>
                </div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className="modal"
                    open={this.state.showModal}
                    onClose={this.handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                >
                    <Fade in={this.state.showModal}>
                    <div className="paper">
                        <TableContainer component={Paper}>
                            <Table className="table" aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <TextField
                                            label="Name"
                                            id="outlined-size-normal"                    
                                            variant="outlined"                                        
                                            required="true"  
                                            onChange={this.handleNameChange.bind(this)}      
                                            value={this.state.modalDogName}            
                                        />
                                    </TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <TextField
                                                label="Breed"
                                                id="outlined-size-normal"                    
                                                variant="outlined"                                        
                                                required="true"  
                                                onChange={this.handleBreedChange.bind(this)}      
                                                value={this.state.modalDogBreed}            
                                            />
                                        </TableCell>                                        
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <TextField
                                                label="Weight"
                                                id="outlined-size-normal"                    
                                                variant="outlined"                                        
                                                required="true"  
                                                type="number"
                                                onChange={this.handleWeightChange.bind(this)}      
                                                value={this.state.modalDogWeight}            
                                            />
                                        </TableCell>                                        
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                        <TextField
                                                label="Height"
                                                id="outlined-size-normal"                    
                                                variant="outlined"                                        
                                                required="true"  
                                                type="number"
                                                onChange={this.handleHeightChange.bind(this)}      
                                                value={this.state.modalDogHeight}            
                                            />
                                        </TableCell>                                        
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                        <TextField
                                                label="Color"
                                                id="outlined-size-normal"                    
                                                variant="outlined"                                        
                                                required="true"                                                  
                                                onChange={this.handleColorChange.bind(this)}      
                                                value={this.state.modalDogColor}            
                                            />
                                        </TableCell>                                        
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Button variant="contained" color="primary" size="large" onClick={this.saveDoggo}>Save</Button>
                    </div>
                    </Fade>
                </Modal>
            </div>
            
        );
    }
}

export default PetsDashboard;