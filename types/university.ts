// University Dashboard Types
// Extends the Career Lab data model for B2B university tenant context

// =============================================================================
// CORE ENTITIES
// =============================================================================

/**
 * University - Root tenant entity
 */
export interface University {
  id: string;
  name: string;
  shortName?: string;
  logo: string;
  type: UniversityType;
  location: UniversityLocation;
  accreditation: string[];
  tier: UniversityTier;
  website?: string;
  foundedYear?: number;
  settings: UniversitySettings;
  subscription: SubscriptionInfo;
  createdAt: string;
  updatedAt: string;
}

export type UniversityType = 'traditional' | 'online' | 'hybrid';
export type UniversityTier = 'tier1' | 'tier2' | 'tier3';

export interface UniversityLocation {
  country: string;
  region: string;
  city: string;
  address?: string;
}

export interface UniversitySettings {
  privacyLevel: 'strict' | 'standard' | 'open';
  benchmarkOptIn: boolean;
  dataRetentionYears: number;
  allowedExportFormats: ExportFormat[];
}

export interface SubscriptionInfo {
  plan: 'starter' | 'professional' | 'enterprise';
  status: 'active' | 'trial' | 'expired' | 'suspended';
  expiresAt: string;
  features: string[];
}

export type ExportFormat = 'csv' | 'xlsx' | 'pdf' | 'json';

/**
 * Department/Faculty
 */
export interface Department {
  id: string;
  universityId: string;
  name: string;
  code: string;
  headName?: string;
  headEmail?: string;
  coursesCount: number;
  studentsCount: number;
  isActive: boolean;
  createdAt: string;
}

/**
 * Course (Corso di Laurea)
 */
export interface Course {
  id: string;
  departmentId: string;
  universityId: string;
  name: string;
  code: string;
  level: CourseLevel;
  duration: number; // Years
  language: string;
  studentsCount: number;
  cohortsCount: number;
  isActive: boolean;
  createdAt: string;
}

export type CourseLevel = 'bachelor' | 'master' | 'phd' | 'executive' | 'certificate';

/**
 * Cohort (Anno accademico)
 */
export interface Cohort {
  id: string;
  courseId: string;
  universityId: string;
  academicYear: string; // "2023/2024"
  expectedGraduationYear: number;
  enrolledCount: number;
  graduatedCount: number;
  droppedCount: number;
  isActive: boolean;
}

// =============================================================================
// STUDENT ENTITIES
// =============================================================================

/**
 * Student - Individual student record
 */
export interface Student {
  id: string;
  universityId: string;
  cohortId: string;
  courseId: string;
  departmentId: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  enrollmentDate: string;
  expectedGraduationDate?: string;
  graduationDate?: string;
  status: StudentStatus;
  engagementScore: number; // 0-100
  lastActivityAt: string;
  searchCount: number;
  profileCompleteness: number; // 0-100
  privacySettings: StudentPrivacySettings;
  createdAt: string;
  updatedAt: string;
}

export type StudentStatus = 'enrolled' | 'graduated' | 'dropped' | 'suspended' | 'on_leave';

export interface StudentPrivacySettings {
  searchesVisibleToUni: boolean;
  profileVisibleToUni: boolean;
  includeInAggregates: boolean;
  includeInBenchmark: boolean;
  emailFromUni: boolean;
}

/**
 * Student with full details (for detail view)
 */
export interface StudentDetail extends Student {
  course: Course;
  cohort: Cohort;
  department: Department;
  searchHistory: SearchRecord[];
  interests: StudentInterest[];
  activityTimeline: ActivityEvent[];
}

export interface StudentInterest {
  id: string;
  type: 'company' | 'role' | 'industry' | 'location' | 'skill';
  value: string;
  count: number;
  lastSearchedAt: string;
}

export interface ActivityEvent {
  id: string;
  type: 'search' | 'view_dashboard' | 'bookmark' | 'login' | 'profile_update';
  title: string;
  description?: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

/**
 * Student list item (for table/list views)
 */
export interface StudentListItem {
  id: string;
  fullName: string;
  email: string;
  avatar?: string;
  courseName: string;
  courseId: string;
  cohortYear: string;
  cohortId: string;
  status: StudentStatus;
  engagementScore: number;
  searchCount: number;
  lastActivityAt: string;
  isActive: boolean; // Active in last 30 days
  profileComplete: boolean;
}

// =============================================================================
// SEARCH RECORDS
// =============================================================================

/**
 * Search record - Individual search performed by student
 */
export interface SearchRecord {
  id: string;
  studentId: string;
  timestamp: string;
  searchCriteria: SearchCriteria;
  resultViewed: boolean;
  dashboardAccessed?: string;
  sessionDurationSeconds?: number;
}

export interface SearchCriteria {
  company?: string;
  role?: string;
  country?: string;
  seniorityRange?: [number, number];
}

// =============================================================================
// ALUMNI & CAREER DATA
// =============================================================================

/**
 * Alumni - Graduated student with career tracking
 */
export interface Alumni extends Student {
  graduationYear: number;
  currentPosition?: CurrentPosition;
  careerPath: CareerPathEntry[];
  timeToFirstJobMonths?: number;
  postGradEducation?: PostGradEducation[];
}

export interface CurrentPosition {
  role: string;
  company: string;
  industry: string;
  location: string;
  startDate: string;
  salaryRange?: SalaryRange;
}

export interface CareerPathEntry {
  id: string;
  role: string;
  company: string;
  industry: string;
  location: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  isPromotion: boolean;
}

export interface PostGradEducation {
  type: 'master' | 'mba' | 'phd' | 'certificate' | 'bootcamp';
  institution: string;
  program?: string;
  year: number;
  country?: string;
}

export interface SalaryRange {
  min: number;
  max: number;
  currency: string;
}

// =============================================================================
// ANALYTICS DATA STRUCTURES
// =============================================================================

/**
 * Search Analytics - Aggregate search data
 */
export interface SearchAnalytics {
  period: DateRange;
  kpis: SearchAnalyticsKPIs;
  trend: TrendDataPoint[];
  topCompanies: RankedItem[];
  topRoles: RankedItem[];
  topCountries: RankedItem[];
  heatmap: HeatmapCell[];
  byDepartment: DepartmentSearchData[];
  byCourse: CourseSearchData[];
}

export interface SearchAnalyticsKPIs {
  totalSearches: number;
  uniqueStudents: number;
  uniqueCompanies: number;
  uniqueRoles: number;
  avgSearchesPerStudent: number;
  searchToViewRate: number;
  repeatSearchRate: number;
  trend: TrendDirection;
  trendPercentage: number;
}

export interface DateRange {
  start: string;
  end: string;
}

export interface TrendDataPoint {
  date: string;
  value: number;
  segmentId?: string;
  segmentLabel?: string;
}

export interface RankedItem {
  id: string;
  label: string;
  value: number;
  percentage: number;
  trend: TrendDirection;
  trendValue?: number;
}

export type TrendDirection = 'up' | 'down' | 'stable';

export interface HeatmapCell {
  day: number; // 0-6 (Sunday-Saturday)
  hour: number; // 0-23
  value: number;
}

export interface DepartmentSearchData {
  departmentId: string;
  departmentName: string;
  searchCount: number;
  percentage: number;
}

export interface CourseSearchData {
  courseId: string;
  courseName: string;
  searchCount: number;
  percentage: number;
  uniqueStudents: number;
}

/**
 * Career Analytics - Alumni career outcomes
 */
export interface CareerAnalytics {
  period: DateRange;
  kpis: CareerAnalyticsKPIs;
  careerFlows: CareerFlow[];
  topDestinationCompanies: RankedItem[];
  topEntryRoles: RankedItem[];
  topIndustries: RankedItem[];
  geographicDistribution: GeographicData[];
  salaryDistribution: SalaryDistribution;
  byCourse: CourseCareerMetrics[];
  byCohort: CohortCareerMetrics[];
  timeline: CareerMilestone[];
  postGradStats: PostGradStats;
}

export interface CareerAnalyticsKPIs {
  placementRate: number;
  placementRate6m: number;
  placementRate12m: number;
  avgTimeToFirstJobMonths: number;
  medianTimeToFirstJobMonths: number;
  avgStartingSalary: number;
  medianStartingSalary: number;
  retentionRate1Year: number;
  fieldRetentionRate: number;
  internationalRate: number;
  postGradRate: number;
}

export interface CareerFlow {
  source: string;
  target: string;
  value: number;
  percentage: number;
}

export interface GeographicData {
  location: string;
  locationType: 'country' | 'region' | 'city';
  count: number;
  percentage: number;
}

export interface SalaryDistribution {
  min: number;
  p25: number;
  median: number;
  p75: number;
  max: number;
  currency: string;
  byLevel: {
    level: string;
    min: number;
    median: number;
    max: number;
  }[];
}

export interface CourseCareerMetrics {
  courseId: string;
  courseName: string;
  graduatesCount: number;
  trackedCount: number;
  placementRate: number;
  avgTimeToJobMonths: number;
  avgSalary: number;
  trend: TrendDirection;
  topIndustries: string[];
  topCompanies: string[];
}

export interface CohortCareerMetrics {
  cohortId: string;
  academicYear: string;
  metrics: CareerAnalyticsKPIs;
}

export interface CareerMilestone {
  milestone: 'graduation' | 'first_job' | 'first_promotion' | 'senior_role' | 'management';
  avgMonths: number;
  medianMonths: number;
  count: number;
  percentage: number;
}

export interface PostGradStats {
  totalRate: number;
  byType: {
    type: PostGradEducation['type'];
    count: number;
    percentage: number;
    avgYearsAfterGrad: number;
  }[];
  topInstitutions: {
    institution: string;
    type: string;
    count: number;
  }[];
  salaryImpact: {
    withPostGrad: number;
    withoutPostGrad: number;
    premiumPercentage: number;
  };
}

// =============================================================================
// BENCHMARKING
// =============================================================================

/**
 * Benchmark Cluster - Group of universities for comparison
 */
export interface BenchmarkCluster {
  id: string;
  name: string;
  description?: string;
  type: ClusterType;
  universityCount: number;
  isPublic: boolean;
  isCustom: boolean;
  criteria?: ClusterCriteria;
}

export type ClusterType =
  | 'online_italy'
  | 'traditional_italy_public'
  | 'traditional_italy_private'
  | 'business_schools_italy'
  | 'business_schools_eu'
  | 'engineering_italy'
  | 'top_tier_italy'
  | 'similar_size'
  | 'same_region'
  | 'custom';

export interface ClusterCriteria {
  types?: UniversityType[];
  tiers?: UniversityTier[];
  regions?: string[];
  minStudents?: number;
  maxStudents?: number;
}

/**
 * Benchmark Data - Comparative metrics
 */
export interface BenchmarkData {
  clusterId: string;
  clusterName: string;
  universityCount: number;
  metrics: BenchmarkMetric[];
  radarData: RadarDataPoint[];
  rankingTrend: RankingTrendPoint[];
  suggestions: BenchmarkSuggestion[];
}

export interface BenchmarkMetric {
  id: string;
  label: string;
  category: 'engagement' | 'placement' | 'career' | 'satisfaction';
  yourValue: number;
  clusterAvg: number;
  clusterMin: number;
  clusterMax: number;
  clusterMedian: number;
  percentile: number;
  ranking: number;
  totalInCluster: number;
  trend: TrendDirection;
  unit?: string;
  format?: 'number' | 'percentage' | 'currency' | 'months';
  higherIsBetter: boolean;
}

export interface RadarDataPoint {
  subject: string;
  metricId: string;
  yourScore: number; // Normalized 0-100
  clusterAvg: number;
  clusterBest: number;
}

export interface RankingTrendPoint {
  date: string;
  metricId: string;
  ranking: number;
  totalInCluster: number;
}

export interface BenchmarkSuggestion {
  type: 'strength' | 'improvement' | 'opportunity';
  title: string;
  description: string;
  metricId: string;
  priority: 'high' | 'medium' | 'low';
}

// =============================================================================
// USER & PERMISSIONS
// =============================================================================

/**
 * University User - Staff member with dashboard access
 */
export interface UniversityUser {
  id: string;
  universityId: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: UniversityUserRole;
  permissions: UserPermissions;
  departmentAccess?: string[]; // Department IDs (for coordinators)
  courseAccess?: string[]; // Course IDs (for coordinators)
  lastLoginAt?: string;
  createdAt: string;
  isActive: boolean;
}

export type UniversityUserRole =
  | 'admin'        // Full access
  | 'dean'         // Reports & benchmark focus
  | 'coordinator'  // Own course/department only
  | 'advisor'      // Career services - analytics only
  | 'viewer';      // Read-only aggregate data

export interface UserPermissions {
  canViewAllStudents: boolean;
  canViewIndividualStudent: boolean;
  canViewSearchAnalytics: boolean;
  canViewCareerAnalytics: boolean;
  canViewBenchmark: boolean;
  canExportData: boolean;
  canExportPII: boolean;
  canManageUsers: boolean;
  canManageSettings: boolean;
  canContactStudents: boolean;
}

// =============================================================================
// ALERTS & NOTIFICATIONS
// =============================================================================

export interface Alert {
  id: string;
  type: AlertType;
  priority: AlertPriority;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  isDismissed: boolean;
  action?: AlertAction;
  metadata?: Record<string, unknown>;
}

export type AlertType = 'warning' | 'info' | 'success' | 'error';
export type AlertPriority = 'high' | 'medium' | 'low';

export interface AlertAction {
  label: string;
  href?: string;
  actionId?: string;
}

// =============================================================================
// FILTER & QUERY TYPES
// =============================================================================

export interface StudentFilters {
  searchText?: string;
  departmentIds?: string[];
  courseIds?: string[];
  cohortIds?: string[];
  status?: StudentStatus[];
  engagementLevel?: ('low' | 'medium' | 'high')[];
  activityPeriod?: 'last7d' | 'last30d' | 'last90d' | 'all';
  hasSearches?: boolean;
  profileComplete?: boolean;
}

export interface StudentSortOptions {
  field: 'name' | 'lastActivity' | 'searchCount' | 'engagement' | 'enrollmentDate';
  direction: 'asc' | 'desc';
}

export interface AnalyticsFilters {
  dateRange: DateRange;
  departmentIds?: string[];
  courseIds?: string[];
  cohortIds?: string[];
  compareWith?: 'previous_period' | 'same_period_last_year';
}

export interface BenchmarkFilters {
  clusterId: string;
  customPeerIds?: string[];
  metrics?: string[];
  dateRange?: DateRange;
}

// =============================================================================
// API RESPONSE TYPES
// =============================================================================

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface UniversityDashboardData {
  university: University;
  user: UniversityUser;
  overview: OverviewData;
  alerts: Alert[];
}

export interface OverviewData {
  kpis: {
    activeStudents: number;
    activeStudentsTrend: TrendDirection;
    totalSearches: number;
    totalSearchesTrend: TrendDirection;
    uniqueCompaniesExplored: number;
    uniqueCompaniesTrend: TrendDirection;
    activeCourses: number;
  };
  recentSearchTrend: TrendDataPoint[];
  topCompanies: RankedItem[];
  topRoles: RankedItem[];
  recentAlerts: Alert[];
}

// =============================================================================
// COMPONENT PROP TYPES (for shared use)
// =============================================================================

export interface KPICardData {
  id: string;
  title: string;
  value: number | string;
  trend?: {
    value: number;
    direction: TrendDirection;
    period: string;
  };
  icon?: string;
  color?: 'blue' | 'green' | 'purple' | 'yellow' | 'red';
  subtitle?: string;
  format?: 'number' | 'percentage' | 'currency';
}

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
  metadata?: Record<string, unknown>;
}

export interface TableColumn<T> {
  id: string;
  label: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export type Nullable<T> = T | null;
