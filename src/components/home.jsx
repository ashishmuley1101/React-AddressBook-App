import React, { Component } from "react";
import "./home.scss";
import { withRouter, Link } from "react-router-dom";
import AddressBookService from "../services/AddressBookService";
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import Swal from 'sweetalert2'


class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addressBook: [],
        };

    }

    fetchData() {
        AddressBookService.findAll().then((response) => {
            //  console.log(response.data);
            this.setState({ addressBook: response.data.data });
        });
    }

    componentDidMount() {
        this.fetchData();
    }

    deleteAddressBook(perId) {
        console.log("Person id", perId);
        AddressBookService.deleteAddress(perId);
        return Swal.fire({
            title: 'Are you sure?',
            text: `${perId.name}You won't be able to revert this!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                'Your data has been deleted.',
                'success'
              )
              window.location.reload();
            }
          })
         
    }

    updateAddressBook(perId) {
        console.log("Person id", perId)
        this.props.history.push(`AddressBookForm/${perId}`);
    };

    render() {
        return (
            <div>

                <div>
                    <div className="main-content">
                        <div className="header-content employee-header">
                            <div className="emp-detail-text">
                                Address Book Details
                                <div className="emp-count">{this.state.addressBook.length}</div>
                            </div>
                            <Link to="/" style={{ textDecoration: 'none' }} >
                                <Button variant="contained" color='inherit' >+ Add Person</Button>
                            </Link>
                        </div>

                        <div className="table-main">
                            <table id="table-display" className="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Address</th>
                                        <th>City</th>
                                        <th>State</th>
                                        <th>Zip Code</th>
                                        <th>Email</th>
                                        <th>Phone Number</th>
                                        <th>Date of Birth</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.addressBook && this.state.addressBook.map((addressBook) => (
                                        <tr key={addressBook.id}>

                                            <td>{addressBook.name}</td>
                                            <td>{addressBook.address}</td>
                                            <td>{addressBook.city}</td>
                                            <td>{addressBook.state}</td>
                                            <td>{addressBook.zipCode}</td>
                                            <td>{addressBook.email}</td>
                                            <td>{addressBook.phoneNumber}</td>
                                            <td>{addressBook.dateOfBirth}</td>
                                            <td>
                                                <Stack direction="row" alignItems="center" spacing={2}>
                                                    <DeleteIcon color="action" fontSize="inherit" name={addressBook.id} onClick={() => this.deleteAddressBook(addressBook.personId)} />
                                                    <EditSharpIcon color="action" fontSize="inherit" name={addressBook.id} onClick={() => { this.updateAddressBook(addressBook.personId) }} />
                                                </Stack>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}
export default withRouter(Home);