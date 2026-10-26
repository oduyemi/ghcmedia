
import type { ChecklistRecord, ServiceType } from "@/types/checklist";
  

  export const services: {
    id: ServiceType;
    name: string;
    schedule: string;
    description: string;
  }[] = [
    {
      id: "BUSINESS",
      name: "Sunday Business Service",
      schedule: "Every Sunday · 8:00 AM",
      description:
        "Review preparation, equipment readiness, and operational checks for the Business Service.",
    },
    {
      id: "CELEBRATION",
      name: "Sunday Celebration Service",
      schedule: "Every Sunday · 10:00 AM",
      description:
        "Monitor checklist completion and consistency across the Celebration Service's media production requirements.",
    },
    {
      id: "MC_LIVE",
      name: "Wednesday Media Service (MC Live)",
      schedule: "Wednesdays · 6:00 PM",
      description:
        "Review records for the regular Wednesday MC Live service.",
    },
    {
      id: "WOW",
      name: "Worship on Wednesday (WOW)",
      schedule: "Last Wednesday of each month",
      description:
        "Review the special monthly Wednesday service that replaces the regular MC Live service.",
    },
  ];
  
  export const serviceFilterOptions = [
    { value: "ALL", label: "All Services" },
    { value: "BUSINESS", label: "Business Service" },
    { value: "CELEBRATION", label: "Celebration Service" },
    { value: "MC_LIVE", label: "MC Live" },
    { value: "WOW", label: "WOW" },
  ] as const;
  
  export const initialChecklistRecords: ChecklistRecord[] = [];
  
  /**
   * Returns the scheduled Wednesday service for a date.
   *
   * The last Wednesday of each month is WOW.
   * Other Wednesdays are MC Live.
   */
  export function getScheduledWednesdayService(
    dateValue: string,
  ): ServiceType | null {
    if (!dateValue) return null;
  
    const date = new Date(`${dateValue}T12:00:00`);
  
    if (Number.isNaN(date.getTime()) || date.getDay() !== 3) {
      return null;
    }
  
    const nextWeek = new Date(date);
    nextWeek.setDate(date.getDate() + 7);
  
    return nextWeek.getMonth() !== date.getMonth()
      ? "WOW"
      : "MC_LIVE";
  }
  
  /**
   * Derives the effective service type for a Wednesday record
   * from its service date. Non-Wednesday services retain their
   * recorded service type.
   */
  export function getEffectiveServiceType(
    record: ChecklistRecord,
  ): ServiceType {
    const scheduledWednesday = getScheduledWednesdayService(
      record.serviceDate,
    );
  
    if (
      scheduledWednesday &&
      (record.serviceType === "MC_LIVE" ||
        record.serviceType === "WOW")
    ) {
      return scheduledWednesday;
    }
  
    return record.serviceType;
  }
  
  export function getServiceName(serviceType: ServiceType): string {
    return (
      services.find((service) => service.id === serviceType)?.name ??
      "Unknown Service"
    );
  }
  
  export function formatServiceDate(dateValue: string): string {
    if (!dateValue) return "Date unavailable";
  
    const date = new Date(`${dateValue}T12:00:00`);
  
    if (Number.isNaN(date.getTime())) return dateValue;
  
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  }
  