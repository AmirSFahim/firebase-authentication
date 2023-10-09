import { GoogleAuthProvider, getAuth, signInWithPopup, signOut,GithubAuthProvider } from "firebase/auth";
import app from "../../firebase/firebase.init";
import { useState } from "react";

const LogIn = () => {
    const auth = getAuth(app);
    
    const provider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const [user,setuser] =useState('')
    const handlebtn = ()=>{
        signInWithPopup(auth, provider)
        .then(result=>{
            const loginnUser = result.user;
            console.log(loginnUser)
            setuser(loginnUser)
        })

        .catch(error=>{
            console.log('error', error.message)
        })
    }

    const handleGithub =()=>{
        signInWithPopup(auth, githubProvider)
        .then(result=>{
            const logeduser = result.user
            console.log(logeduser)
            setuser(logeduser)
        })
        .catch(error=>{error.message})
    }
    const handlesingOut =()=>{
        signOut(auth)
        .then(result=>{
            setuser(null)
            console.log(result)

        })
        .catch(error=>{
            console.log(error)
        })
    }
    return (
        <div>
            {user?<button onClick={handlesingOut}>log out</button> 
            : <div>
                <button onClick={handlebtn}>google log in</button>
                <button onClick={handleGithub}>github log in</button>
            </div>
            }

            {
                user && <div>
                    <h1>user :{user.displayName}</h1>
                    <p>email : {user.email}</p>
                    <img src={user.photoURL}></img>
                    </div>
            }
        </div>
    );
};

export default LogIn;