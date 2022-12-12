import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import './addressbook-form.scss'
import cardImg from "../assets/design.png"
import Swal from 'sweetalert2'
import Button from '@mui/material/Button'
import { Stack, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CloseIcon from '@mui/icons-material/Close';
import AddressBookService from "../services/AddressBookService";


function AddressBookForm() {

    const [formValue, setForm] = useState({
        name: "",
        address: "",
        phoneNumber: "",
        city: "",
        state: "",
        zipCode: "",
        email: "",
        dateOfBirth: "",
        isUpdate: false,
    });

    const params = useParams();
    useEffect(() => {
        if (params.perId) {
            getAddressBookId(params.perId)
            console.log("Person Id : ", params.perId)

        }
    }, []);
    const getAddressBookId = (id) => {
        console.log(id)
        AddressBookService.findPersonById(id).then((response) => {
            let obj = response.data.data;
            console.log(obj);
            setData(obj)
        })

    };

    const setData = (obj) => {
        let array = obj.dateOfBirth;
        console.log("array ",array[0])
        console.log(obj.dateOfBirth);
        console.log(obj)
        setForm({
            ...formValue,
            ...obj,
            id: obj.id,
            name: obj.name,
            address: obj.address,
            city: obj.city,
            state: obj.state,
            zipCode:obj.zipCode,
            email: obj.email,
            phoneNumber: obj.phoneNumber,
            isUpdate: true,
            day: array[8] + array[9],
            month: array[5] + array[0],
            year: array[0] + array[1] + array[2] +array[3],

        });
    };

    const onReset = () => {
        setForm({
            name: "",
            address: "",
            city: "",
            state: "",
            zipCode: "",
            email: "",
            phoneNumber: "",
            dateOfBirth: "",
            day:"",
            month:"",
            year:"",

        });
    };

    const onSubmit = (event) => {
        event.preventDefault();

        let addressBookObject = {
            name: formValue.name,
            address: formValue.address,
            city: formValue.city,
            state: formValue.state,
            zipCode: formValue.zipCode,
            email: formValue.email,
            phoneNumber: formValue.phoneNumber,
            dateOfBirth: `${formValue.day} ${formValue.month} ${formValue.year}`

        };

        console.log("Address Obj data", addressBookObject);

        if (!addressBookObject.name || !addressBookObject.address || !addressBookObject.phoneNumber
            || !addressBookObject.city || !addressBookObject.state || !addressBookObject.zipCode ||
            !addressBookObject.email || !addressBookObject.dateOfBirth)
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true
            });

        if (formValue.isUpdate) {
            AddressBookService.updateAddressBook(params.perId, addressBookObject)
                .then(response => {
                    console.log(" Success Data ", response.data.data);

                    return Swal.fire({
                        icon: 'success',
                        title: 'Added!',
                        text: `${addressBookObject.name}'s data has been Updated.`,
                        showConfirmButton: false,
                        timer: 2500,
                        //   ti:window.location.reload()
                    })
                }).catch(err => {
                    console.log("Error Incorrect Fields..!");
                    return Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Check all fields again.!',
                        showConfirmButton: true
                    });
                })
        }
        else {
            AddressBookService
                .createAddressBook(addressBookObject).then(response => {
                    console.log(" Success Data ", response.data.data);

                    return Swal.fire({
                        icon: 'success',
                        title: 'Added!',
                        text: `${addressBookObject.name}'s data has been Added.`,
                        showConfirmButton: false,
                        timer: 2500,
                    })
                }).catch(error => {
                    console.log("Error Incorrect Fields..!");
                    return Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Check all fields again.!',
                        showConfirmButton: true
                    });

                })
        }

    }

    const onnameChange = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value });
        console.log('value for', event.target.name, event.target.value);
    }


    return (
        <div>
            <div class="form-content">
                <form class="form" >
                    <Card >
                        <div>
                            <div style={{ position: "relative" }}>
                                <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    height="150"
                                    weight="690"
                                    title="Person Address Form"
                                    image={cardImg}
                                />

                                <div style={{
                                    position: "absolute", fontSize: "30px", color: "white", bottom: 50, right: "30%",
                                    transform: "translateX(50%)",}}> PERSON ADDRESS FORM       
                                </div>

                                <Link to='/home' style={{ textDecoration: 'none' }}>
                                    <CloseIcon style={{
                                        position: "absolute", color: "white", bottom: 5, right: "5%",
                                        transform: "translateX(50%)"}}/>                                                                  
                                </Link>
                            </div>

                            <div class="form-constrains">
                                <div class="row-content">
                                    <TextField type="text" name="name" variant='outlined'
                                        placeholder="Enter Your Full Name" id="name" fullWidth label="Full Name"
                                        value={formValue.name} required onChange={onnameChange} 
                                        helperText="Enter Your Full Name start with A-Z minimum 3 Alphabets."/>&nbsp;
                                    <error-output class="text-error" htmlFor="name"></error-output>
                                </div>

                                <div class="row-content">
                                    <TextField type="text" name="address" fullWidth className="input" variant='outlined'
                                        placeholder="Enter Your Address" id="address" label="Address" value={formValue.address} required onChange={onnameChange} />
                                </div>

                                <div class="row-content">
                                    <div class="column-constrains">
                                        <div class="column-content">
                                            <Box width="160px" >
                                                <TextField name="city" fullWidth variant='outlined'
                                                    id="city" label="City" select value={formValue.city} required onChange={onnameChange} >
                                                    <MenuItem value="">City</MenuItem>
                                                    <MenuItem value="Ahmedabad">Ahmedabad</MenuItem>
                                                    <MenuItem value="Bangalore">Bangalore</MenuItem>
                                                    <MenuItem value="Chennai">Chennai</MenuItem>
                                                    <MenuItem value="Nagpur">Nagpur</MenuItem>
                                                    <MenuItem value="Delhi">Delhi</MenuItem>
                                                    <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                                                    <MenuItem value="Jaipur">Jaipur</MenuItem>
                                                    <MenuItem value="Kolkata">Kolkata</MenuItem>
                                                    <MenuItem value="Lucknow">Lucknow</MenuItem>
                                                    <MenuItem value="Mumbai">Mumbai</MenuItem>
                                                    <MenuItem value="Pune">Pune</MenuItem>
                                                    <MenuItem value="Guwahati">Guwahati</MenuItem>
                                                    <MenuItem value="Indore">Indore</MenuItem>
                                                    <MenuItem value="Bhandara">Bhandara</MenuItem>
                                                    <MenuItem value="Surat">Surat</MenuItem>
                                                </TextField>
                                            </Box>
                                        </div>

                                        <div class="column-content">
                                            <Box width="160px">
                                                <TextField type="text" name="state" fullWidth className="input" variant='outlined'
                                                    id="state" label="State" select value={formValue.state} required onChange={onnameChange}>
                                                    <MenuItem value="">State</MenuItem>
                                                    <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
                                                    <MenuItem value="Andaman and Nicobar Islands">Andaman and Nicobar</MenuItem>
                                                    <MenuItem value="Arunachal Pradesh">Arunachal Pradesh</MenuItem>
                                                    <MenuItem value="Assam">Assam</MenuItem>
                                                    <MenuItem value="Bihar">Bihar</MenuItem>
                                                    <MenuItem value="Chandigarh">Chandigarh</MenuItem>
                                                    <MenuItem value="Chhattisgarh">Chhattisgarh</MenuItem>
                                                    <MenuItem value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</MenuItem>
                                                    <MenuItem value="Daman and Diu">Daman and Diu</MenuItem>
                                                    <MenuItem value="Delhi">Delhi</MenuItem>
                                                    <MenuItem value="Goa">Goa</MenuItem>
                                                    <MenuItem value="Gujarat">Gujarat</MenuItem>
                                                    <MenuItem value="Haryana">Haryana</MenuItem>
                                                    <MenuItem value="Himachal Pradesh">Himachal Pradesh</MenuItem>
                                                    <MenuItem value="Jammu and Kashmir">Jammu and Kashmir</MenuItem>
                                                    <MenuItem value="Jharkhand">Jharkhand</MenuItem>
                                                    <MenuItem value="Karnataka">Karnataka</MenuItem>
                                                    <MenuItem value="Kerala">Kerala</MenuItem>
                                                    <MenuItem value="Lakshadweep">Lakshadweep</MenuItem>
                                                    <MenuItem value="Madhya Pradesh">Madhya Pradesh</MenuItem>
                                                    <MenuItem value="Maharashtra">Maharashtra</MenuItem>
                                                    <MenuItem value="Manipur">Manipur</MenuItem>
                                                    <MenuItem value="Meghalaya">Meghalaya</MenuItem>
                                                    <MenuItem value="Mizoram">Mizoram</MenuItem>
                                                    <MenuItem value="Nagaland">Nagaland</MenuItem>
                                                    <MenuItem value="Odisha">Odisha</MenuItem>
                                                    <MenuItem value="Punjab">Punjab</MenuItem>
                                                    <MenuItem value="Puducherry">Puducherry</MenuItem>
                                                    <MenuItem value="Rajasthan">Rajasthan</MenuItem>
                                                    <MenuItem value="Sikkim">Sikkim</MenuItem>
                                                    <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
                                                    <MenuItem value="Telangana">Telangana</MenuItem>
                                                    <MenuItem value="Tripura">Tripura</MenuItem>
                                                    <MenuItem value="Uttar Pradesh">Uttar Pradesh</MenuItem>
                                                    <MenuItem value="Uttarakhand">Uttarakhand</MenuItem>
                                                    <MenuItem value="West Bengal">West Bengal</MenuItem>
                                                </TextField>
                                            </Box>
                                        </div>

                                        <div class="column-content">
                                            <Box width="180px" >
                                                <TextField type="text" name="zipCode" fullWidth className="input" variant='outlined'
                                                     id="zipCode" label="Zip" value={formValue.zipCode} required onChange={onnameChange} /> 
                                                                              
                                            </Box>
                                        </div>
                                    </div>&nbsp;
                                </div>

                                <div class="row-content">
                                    <TextField type="text" name="email" fullWidth className="input" variant='outlined'
                                        placeholder="Enter Your Email" id="email" label="Email"
                                        value={formValue.email} required onChange={onnameChange} />
                                    <error-output class="email-error"></error-output>&nbsp;
                                </div>

                                <div class="row-content">
                                    <TextField name="phoneNumber" fullWidth variant='outlined'
                                        placeholder="Enter Your Phone Number" id="phoneNumber" label="Phone Number"
                                        value={formValue.phoneNumber} required onChange={onnameChange}
                                        helperText="Enter Your Phone Number start with 1-9 should be in 10 Digits." />
                                    <error-output class="phoneNumber-error"></error-output>
                                </div>

                                <div className="row-content">
                                    <div class="column-constrains">

                                        <label className="label text" htmlFor='dateOfBirth' >DOB :&nbsp; </label>

                                        <div class="column-content" >
                                            <TextField type="text" name="day" fullWidth className="input" variant='outlined'
                                               id='dateOfBirth'  label="Day" select value={formValue.day} required onChange={onnameChange} >
                                                <MenuItem value="">Day</MenuItem>
                                                <MenuItem value="01">01</MenuItem>
                                                <MenuItem value="02">02</MenuItem>
                                                <MenuItem value="03">03</MenuItem>
                                                <MenuItem value="04">04</MenuItem>
                                                <MenuItem value="05">05</MenuItem>
                                                <MenuItem value="06">06</MenuItem>
                                                <MenuItem value="07">07</MenuItem>
                                                <MenuItem value="08">08</MenuItem>
                                                <MenuItem value="09">09</MenuItem>
                                                <MenuItem value="10">10</MenuItem>
                                                <MenuItem value="11">11</MenuItem>
                                                <MenuItem value="12">12</MenuItem>
                                                <MenuItem value="13">13</MenuItem>
                                                <MenuItem value="14">14</MenuItem>
                                                <MenuItem value="15">15</MenuItem>
                                                <MenuItem value="16">16</MenuItem>
                                                <MenuItem value="17">17</MenuItem>
                                                <MenuItem value="18">18</MenuItem>
                                                <MenuItem value="19">19</MenuItem>
                                                <MenuItem value="20">20</MenuItem>
                                                <MenuItem value="21">21</MenuItem>
                                                <MenuItem value="22">22</MenuItem>
                                                <MenuItem value="23">23</MenuItem>
                                                <MenuItem value="24">24</MenuItem>
                                                <MenuItem value="25">25</MenuItem>
                                                <MenuItem value="26">26</MenuItem>
                                                <MenuItem value="27">27</MenuItem>
                                                <MenuItem value="28">28</MenuItem>
                                                <MenuItem value="29">29</MenuItem>
                                                <MenuItem value="30">30</MenuItem>
                                                <MenuItem value="31">31</MenuItem>
                                            </TextField>
                                        </div>
                                        &nbsp;
                                        <div class="column-content">

                                            <TextField type="text" name="month" fullWidth className="input" variant='outlined'
                                                id='dateOfBirth' label="Month" select value={formValue.month} required onChange={onnameChange} >
                                                <MenuItem value="" >Month</MenuItem>
                                                <MenuItem value="Jan">January</MenuItem>
                                                <MenuItem value="Feb">Febuary</MenuItem>
                                                <MenuItem value="Mar">March</MenuItem>
                                                <MenuItem value="Apr">April</MenuItem>
                                                <MenuItem value="May">May</MenuItem>
                                                <MenuItem value="Jun">June</MenuItem>
                                                <MenuItem value="Jul">July</MenuItem>
                                                <MenuItem value="Aug">August</MenuItem>
                                                <MenuItem value="Sep">September</MenuItem>
                                                <MenuItem value="Oct">October</MenuItem>
                                                <MenuItem value="Nov">November</MenuItem>
                                                <MenuItem value="Dec">December</MenuItem>
                                            </TextField>

                                        </div>
                                        &nbsp;
                                        <div class="column-content">

                                            <TextField name="year" fullWidth className="input" variant='outlined'
                                                 label="Year" id='dateOfBirth'
                                                select value={formValue.year} required onChange={onnameChange} >

                                                <MenuItem value="">Year</MenuItem>
                                                <MenuItem value="2020">2020</MenuItem>
                                                <MenuItem value="2019">2019</MenuItem>
                                                <MenuItem value="2018">2018</MenuItem>
                                                <MenuItem value="2017">2017</MenuItem>
                                                <MenuItem value="2016">2016</MenuItem>
                                            </TextField>

                                        </div>
                                    </div>
                                </div>
                                <CardActions style={{ justifyContent: 'center' }} >

                                    <div class="buttons-contact">
                                        <Stack display='block' spacing={8} direction='row'>
                                            <Button variant="contained" color="primary" size="large"
                                                onClick={onSubmit}>{formValue.isUpdate ? 'Update' : 'Submit'}</Button>
                                            {/* <Link to="/"style={{ textDecoration: 'none' }}> */}
                                            <Button variant="contained" color="primary" size="large"
                                                onClick={onReset}>Reset</Button>
                                            {/* </Link> */}
                                        </Stack>
                                    </div>
                                </CardActions>
                            </div>
                        </div>
                    </Card>
                </form>

            </div >

        </div >

    );
}


export default AddressBookForm;