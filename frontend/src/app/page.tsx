// // // login.tsx
// // "use client";

// // import { useState } from "react";
// // import { useRouter } from "next/navigation";
// // import { Eye, EyeOff } from "lucide-react";
// // import Image from "next/image";

// // const Login = () => {
// //   const router = useRouter();
// //   const [showPassword, setShowPassword] = useState(false);

// //   const [formData, setFormData] = useState({
// //     email: "",
// //     password: "",
// //   });

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       [e.target.name]: e.target.value,
// //     }));
// //   };

// //  const handleSubmit = async (e: React.FormEvent) => {
// //   e.preventDefault();

// //   try {
// //     const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(formData),
// //     });

// //     const data = await res.json();

// //     if (!res.ok) {
// //   alert(data.error || "Login failed");
// //   return;
// // }

// // // ✅ Save login state
// // localStorage.setItem("loggedIn", "true");


// //     router.push("/dashboard");
// //   } catch (err) {
// //     console.error("Login error:", err);
// //     alert("Something went wrong");
// //   }
// // };


// //   return (
// //     <div className="flex h-screen w-screen overflow-hidden bg-[#2B2738]">
// //       {/* Left Side */}
// //       <div className="w-1/2 flex flex-col justify-center items-center bg-[url('/bg.png')] bg-cover">
// //               <div className="p-3 mt-[-160px] mb-[20px] mr-[50px]">
// //                 <Image src="/main-logo.png" alt="chat icon" width={350} height={350} />
// //               </div>
// //               <p className="text-[65px] text-white font-semibold text-center mb-4 leading-tight mt-[-70px] max-w-3xl">
// //                 An AI Assistant For <br /> Government Job Opportunities
// //               </p>
// //             </div>

// //       {/* Right Side */}
// //       <div className="w-1/2 flex flex-col justify-center items-center p-10 bg-[#2B2738]">
// //         <h2 className="text-3xl font-semibold mb-8 text-white">Login</h2>
// //         <form className="w-full max-w-sm space-y-6" onSubmit={handleSubmit}>
// //           <div>
// //             <label className="block mb-1 text-sm text-white">E-mail</label>
// //             <input
// //               name="email"
// //               type="email"
// //               className="w-full bg-transparent border-b-2 border-white outline-none py-2 text-white"
// //               placeholder="Enter your email"
// //               value={formData.email}
// //               onChange={handleChange}
// //               required
// //             />
// //           </div>
// //           <div>
// //             <label className="block mb-1 text-sm text-white">Password</label>
// //             <div className="relative">
// //               <input
// //                 name="password"
// //                 type={showPassword ? "text" : "password"}
// //                 className="w-full bg-transparent border-b-2 border-white outline-none py-2 mb-3 text-white"
// //                 placeholder="Enter your password"
// //                 value={formData.password}
// //                 onChange={handleChange}
// //                 required
// //               />
// //               <button
// //                 type="button"
// //                 className="absolute right-3 top-2/4 -translate-y-1/2 text-gray-400"
// //                 onClick={() => setShowPassword(!showPassword)}
// //               >
// //                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
// //               </button>
// //             </div>
// //           </div>

// //           <button
// //             type="submit"
// //             className="bg-[#a56eff] hover:bg-purple-700 text-white py-2 rounded-full w-full"
// //           >
// //             Login
// //           </button>
// //           <p className="text-sm text-center text-gray-400">
// //             Don’t have an account yet?{" "}
// //             <a href="/signup" className="text-purple-400 hover:underline">
// //               Sign Up
// //             </a>
// //           </p>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Eye, EyeOff } from "lucide-react";
// import Image from "next/image";

// const Login = () => {
//   const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.error || "Login failed");
//         return;
//       }

//       localStorage.setItem("loggedIn", "true");
//       router.push("/dashboard");
//     } catch (err) {
//       console.error("Login error:", err);
//       alert("Something went wrong");
//     }
//   };

//   return (
//     <div className="flex h-screen w-screen overflow-hidden bg-[#f7f9fc] font-sans">
//       {/* Left Side */}
//       <div className="w-1/2 flex flex-col justify-center items-center bg-[#e1f0ff] px-4">
//         <div className="p-3 mt-[-160px] mb-[20px] mr-[50px]">
//           <Image src="/main-logo.png" alt="chat icon" width={300} height={300} />
//         </div>
//         <p className="text-[50px] text-[#333] font-semibold text-center mb-4 leading-tight mt-[-70px] max-w-2xl">
//           Sahayak – An AI Assistant <br /> for Government Job Opportunities
//         </p>
//       </div>

//       {/* Right Side */}
//       <div className="w-1/2 flex flex-col justify-center items-center p-10 bg-white shadow-inner">
//         <h2 className="text-3xl font-semibold mb-8 text-[#333]">Login</h2>
//         <form className="w-full max-w-sm space-y-6" onSubmit={handleSubmit}>
//           <div>
//             <label className="block mb-1 text-sm text-[#333]">E-mail</label>
//             <input
//               name="email"
//               type="email"
//               className="w-full border border-gray-300 rounded-md py-2 px-3 outline-none focus:ring-2 focus:ring-blue-300 text-[#333]"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label className="block mb-1 text-sm text-[#333]">Password</label>
//             <div className="relative">
//               <input
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 className="w-full border border-gray-300 rounded-md py-2 px-3 outline-none focus:ring-2 focus:ring-blue-300 text-[#333]"
//                 placeholder="Enter your password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//               <button
//                 type="button"
//                 className="absolute right-3 top-2/4 -translate-y-1/2 text-gray-400"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md w-full font-semibold transition"
//           >
//             Login
//           </button>
//           <p className="text-sm text-center text-gray-500">
//             Don’t have an account yet?{" "}
//             <a href="/signup" className="text-blue-600 hover:underline font-medium">
//               Sign Up
//             </a>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;


// src/app/login/page.tsx
// src/app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("loggedIn", "true");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white px-4 py-10">
      {/* Heading on Top */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-[#1f1f1f] leading-tight">
          An AI Assistant For <br /> Government Job Opportunities
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center gap-10">
        {/* Left Side - Image */}
        <div className="flex justify-center">
          <Image
            src="/ai-assistant.jpeg"
            alt="AI Assistant"
            width={580}
            height={580}
            className="rounded-xl"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md bg-white p-10 rounded-xl shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-3xl font-bold text-black text-center">Welcome!</h2>
            <p className="text-gray-700 text-base text-center">
              Simplify your workflow and boost your productivity with <strong>Sahayak</strong>.
            </p>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <div className="flex justify-end mt-1">
                <a href="#" className="text-sm text-gray-600 hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-full font-semibold transition"
            >
              Login
            </button>
          </form>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-sm text-gray-500">or continue with</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <div className="flex justify-center gap-4 mb-6">
            <button className="bg-gray-100 p-3 rounded-full">
              <Image src="/google-icon.svg" alt="Google" width={20} height={20} />
            </button>
            <button className="bg-gray-100 p-3 rounded-full">
              <Image src="/apple-icon.svg" alt="Apple" width={20} height={20} />
            </button>
            <button className="bg-gray-100 p-3 rounded-full">
              <Image src="/facebook-icon.svg" alt="Facebook" width={20} height={20} />
            </button>
          </div>

          <p className="text-center text-sm text-gray-600">
            Not a member? <a href="/signup" className="text-blue-600 font-medium hover:underline">Register now</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
