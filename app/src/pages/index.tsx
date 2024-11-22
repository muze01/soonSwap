"use client";
import React, { useState, useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import dynamic from "next/dynamic";
import { pool } from '../db/index';
import TokenModal from "../components/TokenModal";
import { GetServerSideProps } from "next";

interface TokenInfo {
  name: string
  time?: number
  image: string
  symbol: string
  poolAta: string
  website: string | null
  poolAddress: string
  twitterLink: string | null
  telegramLink: string | null
  metadataAddress: string
}

interface MintData {
  mint: string
  info: TokenInfo
  time: string | number | null // Adding proper typing for time
}

interface PoolInfo {
  fee: number;
  tvl: number;
  created: string;
}

interface MintData {
  mint: string;
  info: TokenInfo;
}

interface PoolData {
  pool: string;
  info: PoolInfo;
}

interface PageProps {
  mints: MintData[];
  pools: PoolData[];
}

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export default function Page({ mints, pools }: PageProps) {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("swap");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [selectedTokenFrom, setSelectedTokenFrom] = useState<{ mint: string, info: TokenInfo } | null>(null);
  const [selectedTokenTo, setSelectedTokenTo] = useState<{ mint: string, info: TokenInfo } | null>(null);
  const [modalType, setModalType] = useState<'from' | 'to'>('from');


  // Fetch balance whenever connection or public key changes
  useEffect(() => {
    const getInfo = async () => {
      if (connection && publicKey) {
        try {
          const info = await connection.getAccountInfo(publicKey);
          setBalance(info?.lamports ? info.lamports / LAMPORTS_PER_SOL : 0);
        } catch (error) {
          console.error("Failed to fetch account info:", error);
          setBalance(null);
        }
      }
    };

    getInfo();
  }, [connection, publicKey]);


  const handleOpenModal = (type: 'from' | 'to') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleTokenSelect = (mint: string, tokenInfo: TokenInfo) => {
    if (modalType === 'from') {
      setSelectedTokenFrom({ mint, info: tokenInfo });
    } else {
      setSelectedTokenTo({ mint, info: tokenInfo });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0D0A0E] text-white pt-5">
      {/* Header Section */}
      <div className="flex justify-between items-center px-8 py-4 relative">
        <div className="flex items-center">
          <img
            src="/baby-logo.png"
            alt="Baby Swap Logo"
            className="w-10 h-10 mr-2"
          />
          <h1 className="text-pink-300 text-2xl font-bold">Baby Swap</h1>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 w-1/3">
          <div className="flex items-center space-x-2 bg-[#201822] text-white px-4 py-2 rounded-md focus-within:ring-2 focus-within:ring-pink-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-pink-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m1.39-5.39a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search Tokens"
              className="bg-transparent flex-grow text-white placeholder-white-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <a href="/pool" className="text-pink-300 hover:text-white transition">
            Pool
          </a>
          <a href="/stake" className="text-pink-300 hover:text-white transition">
            Stake
          </a>
          <WalletMultiButtonDynamic>
            {publicKey
              ? `${publicKey.toBase58().substring(0, 5)}...`
              : "Connect Wallet"}
          </WalletMultiButtonDynamic>
        </div>
      </div>

      {/* Main Page */}
      <main className="flex justify-center items-center min-h-[100vh]">
        <div className="w-full max-w-md space-y-6 px-4 py-8 rounded-lg shadow-lg">
          <div className="flex justify-between space-x-2">
            <button
              onClick={() => setActiveTab("swap")}
              className={`w-1/3 py-2 rounded-md ${activeTab === "swap" ? "bg-pink-300 text-black" : "bg-gray-700"
                }`}
            >
              Swap
            </button>
            <button
              onClick={() => setActiveTab("createToken")}
              className={`w-1/3 py-2 rounded-md ${activeTab === "createToken" ? "bg-pink-300 text-black" : "bg-gray-700"
                }`}
            >
              Create Token
            </button>
            <button
              onClick={() => setActiveTab("addLiquidity")}
              className={`w-1/3 py-2 rounded-md ${activeTab === "addLiquidity" ? "bg-pink-300 text-black" : "bg-gray-700"
                }`}
            >
              Add Liquidity
            </button>
          </div>

          {activeTab === "swap" && (
            <div className="space-y-4">
              <div className="border border-gray-600 rounded-md p-6">
                <h3 className="text-gray-400 mb-2">From</h3>
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="0"
                    className="bg-transparent text-white flex-grow placeholder-gray-500 focus:outline-none"
                  />
                  <button
                    className="ml-2 px-3 py-1 bg-pink-300 text-black rounded-md flex items-center"
                    onClick={() => handleOpenModal('from')}
                  >
                    {selectedTokenFrom ? (
                      <>
                        {selectedTokenFrom.info.image && (
                          <img
                            src={selectedTokenFrom.info.image}
                            alt={selectedTokenFrom.info.symbol}
                            className="w-4 h-4 rounded-full mr-1"
                          />
                        )}
                        {selectedTokenFrom.info.symbol}
                      </>
                    ) : (
                      "Select Token"
                    )}
                  </button>
                </div>
              </div>

              <div className="border border-gray-600 rounded-md p-6">
                <h3 className="text-gray-400 mb-2">To</h3>
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="0"
                    className="bg-transparent text-white flex-grow placeholder-gray-500 focus:outline-none"
                  />
                  <button
                    className="ml-2 px-3 py-1 bg-pink-300 text-black rounded-md flex items-center"
                    onClick={() => handleOpenModal('to')}
                  >
                    {selectedTokenTo ? (
                      <>
                        {selectedTokenTo.info.image && (
                          <img
                            src={selectedTokenTo.info.image}
                            alt={selectedTokenTo.info.symbol}
                            className="w-4 h-4 rounded-full mr-1"
                          />
                        )}
                        {selectedTokenTo.info.symbol}
                      </>
                    ) : (
                      "Select Token"
                    )}
                  </button>
                </div>
              </div>

              <button className="w-full py-3 bg-pink-300 text-black rounded-md">
                {publicKey ? "Swap" : "Wallet Not Connected"}
              </button>
            </div>
          )}

          {/* Placeholder for other interfaces */}
          {activeTab === "createToken" && (
            <div className="text-center text-gray-400">Create Token Interface</div>
          )}
          {activeTab === "addLiquidity" && (
            <div className="text-center text-gray-400">Add Liquidity Interface</div>
          )}

          <TokenModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onTokenSelect={handleTokenSelect}
            tokens={mints}
          />
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  try {
    console.log('=================😃 connected to db 😃=================');
    const client = await pool.connect();
    const [contracts, poolAdd] = await Promise.all([
      client.query('SELECT * FROM contracts'),
      client.query('SELECT * FROM pools')
    ]);

    console.log('=================😃 Fetched Data from db 😃=================', contracts.rows);
    client.release();
    return {
      props: {
        mints: contracts.rows.map(row => serializeData(row)),
        pools: poolAdd.rows.map(row => serializeData(row))
      },
    };

  } catch (error) {
    console.error('Failed to fetch data:', error);
    return {
      props: {
        mints: [],
        pools: [],
      }
    };
  }
}

function serializeData(obj: any): any {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    // Handle null values
    if (value === null) {
      acc[key] = null;
      return acc;
    }

    // Handle Date objects
    if (value instanceof Date) {
      acc[key] = value.toISOString();
      return acc;
    }

    // Handle nested objects (including JSONB from PostgreSQL)
    if (typeof value === 'object') {
      acc[key] = serializeData(value);
      return acc;
    }

    acc[key] = value;
    return acc;
  }, {} as any);
}