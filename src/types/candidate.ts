export type StageKey = 'applied' | 'screening' | 'interview' | 'offer';

export type StageStatus = 'completed' | 'in_progress' | 'upcoming' | 'skipped';

export type OverallStatus =
  | 'in_review'
  | 'action_required'
  | 'interview_scheduled'
  | 'offer_extended'
  | 'hired'
  | 'archived';

export interface InterviewerInfo {
  name: string;
  role: string;
  avatar: string;
  linkedin?: string;
}

export interface StageMilestone {
  id: string;
  key: StageKey;
  title: string;
  shortTitle: string;
  description: string;
  status: StageStatus;
  date: string;
  completedAt?: string;
  details?: {
    highlight: string;
    bullets: string[];
    score?: string;
    scheduledTime?: string;
    meetingPlatform?: string;
    meetingLink?: string;
    interviewers?: InterviewerInfo[];
  };
}

export interface CandidateRecruiter {
  name: string;
  title: string;
  email: string;
  phone?: string;
  avatar: string;
  sla: string;
  location: string;
  bio?: string;
}

export interface CandidateNextStep {
  title: string;
  description: string;
  expectedTimeframe: string;
  expectedDate?: string;
  responsibleParty: string;
  tips: string[];
}

export type ActionItemType =
  | 'document_upload'
  | 'prep_guide'
  | 'reschedule'
  | 'survey'
  | 'code_assessment';

export interface ActionChecklistItem {
  id: string;
  title: string;
  description: string;
  type: ActionItemType;
  status: 'pending' | 'completed' | 'optional';
  actionLabel: string;
  dueDate?: string;
  meta?: {
    allowedFormats?: string[];
    maxSizeBytes?: number;
    prepUrl?: string;
    prepTopics?: string[];
    uploadedFileName?: string;
    uploadedAt?: string;
    assessmentUrl?: string;
  };
}

export interface NotificationPreferences {
  email: boolean;
  whatsapp: boolean;
  sms: boolean;
  phoneNumber?: string;
  emailAddress?: string;
  frequency: 'instant' | 'daily_digest';
  updatedAt?: string;
}

export interface CandidateOfferDetails {
  roleTitle: string;
  compensationBreakdown: string;
  annualCTC: string;
  equityOrBonus?: string;
  joiningDate: string;
  validTill: string;
  location: string;
  workMode: string;
  benefits: string[];
  offerLetterFileName?: string;
}

export interface CandidateProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  experienceLevel: string;
  location: string;
  appliedDate: string;
  overallStatus: OverallStatus;
  overallStatusLabel: string;
  currentStage: StageKey;
  timeline: StageMilestone[];
  nextStep: CandidateNextStep;
  recruiter: CandidateRecruiter;
  checklist: ActionChecklistItem[];
  notificationPreferences: NotificationPreferences;
  offerDetails?: CandidateOfferDetails;
  tags: string[];
  aiSummary: string;
  frequentlyAsked: Array<{ q: string; a: string }>;
}

export interface CandidateApiResponse {
  success: boolean;
  candidate?: CandidateProfile;
  error?: string;
  message?: string;
}

export interface RescheduleRequestBody {
  candidateId: string;
  preferredDate: string;
  preferredTimeSlot: string;
  reason: string;
  note?: string;
}

export interface NotificationUpdateRequestBody {
  candidateId: string;
  preferences: Partial<NotificationPreferences>;
}

export interface DocumentUploadRequestBody {
  candidateId: string;
  actionId: string;
  fileName: string;
  fileSize: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  suggestedQuestions?: string[];
}

