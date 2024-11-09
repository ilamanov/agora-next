import prisma from "@/app/lib/prisma";
import Tenant from "@/lib/tenant/tenant";
import { cache } from "react";
import { IMembershipContract } from "@/lib/contracts/common/interfaces/IMembershipContract";
import { getPublicClient } from "@/lib/viem";
import { TENANT_NAMESPACES } from "@/lib/constants";

async function getVotableSupply({ namespace }: { namespace: string }) {
  switch (namespace) {
    case TENANT_NAMESPACES.OPTIMISM:
      return await prisma.optimismVotableSupply.findFirst({});
    case TENANT_NAMESPACES.ENS:
      return await prisma.ensVotableSupply.findFirst({});
    case TENANT_NAMESPACES.ETHERFI:
      return await prisma.etherfiVotableSupply.findFirst({});
    case TENANT_NAMESPACES.UNISWAP:
      return await prisma.uniswapVotableSupply.findFirst({});
    case TENANT_NAMESPACES.CYBER:
      return await prisma.cyberVotableSupply.findFirst({});
    case TENANT_NAMESPACES.SCROLL:
      return await prisma.scrollVotableSupply.findFirst({});
    case TENANT_NAMESPACES.DERIVE:
      return await prisma.deriveVotableSupply.findFirst({});
    case TENANT_NAMESPACES.PGUILD:
      return await prisma.pguildVotableSupply.findFirst({});
    default:
      throw new Error(`Unknown namespace: ${namespace}`);
  }
}

async function getMetrics() {
  const { namespace, contracts } = Tenant.current();

  try {
    let totalSupply;
    if (contracts.token.isERC20()) {
      totalSupply = await contracts.token.contract.totalSupply();
    } else if (contracts.token.isERC721()) {
      const token = contracts.token.contract as IMembershipContract;
      const publicClient = getPublicClient(contracts.token.chain.id);
      const blockNumber = await publicClient.getBlockNumber();
      totalSupply = await token.getPastTotalSupply(Number(blockNumber) - 1);
    } else {
      totalSupply = 0;
    }

    const votableSupply = await getVotableSupply({ namespace });

    return {
      votableSupply: votableSupply?.votable_supply || "0",
      totalSupply: totalSupply.toString(),
    };
  } catch (e) {
    // Handle prisma errors for new tenants
    return {
      votableSupply: "0",
      totalSupply: "0",
    };
  }
}

export const fetchMetrics = cache(getMetrics);
