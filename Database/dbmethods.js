import { db, auth } from "./config";


export const createUserDocument = (username, phonenumber) => {
    return db.collection('users').doc(auth.currentUser.uid).set({
        username,
        phonenumber,
        email: auth.currentUser.email
    })
}


