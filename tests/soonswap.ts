// import { Program, web3 } from "@coral-xyz/anchor";
// import { Soonswap } from "../target/types/soonswap";
// import { assert } from 'chai';
// import { createMint, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, mintTo, getAccount } from '@solana/spl-token';
// import { SystemProgram, Keypair } from '@solana/web3.js';
// import BN from "bn.js";


// describe('add_liquidity', async () => {
//   // Initialize provider and program
//   const provider = anchor.AnchorProvider.env();
//   // const program = new Program(idl, programId, provider);
//   anchor.setProvider(anchor.AnchorProvider.env());

//   const program = anchor.workspace.Soonswap as Program<Soonswap>;

//   // Create keypairs for users and accounts
//   const KEY = new Uint8Array([
//     205, 112, 213, 138, 67, 104, 147, 79, 197, 241, 37, 38, 177, 136, 10, 239, 19, 116, 86, 50, 176, 91, 128, 226, 99, 137, 124, 15, 29, 11, 41, 208, 179, 246, 243, 201, 46, 76, 243, 204, 230, 145, 240, 250, 47, 212, 190, 230, 45, 111, 91, 194, 76, 143, 163, 120, 54, 140, 251, 84, 60, 78, 5, 96
//   ]);
//   const keytwo = new Uint8Array([
//     19, 53, 181, 58, 141, 216, 0, 243, 196, 178, 216, 3, 204, 67, 67, 72, 86, 151, 251, 7, 26, 96, 77, 226, 57, 6, 123, 152, 98, 216, 50, 193, 11, 184, 197, 45, 209, 112, 236, 201, 171, 91, 235, 214, 80, 11, 172, 148, 106, 15, 75, 206, 35, 183, 44, 175, 195, 67, 130, 133, 210, 89, 146, 223
//   ])

//   const user = web3.Keypair.fromSecretKey(keytwo);

//   let mintA: web3.PublicKey;
//   let mintB: web3.PublicKey;
//   let poolAdd: web3.PublicKey;
//   let lpMint: web3.PublicKey;
//   let user_TokenA: web3.PublicKey;
//   let user_TokenB: web3.PublicKey;
//   let userLpTokenAccount: web3.PublicKey;

//   let poolTokenA: web3.PublicKey;
//   let poolTokenB: web3.PublicKey;

//   before(async () => {

//     // Initialize mints and token accounts
//     mintA = await createMint(
//       provider.connection,
//       user,
//       user.publicKey,
//       null,
//       6, // decimals
//     );
//     mintB = await createMint(
//       provider.connection,
//       user,
//       user.publicKey,
//       null,
//       6, // decimals
//     );

//     [poolAdd] = web3.PublicKey.findProgramAddressSync(
//       [Buffer.from("pool"), mintA.toBuffer(), mintB.toBuffer()],
//       program.programId
//     );

//     poolTokenA = anchor.utils.token.associatedAddress({
//       mint: mintA,
//       owner: poolAdd,
//     });

//     poolTokenB = anchor.utils.token.associatedAddress({
//       mint: mintB,
//       owner: poolAdd,
//     });

//     user_TokenA = anchor.utils.token.associatedAddress({
//       mint: mintA,
//       owner: user.publicKey,
//     });

//     user_TokenB = anchor.utils.token.associatedAddress({
//       mint: mintB,
//       owner: user.publicKey,
//     });

//     [lpMint] = web3.PublicKey.findProgramAddressSync(
//       [Buffer.from("poolLP"), mintA.toBuffer(), mintB.toBuffer()],
//       program.programId
//     );

//     userLpTokenAccount = anchor.utils.token.associatedAddress({
//       mint: lpMint,
//       owner: user.publicKey,
//     });

//     // Mint to Token A account
//     await mintTo(
//       provider.connection,
//       user,
//       mintA,
//       user_TokenA,
//       user.publicKey,
//       1000000000 // Adjust amount as needed
//     );

//     // Mint to Token B account
//     await mintTo(
//       provider.connection,
//       user,
//       mintB,
//       user_TokenB,
//       user.publicKey,
//       10000000 // Adjust amount as needed
//     );

//   });


//   it('should initialize the pool if it is the first liquidity addition', async () => {
//     const amountA = new BN(1000000); // Amount for Token A
//     const amountB = new BN(5000000); // Amount for Token B
//     const fee = new BN(10); // Fee in u64 format

//     // Create transaction context
//     const tx = await program.methods
//       .addLiquidity(new BN(amountA), new BN(amountB), fee)
//       .accounts({
//         pool: poolAdd,
//         poolTokenA,
//         poolTokenB,
//         lpMint: lpMint,
//         userTokenA: user_TokenA,
//         userTokenB: user_TokenB,
//         userLpTokenAccount: userLpTokenAccount,
//         mintA: mintA,
//         mintB: mintB,
//         user: user.publicKey,
//         systemProgram: SystemProgram.programId,
//         tokenProgram: TOKEN_PROGRAM_ID,
//         associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
//       })
//       .signers([user])
//       .rpc();

//     console.log('Transaction signature', tx);
//     console.log(`  https://solscan.io/tx/${tx}?cluster=devnet`);
//     console.log(`  https://explorer.solana.com/tx/${tx}?cluster=devnet`);

//     // Fetch and assert pool data (example assertions)
//     const poolData = await program.account.poolInfo.fetch(poolAdd);
//     console.log( "Pool Data", poolData);

//     // assert.equal(poolData.totalLiquidity.toString(), amountA.toString(), 'Total liquidity should match');
//     assert.equal(poolData.mintA.toString(), mintA.toString(), 'Mint A should match');
//     assert.equal(poolData.mintB.toString(), mintB.toString(), 'Mint B should match');
//     // Fetch user's LP token balance and assert
//     const lpBalance = await getAccount(provider.connection, userLpTokenAccount);
//     assert.isTrue(lpBalance.amount > 0, 'User should have received LP tokens');

//     // Fetch the balances of the token accounts
//     const reserveABalance = await provider.connection.getTokenAccountBalance(poolTokenA);
//     const reserveBBalance = await provider.connection.getTokenAccountBalance(poolTokenB);

//     // Parse balances as BigInt for calculations
//     const reserveA = new BN(reserveABalance.value.amount); // Token A reserve
//     const reserveB = new BN(reserveBBalance.value.amount); // Token B reserve

//     // Case 1: Initial liquidity
//     const totalLiquidityBefore = new BN(poolData.totalLiquidity.toString());
//     if (totalLiquidityBefore === new BN(0)) {
//       console.log("Total Liquidity one", totalLiquidityBefore.toString());   

//       assert.equal(
//         poolData.totalLiquidity.toString(),
//         amountA.toString(),
//         'Total liquidity should match initial token A amount'
//       );
//     } else {
//       // Case 2: Subsequent liquidity addition
//       const lpTokensForA = (amountA.mul(totalLiquidityBefore)).div(reserveA);
//       const lpTokensForB = (amountB.mul(totalLiquidityBefore)).div(reserveB);

//       // The actual LP tokens minted are the smaller of the two to maintain balance
//       const lpMinted = lpTokensForA < lpTokensForB ? lpTokensForA : lpTokensForB;

//       const expectedTotalLiquidity = totalLiquidityBefore.add(lpMinted);
//       console.log("Total Liquidity two", totalLiquidityBefore.toString());      

//       assert.equal(
//         poolData.totalLiquidity.toString(),
//         expectedTotalLiquidity.toString(),
//         'Total liquidity should match expected value after adding liquidity'
//       );
//     }
//   });

// it('should transfer tokens correctly and mint LP tokens', async () => {
//   const amountA = new BN(1000000); // Amount for Token A
//   const amountB = new BN(5000000); // Amount for Token B
//   const fee = new BN(10); // Fee in u64 format

//   const tx = await program.methods
//     .addLiquidity(amountA, amountB, fee)
//     .accounts({
//       pool: poolAdd,
//       poolTokenA,
//       poolTokenB,
//       lpMint: lpMint,
//       userTokenA: user_TokenA,
//       userTokenB: user_TokenB,
//       userLpTokenAccount: userLpTokenAccount,
//       mintA: mintA,
//       mintB: mintB,
//       user: user.publicKey,
//       systemProgram: SystemProgram.programId,
//       tokenProgram: TOKEN_PROGRAM_ID,
//       associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
//     })
//     .signers([user])
//     .rpc();


// });

// });
// import * as anchor from "@coral-xyz/anchor";
// import { createMint, TOKEN_PROGRAM_ID, createAssociatedTokenAccountInstruction, ASSOCIATED_TOKEN_PROGRAM_ID, mintTo, getAccount, getAssociatedTokenAddress } from "@solana/spl-token";
// import { Keypair, Connection, PublicKey } from "@solana/web3.js";
// import { Program, web3 } from "@coral-xyz/anchor";
// import { Soonswap } from "../target/types/soonswap";
// // const program = new Program(idl, programId, provider);

// const provider = anchor.AnchorProvider.env();
// anchor.setProvider(anchor.AnchorProvider.env());
// const program = anchor.workspace.Soonswap as Program<Soonswap>;
// import BN from "bn.js";

// const userKey = new Uint8Array([
//     19, 53, 181, 58, 141, 216, 0, 243, 196, 178, 216, 3, 204, 67, 67, 72, 86, 151, 251, 7, 26, 96, 77, 226, 57, 6, 123, 152, 98, 216, 50, 193, 11, 184, 197, 45, 209, 112, 236, 201, 171, 91, 235, 214, 80, 11, 172, 148, 106, 15, 75, 206, 35, 183, 44, 175, 195, 67, 130, 133, 210, 89, 146, 223
// ]);

// const user = Keypair.fromSecretKey(userKey);

// let mintA: PublicKey, mintB: PublicKey, poolAdd: PublicKey;
// let lpMint: PublicKey, userTokenA: PublicKey, userTokenB: PublicKey;
// let userLpTokenAccount: PublicKey, poolTokenA: PublicKey, poolTokenB: PublicKey;

// async function main() {
//   // 1. Initialize mints
//   mintA = await createMint(provider.connection, user, user.publicKey, null, 6);
//   mintB = await createMint(provider.connection, user, user.publicKey, null, 6);
//   console.log(`Created Mint A ${mintA.toBase58()}`);
//   console.log(`Created Mint B ${mintB.toBase58()}`);

//   // 2. Derive addresses
//   poolAdd = PublicKey.findProgramAddressSync(
//     [Buffer.from("pool"), mintA.toBuffer(), mintB.toBuffer()],
//     program.programId
//   )[0];

//   poolTokenA = anchor.utils.token.associatedAddress({ mint: mintA, owner: poolAdd });
//   poolTokenB = anchor.utils.token.associatedAddress({ mint: mintB, owner: poolAdd });

//   userTokenA = anchor.utils.token.associatedAddress({ mint: mintA, owner: provider.wallet.publicKey });
//   userTokenB = anchor.utils.token.associatedAddress({ mint: mintB, owner: provider.wallet.publicKey });

//   lpMint = PublicKey.findProgramAddressSync(
//     [Buffer.from("poolLP"), mintA.toBuffer(), mintB.toBuffer()],
//     program.programId
//   )[0];

//   userLpTokenAccount = anchor.utils.token.associatedAddress({ mint: lpMint, owner: provider.wallet.publicKey });

//   console.log("Derived all addresses");

//   // 3. Mint initial tokens to user
//   await createAssociatedTokenAccountIfNotExist(provider.connection, user, mintA, userTokenA);
//   await createAssociatedTokenAccountIfNotExist(provider.connection, user, mintB, userTokenB);
//   // await createAssociatedTokenAccountIfNotExist(pg.connection, pg.user, lpMint, userLpTokenAccount);

//   await mintTo(provider.connection, user, mintA, userTokenA, user.publicKey, 1000000000000);
//   await mintTo(provider.connection, user, mintB, userTokenB, user.publicKey, 1000000000);

//   console.log("Mints and tokens initialized.");

//   try {

//     // 4. Initialize Pool
//     console.log("Initializing pool...");
//     const initializeTx = await program.methods
//       .initializePool(new BN(1))
//       .accounts({
//         pool: poolAdd,
//         mintA: mintA,
//         mintB: mintB,
//         poolTokenA: poolTokenA,
//         poolTokenB: poolTokenB,
//         user: user.publicKey,
//         systemProgram: anchor.web3.SystemProgram.programId,
//         tokenProgram: TOKEN_PROGRAM_ID,
//       })
//       .signers([user])
//       .rpc({
//         skipPreflight: true,
//         commitment: 'confirmed'
//       });

//     console.log(`Pool initialized. Transaction: ${initializeTx}`);
//     console.log(`  https://solscan.io/tx/${initializeTx}?cluster=devnet`);
//     console.log(`  https://explorer.solana.com/tx/${initializeTx}?cluster=devnet`);

//     // 4. Add liquidity
//     console.log("Add Liquidity To Pool...");
//     const addLiquidityTx = await program.methods
//       .addLiquidity(new BN(1000000000000), new BN(1000000000))
//       .accounts({
//         pool: poolAdd,
//         poolTokenA: poolTokenA,
//         poolTokenB: poolTokenB,
//         lpMint: lpMint,
//         userTokenA: userTokenA,
//         userTokenB: userTokenB,
//         userLpTokenAccount: userLpTokenAccount,
//         mintA: mintA,
//         mintB: mintB,
//         user: user.publicKey,
//         systemProgram: anchor.web3.SystemProgram.programId,
//         tokenProgram: TOKEN_PROGRAM_ID,
//         associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
//       })
//       .signers([user])
//       .rpc({
//         skipPreflight: true,
//         commitment: 'confirmed'
//       });

//     console.log(`Liquidity added. Transaction: ${addLiquidityTx}`);
//     console.log(`  https://solscan.io/tx/${addLiquidityTx}?cluster=devnet`);
//     console.log(`  https://explorer.solana.com/tx/${addLiquidityTx}?cluster=devnet`);

//     // 5. Fetch pool data
//     const poolData = await program.account.poolInfo.fetch(poolAdd);
//     console.log("Pool Data:", poolData);

//     // 6. Fetch user LP token balance
//     const lpBalance = await getAccount(provider.connection, userLpTokenAccount);
//     console.log("User LP Token Balance:", lpBalance.amount);

//     // 7. Fetch pool reserves
//     const reserveABalance = await provider.connection.getTokenAccountBalance(poolTokenA);
//     const reserveBBalance = await provider.connection.getTokenAccountBalance(poolTokenB);

//     console.log("Reserve A:", reserveABalance.value.amount);
//     console.log("Reserve B:", reserveBBalance.value.amount);
//   } catch (error) {
//     console.error("Transaction error:", error);
//     throw error;
//   }
// }

// // Helper function remains the same
// async function createAssociatedTokenAccountIfNotExist(
//   connection: Connection,
//   payer: Keypair,
//   mint: PublicKey,
//   associatedTokenAccount: PublicKey
// ) {
//   try {
//     const accountInfo = await connection.getAccountInfo(associatedTokenAccount);
//     if (!accountInfo) {
//       console.log(`Creating associated token account for ${associatedTokenAccount.toBase58()}`);
//       const tx = new web3.Transaction().add(
//         createAssociatedTokenAccountInstruction(
//           payer.publicKey,
//           associatedTokenAccount,
//           payer.publicKey,
//           mint
//         )
//       );
//       // Add recentBlockhash
//       tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
//       tx.feePayer = payer.publicKey;

//       const signature = await web3.sendAndConfirmTransaction(
//         connection,
//         tx,
//         [payer],
//         { skipPreflight: true }
//       );
//       console.log(`Associated token account created: ${signature}`);
//     }
//   } catch (err) {
//     console.error(`Error creating associated token account: ${err}`);
//     throw err;
//   }
// }

// // Run the main function
// main()
//   .then(() => console.log("Script completed."))
//   .catch((err) => console.error("Error running script:", err));


import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { createMint, mintTo, getAccount, createMintToInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Keypair, PublicKey, Transaction, Connection, SystemProgram } from "@solana/web3.js";
import { Soonswap } from "../target/types/soonswap";
import BN from "bn.js";

describe("Soonswap", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Soonswap as Program<Soonswap>;

  // Keypair for the test user
  const user = Keypair.generate();

  // Variables for tokens, accounts, and pool
  let mintA: PublicKey, mintB: PublicKey;
  let poolAdd: PublicKey, lpMint: PublicKey;
  let userTokenA: PublicKey, userTokenB: PublicKey;
  let userLpTokenAccount: PublicKey, poolTokenA: PublicKey, poolTokenB: PublicKey;


  const userKey = new Uint8Array([
    19, 53, 181, 58, 141, 216, 0, 243, 196, 178, 216, 3, 204, 67, 67, 72, 86, 151, 251, 7, 26, 96, 77, 226, 57, 6, 123, 152, 98, 216, 50, 193, 11, 184, 197, 45, 209, 112, 236, 201, 171, 91, 235, 214, 80, 11, 172, 148, 106, 15, 75, 206, 35, 183, 44, 175, 195, 67, 130, 133, 210, 89, 146, 223
  ]);

  const funder = Keypair.fromSecretKey(userKey);
  // Fund the user account with SOL for transactions
  const transferAmount = 0.5 * anchor.web3.LAMPORTS_PER_SOL; // 1 SOL in lamports
  transferSol(provider.connection, funder, user.publicKey, transferAmount);

  before(async () => {

    // Initialize mints
    mintA = await createMint(provider.connection, user, user.publicKey, null, 6);
    mintB = await createMint(provider.connection, user, user.publicKey, null, 6);

    console.log(`Mint A: ${mintA.toBase58()}`);
    console.log(`Mint B: ${mintB.toBase58()}`);

    // Derive pool and associated addresses
    [poolAdd] = PublicKey.findProgramAddressSync(
      [Buffer.from("pool"), mintA.toBuffer(), mintB.toBuffer()],
      program.programId
    );

    poolTokenA = await getAssociatedTokenAddress(mintA, poolAdd, true);
    poolTokenB = await getAssociatedTokenAddress(mintB, poolAdd, true);

    [lpMint] = PublicKey.findProgramAddressSync(
      [Buffer.from("poolLP"), mintA.toBuffer(), mintB.toBuffer()],
      program.programId
    );

    userTokenA = await getAssociatedTokenAddress(mintA, provider.wallet.publicKey);
    userTokenB = await getAssociatedTokenAddress(mintB, provider.wallet.publicKey);
    userLpTokenAccount = await getAssociatedTokenAddress(lpMint, provider.wallet.publicKey);

    console.log("Derived all addresses.");
  });

  it("Initializes mints and mints tokens to the user", async () => {

    // Mint tokens to user
    await mintTokensManual(provider.connection, mintA, userTokenA, user.publicKey, 1000000000000);
    await mintTokensManual(provider.connection, mintB, userTokenB, user.publicKey, 1000000000);

    const accountA = await getAccount(provider.connection, userTokenA);
    const accountB = await getAccount(provider.connection, userTokenB);

    console.log("User Token A Balance:", accountA.amount.toString());
    console.log("User Token B Balance:", accountB.amount.toString());
  });

  it("Initializes a pool", async () => {
    const tx = await program.methods
      .initializePool(new BN(1))
      .accounts({
        pool: poolAdd,
        mintA: mintA,
        mintB: mintB,
        poolTokenA: poolTokenA,
        poolTokenB: poolTokenB,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc();

    console.log(`Pool initialized: https://explorer.solana.com/tx/${tx}?cluster=devnet`);
  });

  it("Adds liquidity to the pool", async () => {
    const tx = await program.methods
      .addLiquidity(new BN(1000000000000), new BN(1000000000))
      .accounts({
        pool: poolAdd,
        poolTokenA: poolTokenA,
        poolTokenB: poolTokenB,
        lpMint: lpMint,
        userTokenA: userTokenA,
        userTokenB: userTokenB,
        userLpTokenAccount: userLpTokenAccount,
        mintA: mintA,
        mintB: mintB,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      })
      .rpc();

    console.log(`Liquidity added: https://explorer.solana.com/tx/${tx}?cluster=devnet`);

    const lpBalance = await getAccount(provider.connection, userLpTokenAccount);
    console.log("User LP Token Balance:", lpBalance.amount.toString());
  });

  it("Fetches pool reserves", async () => {
    const reserveABalance = await provider.connection.getTokenAccountBalance(poolTokenA);
    const reserveBBalance = await provider.connection.getTokenAccountBalance(poolTokenB);

    console.log("Reserve A:", reserveABalance.value.amount);
    console.log("Reserve B:", reserveBBalance.value.amount);
  });
});


async function mintTokensManual(
  connection,
  mint,
  destination,
  authority,
  amount
) {
  // Create the MintTo instruction
  const mintToInstruction = createMintToInstruction(
    mint,          // The mint account
    destination,   // The destination token account
    authority,     // The mint authority
    amount,        // Amount to mint
    []             // No multisig signers
  );

  // Create a transaction
  const transaction = new Transaction().add(mintToInstruction);

  // Get the latest blockhash for transaction recentBlockhash
  const { blockhash } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = authority;

  // Sign and send the transaction
  const signature = await connection.sendTransaction(transaction, [authority], {
    skipPreflight: true,
    commitment: "confirmed",
  });

  console.log(`Mint transaction successful: ${signature}`);
}

async function transferSol(
  connection: Connection,
  sender: Keypair,       // The sender's Keypair
  recipient: PublicKey,  // The recipient's PublicKey
  amount: number         // Amount in lamports (1 SOL = 1e9 lamports)
): Promise<void> {
  // Create a transaction with the transfer instruction
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: sender.publicKey,
      toPubkey: recipient,
      lamports: amount,
    })
  );

  // Get the latest blockhash for the transaction
  const { blockhash } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = sender.publicKey;

  // Sign and send the transaction
  const signature = await connection.sendTransaction(transaction, [sender], {
    skipPreflight: true,
  });

  console.log(`Transfer successful: ${signature}`);
}