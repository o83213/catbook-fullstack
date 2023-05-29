# catbook-fullstack

## Introduction 
  This is a social media app clone with the common features, like: creating post, leaving comment, and adding friends.
Below are the seven main features:
  1. User can write their post, with text and image
  2. User can delete their own post
  3. User can leave common on the post
  4. User can like the post
  5. User can add another user as friend
  6. User can have a conversation with their friend
  7. User’s conversation will have immediately response

## Structure and Design
  The app is build with React and Express framework with both Apollo client and server.
  The Database is build with Postgres SQL and firebase is used for image storing. GQL is used instead of Restful API because some adventages like type safety schema, nested query, custom query field... and so on.
  Authentication and Authorization rely on json web token mechanism. With refresh token this become a fine solution for the simple stateless authetication method.
  For the subscription, I use simple pubsub model with websocket library. With the help of apollo subscription hook, the chatting system is created!
