import { auth } from "@/lib/firebase/firebase"
import { signInWithEmailAndPassword } from "firebase/auth";


async function signIn(email, password){
    try {
        const response = await signInWithEmailAndPassword(auth, email, password)
        .then( userCredential => {
            const user = userCredential.user;
            return {status: "success", user};
        } )
        .catch( error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return { status: "error", errorCode, errorMessage };
        } )
        return response
    } catch (error) {
        // TODO: handle error
        console.log(error);
    }
}

export { signIn }