import {
  MongoClient,
  ObjectId,
} from "https://deno.land/x/mongo@v0.30.1/mod.ts";

const client = new MongoClient();

await client.connect(
  "mongodb+srv://test:test123@cluster0.yheqwr0.mongodb.net/denoposts?authMechanism=SCRAM-SHA-1&retryWrites=true&w=majority"
);

const db = client.database("denoposts");

export { ObjectId };

export interface IPost {
  _id: ObjectId;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export const postCollection = db.collection<IPost>("posts");
