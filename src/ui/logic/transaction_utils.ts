/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable arrow-body-style */

import { cryptography, transactions, codec } from "@liskhq/lisk-client";
import { objects } from '@liskhq/lisk-utils';
import { fetchAccountInfo } from "../../app/plugins/lisk_rbac_ui/api";

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

const calcMinTxFee = (assetSchema, minFeePerByte: number, tx) => {
  const assetBytes = codec.codec.encode(assetSchema, tx.asset);
  const bytes = codec.codec.encode(baseAssetSchema, { ...tx, asset: assetBytes });
  return BigInt(bytes.length * minFeePerByte + 3000);
};

const getFullAssetSchema = (assetSchema): any => objects.mergeDeep({}, baseAssetSchema, { properties: { asset: assetSchema }, });

export interface SendTransactionOptions {
  moduleID: number;
  assetID: number;
  asset: Record<string, unknown>;
  schema: any;
  passphrase: string;
  fee: string;
  networkIdentifier: string;
  minFeePerByte: number;
}

export const generateTransaction = async (options: SendTransactionOptions, url: string) => {
  const { publicKey } = cryptography.getPrivateAndPublicKeyFromPassphrase(
    options.passphrase
  );
  const address = cryptography.getAddressFromPassphrase(options.passphrase);
  const {
    sequence: { nonce },
  } = await fetchAccountInfo(address.toString("hex"), url);

  const { id, ...rest } = transactions.signTransaction(
    options.schema,
    {
      moduleID: options.moduleID,
      assetID: options.assetID,
      nonce: BigInt(nonce),
      fee: BigInt(transactions.convertLSKToBeddows(options.fee.toString())),
      senderPublicKey: publicKey,
      asset: options.asset,
    },
    Buffer.from(options.networkIdentifier, "hex"),
    options.passphrase
  );

  const minFee: BigInt = calcMinTxFee(options.schema, options.minFeePerByte, rest);

  if (parseInt(options.fee, 10) < minFee.valueOf()) {
    rest.fee = minFee;
  }

  return {
    id: (id as any).toString("hex"),
    tx: codec.codec.toJSON(getFullAssetSchema(options.schema), rest),
    minFee: calcMinTxFee(options.schema, options.minFeePerByte, rest),
  };
};