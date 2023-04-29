import lucia from 'lucia-auth'
import { pg } from '@lucia-auth/adapter-postgresql'
import { pool } from "$/db/db"
import { idToken } from "@lucia-auth/tokens";

export const auth = lucia({
  adaptor: pg(pool)
})


const otp = idToken(auth, "otp", {
	expiresIn: 60 * 10,// expiration in 10 mins,
	length: 6 // defualt is 8
});


