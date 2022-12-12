import axios from "axios";


class AddressBookService {
    baseUrl = "http://localhost:8080";

    createAddressBook(data) {
       console.log("AddressBook Data : ",data);
      return axios.post(`${this.baseUrl}/create`,data);
    };

    findAll() {
      return axios.get(`${this.baseUrl}/getAll`);
    }

    deleteAddress(id) {
      return axios.delete(`${this.baseUrl}/delete/${id}`);
    };

    findPersonById(id) {
      return axios.get(`${this.baseUrl}/getById/${id}`);
    };

    updateAddressBook(id,data){
      return axios.put(`${this.baseUrl}/update/${id}`,data)
    }
}

export default new AddressBookService();