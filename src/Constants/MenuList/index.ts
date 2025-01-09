const MilestoneStatusList = [
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Review", value: "IN_REVIEW" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Stop", value: "STOP" },
  { label: "Rework", value: "REWORK" },
  { label: "Force Close", value: "FORCE_CLOSED" },
  { label: "Ready", value: "INIT" },
];

const getFilteredStatusList = (userRole: any, currentStatus: any, mileStoneType: any) => {
  const allowedStatus: any = {
    PURCHASER: ["INIT","COMPLETED", "REWORK", "STOP"],
    PROVIDER: mileStoneType == "submilestone" ? ["COMPLETED", "REWORK", "STOP","INIT"] : ["IN_PROGRESS", "IN_REVIEW"],
    CP: mileStoneType == "submilestone" ? ["COMPLETED", "REWORK", "STOP","INIT"] : ["IN_PROGRESS", "IN_REVIEW"],
    IP: ["IN_PROGRESS", "IN_REVIEW"],
  };

  const transitionMap: any = {
    INIT: ["IN_PROGRESS", "COMPLETED", "STOP", "FORCE_CLOSED"],
    IN_PROGRESS: ["IN_REVIEW", "COMPLETED", "FORCE_CLOSED"],
    IN_REVIEW: ["REWORK", "COMPLETED", "FORCE_CLOSED"],
    REWORK: ["IN_PROGRESS", "COMPLETED", "FORCE_CLOSED"],
    STOP: ["INIT"],
  };

  const validStatus = allowedStatus[userRole] || [];
  const allowedTransitions = transitionMap[currentStatus] || [];

  return MilestoneStatusList.filter((status) => {
    return validStatus.includes(status.value) && allowedTransitions.includes(status.value);
  });
}

const milestoneStatus: any = {
  INIT: 'Ready',
  IN_PROGRESS: 'In Progress',
  IN_REVIEW: 'Review',
  REWORK: 'Rework',
  COMPLETED: 'Completed',
  STOP: 'Stop',
  FORCE_CLOSED: 'Force Close',
  HOLD: 'Hold',
};
const projectStatus: any = {
  INIT: 'Ready',
  ASSIGNED: 'Assigned',
  UNASSIGNED: 'Unassigned',
  IN_PROGRESS: 'In Progress',
  IN_REVIEW: 'Review',
  REWORK: 'Rework',
  COMPLETE: 'Completed',
  STOP: 'Stop',
  FORCE_CLOSED: 'Force Close',
  HOLD: 'Hold',
};
const ShowActiveFlow: any = {
  "Connect with Individual Provider": "Connected With Individual Provider",
  "Connect with Purchaser": "Connected With Purchaser",
};
const getLabelForPenalty = (i: any) => {
  const mapping: any = {
    1: 'first',
    2: 'second',
    3: 'third',
    4: 'fourth',
    5: 'fifth',
    6: 'sixth',
    7: 'seventh',
    8: 'eighth',
    9: 'nineth',
    10: 'tenth',
  };
  return mapping[i] || ''
};

export {
  MilestoneStatusList,
  milestoneStatus,
  projectStatus,
  ShowActiveFlow,
  getLabelForPenalty,
  getFilteredStatusList,
}
