// // import * as dotenv from 'dotenv';
// // import fs from "fs/promises";
// // import { SystemProgram, Keypair, Connection, Transaction, PublicKey } from "@solana/web3.js";
// // import * as anchor from "@coral-xyz/anchor";
// // import { Program } from '@coral-xyz/anchor';

// 'use server'
// const anchor = require('@coral-xyz/anchor');
// const fs = require('fs/promises');
// const { SystemProgram, Keypair, Connection, Transaction, PublicKey } = require('@solana/web3.js');
// const { Program } = require('@coral-xyz/anchor');

// // const lala = require('../target/types/lala');
// // const IDL = require('../../../../target/types/soonswap');
// // const IDL = require('./soonIdl');
// // const IDL = require('./try')

// // Create a read-only provider
// const createReadOnlyProvider = (connection) => {
//     // Use a dummy wallet for read-only operations /home/muze/rust/projects/soonswap/target
//     const dummyWallet = {
//         publicKey: PublicKey.default,
//         signTransaction: async (tx) => tx,
//         signAllTransactions: async (txs) => txs
//     };

//     return new anchor.AnchorProvider(
//         connection,
//         dummyWallet,
//         {
//             preflightCommitment: "confirmed",
//             commitment: "confirmed"
//         }
//     );
// };

// const Swap_program = new PublicKey("3tnTHHAgeh3KNxMgGyta2oAWEEnitHLGDWqkMghSwomn");
// // console.log('Swap Program Address:', Swap_program.toBase58());
// // console.log('IDL:', JSON.stringify(IDL, null, 2));

// const connection = new Connection(process.env.NEXT_PUBLIC_QUICKDEVNET, "confirmed");
// const provider = createReadOnlyProvider(connection);
// const program = new anchor.Program(IDL, Swap_program, provider);
// // console.log(Swap_program);
// // const program = new anchor.Program(IDL, provider);

// const POOL_CACHE_FILE = "poolCache.json";
// export const fetchAndCachePools = async () => {
//     try {
//         // Fetch all pool data 
//         const poolAccounts = await program.account.poolInfo.all();

//         // Format the pool data
//         const poolData = poolAccounts.map(account => ({
//             pool: account.publicKey.toString(),
//             mintA: account.account.mintA.toString(),
//             mintB: account.account.mintB.toString(),
//             lpMint: account.account.lpMint.toString(),
//             fees: account.account.fees,
//             totalLiquidity: account.account.totalLiquidity,
//         }));

//         console.log(poolData);
        

//         // Write data to poolCache.json
//         await fs.writeFile(POOL_CACHE_FILE, JSON.stringify(poolData, null, 2));
//         console.log(`Pool data successfully cached in ${ POOL_CACHE_FILE }`);

//         return poolData;
//     } catch (error) {
//         console.error("Error fetching or caching pool data:", error);
//         throw error;
//     }
// };

// export const loadCachedPools = async () => {
//     try {
//         // Read the JSON cache file
//         const data = await fs.readFile(POOL_CACHE_FILE, "utf-8");
//         console.log("fetched pool info");

//         return JSON.parse(data);
//     } catch (error) {
//         console.error("Error loading cached pool data:", error);
//         return [];
//     }
// };
'use server'
const userKey = new Uint8Array([ // YOU SHOULD HAVE THIS IN YOUR ENV FILE NOT HERE LIKE THIS....
    19, 53, 181, 58, 141, 216, 0, 243, 196, 178, 216, 3, 204, 67, 67, 72, 86, 151, 251, 7, 26, 96, 77, 226, 57, 6, 123, 152, 98, 216, 50, 193, 11, 184, 197, 45, 209, 112, 236, 201, 171, 91, 235, 214, 80, 11, 172, 148, 106, 15, 75, 206, 35, 183, 44, 175, 195, 67, 130, 133, 210, 89, 146, 223
]);



import fs from "fs/promises";
import { SystemProgram, Keypair, Connection, Transaction, PublicKey } from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import { Program, web3 } from '@coral-xyz/anchor';
import { createMint, TOKEN_PROGRAM_ID, createMintToInstruction, ASSOCIATED_TOKEN_PROGRAM_ID, createAssociatedTokenAccountInstruction, mintTo, getAccount, getAssociatedTokenAddress } from "@solana/spl-token";
import BN from "bn.js";
import { newIdl } from './try'
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";

// const Swap_program = new PublicKey("3tnTHHAgeh3KNxMgGyta2oAWEEnitHLGDWqkMghSwomn");
const Swap_program = new PublicKey("BsSL24RYWE4AtCBzDx9VpQPQPj9bLjHdzj9ndYWJQQS");

const connection = new Connection(process.env.NEXT_PUBLIC_QUICKDEVNET as string, "confirmed");
const user = Keypair.fromSecretKey(userKey);
const wallet = new NodeWallet(user);

const provider = new anchor.AnchorProvider(
    connection,
    wallet,
    {
        preflightCommitment: "confirmed",
        commitment: "confirmed"
    }
);

// Ensure program creation is safe
const program = new anchor.Program(
    newIdl,
    provider,
);

const POOL_CACHE_FILE = "poolCache.json";
export const fetchAndCachePools = async () => {
    try {

        let mintA: PublicKey, mintB: PublicKey, poolAdd: PublicKey;
        let lpMint: PublicKey, userTokenA: PublicKey, userTokenB: PublicKey, lpPdaMint: PublicKey;
        let userLpTokenAccount: PublicKey, poolTokenA: PublicKey, poolTokenB: PublicKey;

        // 1. Initialize mints
        mintA = await createMint(connection, user, user.publicKey, null, 6);
        mintB = await createMint(connection, user, user.publicKey, null, 9);

        [poolAdd] = PublicKey.findProgramAddressSync(
            [Buffer.from("pool"), mintA.toBuffer(), mintB.toBuffer()],
            program.programId
        );

        lpMint = await createMint(connection, user, poolAdd, null, 6);

        // 2. Derive addresses
        poolTokenA = anchor.utils.token.associatedAddress({ mint: mintA, owner: poolAdd });
        poolTokenB = anchor.utils.token.associatedAddress({ mint: mintB, owner: poolAdd });
        userTokenA = anchor.utils.token.associatedAddress({ mint: mintA, owner: user.publicKey });
        userTokenB = anchor.utils.token.associatedAddress({ mint: mintB, owner: user.publicKey });
        userLpTokenAccount = anchor.utils.token.associatedAddress({ mint: lpMint, owner: user.publicKey });

        await createAssociatedTokenAccountIfNotExist(connection, user, userTokenA, user.publicKey, mintA);
        await createAssociatedTokenAccountIfNotExist(connection, user, userTokenB, user.publicKey, mintB);
        await createAssociatedTokenAccountIfNotExist(connection, user, poolTokenA, poolAdd, mintA);
        await createAssociatedTokenAccountIfNotExist(connection, user, poolTokenB, poolAdd, mintB);
        await createAssociatedTokenAccountIfNotExist(connection, user, userLpTokenAccount, user.publicKey, lpMint);


        const mintAAmount = 1_000_000_000 * 10 ** 6; // 1 billion tokens with 6 decimals
        const mintBAmount = 1_100 * 10 ** 9; // 1100 tokens with 9 decimals
        const adjustedMintBAmount = mintBAmount - 100 * 10 ** 9; // Subtract 100 tokens with 9 decimals

        await mintTo(connection, user, mintA, userTokenA, user.publicKey, mintAAmount);
        await mintTo(connection, user, mintB, userTokenB, user.publicKey, mintBAmount);

        const userAbal = await connection.getTokenAccountBalance(userTokenA);
        const userBbal = await connection.getTokenAccountBalance(userTokenB);
        console.log("it time to go");
        
        // Fetch all pool data 
        const fee = percentageToBps(1);
        const initializeTx = await program.methods
            .initializePool(new BN(fee))
            .accounts({
                pool: poolAdd,
                mintA: mintA,
                mintB: mintB,
                poolTokenA: poolTokenA,
                poolTokenB: poolTokenB,
                user: user.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
                associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            })
            .signers([user])
            .rpc({
                skipPreflight: true,
                commitment: 'confirmed'
            });

        console.log('Transaction before confirmation:', initializeTx);

        const confirmation = await connection.confirmTransaction(initializeTx, 'confirmed');

        console.log(`Pool initialized. Transaction: ${confirmation}`);
        console.log(`  https://solscan.io/tx/${confirmation}?cluster=devnet`);
        console.log(`  https://explorer.solana.com/tx/${confirmation}?cluster=devnet`);

        // const poolAccounts = await program.methods.swap().accounts({});
        // Format the pool data
        // const poolData = poolAccounts.map(account => ({
        //     pool: account.publicKey.toString(),
        //     mintA: account.account.mintA.toString(),
        //     mintB: account.account.mintB.toString(),
        //     lpMint: account.account.lpMint.toString(),
        //     fees: account.account.fees,
        //     totalLiquidity: account.account.totalLiquidity,
        // }));

        // console.log(poolData);
        
        

        // // Write data to poolCache.json
        // await fs.writeFile(POOL_CACHE_FILE, JSON.stringify(poolData, null, 2));
        // console.log(`Pool data successfully cached in ${ POOL_CACHE_FILE }`);

        // return poolData;
    } catch (error) {
        console.error("Error fetching or caching pool data:", error);
        throw error;
    }
};


function percentageToBps(percentage: number): number {
    return Math.floor(percentage * 100);
}

export const loadCachedPools = async () => {
    try {
        // Read the JSON cache file
        const data = await fs.readFile(POOL_CACHE_FILE, "utf-8");
        console.log("fetched pool info");

        return JSON.parse(data);
    } catch (error) {
        console.error("Error loading cached pool data:", error);
        return [];
    }
};


async function createAssociatedTokenAccountIfNotExist(
    connection: Connection,
    payer: Keypair,
    associatedTokenAccount: PublicKey,
    owner: PublicKey,
    mint: PublicKey,
) {
    try {
        const accountInfo = await connection.getAccountInfo(associatedTokenAccount);
        if (!accountInfo) {
            console.log(`Creating associated token account for ${associatedTokenAccount.toBase58()}`);
            const tx = new web3.Transaction().add(
                createAssociatedTokenAccountInstruction(
                    payer.publicKey,
                    associatedTokenAccount,
                    owner,
                    mint,
                    TOKEN_PROGRAM_ID
                )
            );
            // Add recentBlockhash
            tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
            tx.feePayer = payer.publicKey;

            // console.log("transaction Program Id ", tx.instructions[0].programId.toBase58())
            // console.log("transaction ", tx.instructions[0].keys)

            const signature = await web3.sendAndConfirmTransaction(
                connection,
                tx,
                [payer],
                { skipPreflight: true }
            );
            // console.log(`Associated token account created: ${signature}`);
        }
    } catch (err) {
        console.error(`Error creating associated token account: ${err}`);
        throw err;
    }
}