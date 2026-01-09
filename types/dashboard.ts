// Dashboard Data Types

export interface DashboardData {
  metadata: DashboardMetadata;
  demographics: Demographics;
  education: Education;
  career: Career;
}

export interface DashboardMetadata {
  role: string;
  company: {
    name: string;
    location: string;
    logo: string;
  };
  country: string;
  profilesAnalyzed: number;
  dataQuality: number;
  lastUpdate: string;
  roleDescription: string;
}

export interface Demographics {
  averageAge: number;
  ageDistribution: Array<{
    range: string;
    count: number;
    percentage: number;
  }>;
  gender: Array<{
    type: string;
    count: number;
    percentage: number;
  }>;
  genderTrend: Array<{
    year: number;
    male: number;
    female: number;
    other: number;
  }>;
  educationLocation: Array<{
    location: string;
    count: number;
    percentage: number;
  }>;
  nationality: Array<{
    country: string;
    count: number;
    percentage: number;
  }>;
  educationLevel?: {
    scuolaSuperiore: { count: number; percentage: number };
    laureaTriennale: { count: number; percentage: number };
    laureaMagistrale: { count: number; percentage: number };
    master: { count: number; percentage: number };
    altro: { count: number; percentage: number };
  };
}

export interface Education {
  topDegrees: Array<{
    name: string;
    count: number;
    percentage: number;
  }>;
  topCourses: Array<{
    name: string;
    count: number;
    percentage: number;
  }>;
  schoolTypes: Array<{
    type: string;
    count: number;
    percentage: number;
  }>;
  mbaTypes: Array<{
    type: string;
    count: number;
    percentage: number;
  }>;
}

export interface Career {
  salaryRange: {
    min: number;
    median: number;
    p75: number;
    max: number;
  };
  promotionTimeline: {
    averageYears: number;
    description: string;
  };
  workSetup: {
    onSite: number;
    hybrid: number;
    remote: number;
  };
  benefits: Array<{
    name: string;
    icon: string;
  }>;
  hiring: {
    isHiring: boolean;
    companyName: string;
    jobPostUrl?: string;
  };
  recruiter: {
    available: boolean;
    companyName: string;
    ctaUrl?: string;
  };
  promotionLocation: {
    sameCompany: number;
    newCompany: number;
  };
  promotionType: {
    sameRole: number;
    differentRole: number;
  };
  promotionMatrix: {
    sameCompanySameRole: number;
    sameCompanyDiffRole: number;
    newCompanySameRole: number;
    newCompanyDiffRole: number;
  };
}
