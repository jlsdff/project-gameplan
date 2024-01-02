import React, {useState, useEffect} from 'react'
import { auth } from '@/lib/firebase/firebase';

export function useAuth() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                // const { uid, email } = user;
                setUser(user);

            } else {
                setUser(null);
            }
            setLoading(false);
        }, [user]);
    })

  return { user, loading }
}
