function signup(){
    var Firstname=document.getElementById("Firstname").value;
    var lastname= document.getElementById("lastname").value;
    var email=document.getElementById("email").value;
    var password=document.getElementById("pass").value;
    var confirmpass=document.getElementById("confirm-pass").value;

    if(password!=confirmpass){
        alert("Password and confirm password are not matched");  
    }

    else{

    
    if( Firstname ==""|| email==""|| password=="" || confirmpass==""||lastname=="")
    {
        document.getElementById("error").innerText="Error: All the fields are mandatory";
        
    }
    
    else{
              //generating token
            
           
            const generatedToken = generateString(16);       
             window.localStorage.setItem("token",generatedToken);

// and storing value in arry form for diff userse and  chking for emails if user enter same email for signup show msg alredy used email


             let Usr = JSON.parse(localStorage.getItem("Usr")) || [];   //get to localstorage if there is existing user ||or make empty array

          // chking for mail

            if ( Usr.find(usr => usr.email === email)) {
              alert('Email is already used.Please use  different one.');
              return;
            }

           // user input into JSON
            let newUserEntered = {
              firstName: Firstname,
              lastName: lastname,
              email: email,
              password: password
            };
            Usr.push(newUserEntered);       
        
            localStorage.setItem("Usr", JSON.stringify(Usr));
            alert("signed up sucessfully");
            window.location.href = "../login/login.html";
        
        }
    }
    
}



// generating random string
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}



// route so that before signup it will not go to profile on cliking profile button
// function route(){

//     let Object = window.localStorage.getItem("token");
//     console.log(Object);
//     if(Object!=null)
//     {
//         window.location.href="Profile.html";
//     }
//     else{
//         window.location.href="index.html";
//     }
// }


// function getuser(){
//     let object =JSON.parse(window.localStorage.getItem("userDetails"));
//     console.log(object.name);
//     document.getElementById("email").innerHTML= object.email;
// }
