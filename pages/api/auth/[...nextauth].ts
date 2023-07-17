import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: "345855600697-ib13q5uk35epagjodldbta1me5rr8uvj.apps.googleusercontent.com",
      clientSecret: "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"
    })
  ]
})

 