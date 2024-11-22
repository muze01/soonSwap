import { Idl } from "@coral-xyz/anchor"

export const newIdl: Idl = {
    // "version": "0.1.0",
    // "name": "soonswap",
    metadata: {
        name: "soonswap",
        version: "0.1.0",
        spec: "0.1.0"
    },
    "instructions": [
        {
            "name": "initializePool",
            "accounts": [
                {
                    "name": "pool",
                    "writable": true,
                    "signer": false
                },
                {
                    "name": "mintA",
                    "writable": false,
                    "signer": false
                },
                {
                    "name": "mintB",
                    "writable": false,
                    "signer": false
                },
                {
                    "name": "poolTokenA",
                    "writable": true,
                    "signer": false
                },
                {
                    "name": "poolTokenB",
                    "writable": true,
                    "signer": false
                },
                {
                    "name": "user",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "systemProgram",
                    "writable": false,
                    "signer": false
                },
                {
                    "name": "tokenProgram",
                    "writable": false,
                    "signer": false
                },
                {
                    "name": "associatedTokenProgram",
                    "writable": false,
                    "signer": false
                },
                {
                    "name": "rent",
                    "writable": false,
                    "signer": false
                }
            ],
            "args": [
                {
                    "name": "fee",
                    "type": "u64"
                }
            ],
            discriminator: []
        },
        {
            "name": "swap",
            "accounts": [
                {
                    "name": "feeCollector",
                    "writable": true,
                    "signer": false
                },
                {
                    "name": "pool",
                    "writable": true,
                    "signer": false
                },
                {
                    "name": "mintA",
                    "writable": true,
                    "signer": false
                },
                {
                    "name": "mintB",
                    "writable": true,
                    "signer": false
                },
                {
                    "name": "poolTokenAAta",
                    "writable": true,
                    "signer": false
                },
                {
                    "name": "poolTokenBAta",
                    "writable": true,
                    "signer": false
                },
                {
                    "name": "userTokenAAta",
                    "writable": true,
                    "signer": false
                },
                {
                    "name": "userTokenBAta",
                    "writable": true,
                    "signer": false
                },
                {
                    "name": "user",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "rent",
                    "writable": false,
                    "signer": false
                },
                {
                    "name": "systemProgram",
                    "writable": false,
                    "signer": false
                },
                {
                    "name": "tokenProgram",
                    "writable": false,
                    "signer": false
                },
                {
                    "name": "associatedTokenProgram",
                    "writable": false,
                    "signer": false
                }
            ],
            "args": [
                {
                    "name": "swapInstructionData",
                    "type": "bytes"
                }
            ],
            discriminator: []
        },
        {
            "name": "addLiquidity",
            "accounts": [
                {
                    "name": "pool",
                    "writable": true,
                    "signer": false
                },
                {
                    "name": "mintA",
                    "writable": true,
                    "signer": false
                },
                {
                    "name": "mintB",
                    "writable": true,
                    "signer": false
                },
                {
                    "name": "userTokenA",
                    "writable": true,
                    "signer": false
                },
                {
                    "name": "userTokenB",
                    "writable": true,
                    "signer": false
                },
                {
                    "name": "poolTokenA",
                    "writable": true,
                    "signer": false
                },
                {
                    "name": "poolTokenB",
                    "writable": true,
                    "signer": false
                },
                {
                    "name": "lpMint",
                    "writable": true,
                    "signer": false
                },
                {
                    "name": "userLpTokenAccount",
                    "writable": true,
                    "signer": false
                },
                {
                    "name": "user",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "systemProgram",
                    "writable": false,
                    "signer": false
                },
                {
                    "name": "tokenProgram",
                    "writable": false,
                    "signer": false
                },
                {
                    "name": "associatedTokenProgram",
                    "writable": false,
                    "signer": false
                },
                {
                    "name": "rent",
                    "writable": false,
                    "signer": false
                }
            ],
            "args": [
                {
                    "name": "amountOne",
                    "type": "u64"
                },
                {
                    "name": "amountTwo",
                    "type": "u64"
                }
            ],
            discriminator: []
        },
        {
            "name": "removeLiquidity",
            "accounts": [
                {
                    "name": "pool",
                    "writable": true,
                    "signer": false
                },
                {
                    "name": "mintA",
                    "writable": true,
                    "signer": false
                },
                {
                    "name": "mintB",
                    "writable": true,
                    "signer": false
                },
                {
                    "name": "poolTokenA",
                    "writable": true,
                    "signer": false
                },
                {
                    "name": "poolTokenB",
                    "writable": true,
                    "signer": false
                },
                {
                    "name": "lpMint",
                    "writable": true,
                    "signer": false
                },
                {
                    "name": "userTokenA",
                    "writable": true,
                    "signer": false
                },
                {
                    "name": "userTokenB",
                    "writable": true,
                    "signer": false
                },
                {
                    "name": "userLpTokenAccount",
                    "writable": true,
                    "signer": false
                },
                {
                    "name": "user",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "tokenProgram",
                    "writable": false,
                    "signer": false
                },
                {
                    "name": "systemProgram",
                    "writable": false,
                    "signer": false
                },
                {
                    "name": "associatedTokenProgram",
                    "writable": false,
                    "signer": false
                },
                {
                    "name": "rent",
                    "writable": false,
                    "signer": false
                }
            ],
            "args": [
                {
                    "name": "liquidity",
                    "type": "u64"
                }
            ],
            discriminator: []
        }
    ],
    "accounts": [
        {
            "name": "PoolInfo",
            discriminator: []
        }
    ],
    "types": [
        {
            "name": "SwapInstructionData",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "amount",
                        "type": "u64"
                    },
                    {
                        "name": "slippage",
                        "type": "u64"
                    },
                    {
                        "name": "isBuy",
                        "type": "bool"
                    }
                ]
            }
        },
        {
            name: "poolInfo",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "pool",
                        type: "pubkey"
                    },
                    {
                        name: "mintA",
                        type: "pubkey"
                    },
                    {
                        name: "mintB",
                        type: "pubkey"
                    },
                    {
                        name: "lpMint",
                        type: "pubkey"
                    },
                    {
                        name: "fees",
                        type: "u64"
                    },
                    {
                        name: "totalLiquidity",
                        type: "u128"
                    }
                ]
            }
        }
    ],
    "errors": [
        {
            "code": 6000,
            "name": "MinPoolBalanceReached"
        },
        {
            "code": 6001,
            "name": "InsufficientLiquidity"
        },
        {
            "code": 6002,
            "name": "ConstantProductInvariantViolated"
        },
        {
            "code": 6003,
            "name": "ZeroReserve"
        },
        {
            "code": 6004,
            "name": "PoolFrozen"
        },
        {
            "code": 6005,
            "name": "InsufficientFunds"
        },
        {
            "code": 6006,
            "name": "InsufficientOutputAmount"
        },
        {
            "code": 6007,
            "name": "InvalidDecimals"
        },
        {
            "code": 6008,
            "name": "EmptyInstructionData"
        },
        {
            "code": 6009,
            "name": "InvalidInstruction"
        },
        {
            "code": 6010,
            "name": "InvalidInstructionLength"
        },
        {
            "code": 6011,
            "name": "ArithmeticOverflow"
        },
        {
            "code": 6012,
            "name": "InvalidCalculatedAmount"
        },
        {
            "code": 6013,
            "name": "InsufficientPoolTokenA"
        },
        {
            "code": 6014,
            "name": "InsufficientPoolTokenB"
        },
        {
            "code": 6015,
            "name": "InsufficientSolBalance"
        },
        {
            "code": 6016,
            "name": "InvalidSolAmount"
        },
        {
            "code": 6017,
            "name": "SolAmountTooMuch"
        },
        {
            "code": 6018,
            "name": "TokenInfoNotFound"
        },
        {
            "code": 6019,
            "name": "IntegerOverflowMinOutputAmount"
        },
        {
            "code": 6020,
            "name": "IntegerOverflowSlippageValue"
        },
        {
            "code": 6021,
            "name": "IntegerOverflowNetOutputAmount"
        },
        {
            "code": 6022,
            "name": "IntegerOverflowNewOutputReserve"
        },
        {
            "code": 6023,
            "name": "OverflowRemoveLiquidityA"
        },
        {
            "code": 6024,
            "name": "OverflowRemoveLiquidityB"
        },
        {
            "code": 6025,
            "name": "IntegerOverflowK"
        },
        {
            "code": 6026,
            "name": "InvalidSwapAmount"
        },
        {
            "code": 6027,
            "name": "IntegerOverflowFeeAmount"
        },
        {
            "code": 6028,
            "name": "FeeTooHigh"
        },
        {
            "code": 6029,
            "name": "IntegerOverflowNetInput"
        },
        {
            "code": 6030,
            "name": "IntegerOverflowNewInputReserve"
        },
        {
            "code": 6031,
            "name": "OutputAmountTooMuch"
        },
        {
            "code": 6032,
            "name": "IntegerOverflow"
        },
        {
            "code": 6033,
            "name": "IntegerOverflow11"
        },
        {
            "code": 6034,
            "name": "IntegerOverflow12"
        },
        {
            "code": 6035,
            "name": "InvalidSlippageValue"
        },
        {
            "code": 6036,
            "name": "UserAccountNotBalanced"
        },
        {
            "code": 6037,
            "name": "TokenAmountTooMuch"
        },
        {
            "code": 6038,
            "name": "InvalidAmount"
        },
        {
            "code": 6039,
            "name": "InsufficientTokenABalance"
        },
        {
            "code": 6040,
            "name": "InsufficientLPTokens"
        },
        {
            "code": 6041,
            "name": "InsufficientTokenBBalance"
        },
        {
            "code": 6042,
            "name": "Unauthorized"
        },
        {
            "code": 6043,
            "name": "Overflow"
        },
        {
            "code": 6044,
            "name": "InsufficientTokenB"
        },
        {
            "code": 6045,
            "name": "InvalidLPMint",
            "msg": "Invalid LP mint account"
        },
        {
            "code": 6046,
            "name": "InvalidPoolTokenA",
            "msg": "Invalid Pool Token A account"
        },
        {
            "code": 6047,
            "name": "InvalidPoolTokenB",
            "msg": "Invalid Pool Token B account"
        },
        {
            "code": 6048,
            "name": "InvalidPoolTokenAOwner",
            "msg": "Invalid Pool Token A owner"
        },
        {
            "code": 6049,
            "name": "InvalidPoolTokenBOwner",
            "msg": "Invalid Pool Token B owner"
        },
        {
            "code": 6050,
            "name": "InvalidUserTokenA",
            "msg": "Invalid User Token A account"
        },
        {
            "code": 6051,
            "name": "InvalidUserTokenB",
            "msg": "Invalid User Token B account"
        },
        {
            "code": 6052,
            "name": "InvalidUserLPOwner",
            "msg": "Invalid User LP Token account owner"
        },
        {
            "code": 6053,
            "name": "InvalidUserLPMint",
            "msg": "Invalid User LP Token mint"
        },
        {
            "code": 6054,
            "name": "InvalidUserTokenAMint"
        },
        {
            "code": 6055,
            "name": "InvalidUserTokenBMint"
        },
        {
            "code": 6056,
            "name": "SameTokenPool"
        },
        {
            "code": 6057,
            "name": "InvalidTokenOrder"
        }
    ],
    address: "BsSL24RYWE4AtCBzDx9VpQPQPj9bLjHdzj9ndYWJQQS"
}