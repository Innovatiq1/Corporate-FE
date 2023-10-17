import { Pagination } from "./pagination.model";

export interface AuditListingModel extends Pagination {
  data: AuditModel[];
  totalCount: number;
  limit: number;
  sortBy: string;
  sortByDirection: string;
  type: string;
  filter: {
    key: string;
    value: string;
  };
}

export interface AuditModel {
  _id: string;
  collectionName: string;
  operation: string;
  modifiedBy: string;
  modifiedOn: string;
}

export interface AttendanceListingModel extends Pagination {
  data: AttendanceModel[];
  totalCount: number;
  limit: number;
  sortBy: string;
  sortByDirection: string;
  filter: {
    key: string;
    value: string;
  };
}
export interface AuditPaginationModel extends Pagination {
	docs: AuditModel[];
	main_category: string|undefined;
	sub_category: string|undefined;
    data : any;
    filter:any;
    totalCount : any;
	filterText: string;
	sortBy: string;
	sortByDirection: string;
	status: string;
}

export interface AttendanceModel {
  _id: string;
  activity: string;
  modifiedBy: string;
  modifiedOn: string;
}
