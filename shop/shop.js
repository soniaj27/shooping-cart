if(!localStorage.getItem('curntUser')){
  window.location.href='../login/login.html';
}


 let grid = document.querySelector(".products");
 let search=document.getElementById("search")
 let filterInput = document.getElementById("fltr");
var backenedData=[];
var counter=0;
var myArr=[];
 
if(localStorage.getItem('cartArr')){
  var cartArr=JSON.parse(localStorage.getItem('cartArr'));
}
else{
  var cartArr=[];
}

// fetch('https://fakestoreapi.com/products')
//     .then(res => res.json())
//     .then(json =>{
//         backenedData=json
//         // iterating products
//         for (let value of json){
            
//             addElement(grid, value)
//         }
        
//     });


// add event listener
// fltr.addEventListener('keyup', searchProducts);

// // callback function 
// function searchProducts(){
//     let filterValue = filterInput.value.toUpperCase();
//     let item = grid.querySelectorAll('.container')
//     console.log(item,item.length);
//     console.log(filterValue)
//     counter=0;
//     for (let i = 0; i < item.length; i++){
    
//         let span = item[i].querySelector('.card-co h1 b');
//         // console.log(span.innerHTML.indexOf(filterValue));
//         if(span.innerHTML.toUpperCase().indexOf(filterValue) > -1){
           
//             item[i].style.display = "";
//            console.log("hi")
//            counter++;
//         }else{
//             item[i].style.display = "none";
//             console.log("he")
            
//         }


//     }
//     console.log(counter)
   
//     // if(counter==0){
//     //   grid.innerHTML="No Data found"
//     // }
 

// }



fltr.addEventListener('keyup',()=>{
  grid.innerHTML=''
  myArr = backenedData.filter(ele=>{
    if(ele.title.toLowerCase().includes(fltr.value.trim().toLowerCase())){
      return ele;
    }
  })
  if(myArr.length==0){
    console.log("search")
    grid.innerHTML=`
    Oops,No products found for this filtering, try different combinations!
    `
    console.log(grid.innerHTML)
    return;
  }
  for (let value of myArr){
  
    addElement(grid, value)
}

 
})



// get value from the api create dynamic element
function addElement(appendIn, value){
    let myDiv = document.createElement('div');
    myDiv.className = "container";
    let {id, title,price, description, category,image,rating } = value;
    

    myDiv.innerHTML = 


  ` <ul class="p">
         <li class="crop" >
   <img src="${image}"alt="Avatar">
   </li>
   </ul>
   
  <div class="card-co">
  <h1 ><b>${title}</b></h1>
   $<span class="price">${price}</span><br>
          <span class="rating">Rating :${  rating.rate}</span>
</div>
<div class="footer">
<button id="add-to-cart" onClick='addToCart(${value.id})' >Add to cart</button>
</div>
`
    appendIn.appendChild(myDiv);
}

category('all')


var btnContainer = document.getElementsByClassName("filters");
 var btns = document.getElementsByClassName("filter");
console.log("hi",btnContainer,btns)
for (var i = 0; i < btns.length; i++) 
{
  btns[i].addEventListener("click", function()
  {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}


function category(passedData){
    var filteredData;

    // let grid = document.querySelector(".products");
    // grid.innerHTML=''
    console.log(grid)
// let filterInput = document.getElementById("fltr");


   

    if(passedData=='all'){
        grid.innerHTML=''
        fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json =>{
        backenedData=json
        // iterating products
        // grid.innerHTML="";
        for (let value of json){
            
            addElement(grid, value)
          
        }
        
    });
    }
    
    else{
        grid.innerHTML=''
    filteredData =  backenedData.filter(function(data) {
        return data.category == passedData;
        
      });
    
      console.log(filteredData)
      for (let value of filteredData){
            
        addElement(grid, value)
    }
    
}
      
}

function ratingFilter(x){

   
    
        var ratingData = backenedData.filter(function(data) {
            console.log(data.rating,x)
            return data.rating.rate<= x;
            console.log(data.rating,x)
        });
        console.log(ratingData)
        grid.innerHTML=''
        if(ratingData.length==0)
        {
            grid.innerHTML="No Data Found"
        }
        else{
        for (let value of ratingData){
            
            addElement(grid, value)
        }
    }

    
    
}

// function range(y){
//     var r=document.querySelectorAll(".prange");
    
//     var ratingData = backenedData.filter(function(data) {
//         console.log(data.range,x)
//         return data.rating.rate<= x;
//         console.log(data.rating,x)
//     });
//     console.log(ratingData)
//     grid.innerHTML=''
//     if(ratingData.length==0)
//     {
//         grid.innerHTML="No Data"
//     }
//     else{
//     for (let value of ratingData){
        
//         addElement(grid, value)
//     }
// }

// }

document.querySelectorAll('input[type="checkbox"]').forEach(c => {
    c.addEventListener('change', filterProducts);
  });


function filterProducts() {
    grid.innerHTML='';
    const checkboxes = Array.from(document.querySelectorAll('input[name="prange"]'));
    const checkedRanges = checkboxes.filter(c => c.checked).map(c => c.value);
  console.log("check",checkedRanges)
    if (checkedRanges.length === 0) {

        for (let value of backenedData){
            
            addElement(grid, value)
        }
        return;
    }
  
  
    const filteredProducts = backenedData.filter(p => {
      const price = p.price;
    
      for (const range of checkedRanges) {
        if (range === '100+' && price >= 100) {
          return true;
        }
       
        const [min, max] = range.split('-').map(parseFloat);
        if (price >= min && price <= max) {
          return true;
        }
      }
      return false;
    });
    console.log(filteredProducts)
  
  
    let myArr = backenedData.filter(p =>{
      if(filteredProducts.includes(p)){
        return p;
      }
    })
    console.log(myArr)
    grid.innerHTML=''
    for (let value of myArr){
            
        addElement(grid, value)
    }
  }







function addToCart(id){

    let item;
  backenedData.forEach((ele)=>{
    if(ele.id==id){
      item=ele;
    }
  })
  cartArr.push(item);
  localStorage.setItem('cartArr',JSON.stringify(cartArr));
  console.log(JSON.parse(localStorage.getItem('cartArr')));


   
    
}