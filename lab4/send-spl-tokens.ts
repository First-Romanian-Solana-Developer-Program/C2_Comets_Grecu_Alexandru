import "dotenv/config";
import {
    getExplorerLink,
    getKeypairFromEnvironment
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";


const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(`User account loaded: ${user.publicKey.toBase58()}`);

// Add the recipient public key here
const recipient = new PublicKey("qno5TxfSw1SWEZuEZU7yMo3q58uKMsbkFDFyB6kqwmd");
const tokenMintAccount = new PublicKey("7tgZFkJ2ECQePcMWNxQh3tDztFtjhybtx7c9hG2om2Cq");

const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

console.log(`Creating token account for ${recipient.toBase58()}`);

const sourceTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    user,
    tokenMintAccount,
    user.publicKey
);

const destinationTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    user,
    tokenMintAccount,
    recipient
);

const signature = await transfer(
    connection,
    user,
    sourceTokenAccount.address,
    destinationTokenAccount.address,
    user,
    1 * MINOR_UNITS_PER_MAJOR_UNITS
);

const explorerLink = getExplorerLink("transaction", signature, "devnet");

console.log(`Transaction sent: ${explorerLink}`);