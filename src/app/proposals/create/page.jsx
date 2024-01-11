import { HStack } from "@/components/Layout/Stack";
import InfoPanel from "@/components/Proposals/ProposalCreation/InfoPanel";
import styles from "./styles.module.scss";
import CreateProposalForm from "@/components/Proposals/ProposalCreation/CreateProposalForm";
import { getProposalTypes } from "@/app/api/proposals/getProposals";

async function getProposalSettingsList() {
  "use server";

  return await getProposalTypes();
}

export default async function CreateProposalPage() {
  const proposalSettingsList = await getProposalSettingsList();

  return (
    <HStack
      justifyContent="justify-between"
      gap={16}
      className={styles.create_prop_container}
    >
      <CreateProposalForm proposalSettingsList={proposalSettingsList} />
      <div className={styles.create_prop_right_box}>
        <InfoPanel />
      </div>
    </HStack>
  );
}