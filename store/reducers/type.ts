
export interface MeetingInfoState {
    meetings: Record<string, any>[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }

  export interface RootState {
    meetingInfo: MeetingInfoState;
  }


  export interface LoginResponse {
    access_token: string;
    user_email: string;
    user_id: string;
    refresh_token: string;
  }
  
  export interface DashboardState {
    candidate_status_list: any[];
    interview_and_hired_details: Record<string, any>;
    posted_job_list: any[];
    posted_job_active_list: any[];
    today_meeting_details_list: any[];
    activities_list: any[];
    upcomings_list: any[];
    hirings_list: any[];
    ticket_List: any[];
    inventory_Assets: any[];
    notification_list: any[];
    login: Partial<LoginResponse>;
    logout: Record<string, any>;
    user_account_management: Record<string, any>;
    loading: boolean;
    inactiveJobsData: any[];
    loginDetails: Partial<LoginResponse>;
  }
  
  export interface RootState {
    dashboard: DashboardState;
  }