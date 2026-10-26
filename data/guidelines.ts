
import type { LucideIcon } from "lucide-react";
import {
  BookOpenCheck,
  ClipboardCheck,
  FileCheck2,
  Gauge,
  HeartHandshake,
  Lightbulb,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

export type GuidelineSectionData = {
  number: string;
  title: string;
  description?: string;
  icon: LucideIcon;
  paragraphs?: string[];
  bullets?: string[];
  criteria?: { title: string; description: string }[];
  closing?: string;
};

export const guidelineSections: GuidelineSectionData[] = [
  {
    number: "01",
    title: "Purpose of the Assessment",
    icon: Lightbulb,
    paragraphs: [
      "The assessment is intended to evaluate the practical skills and competencies required for your media team role, promote consistency and accountability, identify strengths and areas for improvement, encourage continuous learning and collaboration, and help leadership make informed decisions about training, responsibilities, and team development.",
    ],
    closing:
      "The goal is not simply to complete a task, but to grow in competence, character, and service.",
  },
  {
    number: "02",
    title: "Before You Begin",
    icon: BookOpenCheck,
    description:
      "Take a moment to prepare properly before starting your assessment.",
    bullets: [
      "Understand the instructions and requirements for your assigned task.",
      "Review the relevant assessment criteria.",
      "Check the required deliverables and submission format.",
      "Confirm the submission deadline.",
      "Ensure you have the tools, resources, and access needed.",
      "Ask for clarification if any instruction is unclear.",
    ],
    closing:
      "Do not begin an assessment based on assumptions when clarification is available.",
  },
  {
    number: "03",
    title: "Assessment Requirements",
    icon: ClipboardCheck,
    paragraphs: [
      "Every assessment must be completed according to the instructions provided for that task. Depending on your role, you may need to demonstrate practical skills, submit creative work, explain your workflow, respond to scenarios, or complete a combination of activities.",
    ],
    bullets: [
      "The task or exercise to complete.",
      "Required deliverables and supporting materials.",
      "Accepted file formats or submission methods.",
      "Applicable evaluation criteria.",
      "Deadline and any other task-specific conditions.",
    ],
    closing: "Only submit work that is relevant to the assigned assessment.",
  },
  {
    number: "04",
    title: "Quality and Evaluation Standards",
    icon: Gauge,
    description:
      "Submissions will be reviewed against the criteria established for the relevant assessment.",
    criteria: [
      {
        title: "Technical competence",
        description:
          "Use the relevant tools, equipment, or software correctly.",
      },
      {
        title: "Quality of execution",
        description:
          "Deliver work that is clear, accurate, consistent, and complete.",
      },
      {
        title: "Creativity and communication",
        description:
          "Communicate the message effectively and make appropriate creative decisions.",
      },
      {
        title: "Attention to detail",
        description:
          "Follow instructions carefully and check your work before submitting.",
      },
      {
        title: "Reliability and accountability",
        description:
          "Meet stated requirements, follow submission instructions, and communicate challenges promptly.",
      },
      {
        title: "Teamwork and service",
        description:
          "Understand how your contribution supports the wider Media Team and the ministry of the church.",
      },
    ],
    closing:
      "Not every criterion will apply to every role. The criteria attached to your particular assessment will guide your evaluation.",
  },
  {
    number: "05",
    title: "Submission Guidelines",
    icon: FileCheck2,
    description: "Before submitting your work, make sure you:",
    bullets: [
      "Include every required deliverable.",
      "Check that files open correctly and use the requested format.",
      "Follow the naming convention specified in your assessment instructions.",
      "Ensure external file or folder links are accessible to authorized reviewers.",
      "Review your work against the assessment criteria.",
      "Submit through the designated portal or method before the deadline.",
    ],
    closing:
      "Please do not include confidential information or materials you do not have permission to share. A submission is complete only when all required components have been provided.",
  },
  {
    number: "06",
    title: "Deadlines and Communication",
    icon: MessageCircle,
    paragraphs: [
      "All assessment deadlines will be communicated with the relevant task instructions. You are responsible for monitoring your assigned tasks and submitting your work on time.",
    ],
    closing:
      "If you anticipate a delay, encounter a technical problem, or need clarification, contact the designated team lead or assessment coordinator as early as possible. Do not wait until a deadline has passed to report a challenge.",
  },
  {
    number: "07",
    title: "Review and Feedback",
    icon: Sparkles,
    paragraphs: [
      "After submission, your work will be reviewed by the designated assessor or team leadership. Feedback is intended to help you understand your performance and identify practical next steps.",
    ],
    bullets: [
      "What you did well.",
      "Areas where the required standard was met or exceeded.",
      "Specific improvements to make.",
      "Skills or knowledge that may benefit from further development.",
      "Recommended next steps, where applicable.",
    ],
    closing:
      "Please receive feedback with an open mind. If you need clarification, use the designated communication channel.",
  },
  {
    number: "08",
    title: "Integrity and Originality",
    icon: ShieldCheck,
    paragraphs: [
      "All submissions should represent your own work unless collaboration, shared resources, or external assistance is expressly permitted for the task.",
    ],
    bullets: [
      "Be transparent about individual contributions when collaboration is allowed.",
      "Do not copy another person's submission and present it as your own.",
      "Do not misrepresent your experience, contribution, or results.",
    ],
    closing:
      "Integrity is an essential part of serving effectively as a team.",
  },
  {
    number: "09",
    title: "Respect, Confidentiality, and Stewardship",
    icon: HeartHandshake,
    description:
      "Throughout the assessment process, every team member is expected to:",
    bullets: [
      "Treat fellow team members, reviewers, and leadership with respect.",
      "Handle church-related materials and information responsibly.",
      "Respect the privacy of individuals appearing in photographs, videos, and other media.",
      "Follow applicable permissions and guidelines for sharing church content.",
      "Use church equipment, accounts, and resources responsibly.",
      "Maintain a spirit of cooperation, humility, and accountability.",
    ],
  },
];

export const preparationChecklist = [
  "I have read and understood these guidelines.",
  "I have reviewed my assigned assessment instructions.",
  "I have checked the applicable evaluation criteria.",
  "I have confirmed the deadline and submission requirements.",
  "I have prepared the tools and resources I need.",
];
