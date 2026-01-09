import { Demographics, Education, Career } from '@/types/dashboard';

interface CSVRow {
  [key: string]: string;
}

export function parseDemographicsCSV(rows: CSVRow[]): Demographics {
  const averageAge = parseInt(rows.find(r => r.metric === 'averageAge')?.value || '0');

  const ageDistributionRaw = rows.filter(r => r.metric === 'ageDistribution');
  const ageDistribution = ageDistributionRaw.map(r => ({
    range: r.value,
    count: parseInt(r.additional),
    percentage: 0, // Will calculate
  }));

  // Calculate percentages
  const totalAge = ageDistribution.reduce((sum, item) => sum + item.count, 0);
  ageDistribution.forEach(item => {
    item.percentage = Math.round((item.count / totalAge) * 100);
  });

  const genderRaw = rows.filter(r => r.metric === 'gender');
  const gender = genderRaw.map(r => ({
    type: r.value,
    count: parseInt(r.additional),
    percentage: 0,
  }));

  // Calculate percentages
  const totalGender = gender.reduce((sum, item) => sum + item.count, 0);
  gender.forEach(item => {
    item.percentage = Math.round((item.count / totalGender) * 100);
  });

  const genderTrendRaw = rows.filter(r => r.metric === 'genderTrend');
  const genderTrendByYear: { [year: number]: { male: number; female: number; other: number } } = {};

  genderTrendRaw.forEach(r => {
    const [yearStr, genderType] = r.value.split('-');
    const year = parseInt(yearStr);
    const count = parseInt(r.additional);

    if (!genderTrendByYear[year]) {
      genderTrendByYear[year] = { male: 0, female: 0, other: 0 };
    }

    if (genderType === 'Male') genderTrendByYear[year].male = count;
    if (genderType === 'Female') genderTrendByYear[year].female = count;
    if (genderType === 'Other') genderTrendByYear[year].other = count;
  });

  const genderTrend = Object.entries(genderTrendByYear)
    .map(([year, data]) => ({
      year: parseInt(year),
      ...data,
    }))
    .sort((a, b) => a.year - b.year);

  const educationLocationRaw = rows.filter(r => r.metric === 'educationLocation');
  const educationLocation = educationLocationRaw.map(r => ({
    location: r.value,
    count: parseInt(r.additional),
    percentage: 0,
  }));

  // Calculate percentages
  const totalLocation = educationLocation.reduce((sum, item) => sum + item.count, 0);
  educationLocation.forEach(item => {
    item.percentage = Math.round((item.count / totalLocation) * 100);
  });

  const nationalityRaw = rows.filter(r => r.metric === 'nationality');
  const nationality = nationalityRaw.map(r => ({
    country: r.value,
    count: parseInt(r.additional),
    percentage: 0,
  }));

  // Calculate percentages
  const totalNationality = nationality.reduce((sum, item) => sum + item.count, 0);
  nationality.forEach(item => {
    item.percentage = Math.round((item.count / totalNationality) * 100);
  });

  // Parse education level
  const educationLevelRaw = rows.filter(r => r.metric === 'educationLevel');
  const totalEducation = educationLevelRaw.reduce((sum, r) => sum + parseInt(r.additional || '0'), 0);

  const getEducationData = (key: string) => {
    const row = educationLevelRaw.find(r => r.value === key);
    const count = parseInt(row?.additional || '0');
    return {
      count,
      percentage: totalEducation > 0 ? Math.round((count / totalEducation) * 100) : 0,
    };
  };

  const educationLevel = {
    scuolaSuperiore: getEducationData('scuolaSuperiore'),
    laureaTriennale: getEducationData('laureaTriennale'),
    laureaMagistrale: getEducationData('laureaMagistrale'),
    master: getEducationData('master'),
    altro: getEducationData('altro'),
  };

  return {
    averageAge,
    ageDistribution,
    gender,
    genderTrend,
    educationLocation,
    nationality,
    educationLevel,
  };
}

export function parseEducationCSV(rows: CSVRow[]): Education {
  const topDegrees = rows
    .filter(r => r.category === 'degree')
    .slice(0, 5)
    .map(r => ({
      name: r.name,
      count: parseInt(r.count),
      percentage: parseInt(r.percentage),
    }));

  const topCourses = rows
    .filter(r => r.category === 'course')
    .slice(0, 5)
    .map(r => ({
      name: r.name,
      count: parseInt(r.count),
      percentage: parseInt(r.percentage),
    }));

  const schoolTypes = rows
    .filter(r => r.category === 'schoolType')
    .map(r => ({
      type: r.name,
      count: parseInt(r.count),
      percentage: parseInt(r.percentage),
    }));

  const mbaTypes = rows
    .filter(r => r.category === 'mbaType')
    .map(r => ({
      type: r.name,
      count: parseInt(r.count),
      percentage: parseInt(r.percentage),
    }));

  return {
    topDegrees,
    topCourses,
    schoolTypes,
    mbaTypes,
  };
}

export function parseCareerCSV(rows: CSVRow[]): Career {
  const salaryRange = {
    min: parseInt(rows.find(r => r.metric === 'salaryMin')?.value || '28000'),
    median: parseInt(rows.find(r => r.metric === 'salaryMedian')?.value || '31500'),
    p75: parseInt(rows.find(r => r.metric === 'salaryP75')?.value || '33000'),
    max: parseInt(rows.find(r => r.metric === 'salaryMax')?.value || '35000'),
  };

  const promotionTimeline = {
    averageYears: parseFloat(rows.find(r => r.metric === 'promotionAvgYears')?.value || '2.5'),
    description: rows.find(r => r.metric === 'promotionDescription')?.value || 'Tempo medio per promozione per un Project Manager in Intesa Sanpaolo',
  };

  const workSetup = {
    onSite: parseInt(rows.find(r => r.metric === 'workSetup' && r.value === 'onSite')?.additional || '58'),
    hybrid: parseInt(rows.find(r => r.metric === 'workSetup' && r.value === 'hybrid')?.additional || '20'),
    remote: parseInt(rows.find(r => r.metric === 'workSetup' && r.value === 'remote')?.additional || '22'),
  };

  const benefitsRaw = rows.filter(r => r.metric === 'benefits');
  const benefits = benefitsRaw.length > 0 ? benefitsRaw.map(r => ({
    name: r.value,
    icon: r.additional || '🎁',
  })) : [
    { name: 'Ticket Pranzo', icon: '🍽️' },
    { name: 'Macchina Aziendale', icon: '🚗' },
    { name: 'Formazione', icon: '💻' },
    { name: 'Asilo Aziendale', icon: '👶' },
    { name: 'Possibilità di Smart Working', icon: '🏠' },
  ];

  const hiring = {
    isHiring: rows.find(r => r.metric === 'hiring')?.value === 'true',
    companyName: rows.find(r => r.metric === 'hiringCompany')?.value || 'Intesa Sanpaolo',
    jobPostUrl: rows.find(r => r.metric === 'hiringUrl')?.value,
  };

  const recruiter = {
    available: rows.find(r => r.metric === 'recruiter')?.value === 'true' || true,
    companyName: rows.find(r => r.metric === 'recruiterCompany')?.value || 'Intesa Sanpaolo',
    ctaUrl: rows.find(r => r.metric === 'recruiterUrl')?.value,
  };

  const promotionLocation = {
    sameCompany: parseInt(rows.find(r => r.metric === 'promotionLocation' && r.value === 'Same Company')?.additional || '0'),
    newCompany: parseInt(rows.find(r => r.metric === 'promotionLocation' && r.value === 'New Company')?.additional || '0'),
  };

  const promotionType = {
    sameRole: parseInt(rows.find(r => r.metric === 'promotionType' && r.value === 'Same Role')?.additional || '0'),
    differentRole: parseInt(rows.find(r => r.metric === 'promotionType' && r.value === 'Different Role')?.additional || '0'),
  };

  const promotionMatrix = {
    sameCompanySameRole: parseInt(rows.find(r => r.metric === 'promotionMatrix' && r.value === 'Same Co. Same Role')?.additional || '0'),
    sameCompanyDiffRole: parseInt(rows.find(r => r.metric === 'promotionMatrix' && r.value === 'Same Co. Diff Role')?.additional || '0'),
    newCompanySameRole: parseInt(rows.find(r => r.metric === 'promotionMatrix' && r.value === 'New Co. Same Role')?.additional || '0'),
    newCompanyDiffRole: parseInt(rows.find(r => r.metric === 'promotionMatrix' && r.value === 'New Co. Diff Role')?.additional || '0'),
  };

  return {
    salaryRange,
    promotionTimeline,
    workSetup,
    benefits,
    hiring,
    recruiter,
    promotionLocation,
    promotionType,
    promotionMatrix,
  };
}
