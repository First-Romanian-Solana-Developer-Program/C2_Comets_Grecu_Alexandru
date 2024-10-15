import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { LAMPORTS_PER_SOL, PublicKey, Transaction, TransactionInstruction, clusterApiUrl, Connection, sendAndConfirmTransaction, SystemProgram } from "@solana/web3.js";
import { createMemoInstruction } from "@solana/spl-memo";

const sender = getKeypairFromEnvironment("SECRET_KEY");
const connection = new Connection(clusterApiUrl("devnet"));

console.log("Sender public key: " + sender.publicKey.toString());

const receiver = new PublicKey("qno5TxfSw1SWEZuEZU7yMo3q58uKMsbkFDFyB6kqwmd");

const transaction = new Transaction();

const amount = 0.1;

const tranferInstruction = SystemProgram.transfer({
    fromPubkey: sender.publicKey,
    toPubkey: receiver,
    lamports: amount * LAMPORTS_PER_SOL,
});

transaction.add(tranferInstruction);

const memo = createMemoInstruction("Hello World!");
transaction.add(memo);

const signature = await sendAndConfirmTransaction(connection, transaction, [sender]);
console.log("Transaction signature: " + signature);