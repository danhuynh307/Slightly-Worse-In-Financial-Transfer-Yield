// Showcase content for the Home dashboard. The "Experts you can trust" cards,
// stats, praise feed, trending Q&A, activity and saved prompts are presentation
// data for the hackathon demo — swap each block for a real endpoint later
// (follow the vertical-slice pattern in ExpertsPage / useUsers).

import type { LucideIcon } from "lucide-react";
import {
  FileText,
  Users,
  MessagesSquare,
  Languages,
  Sparkles,
  UserSearch,
  BookOpen,
  CircleHelp,
  Wand2,
  Award,
  Heart,
  MessageSquareText,
} from "lucide-react";

export interface StatItem {
  value: string;
  label: string;
  icon: LucideIcon;
  tint: string; // tailwind classes for the icon chip
}

export const STATS: StatItem[] = [
  { value: "12,847", label: "Documents indexed", icon: FileText, tint: "bg-emerald-50 text-emerald-600" },
  { value: "1,432", label: "Experts in network", icon: Users, tint: "bg-violet-50 text-violet-600" },
  { value: "9,043", label: "Q&A discussions", icon: MessagesSquare, tint: "bg-sky-50 text-sky-600" },
  { value: "342", label: "Acronyms tracked", icon: Languages, tint: "bg-amber-50 text-amber-600" },
  { value: "128", label: "Prompt templates", icon: Sparkles, tint: "bg-rose-50 text-rose-500" },
];

export interface QuickAction {
  label: string;
  icon: LucideIcon;
  to: string;
}

export const QUICK_ACTIONS: QuickAction[] = [
  { label: "Find an expert", icon: UserSearch, to: "/experts" },
  { label: "Search docs", icon: BookOpen, to: "/knowledge" },
  { label: "Acronym translator", icon: Languages, to: "/acronyms" },
  { label: "Ask a question", icon: CircleHelp, to: "/qna" },
  { label: "Explore prompts", icon: Wand2, to: "/prompts" },
];

export interface Expert {
  name: string;
  role: string;
  initials: string;
  avatar: string; // tailwind bg + text for the avatar circle
  tags: string[];
  docs: number;
  answers: number;
  kudos: number;
  replyIn: string;
}

export const EXPERTS: Expert[] = [
  {
    name: "Dan Kessler",
    role: "Platform Engineering",
    initials: "DK",
    avatar: "bg-emerald-500 text-white",
    tags: ["Spring", "Java", "CI/CD"],
    docs: 12,
    answers: 34,
    kudos: 9,
    replyIn: "< 1h",
  },
  {
    name: "Russell Okoye",
    role: "Infrastructure",
    initials: "RO",
    avatar: "bg-sky-600 text-white",
    tags: ["Docker", "Kubernetes", "AWS"],
    docs: 8,
    answers: 28,
    kudos: 6,
    replyIn: "< 2h",
  },
  {
    name: "Leo Tran",
    role: "AppSec",
    initials: "LT",
    avatar: "bg-violet-500 text-white",
    tags: ["Threat Modeling", "OWASP"],
    docs: 7,
    answers: 18,
    kudos: 4,
    replyIn: "< 1h",
  },
  {
    name: "Priya Nair",
    role: "Backend Engineering",
    initials: "PN",
    avatar: "bg-rose-400 text-white",
    tags: ["Spring Boot", "APIs"],
    docs: 10,
    answers: 22,
    kudos: 7,
    replyIn: "< 2h",
  },
  {
    name: "Maya Chen",
    role: "Data Platform",
    initials: "MC",
    avatar: "bg-amber-500 text-white",
    tags: ["Kafka", "Spark", "SQL"],
    docs: 9,
    answers: 25,
    kudos: 5,
    replyIn: "< 3h",
  },
];

export interface ActivityItem {
  who: string;
  action: string;
  detail: string;
  time: string;
  icon: LucideIcon;
  tint: string;
  filter: "Answers" | "Documents" | "Praise" | "Q&A";
}

export const ACTIVITY: ActivityItem[] = [
  {
    who: "Dan Kessler",
    action: "answered a question",
    detail: "How do we deploy a Spring Boot service to Kubernetes?",
    time: "1h ago",
    icon: MessageSquareText,
    tint: "bg-sky-50 text-sky-600",
    filter: "Answers",
  },
  {
    who: "Russell Okoye",
    action: "authored a document",
    detail: "Guide: Blue/Green deployments with Kubernetes",
    time: "3h ago",
    icon: FileText,
    tint: "bg-emerald-50 text-emerald-600",
    filter: "Documents",
  },
  {
    who: "You",
    action: "received praise from Priya Nair",
    detail: "“Great help on the API refactor!”",
    time: "5h ago",
    icon: Heart,
    tint: "bg-rose-50 text-rose-500",
    filter: "Praise",
  },
  {
    who: "Leo Tran",
    action: "asked a question",
    detail: "What's our policy on rotating service credentials?",
    time: "6h ago",
    icon: CircleHelp,
    tint: "bg-violet-50 text-violet-600",
    filter: "Q&A",
  },
  {
    who: "Maya Chen",
    action: "answered a question",
    detail: "Best practice for backfilling a Kafka topic?",
    time: "8h ago",
    icon: MessageSquareText,
    tint: "bg-sky-50 text-sky-600",
    filter: "Answers",
  },
];

export const ACTIVITY_TABS = ["All", "Answers", "Documents", "Praise", "Q&A"] as const;

export interface PraiseItem {
  from: string;
  to: string;
  initials: string;
  avatar: string;
  message: string;
  time: string;
}

export const PRAISE: PraiseItem[] = [
  {
    from: "Dan",
    to: "Russell",
    initials: "DK",
    avatar: "bg-emerald-500 text-white",
    message: "Supportive message, jumped in and helped unblock.",
    time: "2h ago",
  },
  {
    from: "Priya",
    to: "Sarah",
    initials: "PN",
    avatar: "bg-rose-400 text-white",
    message: "Great help on the API refactor — clean and fast.",
    time: "5h ago",
  },
  {
    from: "Leo",
    to: "Maya",
    initials: "LT",
    avatar: "bg-violet-500 text-white",
    message: "Caught a nasty security bug before release. Legend.",
    time: "1d ago",
  },
  {
    from: "Russell",
    to: "Dan",
    initials: "RO",
    avatar: "bg-sky-600 text-white",
    message: "Paired on the deploy pipeline all afternoon. Thank you!",
    time: "1d ago",
  },
];

export interface TrendingItem {
  question: string;
  tags: string[];
  answers: number;
}

export const TRENDING: TrendingItem[] = [
  { question: "What is the onboarding process for new services?", tags: ["Onboarding"], answers: 12 },
  { question: "How do we handle secrets in Kubernetes?", tags: ["Security", "Kubernetes"], answers: 8 },
  { question: "What are the SLAs for internal APIs?", tags: ["APIs", "SLAs"], answers: 6 },
];

export const POPULAR_ACRONYMS = ["FSD", "SLA", "CI/CD", "SLO", "DTO"];

export const SAVED_PROMPTS = [
  "Write a deployment checklist",
  "Summarize a design doc",
  "Explain error: OutOfMemoryError",
  "Draft a runbook from these steps",
];

export { Award };
