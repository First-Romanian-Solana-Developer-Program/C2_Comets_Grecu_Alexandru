import { createMint, getOrCreateAssociatedTokenAccount } from '@solana/spl-token';
import "dotenv/config";
import { getKeypairFromEnvironment, getExplorerLink } from '@solana-developers/helpers';

import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';

const DECIMALS = 6;

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(`User account loaded: ${user.publicKey.toBase58()}`);

const tokenMint = new PublicKey("7tgZFkJ2ECQePcMWNxQh3tDztFtjhybtx7c9hG2om2Cq");
const destPubkey = new PublicKey("qno5TxfSw1SWEZuEZU7yMo3q58uKMsbkFDFyB6kqwmd");

const destTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    user,
    tokenMint,
    destPubkey
);

console.log(`Token account created: ${destTokenAccount.address.toBase58()}`);
