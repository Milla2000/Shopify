///////
const loginpassword=document.querySelector('.password')
const loginemail=document.querySelector('.email')
const loginForm=document.getElementById('login')

let token=''
let id=''

loginForm.addEventListener('submit', (e)=>{
     e.preventDefault()

    let userlogin=
    loginemail.value !=="" && 
    loginpassword.value !==""

    if(userlogin){
        axios 
        .post(
            "http://localhost:4500/users/login",
    
            {
              email: loginemail.value,
              password: loginpassword.value,
            },
    
            {
              headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
              },
            }
          ).then((res)=>{
            console.log(res.data)
            //alert(res.data.message)

            id=res.data.id
            
            localStorage.setItem('id',id)
            token=res.data.token
            localStorage.setItem('token',token)
            if(res.data.role=='admin'){
                window.location.href='./adminAllProducts.html'
            }else if(res.data.role !=='admin'){
                window.location.href='./yourProducts.html'
            }   
          })
    }

})
