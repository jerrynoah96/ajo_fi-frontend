export interface ValidatorData {
  validators: {
    id: string;
    owner: string;
    stakedToken: {
      symbol: string;
    };
    totalCreditsAssignedByValidator: string;
    totalStakedAmount: string;
    feePercentage: string;
    userAssignments: {
      user: {
        id: string;
        creditBalance: string;
      };
    }[];
  }[];
} 