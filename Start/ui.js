const errorMsg = document.getElementById("errorMsg");

document.getElementById("googleBtn").onclick = async () =>{
    try{
        await googleLogin();
    }catch(err){
        errorMsg.innerText = err.message;
    }
};

document.getElementById("registerBtn").onclick = async () =>{
    const email = document.getElementById("email").value;
    const pass  = document.getElementById("password").value;

    try{
        await registerEmail(email,pass);
    }catch(err){
        errorMsg.innerText = err.message;
    }
};

document.getElementById("loginBtn").onclick = async () =>{
    const email = document.getElementById("email").value;
    const pass  = document.getElementById("password").value;

    try{
        await loginEmail(email,pass);
    }catch(err){
        errorMsg.innerText = err.message;
    }
};
