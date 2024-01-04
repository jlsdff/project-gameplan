
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/firebase";

export default async function signout() {
    const router = useRouter()
    await auth.signOut()
    .then(()=>{
        router.push("/admin")
    })
    .catch((error)=>{
        console.log(error.message)
    })
}