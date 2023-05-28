import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { PubSub } from "graphql-subscriptions";
// middlewares
import cors from "cors";
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";
import { makeExecutableSchema } from "@graphql-tools/schema";
//
import dotenv from "dotenv";
//
import { MyContext, SubscriptionContext } from "./types";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";
import authRoute from "@routes/auth";
import uploadRoute from "@routes/upload";
import { getUserFromToken } from "./utils/getUserFromToken";
import { dataLoader } from "./loader";

dotenv.config();

export const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();
  const app = express();
  const pubsub = new PubSub();
  const httpServer = http.createServer(app);
  const schema = makeExecutableSchema({ resolvers, typeDefs });
  // Create our WebSocket server using the HTTP server we just set up.
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql/subscriptions",
  });
  // Save the returned server's info so we can shutdown this server later
  const serverCleanup = useServer(
    {
      schema,
      context: (ctx: SubscriptionContext): MyContext => {
        const userInfo = getUserFromToken(ctx.connectionParams.accessToken);
        return {
          req: ctx.req,
          res: ctx.res,
          prisma,
          pubsub,
          dataLoader,
          userInfo,
        };
      },
    },
    wsServer
  );

  const server = new ApolloServer<MyContext>({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });
  await server.start();
  // middleware
  app.use(cookieParser());
  app.use(express.json());

  app.use(
    cors<cors.CorsRequest>({
      origin: [
        "https://studio.apollographql.com",
        "http://localhost:3000",
        "https://chat-project-client.vercel.app",
      ],
      credentials: true,
    })
  );
  // auth route
  app.use("/auth", authRoute);
  app.use("/upload", uploadRoute);
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req, res }): Promise<MyContext> => {
        const userInfo = getUserFromToken(req.headers.authorization);
        return { req, res, prisma, pubsub, dataLoader, userInfo };
      },
    })
  );
  httpServer.listen({ port: process.env.PORT || 4000 }, () => {
    console.log(`🚀 Server ready at port ${process.env.PORT || 4000}/graphql`);
  });
}

main().catch(async (err) => {
  console.log(err.message);
  await prisma.$disconnect();
});
