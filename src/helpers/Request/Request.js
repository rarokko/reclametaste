import fire from '../Firebase/Firebase';

class RequestApi {

    registerUser(email, password) {
        return fire.auth().createUserWithEmailAndPassword(email, password);
    }

    loginUser(email, password) {
        return fire.auth().signInWithEmailAndPassword(email, password)
    }

    logoutUser(email, password) {
        return fire.auth().signOut();
    }

    checkUserSession(email, password) {
        return fire.auth().currentUser;
    }

    getUserLikes(type, ) {
        const userId = fire.auth().currentUser.uid;
        return fire.database().ref(`${type}Likes/${userId}`).once("value");
    }

    toogleUserLike(type, item, status) {
        const userId = fire.auth().currentUser.uid;

        if (status === true) {
            return fire.database().ref(`${type}Likes/${userId}/${item.id}`).set({
                like: status,
                item: item
            });
        } else {
            return fire.database().ref(`${type}Likes/${userId}/${item.id}`).remove();
        }
    }
}

const Request = new RequestApi();
export default Request;