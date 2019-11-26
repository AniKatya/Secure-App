import { observable, action } from "mobx";

class UserStore {
    @observable currentUser = ""
    @observable latitude = ""
    @observable longitude = ""
    @observable currentUserID = ""

    @action updateUserKeys = e => this.setState({ [e.target.name]: e.target.value });

    @action getLocation = async () => {
        navigator.geolocation.getCurrentPosition(pos => {
            const coords = pos.coords
            this.latitude = coords.latitude
            this.longitude = coords.longitude
        })
    };

    @action updateCurrentUserID = (_userID) => this.currentUserID = _userID

    @action updateVictimLocation = (latitude, longitude) => {
        this.latitude = latitude
        this.longitude = longitude
    }
}

export default new UserStore()