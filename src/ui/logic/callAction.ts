import { apiClient } from "lisk-sdk";

export const callAction = async (
  client: apiClient.APIClient,
  action: string,
  params: Record<string, unknown>,
): Promise<Record<string, unknown>> => {

  let result = (await client.invoke(action, params)) as unknown;

  switch (action) {
    case 'app:getAccount':
      result = client.account.toJSON(client.account.decode(result as string));
      break;

    case 'app:getAccounts':
      result = (result as string[]).map(account =>
        client.account.toJSON(client.account.decode(account)),
      );
      break;

    case 'app:getLastBlock':
    case 'app:getBlockByID':
    case 'app:getBlockByHeight':
      result = client.block.toJSON(client.block.decode(result as string));
      break;

    case 'app:getBlocksByHeightBetween':
    case 'app:getBlocksByIDs':
      result = (result as string[]).map(block => client.block.toJSON(client.block.decode(block)));
      break;

    case 'app:getTransactionByID':
      result = client.transaction.toJSON(client.transaction.decode(result as string));
      break;

    case 'app:getTransactionsByIDs':
      result = (result as string[]).map(transaction =>
        client.transaction.toJSON(client.transaction.decode(transaction)),
      );
      break;

    default:
      break;
  }

  return result as Record<string, unknown>;
};