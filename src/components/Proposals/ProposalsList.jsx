"use client";

import { useRouter } from "next/navigation";

export const ProposalsList = ({ list }) => {
  const router = useRouter();

  const viewProposal = (proposalId) => {
    // Perform any necessary logic before navigating to the proposal
    router.push(`/proposals/${proposalId}`);
  };

  return (
    <div className="mt-6 overflow-hidden border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <table className="w-full text-left">
            <tbody>
              {list.map((item) => (
                <tr
                  className="cursor-pointer"
                  key={item.id}
                  onClick={() => viewProposal(item.uuid)}
                >
                  <td className="relative py-5 pr-6">
                    <div className="flex gap-x-6">
                      <div className="flex-auto">
                        <div className="">
                          <div className="flex leading-8 text-xs text-gray-500">
                            Proposed by {item.proposer_addr}
                          </div>
                          <div className="text-md font-bold leading-4 text-gray-600">
                            <h2>{item.description.substring(0, 30)}</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                    <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                  </td>
                  <td className="hidden py-5 pr-6 sm:table-cell">
                    <div className="text-sm leading-6 text-gray-900">
                      {item.status}
                    </div>
                    <div className="mt-1 justify-center leading-5 text-gray-500">
                      <div className="flex text-xs">Requesting</div>
                      <div className="mt-1 leading-5 text-gray-500">
                        37.5 ETH
                      </div>
                    </div>
                  </td>
                  <td className="py-5 text-right">
                    <div className="flex text-xs justify-end">Voting</div>
                    <div className="mt-1 leading-5 text-gray-500">
                      Starts in 5 days
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProposalsList;
