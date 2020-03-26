import MessageQuery from "graphql/query/MessageQuery";
import Message from "models/Message";
import client from "./client";

export async function getCommitByReceiver(receiver: {
  receiver: string;
}): Promise<Array<Message.Info>> {
  const data = await client.request(
    MessageQuery.getCommitByReceiverQuery,
    receiver
  );
  return data.getCommitByReceiver;
}
