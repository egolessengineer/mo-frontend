enum MilestoneStatus {
    INITT, // 0
    INIT, // 1 smart contract will mark it as funded
    IN_PROGRESS, // 2
    IN_REVIEW, // 3
    REWORK, // 4
    COMPLETED, // 5
    STOP, // 6
    FORCE_CLOSED // 7
}

// Function to find the index
const findMilestoneIndex = (statusToFind: string): number => {
    return MilestoneStatus[statusToFind as keyof typeof MilestoneStatus];
}

export {
    findMilestoneIndex
}