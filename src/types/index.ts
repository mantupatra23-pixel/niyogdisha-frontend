export interface Organization {
  id: string;
  name: string;
  short_name: string;
  slug: string;
  official_website?: string;
  org_type?: string;
}

export interface State {
  id: string;
  name: string;
  code: string;
  slug: string;
}

export interface JobCategory {
  id: string;
  name: string;
  slug: string;
}

export interface JobLink {
  id: string;
  title: string;
  url: string;
  link_type: string;
  is_official: boolean;
}

export interface JobVacancy {
  id: string;
  post_name: string;
  category: string;
  count: number;
}

export interface JobFee {
  id: string;
  category: string;
  amount: number;
  payment_mode?: string;
}

export interface JobAgeLimit {
  id: string;
  min_age: number;
  max_age: number;
  as_on_date?: string;
}

export interface Job {
  id: string;
  title: string;
  short_title: string;
  slug: string;
  advertisement_number?: string;
  description?: string;
  status: string;
  employment_type?: string;
  job_type?: string;
  application_mode?: string;
  total_vacancies: number;
  published_at?: string;
  last_date?: string;
  seo_title?: string;
  seo_description?: string;
  organization?: Organization;
  state?: State;
  category?: JobCategory;
  links?: JobLink[];
  vacancies?: JobVacancy[];
  fees?: JobFee[];
  age_limits?: JobAgeLimit[];
}

export interface Exam {
  id: string;
  job_id?: string;
  title: string;
  slug: string;
  exam_date?: string;
  admit_card_release_date?: string;
  result_date?: string;
  job?: Job;
}

export interface AdmitCard {
  id: string;
  exam_id: string;
  title: string;
  slug: string;
  download_url: string;
  release_date?: string;
  is_active: boolean;
  exam?: Exam;
}

export interface AnswerKey {
  id: string;
  exam_id: string;
  title: string;
  slug: string;
  download_url: string;
  release_date?: string;
  objection_last_date?: string;
  exam?: Exam;
}

export interface ResultItem {
  id: string;
  exam_id: string;
  title: string;
  slug: string;
  result_url: string;
  declared_date?: string;
  cutoff_details?: string;
  exam?: Exam;
}
