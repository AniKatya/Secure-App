import axios from 'axios'

class ApiClient {
    constructor() {
        this.URLname = "http://localhost:4000"
        this.key = "AIzaSyATd6WHazWSaDDn4ivv2g9BHvDAeVf4xIw"
        this.currentUserID = "hello"
    }
    getDecodedAddress = async (lat,lng) => {
        return await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${this.key}`)
    };

    addNewUser = async(name, email) => {
        let currentUser = await axios.post(`${this.URLname}/user`, { name, email })
        let currentUserID = currentUser.data._id
        console.log(this.currentUserID)
    }

    getAllContacts = async () => {
        console.log(this.currentUserID)
        await axios.get(`${this.URLname}/userContacts/${this.currentUserID}`);
    };

    deleteUserContact = async(contactID) => await axios.delete(`${this.URLname}/deleteUserContact/${contactID}`);

    addUserContact = async (name, phoneNumber) => await axios.post(`${this.URLname}/newUserContact/${this.currentUserID}`, { name, phoneNumber });

    updateUserContactNumber = async (contactID, phoneNumber) => await axios.put(`${this.URLname}/updateUserContactNumber/${contactID}`, { phoneNumber });
}

export default new ApiClient()