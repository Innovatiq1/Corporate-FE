export class ApiResponse {
  
    status: string | undefined;
    message: string | undefined;
    data: any;
    userLogs:any;
  docs: any;
  totalDocs: number | undefined;
  limit: number | undefined;
  page: number | undefined;
}
