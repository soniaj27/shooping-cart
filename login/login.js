


function check(){

    const UsrSavedData =JSON.parse(localStorage.getItem("Usr"));   //taking data from local storage
   console.log(UsrSavedData);
    var email=document.getElementById("email").value;
    var password=document.getElementById("pass").value;

    if (!UsrSavedData) {
    alert("No user data found.");
    return;
     }
  
     const curntUser = UsrSavedData.find(user => user.email ===email && user.password===password)
     console.log(curntUser)

  if (curntUser ) {
    localStorage.setItem("curntUser", JSON.stringify(curntUser));
   
      window.location.href = "../shop/shop.html";
   
  } 
    else {
    alert("Please Provide correct email or password");
  }
}
    


// const loginBtn = document.getElementsByClassName("btn");
// const signupBtn = document.getElementsByClassName("butn");

// loginBtn.addEventListener("click", function () {
//   console.log("Login button clicked");
//   window.location.href = "login.html";
// });

// signupBtn.addEventListener("click", function () {
//   console.log("signup button clicked");
//   window.location.href = "signup.html";
// });