import { HStack, VStack } from "@/components/Layout/Stack";
import TokenAmountDisplay from "@/components/shared/TokenAmountDisplay";
import ProposalStatusDetail from "@/components/Proposals/ProposalStatus/ProposalStatusDetail";

export default function ApprovalProposalCriteria({ proposal }) {
  const proposalData = proposal.proposalData;
  const proposalResults = proposal.proposalResults;
  const proposalSettings = proposalData.proposalSettings;

  return (
    <VStack className="p-4 pb-2 border-t border-line">
      <div className="px-4 border border-line rounded-md">
        <HStack
          justifyContent="justify-between"
          className="text-xs font-semibold text-secondary py-2"
        >
          <div>
            Quorum <TokenAmountDisplay amount={proposal.quorum} />
          </div>
          <div>
            Current <TokenAmountDisplay amount={proposalResults.for} />
          </div>
        </HStack>
        <ProposalStatusDetail
          proposalStatus={proposal.status}
          proposalEndTime={proposal.endTime}
          proposalStartTime={proposal.startTime}
          proposalCancelledTime={proposal.cancelledTime}
          cancelledTransactionHash={proposal.cancelledTransactionHash}
        />
      </div>
      <div className="pt-2 text-xs font-semibold text-secondary">
        {/* {totalVotingPower.toString()} */}
        {proposalSettings.criteria === "TOP_CHOICES" && (
          <p>
            In this top-choices style proposal, the top{" "}
            {proposalSettings.criteriaValue} options will be executed. Voters
            can select up to {proposalSettings.maxApprovals} options. If the
            quorum is not met, no options will be executed.
          </p>
        )}
        {proposalSettings.criteria === "THRESHOLD" && (
          <p>
            In this threshold-based proposal, all options passing the approval
            threshold of{" "}
            <TokenAmountDisplay amount={proposalSettings.criteriaValue} /> votes
            will be executed in order from most to least popular, until the
            total budget of{" "}
            <TokenAmountDisplay amount={proposalSettings.budgetAmount} /> runs
            out. Voters can select up to {proposalSettings.maxApprovals}{" "}
            options. If the quorum is not met, no options will be executed.
          </p>
        )}
      </div>
    </VStack>
  );
}
