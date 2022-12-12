import { Component } from "react";
import './addressbook-form.scss'
import logo from "../assets/logo2.png"


class Headers extends Component{
    render(){
        return(
            <div>
            <header class="header-content header">
                <div class="logo-content">
                    <img src={logo} alt="logo" width="50px" />
                    <div>
                        <span class="addressBook-text">ADDRESS</span>
                        <br />
                        <span class="addressBook-text addressBook-book">BOOK</span>
                    </div>
                </div>
            </header>
            </div>
        )
    }
}

export default Headers;