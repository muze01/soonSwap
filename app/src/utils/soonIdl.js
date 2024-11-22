/**
 * Represents the structure for Soonswap configuration
 * @typedef {Object} Soonswap
 * @property {string} version - The version of the configuration.
 * @property {string} name - The name of the configuration.
 * @property {Array.<Instruction>} instructions - List of instructions.
 */

/**
 * Represents an instruction in the Soonswap configuration.
 * @typedef {Object} Instruction
 * @property {string} name - The name of the instruction.
 * @property {Array.<Account>} accounts - List of accounts involved in the instruction.
 * @property {Array.<Argument>} args - List of arguments for the instruction.
 */

/**
 * Represents an account used in an instruction.
 * @typedef {Object} Account
 * @property {string} name - The name of the account.
 * @property {boolean} isMut - Indicates if the account is mutable.
 * @property {boolean} isSigner - Indicates if the account must sign the transaction.
 */

const Soonswap = {
    version: "0.1.0",
    name: "soonswap",
    instructions: [
        {
            name: "initializePool",
            accounts: [
                { name: "pool", isMut: true, isSigner: false },
                { name: "mintA", isMut: false, isSigner: false },
                { name: "mintB", isMut: false, isSigner: false },
                { name: "poolTokenA", isMut: true, isSigner: false },
                { name: "poolTokenB", isMut: true, isSigner: false },
                { name: "user", isMut: true, isSigner: true },
                { name: "systemProgram", isMut: false, isSigner: false },
                { name: "tokenProgram", isMut: false, isSigner: false },
                { name: "associatedTokenProgram", isMut: false, isSigner: false },
                { name: "rent", isMut: false, isSigner: false },
            ],
            args: [
                { name: "fee", type: "u64" },
            ],
        },
        ,
        {
            "name": "swap",
            "accounts": [
                {
                    "name": "feeCollector",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "pool",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "mintA",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "mintB",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "poolTokenAAta",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "poolTokenBAta",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "userTokenAAta",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "userTokenBAta",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "user",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "associatedTokenProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "swap",
                    "type": {
                        "defined": "SwapInstructionData"
                    }
                }
            ]
        },
        {
            "name": "addLiquidity",
            "accounts": [
                {
                    "name": "pool",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "mintA",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "mintB",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "userTokenA",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "userTokenB",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "poolTokenA",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "poolTokenB",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "lpMint",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "userLpTokenAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "user",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "associatedTokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
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
            ]
        },
        {
            "name": "removeLiquidity",
            "accounts": [
                {
                    "name": "pool",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "mintA",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "mintB",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "poolTokenA",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "poolTokenB",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "lpMint",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "userTokenA",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "userTokenB",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "userLpTokenAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "user",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "associatedTokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "liquidity",
                    "type": "u64"
                }
            ]
        }
    ],
    accounts: [
        {
            name: "poolInfo",
            type: {
                kind: "struct",
                fields: [
                    { name: "pool", type: "publicKey" },
                    { name: "mintA", type: "publicKey" },
                    { name: "mintB", type: "publicKey" },
                    { name: "lpMint", type: "publicKey" },
                    { name: "fees", type: "u64" },
                    { name: "totalLiquidity", type: "u128" },
                ],
            },
        },
    ],
    types: [
        {
            name: "SwapInstructionData",
            type: {
                kind: "struct",
                fields: [
                    { name: "amount", type: "u64" },
                    { name: "slippage", type: "u64" },
                    { name: "isBuy", type: "bool" },
                ],
            },
        },
    ],
    errors: [
        { code: 6000, name: "MinPoolBalanceReached" },
        { code: 6001, name: "InsufficientLiquidity" },
        { code: 6002, name: "ConstantProductInvariantViolated" },
        { code: 6003, name: "ZeroReserve" },
        { code: 6004, name: "PoolFrozen" },
        ,
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
}

module.exports = Soonswap; // CommonJS export

/**
 * Represents an account configuration for instructions.
 * @typedef {Object} Account
 * @property {string} name - The name of the account.
 * @property {boolean} isMut - Whether the account is mutable.
 * @property {boolean} isSigner - Whether the account is a signer.
 */

/**
 * Represents an instruction configuration in the IDL.
 * @typedef {Object} Instruction
 * @property {string} name - The name of the instruction.
 * @property {Account[]} accounts - The accounts involved in the instruction.
 */

/**
 * Represents the IDL for a configuration.
 * @typedef {Object} Soonswap
 * @property {string} version - The version of the configuration.
 * @property {string} name - The name of the configuration.
 * @property {Instruction[]} instructions - The list of instructions.
 */

/**
 * Represents the IDL for the Soonswap program.
 * @type {Soonswap}
 */
const IDL = {
    version: "0.1.0",
    name: "soonswap",
    instructions: [
        {
            name: "initializePool",
            accounts: [
                { name: "pool", isMut: true, isSigner: false },
                { name: "mintA", isMut: false, isSigner: false },
                { name: "mintB", isMut: false, isSigner: false },
                { name: "poolTokenA", isMut: true, isSigner: false },
                { name: "poolTokenB", isMut: true, isSigner: false },
                { name: "user", isMut: true, isSigner: true },
                { name: "systemProgram", isMut: false, isSigner: false },
                { name: "tokenProgram", isMut: false, isSigner: false },
                { name: "associatedTokenProgram", isMut: false, isSigner: false },
                { name: "rent", isMut: false, isSigner: false },
            ],
            args: [
                { name: "fee", type: "u64" },
            ],
        },
        ,
        {
            "name": "swap",
            "accounts": [
                {
                    "name": "feeCollector",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "pool",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "mintA",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "mintB",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "poolTokenAAta",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "poolTokenBAta",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "userTokenAAta",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "userTokenBAta",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "user",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "associatedTokenProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "swap",
                    "type": {
                        "defined": "SwapInstructionData"
                    }
                }
            ]
        },
        {
            "name": "addLiquidity",
            "accounts": [
                {
                    "name": "pool",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "mintA",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "mintB",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "userTokenA",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "userTokenB",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "poolTokenA",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "poolTokenB",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "lpMint",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "userLpTokenAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "user",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "associatedTokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
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
            ]
        },
        {
            "name": "removeLiquidity",
            "accounts": [
                {
                    "name": "pool",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "mintA",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "mintB",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "poolTokenA",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "poolTokenB",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "lpMint",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "userTokenA",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "userTokenB",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "userLpTokenAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "user",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "associatedTokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "liquidity",
                    "type": "u64"
                }
            ]
        }
    ],
    accounts: [
        {
            name: "poolInfo",
            type: {
                kind: "struct",
                fields: [
                    { name: "pool", type: "publicKey" },
                    { name: "mintA", type: "publicKey" },
                    { name: "mintB", type: "publicKey" },
                    { name: "lpMint", type: "publicKey" },
                    { name: "fees", type: "u64" },
                    { name: "totalLiquidity", type: "u128" },
                ],
            },
        },
    ],
    types: [
        {
            name: "SwapInstructionData",
            type: {
                kind: "struct",
                fields: [
                    { name: "amount", type: "u64" },
                    { name: "slippage", type: "u64" },
                    { name: "isBuy", type: "bool" },
                ],
            },
        },
    ],
    errors: [
        { code: 6000, name: "MinPoolBalanceReached" },
        { code: 6001, name: "InsufficientLiquidity" },
        { code: 6002, name: "ConstantProductInvariantViolated" },
        { code: 6003, name: "ZeroReserve" },
        { code: 6004, name: "PoolFrozen" },
        ,
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
};

module.exports = { IDL };
