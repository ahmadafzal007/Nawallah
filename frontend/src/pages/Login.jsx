import React, { useState } from 'react'
import "../styles/font/font.css"
import logo from "../assets/nawalah.png"
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/auth.jsx";
const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth();
  const [password, setpassword]= useState();
  const [email, setemail]=useState();
  const getemail= [];
  const login1 = ()=>{
   
   getemail.push(email,password)
    if (email == "admin@gmail.com" && password == "admin123/.,"){
      login("user");
      localStorage.setItem("user",JSON.stringify( getemail[0]));
        
      navigate("/dashboard", { replace: true });
    }
  }

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className='w-full h-full sm:w-full sm:mx-4'>
        <div className='grid grid-cols-2 lg:grid lg:grid-cols-2  md:grid md:grid-cols-2 sm:flex sm:flex-col w-full'>
            <div className='flex flex-col w-full h-screen justify-center align-middle items-center bg-costomFont'>
           
          
           <h1 className='selector font-bold text-[28px] text-[#ffffff]'>Admin Login</h1>
            <p className='selector  items-center justify-center font-normal text-base text-[#BDBDBD]'>Use your credentials below and login to your account</p>
          
           <form className='pt-8'>
           <div className='rounded-full sm:w-full justify-between w-[377px] h-16 items-center px-4 flex flex-row gap-3 border-[#b8a6a60d] border-solid text-black font bg-[#ffffff]'>
          <div className='flex flex-row justify-center items-center gap-3'> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
  <path d="M5.31363 15.1543H12.7646C14.144 15.1543 15.2435 14.7493 15.9981 13.98C16.7523 13.211 17.149 12.0909 17.149 10.686V5.36822C17.149 3.96333 16.7523 2.84328 15.9981 2.07426C15.2435 1.30497 14.144 0.9 12.7646 0.9H5.31363C3.93429 0.9 2.83473 1.30497 2.08021 2.07426C1.32596 2.84328 0.929297 3.96333 0.929297 5.36822V10.686C0.929297 12.0909 1.32596 13.211 2.08021 13.98C2.83473 14.7493 3.93429 15.1543 5.31363 15.1543ZM2.24695 5.36822C2.24695 4.29609 2.50255 3.51893 3.00256 3.00913C3.5022 2.4997 4.26332 2.23953 5.31363 2.23953H12.7646C13.8149 2.23953 14.5761 2.4997 15.0757 3.00913C15.5757 3.51893 15.8313 4.29609 15.8313 5.36822V10.686C15.8313 11.7582 15.5757 12.5353 15.0757 13.0451C14.5761 13.5546 13.8149 13.8147 12.7646 13.8147H5.31363C4.26332 13.8147 3.5022 13.5546 3.00256 13.0451C2.50255 12.5353 2.24695 11.7582 2.24695 10.686V5.36822Z" fill="#FF6154" stroke="#FF6154" stroke-width="0.2"/>
  <path d="M4.89929 6.26567L4.89929 6.26567L4.89994 6.2662L7.23173 8.16511C7.73637 8.58447 8.39309 8.78804 9.03879 8.78804C9.68419 8.78804 10.3412 8.58464 10.8387 8.16488L13.1692 6.26698C13.4596 6.04173 13.5014 5.61467 13.2757 5.32999C13.0543 5.03353 12.6317 4.99002 12.3507 5.22253C12.3505 5.22262 12.3504 5.22272 12.3503 5.22282L10.0188 7.12151L10.0186 7.12166C9.7564 7.33623 9.39815 7.44661 9.03506 7.44661C8.67197 7.44661 8.31372 7.33623 8.05153 7.12166L8.05134 7.12151L5.71983 5.22282C5.71972 5.22272 5.71961 5.22263 5.71949 5.22254C5.43549 4.98758 5.02195 5.04447 4.79547 5.32866C4.56634 5.6162 4.62072 6.0349 4.89929 6.26567Z" fill="#FF6154" stroke="#FF6154" stroke-width="0.2"/>
</svg>
            <input type="email" value={email} onChange={e=>setemail(e.target.value)}  className='text-base   focus:outline-none focus:ring-0 font-normal seletor text-[#000000] my-5  bg-[#ffffff]' placeholder='example@gmail.com'/>
            </div>
             <div className='justify-right'> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.6721 23.6667C17.9917 23.6667 23.1147 18.4434 23.1147 12C23.1147 5.55672 17.9917 0.333374 11.6721 0.333374C5.35253 0.333374 0.229492 5.55672 0.229492 12C0.229492 18.4434 5.35253 23.6667 11.6721 23.6667Z" fill="#FF6154"/>
  <path d="M8.23926 13C8.23926 13 9.09745 13 9.95565 14.6667C9.95565 14.6667 12.6817 10.5 15.1048 9.66671" stroke="#353535" stroke-linecap="round" stroke-linejoin="round"/>
</svg></div>
            </div>
            <div className='rounded-full justify-between sm:w-full w-[377px] h-16 mt-[18px] items-center px-4 flex flex-row gap-3 border-[#bdbdbd0d] border-solid bg-[#ffffff]'>
          <div className='flex flex-row justify-center items-center gap-3'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 16 20" fill="none">
  <g opacity="0.4">
    <path d="M1.40317 15.8093C1.59616 17.2446 2.78343 18.3692 4.22823 18.4357C5.44396 18.4916 6.67893 18.5208 8.03891 18.5208C9.39889 18.5208 10.6339 18.4916 11.8496 18.4357C13.2944 18.3692 14.4817 17.2446 14.6747 15.8093C14.8006 14.8725 14.9045 13.9125 14.9045 12.9349C14.9045 11.9572 14.8006 10.9973 14.6747 10.0605C14.4817 8.62515 13.2944 7.50063 11.8496 7.43412C10.6339 7.37815 9.39889 7.34896 8.03891 7.34896C6.67893 7.34896 5.44396 7.37815 4.22823 7.43412C2.78343 7.50063 1.59616 8.62515 1.40317 10.0605C1.27722 10.9973 1.17334 11.9572 1.17334 12.9349C1.17334 13.9125 1.27722 14.8725 1.40317 15.8093Z" stroke="#BDBDBD" stroke-width="1.5"/>
    <path d="M4.17725 7.34896V5.20052C4.17725 3.06473 5.90627 1.33333 8.03913 1.33333C10.172 1.33333 11.901 3.06473 11.901 5.20052V7.34896" stroke="#BDBDBD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8.03564 12.9349H8.04335" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>
            <input type={showPassword ? 'text' : 'password'} value={password} onChange={e=>setpassword(e.target.value)}  className='text-base font-normal focus:outline-none focus:ring-0 seletor text-black font-bl my-5  bg-white' placeholder='Enter your Password'/>
            </div> <div onClick={togglePasswordVisibility} className='justify-right text-black bg-white'>{!showPassword ? <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#FF6154" class="bi bi-eye" viewBox="0 0 16 16"> <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/> <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/> </svg> :
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#FF6154" class="bi bi-eye-slash" viewBox="0 0 16 16"> <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/> <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/> <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/> </svg>}
            
            </div>
            
            </div>
          <div className='flex flex-row sm:w-full justify-between mt-4'>

{/* <div className='cursor-pointer'>
<h1 className='selector text-[15px]  font-normal text-[#E5E5E5]'>Forgot password?</h1>
</div> */}
          </div>
           </form>
           <button onClick={login1} className='mt-14 selector bg-secondary rounded-full text-[#E5E5E5] text-xl font-bold px-12 py-[14px]'>Log into your account</button>
          
            </div>
            <div className='flex flex-col  h-screen justify-center align-middle items-center bg-secondary'>
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="162" height="202" viewBox="0 0 162 202" fill="none"> */}
            <img src={logo} alt="Logo" className="w-84" />
  {/* <path d="M154.615 36.0284C148.156 20.0765 137.885 11.6456 124.911 11.6456C105.409 11.6478 87.9654 29.0708 79.2394 39.9521C78.2981 32.0734 76.561 23.1059 76.5274 22.9561C74.0189 11.5495 68.5772 2.06998 68.3469 1.67202C68.0178 1.10414 67.5293 0.645321 66.9419 0.352427C66.3545 0.0595325 65.6941 -0.0545597 65.0425 0.0242894L29.3536 4.3616C29.3223 4.36607 29.2977 4.38172 29.2687 4.38619C28.9417 4.4315 28.6235 4.5265 28.3252 4.66789L28.2648 4.69025L28.2447 4.69695C27.7596 4.94288 16.3439 10.8541 14.893 22.898C14.0143 30.3206 14.343 37.5219 14.6515 41.4478C-0.245133 55.6245 -0.061805 74.9501 0.0745742 88.3936L0.0835165 89.2387C0.0835165 89.7864 0.0835161 89.7864 4.53261 103.5C4.76672 104.22 5.23754 104.84 5.86848 105.258C6.49941 105.677 7.25333 105.869 8.00762 105.805C8.76191 105.74 9.47217 105.422 10.0229 104.903C10.5736 104.383 10.9324 103.693 11.0408 102.944C11.5148 101.354 19.968 74.8786 40.5971 62.5911C43.7294 60.5855 47.0012 58.8065 50.3873 57.2678C49.7796 58.9615 49.4673 60.7469 49.464 62.5464C49.464 71.2746 56.5669 78.3775 65.2951 78.3775C67.7611 78.3758 70.192 77.7937 72.3913 76.6784C75.4185 102.814 73.1716 135.261 65.8474 171.364C41.6166 173.61 21.6985 182.958 13.5247 196.084C13.0539 196.839 12.9022 197.75 13.1031 198.616C13.3039 199.483 13.8408 200.234 14.5956 200.705C15.3504 201.176 16.2614 201.328 17.128 201.127C17.9947 200.926 18.746 200.389 19.2169 199.634C25.9754 188.78 43.4342 180.597 64.3941 178.238C64.2488 178.909 64.1147 179.571 63.9649 180.244C63.9515 180.309 63.9515 180.371 63.9425 180.436C63.8254 181.089 63.9162 181.762 64.2019 182.361C64.2466 182.459 64.2935 182.556 64.3472 182.65C64.5671 183.019 64.8518 183.345 65.1878 183.613C65.284 183.689 65.3868 183.754 65.4897 183.819C65.5433 183.852 65.588 183.893 65.6439 183.924L65.8429 184.022L65.8787 184.04C69.7778 186.084 74.9624 187.215 80.5338 187.215C84.2809 187.215 87.9945 186.681 91.2787 185.668C91.3145 185.657 91.3458 185.636 91.3816 185.623C91.4397 185.603 91.4911 185.576 91.547 185.554C91.8734 185.422 92.1775 185.254 92.4368 185.039C92.7066 184.808 92.9421 184.53 93.1254 184.226C93.15 184.185 93.1791 184.15 93.2037 184.107C93.3781 183.799 93.4943 183.461 93.5659 183.112C93.5726 183.083 93.5905 183.059 93.5972 183.03C93.8342 181.646 94.0421 180.255 94.259 178.867C113.294 181.831 128.707 189.647 134.913 199.639C135.385 200.392 136.136 200.927 137.002 201.128C137.867 201.329 138.777 201.178 139.532 200.71C141.106 199.733 141.589 197.665 140.61 196.093C133.284 184.297 116.455 175.504 95.2293 172.224C99.8393 138.194 98.9786 102.984 92.685 69.5218C98.1871 67.6796 102.167 62.486 102.167 56.3735C102.164 53.843 101.469 51.3614 100.158 49.1969C98.8474 47.0325 96.9698 45.2675 94.7285 44.0927C99.6716 42.7222 105.775 41.7049 113.126 41.7049L114.363 41.7139L114.743 41.7116C135.852 41.7116 152.459 66.8322 154.65 71.3305C154.786 71.834 155.037 72.2988 155.384 72.6878C155.731 73.0768 156.164 73.3792 156.649 73.5707L156.658 73.573C157.26 73.8111 157.917 73.8705 158.552 73.7439C159.186 73.6174 159.771 73.3104 160.235 72.8598L160.264 72.8307C160.629 72.4707 160.913 72.0258 161.083 71.5206C161.246 71.0399 161.398 70.586 161.188 69.7432C161.802 62.5128 158.473 45.5548 154.615 36.0284ZM51.7288 24.2394C52.4554 24.8498 53.1663 25.4736 53.8527 26.1197C56.265 28.3912 59.3459 31.5816 62.8023 35.7802C57.1102 33.0169 50.5483 30.7588 43.9551 30.1529C46.1059 25.6859 49.8396 24.5278 51.7288 24.2394ZM63.5714 6.95951C65.1923 10.1432 68.329 16.8951 69.979 24.3982C70.9247 28.7042 71.62 33.0124 72.1208 36.7997C66.7774 29.6208 61.9594 24.539 58.4538 21.2368C57.4205 20.2822 56.3526 19.3657 55.2523 18.4891C55.0845 18.3092 54.897 18.1487 54.6933 18.0107C50.4164 14.6102 45.7952 11.7753 41.7664 9.60884L63.5714 6.95951ZM21.5509 23.6961C22.3335 17.2058 27.6142 13.0317 30.0445 11.4287C32.7922 12.5868 38.9896 15.3904 45.2452 19.4684C41.82 21.3173 38.4553 24.6329 36.7583 30.1999C31.9225 30.7297 27.4488 32.2657 23.4737 34.7988C22.6465 35.2906 21.8572 35.7981 21.0859 36.3123C20.9719 32.733 21.0099 28.2615 21.5509 23.6961ZM37.0781 56.8855C22.4497 65.5959 12.731 81.4785 7.93538 92.2591L6.78175 88.6999L6.77951 88.3265C6.62749 73.3181 6.41733 52.7651 26.9905 40.511C30.9745 37.9735 35.5309 36.6879 40.5367 36.6879C50.403 36.6879 60.2089 41.582 66.6343 45.7225C59.6879 46.5028 49.2605 49.1253 37.0781 56.8855ZM56.1689 62.5508C56.1689 57.5204 60.2625 53.4268 65.2929 53.4268C70.3233 53.4268 74.4169 57.5204 74.4169 62.5508C74.4169 67.5812 70.3233 71.6748 65.2929 71.6748C60.2625 71.6748 56.1689 67.5834 56.1689 62.5508ZM71.0969 179.003C73.5323 167.794 75.5422 156.497 77.1221 145.136L81.8395 145.311L82.0877 138.608L77.9829 138.456C80.6099 116.649 81.5422 93.064 78.4434 71.3529C79.2085 70.2083 79.8197 68.968 80.2611 67.6639C81.9267 68.8511 83.8606 69.6761 85.9577 70.0338C88.7798 84.9052 90.5156 99.9624 91.1513 115.086L86.8051 114.587L86.0404 121.25L91.3659 121.86C91.6509 134.778 91.1514 147.701 89.8702 160.558H84.6901V167.266H89.1213C88.8243 169.707 88.4979 172.145 88.142 174.579L88.1241 174.655L88.1219 174.717C87.8737 176.405 87.5965 178.089 87.3215 179.77C85.1842 180.248 82.8769 180.499 80.5361 180.499C77.0707 180.503 73.7685 179.962 71.0969 179.003ZM88.2918 63.539C86.3915 63.5366 84.5698 62.7807 83.2261 61.437C81.8824 60.0933 81.1264 58.2716 81.1241 56.3713C81.1241 52.4185 84.3391 49.2035 88.2918 49.2035C92.2446 49.2035 95.4595 52.4185 95.4595 56.3713C95.4572 58.2716 94.7013 60.0933 93.3576 61.437C92.0139 62.7807 90.1921 63.5366 88.2918 63.539ZM114.745 35.0022L114.365 35.0044L113.128 34.9955C103.327 34.9955 95.3142 36.6634 89.1369 38.7851C97.8339 29.4889 111.295 18.3528 124.913 18.3528C131.072 18.3528 136.235 20.7338 140.695 25.6345C148.314 34.0028 151.905 47.8398 153.495 57.8379C146.302 48.8973 132.302 35.0022 114.745 35.0022Z" fill="#FF6154"/> */}
{/* </svg> */}
<h1 className='selector text-[70px] font-normal font-cursive text-[#E5E5E5] '>Nawalah</h1>
            </div>
        </div>
    </div>
  )
}

export default Login