import axios from 'axios'
import UserStore from './stores/UserStore';

class ApiClient {
    constructor() {
        this.URLname = "http://localhost:4000"
        // this.URLname=""
        this.key = "AIzaSyB7bTH7gOg_LUILwwIFYuXSiCwDR1beic8"
        this.currentUserID = "5d655effb9671e0a5f87ba68"
    }

    getDecodedAddress = async (lat, lng) => {
        return await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${this.key}`)
    };

    findUser = async(name, email) => await axios.get(`${this.URLname}/existingUser/${name}/${email}`);

    addNewUser = async( name, email, latitude, longitude, address, subscriptionObject) => {
        const newUser = {
            name,
            email,
            location: {
                latitude,
                longitude,
                address
            },
            subscriptionObject: JSON.parse(subscriptionObject)
        }
        await axios.post(`${this.URLname}/subscribe`, newUser)
    };

    updateUser = async(latitude, longitude, address, subscription) => {
        const subscriptionObject = JSON.parse(subscription)
        await axios.put(`${this.URLname}/updateUser/${UserStore.currentUserID}`, { latitude, longitude, address, subscriptionObject })
    }

    updateUserLocation = async(latitude, longitude, address) => await axios.put(`${this.URLname}/updateUserLocation/${UserStore.currentUserID}`, { location: {latitude, longitude, address}});

    getAllContacts = async () => await axios.get(`${this.URLname}/userContacts/${UserStore.currentUserID}`);

    deleteUserContact = async(userID, contactID) => await axios.delete(`${this.URLname}/deleteUserContact/${contactID}`);

    addUserContact = async (name, phoneNumber) => await axios.post(`${this.URLname}/newUserContact/${UserStore.currentUserID}`, { name, phoneNumber });

    updateUserContactNumber = async (contactID, phoneNumber) => await axios.put(`${this.URLname}/updateUserContactNumber/${contactID}`, { phoneNumber });
}

export default new ApiClient()