export type SpecialProgrammeVisibility = "private" | "public";

export type RatingBand =
| "Excellent"
| "Very Good"
| "Good"
| "Fair"
| "Needs Improvement";

export type ReportStatus =
| "draft"
| "pending-review"
| "approved"
| "published";

export type ReportVisibility = "private" | "public";

export type ReportType =
| "service"
| "weekly"
| "monthly"
| "special-programme";

export type ServiceType =
| "sunday-business"
| "sunday-celebration"
| "wednesday-mc-live"
| "wednesday-wow";

export type ReportingPeriod =
| "this-week"
| "this-month"
| "last-month"
| "custom";

export interface ServiceDefinition {
id: ServiceType;
name: string;
shortName: string;
day: string;
time: string;
description: string;
}

export interface ReportSummary {
approvedAverageRating: number | null;
checklistCompletionPercentage: number | null;
completedAssessments: number;
pendingAssessments: number;
}

export interface ReportHighlight {
id: string;
title: string;
description: string;
category?: string;
}

export interface ServiceReport {
id: string;
title: string;
reportType: ReportType;
serviceType?: ServiceType;
serviceOccurrenceId?: string;
date: string;
periodStart?: string;
periodEnd?: string;
status: ReportStatus;
visibility: ReportVisibility;
summary: ReportSummary;
highlights: ReportHighlight[];
approvedPublicSummary?: string;
sourceAssessmentIds: string[];
sourceChecklistSubmissionIds: string[];
}


export type SpecialProgrammeStatus =
  | "draft"
  | "pending_review"
  | "approved"
  | "published";


export interface SpecialProgramme {
  id: string;
  title: string;
  slug: string;
  category: string;
  startDate: string;
  endDate: string;
  description: string;
  venue: string;
  status: SpecialProgrammeStatus;
  visibility: SpecialProgrammeVisibility;
  reportId?: string | null;
}


export interface RatingBandDefinition {
label: RatingBand;
minimum: number;
maximum: number;
description: string;
color: string;
background: string;
}

export interface CameraCriterion {
id: string;
label: string;
description: string;
}

export const CHURCH_TIMEZONE = "Africa/Lagos";

export const CHURCH_VENUE =
"Global Harvest Church Maryland, Lagos";

export const serviceDefinitions: ServiceDefinition[] = [
{
  id: "sunday-business",
  name: "Sunday Business Service",
  shortName: "Business Service",
  day: "Sunday",
  time: "8:00 AM",
  description:
    "Weekly assessment and reporting for the Sunday morning business service.",
},
{
  id: "sunday-celebration",
  name: "Sunday Celebration Service",
  shortName: "Celebration Service",
  day: "Sunday",
  time: "10:00 AM",
  description:
    "Weekly assessment and reporting for the Sunday celebration service.",
},
{
  id: "wednesday-mc-live",
  name: "Wednesday Media Service — MC Live",
  shortName: "MC Live",
  day: "Wednesday",
  time: "6:00 PM",
  description:
    "Regular Wednesday media service, except when Worship on Wednesday replaces it.",
},
{
  id: "wednesday-wow",
  name: "Wednesday Media Service — Worship on Wednesday",
  shortName: "Worship on Wednesday",
  day: "Last Wednesday of the month",
  time: "6:00 PM",
  description:
    "Monthly Worship on Wednesday (WOW), replacing the regular MC Live programme.",
},
];

export const cameraCriteria: CameraCriterion[] = [
{
  id: "angle",
  label: "Angle",
  description:
    "Selects camera angles appropriate to the moment and shot.",
},
{
  id: "headroom",
  label: "Headroom",
  description:
    "Maintains appropriate space above the subject's head.",
},
{
  id: "framing",
  label: "Framing",
  description:
    "Positions subjects clearly and appropriately within the frame.",
},
{
  id: "stability",
  label: "Stability",
  description:
    "Maintains steady, controlled shots.",
},
{
  id: "panning",
  label: "Panning",
  description:
    "Uses smooth, deliberate horizontal camera movement.",
},
{
  id: "focus",
  label: "Focus",
  description:
    "Maintains clear and accurate focus on the intended subject.",
},
{
  id: "tracking",
  label: "Tracking",
  description:
    "Follows moving subjects smoothly and consistently.",
},
{
  id: "composition",
  label: "Composition",
  description:
    "Creates balanced, purposeful and visually clear shots.",
},
{
  id: "consistency",
  label: "Consistency",
  description:
    "Maintains dependable technical quality throughout the service.",
},
];

export const ratingBands: RatingBandDefinition[] = [
{
  label: "Excellent",
  minimum: 90,
  maximum: 100,
  description: "Consistently excellent performance.",
  color: "#008A4B",
  background: "#E8F7EF",
},
{
  label: "Very Good",
  minimum: 80,
  maximum: 90,
  description: "Strong performance with minor opportunities to improve.",
  color: "#087F8C",
  background: "#E5F7F8",
},
{
  label: "Good",
  minimum: 70,
  maximum: 80,
  description: "Good performance with identifiable areas for growth.",
  color: "#2366B1",
  background: "#EAF2FF",
},
{
  label: "Fair",
  minimum: 60,
  maximum: 70,
  description: "Developing performance requiring focused improvement.",
  color: "#A76500",
  background: "#FFF4DB",
},
{
  label: "Needs Improvement",
  minimum: 0,
  maximum: 60,
  description: "Additional guidance and improvement are needed.",
  color: "#C2413B",
  background: "#FDECEB",
},
];

/**
* Converts a percentage into its rating band.
*
* The upper bound is exclusive for every band except Excellent,
* which includes 100%. This prevents gaps between rating bands.
*/
export function getRatingBand(
percentage: number,
): RatingBand | null {
if (
  !Number.isFinite(percentage) ||
  percentage < 0 ||
  percentage > 100
) {
  return null;
}

if (percentage >= 90) return "Excellent";
if (percentage >= 80) return "Very Good";
if (percentage >= 70) return "Good";
if (percentage >= 60) return "Fair";

return "Needs Improvement";
}

/**
* Returns a camera score as a percentage.
*
* Each of the nine criteria is scored from 1 to 5.
* All nine criteria must be supplied before a score is calculated.
*/

export function calculateCameraScore(
    scores: Record<string, number | null | undefined>,
  ): {
    total: number;
    maximum: number;
    percentage: number;
    ratingBand: RatingBand;
  } | null {
    const values = cameraCriteria.map(
      (criterion) => scores[criterion.id],
    );
  
    // Validate all scores before calculating the result.
    if (
      values.some(
        (value) =>
          typeof value !== "number" ||
          !Number.isFinite(value) ||
          value < 1 ||
          value > 5,
      )
    ) {
      return null;
    }
  
    const validValues = values as number[];
    const total = validValues.reduce(
      (sum, value) => sum + value,
      0,
    );
  
    const maximum = cameraCriteria.length * 5;
    const percentage = (total / maximum) * 100;
    const ratingBand = getRatingBand(percentage);
  
    if (ratingBand === null) {
      return null;
    }
  
    return {
      total,
      maximum,
      percentage,
      ratingBand,
    };
}
  

/**
* Monthly performance review.
*
* This seven-criterion scorecard is separate from the nine-point
* technical camera assessment and must not be combined with it
* without leadership approval.
*/
export const monthlyPerformanceCriteria: CameraCriterion[] = [
{
  id: "technical-operation",
  label: "Technical Camera Operation",
  description:
    "Demonstrates reliable technical camera operation.",
},
{
  id: "position-consistency",
  label: "Consistency Across Positions",
  description:
    "Maintains quality across assigned camera positions.",
},
{
  id: "camera-adaptability",
  label: "Adaptability Between Cameras",
  description:
    "Adapts effectively to different cameras and responsibilities.",
},
{
  id: "direction-responsiveness",
  label: "Responsiveness to Direction",
  description:
    "Responds promptly and appropriately to direction.",
},
{
  id: "coverage-reliability",
  label: "Service Coverage Reliability",
  description:
    "Provides dependable coverage throughout assigned services.",
},
{
  id: "monthly-improvement",
  label: "Improvement From Previous Month",
  description:
    "Demonstrates progress against previous feedback.",
},
{
  id: "team-collaboration",
  label: "Team Collaboration",
  description:
    "Communicates and works effectively with the media team.",
},
];

/**
* No real assessments or published reports are seeded here.
* These arrays will be populated from the API when it is implemented.
*/
export const developmentReports: ServiceReport[] = [];

export const developmentSpecialProgrammes: SpecialProgramme[] = [];

export const reportStatusLabels: Record<ReportStatus, string> = {
draft: "Draft",
"pending-review": "Pending review",
approved: "Approved",
published: "Published",
};

export const reportTypeLabels: Record<ReportType, string> = {
service: "Service report",
weekly: "Weekly assessment",
monthly: "Monthly review",
"special-programme": "Special programme",
};
