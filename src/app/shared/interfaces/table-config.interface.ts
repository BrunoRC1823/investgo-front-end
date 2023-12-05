export interface TableConfig {
  columns?: any[];
  data: any[];
  loading?: boolean;
  totalElements: number;
  percentageList?: (number | undefined)[];
  globalFilters?: string[];
  rows: number;
  size?: string;
  actions?: any;
}
