// import { NextRequest, NextResponse } from "next/server";

// const AuthRoutes: string[] = ["/auth", "/register"];
// const PrivateRoutes: string[] = ["/subscription1", "/workoutplan1/:page", "/nutritionplan1", "/nutritionplan1/:page" , "/workoutplan1", '/about1', '/myworkoutplan' ,'/myworkoutplan/:page',  '/appointment', '/appointment/:page' ,'/profile', '/myappointment'];

// export async function middleware(request: NextRequest): Promise<NextResponse> {
//   try {
//     const { pathname } = request.nextUrl;
//     console.log(pathname, 'Middleware Path');

//     // ✅ Get accessToken from cookies
//     const token = request.cookies.get("accessToken")?.value;

//     // console.log(token, "accessToken");

//     if (!token) {
//       if (AuthRoutes.includes(pathname)) {
//         return NextResponse.next();
//       }
//       return NextResponse.redirect(
//         // new URL(`/auth?redirect=${encodeURIComponent(pathname)}`, request.url)
//         new URL('/login', request.url)
//       );
//     }

//     // ✅ Allow access to private routes only if the token exists
//     if (PrivateRoutes.includes(pathname) && !token) {
//       return NextResponse.redirect(new URL("/auth", request.url));
//     }

//     return NextResponse.next();
//   } catch (error) {
//     console.error("Middleware error:", error);
//     return NextResponse.redirect(new URL("/error", request.url));
//   }
// }

// // ✅ Middleware matcher config
// export const config = {
//   matcher: ["/subscription1", "/workoutplan1/:page", "/nutritionplan1", "/nutritionplan1/:page", "/workoutplan1",'/about1', '/myworkoutplan' ,'/myworkoutplan/:page', '/appointment', '/appointment/:page' , '/profile', '/myappointment'],
// };

import { NextResponse } from "next/server";
import { getCurrentUser } from "./service/authService";
// import { getCurrentUser } from './app/service/authService'

export async function middleware(request: Request) {
  // Fetch current user (authentication token)
  const token = await getCurrentUser();

  // If there's no token, redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If user is authenticated, proceed with the request
  return NextResponse.next();
}

// Define which paths the middleware applies to
export const config = {
  // matcher: [
  //   '/chat',       // Apply to /chat
  //   '/chat/:page', // Apply to /chat/anything
  //   '/payment',    // Apply to /payment
  //   '/history',    // Apply to /history
  // ]
  matcher: [
    "/subscription1",
    "/workoutplan1/:page",
    "/nutritionplan1",
    "/nutritionplan1/:page",
    "/workoutplan1",
    "/about1",
    "/myworkoutplan",
    "/myworkoutplan/:page",
    "/appointment",
    "/appointment/:page",
    "/profile",
    "/myappointment",
  ],
};
