
export type ServiceType =
| "BUSINESS"
| "CELEBRATION"
| "MC_LIVE"
| "WOW";

export type ServiceFilter = "ALL" | ServiceType;

export type ReportingPeriod = "weekly" | "monthly" | "custom";

export type ChecklistItemStatus =
| "COMPLETED"
| "NOT_COMPLETED"
| "NOT_APPLICABLE"
| "PENDING_REVIEW";

export type ChecklistItemRecord = {
id: string;
title: string;
requirement?: string;
status: ChecklistItemStatus;
notes?: string;
};

export type ChecklistRecord = {
id: string;
serviceDate: string;
serviceType: ServiceType;
items: ChecklistItemRecord[];
submissionStatus: "SUBMITTED" | "PENDING_REVIEW" | "APPROVED";
submittedAt?: string;
reviewedAt?: string;
reviewedBy?: string;
observations?: string;
};

export type ReportingFilters = {
period: ReportingPeriod;
service: ServiceFilter;
selectedWeek: string;
selectedMonth: string;
startDate: string;
endDate: string;
};
