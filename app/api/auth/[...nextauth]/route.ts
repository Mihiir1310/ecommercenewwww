import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";



const users = [
  {
    id: "1",
    email: "admin@alphaware.com",
    password: "admin123", 
    role: "admin",
  },
  {
    id: "2",
    email: "user@example.com",
    password: "user123",
    role: "user",
  },
];

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const user = users.find((u) => u.email === credentials?.email);

        if (!user) return null;

        
        if (credentials?.password !== user.password) {
          return null;
        }

        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.email = token.email as string;
      session.user.role = token.role as string;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
