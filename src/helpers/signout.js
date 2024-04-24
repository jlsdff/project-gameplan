
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/firebase";

export default async function signout() {
    return await auth.signOut();
}