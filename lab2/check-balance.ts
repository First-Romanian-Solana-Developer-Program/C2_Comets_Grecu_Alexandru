import "dotenv/config";
import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { airdropIfRequired } from "@solana-developers/helpers";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

console.log("Connected to dotenv", connection.rpcEndpoint);

const publicKey = new PublicKey("qno5TxfSw1SWEZuEZU7yMo3q58uKMsbkFDFyB6kqwmd");

const balanceInLamports = await connection.getBalance(publicKey);

console.log("Balance in lamports:", balanceInLamports);

console.log("Airdropping 1 Sol to the account");

await airdropIfRequired(
    connection,
    publicKey,
    1 * LAMPORTS_PER_SOL,
    0.5 * LAMPORTS_PER_SOL
);

const balanceInLamportsAfter = await connection.getBalance(publicKey);

console.log("Balance in lamports after airdrop:", balanceInLamportsAfter);
