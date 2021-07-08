/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable arrow-body-style */

import { cryptography, transactions, codec } from "lisk-sdk";
import { objects } from '@liskhq/lisk-utils';

const baseAssetSchema = {
  $id: 'lisk/base-transaction',
  type: 'object',
  required: ['moduleID', 'assetID', 'nonce', 'fee', 'senderPublicKey', 'asset'],
  properties: {
    moduleID: {
      dataType: 'uint32',
      fieldNumber: 1,
    },
    assetID: {
      dataType: 'uint32',
      fieldNumber: 2,
    },
    nonce: {
      dataType: 'uint64',
      fieldNumber: 3,
    },
    fee: {
      dataType: 'uint64',
      fieldNumber: 4,
    },
    senderPublicKey: {
      dataType: 'bytes',
      fieldNumber: 5,
    },
    asset: {
      dataType: 'bytes',
      fieldNumber: 6,
    },
    signatures: {
      type: 'array',
      items: {
        dataType: 'bytes',
      },
      fieldNumber: 7,
    },
  },
};

const fetchAccountInfo = async (address) => {
  return fetch(`http://localhost:4000/api/accounts/${address}`)
    .then((res) => res.json())
    .then((res) => res.data);
};

const calcMinTxFee = (assetSchema, minFeePerByte, tx) => {
  const assetBytes = codec.encode(assetSchema, tx.asset);
  const bytes = codec.encode(baseAssetSchema, { ...tx, asset: assetBytes });
  return BigInt(bytes.length * minFeePerByte);
};

const getFullAssetSchema = (assetSchema): any => objects.mergeDeep({}, baseAssetSchema, { properties: { asset: assetSchema }, });

export const generateTransaction = async ({
  passphrase,
  fee,
  networkIdentifier,
  minFeePerByte,
  assetObject,
  schema,
}) => {
  const { publicKey } = cryptography.getPrivateAndPublicKeyFromPassphrase(
    passphrase
  );
  const address = cryptography.getAddressFromPassphrase(passphrase);
  const {
    sequence: { nonce },
  } = await fetchAccountInfo(address.toString("hex"));

  const { id, ...rest } = transactions.signTransaction(
    schema,
    {
      moduleID: 1024,
      assetID: 1,
      nonce: BigInt(nonce),
      fee: BigInt(transactions.convertLSKToBeddows(fee)),
      senderPublicKey: publicKey,
      assetObject,
    },
    Buffer.from(networkIdentifier, "hex"),
    passphrase
  );

  return {
    id: (id as any).toString("hex"),
    tx: codec.toJSON(getFullAssetSchema(schema), rest),
    minFee: calcMinTxFee(schema, minFeePerByte, rest),
  };
};


// Generate

// export interface SendTransactionOptions {
//   moduleID: number;
//   assetID: number;
//   asset: Record<string, unknown>;
//   schema: any;
//   passphrase: string;
// }

// const handleSendTransaction = async (data: SendTransactionOptions) => {
//   try {
//     const { publicKey, address } = cryptography.getAddressAndPublicKeyFromPassphrase(
//       data.passphrase,
//     );
//     const assetSchema = data.schema;
//     if (!assetSchema) {
//       throw new Error(`ModuleID: ${data.moduleID} AssetID: ${data.assetID} is not registered`);
//     }
//     const assetObject = codec.fromJSON<Record<string, unknown>>(
//       assetSchema.schema,
//       data.asset,
//     );
//     const sender = await getClient().account.get(address);
//     const fee = getClient().transaction.computeMinFee({
//       moduleID: data.moduleID,
//       assetID: data.assetID,
//       asset: assetObject,
//       senderPublicKey: publicKey,
//       nonce: BigInt((sender.sequence as { nonce: bigint }).nonce),
//     });
//     const transaction = await getClient().transaction.create(
//       {
//         moduleID: data.moduleID,
//         assetID: data.assetID,
//         asset: assetObject,
//         senderPublicKey: publicKey,
//         fee,
//       },
//       data.passphrase,
//     );