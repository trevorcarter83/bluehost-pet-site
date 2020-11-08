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

  const rows = [
    { id: 1, name: 'Snow', breed: 'Husky', weight: 75, height: 300 ,color: 'white', id2: 1 },
    { id: 2, name: 'Maya', breed: 'Retriever', weight: 40, height: 400 ,color: 'gold', id2: 2 },
    { id: 3, name: 'Joey', breed: 'Beagle', weight: 50, height: 500 ,color: 'brown', id2: 3 }
  ];

class PetsDashboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            doggos: rows,
            showModal: false,
            modalDog: rows.filter(x => x.id === 1)[0]
        }
    }
    displayPetDetails = (event,petID) => {
        event.preventDefault();
        this.setState({
            showModal: true,
            modalDog: this.state.doggos.filter(x => x.id === petID)[0]
        });
    }
    handleClose = (e) => {
        e.preventDefault();
        this.setState({
            showModal: false
        });
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
                                    <TableCell>{this.state.modalDog.name}</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="left">Breed:</TableCell>
                                        <TableCell align="right">{this.state.modalDog.breed}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left">Weight:</TableCell>
                                        <TableCell align="right">{this.state.modalDog.weight}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left">Height:</TableCell>
                                        <TableCell align="right">{this.state.modalDog.height}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left">Color:</TableCell>
                                        <TableCell align="right">{this.state.modalDog.color}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    </Fade>
                </Modal>
            </div>
            
        );
    }
}

export default PetsDashboard;