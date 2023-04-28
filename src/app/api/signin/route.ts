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
  console.log(request.body)
  return new Response('Hello, Next.js!')
}
