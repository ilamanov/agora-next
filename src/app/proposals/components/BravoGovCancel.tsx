import { Proposal } from "@/app/api/common/proposals/proposal";
import Tenant from "@/lib/tenant/tenant";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { Button } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect } from "react";
import toast from "react-hot-toast";

interface Props {
  proposal: Proposal;
}

export const BravoGovCancel = ({ proposal }: Props) => {
  const { contracts } = Tenant.current();
  const { address } = useAccount();

  const { data: adminAddress, isFetched: isAdminFetched } = useContractRead({
    address: contracts.governor.address as `0x${string}`,
    abi: contracts.governor.abi,
    functionName: "admin",
  });

  const canCancel =
    isAdminFetched &&
    adminAddress?.toString().toLowerCase() === address?.toLowerCase();

  const { data, write } = useContractWrite({
    address: contracts.governor.address as `0x${string}`,
    abi: contracts.governor.abi,
    functionName: "cancel",
    args: [proposal.id],
  });

  const { isLoading, isSuccess, isError, isFetched, error } =
    useWaitForTransaction({
      hash: data?.hash,
    });

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        "Proposal Cancelled. It might take a minute to see the updated status.",
        { duration: 5000 }
      );
    }
    if (isError) {
      toast.error(`Error cancelling proposal ${error?.message}`, {
        duration: 5000,
      });
    }
  }, [isSuccess, isError, error]);

  return (
    <div>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          {!canCancel ? (
            <TooltipTrigger>
              <Button disabled={true} variant="outline">
                Cancel
              </Button>
            </TooltipTrigger>
          ) : (
            <>
              {!isFetched && (
                <Button
                  onClick={() => write?.()}
                  variant="outline"
                  loading={isLoading}
                >
                  Cancel
                </Button>
              )}
            </>
          )}

          <TooltipContent>
            <div className="flex flex-col p-2">
              <div>{"You don't have permission to cancel this proposal."}</div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};