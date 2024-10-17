import { createMint, mintTo } from '@solana/spl-token';
import "dotenv/config";
import { getKeypairFromEnvironment, getExplorerLink } from '@solana-developers/helpers';

import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';

const AMOUNT = 9;
const DECIMALS = 6;
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
const user = getKeypairFromEnvironment("SECRET_KEY");


const tokenMint = new PublicKey("7tgZFkJ2ECQePcMWNxQh3tDztFtjhybtx7c9hG2om2Cq");
const destTokenAccount = new PublicKey("86urk9A7zfh3kYT8ffyLZE61Hg8Bhh8LtxzhMv2EtcfN");


const sig = await mintTo(
    connection,
    user,
    tokenMint,
    destTokenAccount,
    user,
    AMOUNT * 10 ** DECIMALS
)

console.log(`Minted ${AMOUNT} tokens to ${destTokenAccount.toBase58()}`);