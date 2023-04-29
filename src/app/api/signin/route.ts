import { z } from 'zod'
// import { otpToken } from "$/lib/auth";
//
// const sendOtp = async () => {
// 	// ...
// 	const otp = await otpToken.issue(user.userId);
//
// 	// send email with verification link
// 	sendEmail(email, {
// 		password: otp.toString()
// 	});
// };

export async function POST(request: Request) {
  const body = await request.json()
  let email: string
  try {
    email = z.string().email().parse(body.email)
  } catch (e) {
    return new Response(JSON.stringify({ message: "Failed to parse"}), { 
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
  
  // Create user
  // Send token via email
  // create a use
  return new Response('Hello, Next.js!')
}
