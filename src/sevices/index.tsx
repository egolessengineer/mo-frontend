import axios from "axios";
import { API_ROUTES } from "../Constants/apiRoutes";

export const header = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*",
  },
};

export const multipartHeader = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    "Content-Type": "multipart/form-data",
    // "Access-Control-Allow-Origin": "*",
  },
};

export const SIGNUP = async (body: any) =>
  await axios.post(API_ROUTES.SIGNUP, body);
export const SEND_RESET_PASSWORD = async (body: any) =>
  await axios.post(API_ROUTES.SEND_RESET_PASSWORD, body);
export const RESET_PASSWORD = async (body: any) =>
  await axios.post(API_ROUTES.RESET_PASSWORD, body);
export const RESEND_EMAIL = async (body: any) =>
  await axios.post(API_ROUTES.RESEND_EMAIL, body);
export const VERIFY_EMAIL = async (body: any) =>
  await axios.post(API_ROUTES.VERIFY_EMAIL, body);
export const SIGNIN = async (body: any) =>
  await axios.post(API_ROUTES.SIGNIN, body);
export const GET_ME = async () =>
  await axios.get(`${API_ROUTES.GET_ME}`, header);
export const ABOUT = async (body: any) => await axios.post(API_ROUTES.ABOUT, body, header)
export const ADDRESS = async (body: any) => await axios.post(API_ROUTES.ADDRESS, body, header)
export const EXPERIENCE = async (body: any) => await axios.post(API_ROUTES.EXPERIENCE, body, header)
export const SELECT_ROLE = async (body: any) => await axios.post(API_ROUTES.SELECT_ROLE, body, header)
export const WALLET = async (body: any) => await axios.post(API_ROUTES.WALLET, body, header)
export const DOCUMENT_UPLOAD = async (body: any) => await axios.post(API_ROUTES.DOCUMENT_UPLOAD, body, multipartHeader)
export const PROJECT_DETAILS = async (body: any) =>
  await axios.post(API_ROUTES.PROJECT_DETAILS, body, header);
export const PROJECT_DELETE = async (body: any) =>
await axios.delete(API_ROUTES.PROJECT_DELETE, { data: body, ...header });
export const INVITE = async (body: any) =>
  await axios.post(API_ROUTES.INVITE, body, header);
export const GET_PROJECT_PROVIDER = async (query: any) =>
  await axios.get(`${API_ROUTES.GET_PROJECT_PROVIDER}${query}`, header);
export const SEARCH_PROJECT = async (query: any) =>
  await axios.get(`${API_ROUTES.SEARCH_PROJECT}${query}`, header);
export const DOCUMENT_DELETE = async (body: any) =>
  await axios.delete(API_ROUTES.DOCUMENT_DELETE, { data: body, ...header });
export const GET_PROJECT = async (param: any) =>
  await axios.get(`${API_ROUTES.GET_PROJECT}${param}`, header);
export const GET_PROJECT_DETAIL = async (id: any) =>
  await axios.get(`${API_ROUTES.GET_PROJECT_DETAIL}/${id}`, header);
export const TOGGLE_IP_INFO = async (body: any) =>
  await axios.post(API_ROUTES.TOGGLE_IP_INFO, body, header);
export const ADD_DISPUTE = async (body: any) =>
  await axios.post(API_ROUTES.ADD_DISPUTE, body, header)
export const GET_DISPUTE_MEMEBERS = async (param: any) =>
  await axios.get(`${API_ROUTES.GET_DISPUTE_MEMEBERS}/${param}`, header)
export const GET_ALL_DISPUTE = async (query: any) =>
  await axios.get(`${API_ROUTES.GET_ALL_DISPUTE}?${query}`, header)
export const GET_DISPUTE = async (param: any) =>
  await axios.get(`${API_ROUTES.GET_DISPUTE}/${param}`, header)
export const PROJECT_ACCEPT = async (body: any) =>
  await axios.post(API_ROUTES.PROJECT_ACCEPT, body, header);
export const ADD_ESCROW = async (body: any) =>
  await axios.post(API_ROUTES.ADD_ESCROW, body, header);
export const CREATE_TEAM = async (body: any) =>
  await axios.post(API_ROUTES.CREATE_TEAM, body, header);
export const GET_TEAM = async () =>
  await axios.get(API_ROUTES.GET_TEAM, header);
export const UPDATE_TEAM = async (body: any) =>
  await axios.patch(API_ROUTES.UPDATE_TEAM, body, header);
export const CREATE_SUBMILESTONE = async (body: any) =>
  await axios.post(API_ROUTES.CREATE_SUBMILESTONE, body, header);
export const GET_FAQ = async () =>
  await axios.get(API_ROUTES.GET_FAQ, header);
export const POST_FAQ = async (body: any) =>
  await axios.post(API_ROUTES.POST_FAQ, body, header);
export const UPDATE_DISPUTE = async (body: any) =>
  await axios.patch(API_ROUTES.UPDATE_DISPUTE, body, header);
export const UPDATE_TRANSACTION_DETAILS = async (body: any) =>
  await axios.post(API_ROUTES.UPDATE_TRANSACTION_DETAILS, body, header);
export const ADD_IP = async (body: any) =>
  await axios.post(API_ROUTES.ADD_IP, body, header);
export const MODIFY_IP = async (body: any) =>
  await axios.post(API_ROUTES.MODIFY_IP, body, header);
export const UPDATE_MILESTONE_STATUS = async (body: any) =>
  await axios.patch(API_ROUTES.UPDATE_MILESTONE_STATUS, body, header);
export const NFT_GET_ACCOUNTIFO = async (param: any) =>
  await axios.get(`${API_ROUTES.NFT_GET_ACCOUNTIFO}/${param}`)
export const NFT_GET_TRANSACTIONS = async (param: any) =>
  await axios.get(`${API_ROUTES.NFT_GET_TRANSACTIONS}/${param}`);
export const PROFILE = async (body: any) =>
  await axios.patch(API_ROUTES.PROFILE , body , header)
  export const GET_SHORTLIST_PROVIDER_LIST = async (param:any) =>
    await axios.get(`${API_ROUTES.GET_SHORTLIST_PROVIDER_LIST}?${param}`  , header);
  export const POST_SHORTLIST_PROVIDER_LIST = async (body:any) =>
    await axios.post(API_ROUTES.POST_SHORTLIST_PROVIDER_LIST, body , header);
  export const GET_PROVIDER_DETAILS = async (id:any) =>
    await axios.get(`${API_ROUTES.GET_PROVIDER_DETAILS}/${id}` , header);
  export const UPDATE_SHORTLIST_PROVIDER_LIST = async (body:any) =>
    await axios.patch(API_ROUTES.UPDATE_SHORTLIST_PROVIDER_LIST , body , header);
export const CHANGE_PASSWORD = async (body: any) =>
  await axios.post(API_ROUTES.CHANGE_PASSWORD , body , header)
export const SEND_OTP = async () =>
  await axios.post(API_ROUTES.SEND_OTP ,{}, header)
export const VERIFY_OTP = async (param: any) =>
  await axios.get(`${API_ROUTES.VERIFY_OTP}/${param}`  , header)
export const CHANGE_PASSWORD_OTP = async (body: any) =>
  await axios.post(API_ROUTES.CHANGE_PASSWORD_OTP , body , header)
export const GET_PROJECT_NOTES = async (param: any) =>
  await axios.get(`${API_ROUTES.GET_PROJECT_NOTES}/${param}`  , header)
export const SEND_PROJECT_NOTES = async (body: any) =>
  await axios.post(API_ROUTES.SEND_PROJECT_NOTES, body  , header)
export const PROJECT_CHAT_LIST = async (param: any) =>
  await axios.get(`${API_ROUTES.PROJECT_CHAT_LIST }${param}` , header)
export const UPLOAD_MILESTONES_DELIVERABLES = async (body: any) =>
  await axios.post(API_ROUTES.UPLOAD_MILESTONES_DELIVERABLES , body , header)
export const NOTIFICATION = async (param: any) =>
  await axios.get(`${API_ROUTES.NOTIFICATION}/${param}`  , header)
export const NOTIFICATION_TOTALCOUNT = async (param: any) =>
  await axios.get(`${API_ROUTES.NOTIFICATION_TOTALCOUNT}/${param}`  , header)
export const NOTIFICATION_UNREADCOUNT = async (param: any) =>
  await axios.get(`${API_ROUTES.NOTIFICATION_UNREADCOUNT}/${param}`  , header)
export const UPLOAD_WEB3_STRORAGE = async (body:any) =>
  await axios.post(API_ROUTES.UPLOAD_WEB3_STRORAGE , body,  header)
export const IP_PERMISSONS = async (body:any) =>
  await axios.patch(API_ROUTES.IP_PERMISSONS , body , header);
export const REQUEST_FUND = async (body: any) =>
  await axios.post(API_ROUTES.REQUEST_FUND, body, header);
  export const ADMIN_ANALYTICS = async () =>
  await axios.get(API_ROUTES.ADMIN_ANALYTICS, header);
export const ADMIN_FEE = async (body: any) =>
  await axios.post(API_ROUTES.ADMIN_FEE, body, header);