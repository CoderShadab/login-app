'use client';

import { signOut } from "next-auth/react";

const Users = () => {
    return ( 
        <div className="wrapper relative flex flex-col justify-center items-center">
            <h1 className="font-bold text-2xl ">Welcome my friend!!!</h1>
            <button className="bg-white px-5 py-2 mt-3 rounded-md hover:rounded-lg hover:scale-150 transition" onClick={() => signOut()}>
                logout
            </button>
        </div>
     );
}
 
export default Users;