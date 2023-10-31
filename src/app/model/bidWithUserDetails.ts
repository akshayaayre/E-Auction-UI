import { UserDetails } from "./userDetails";

export interface BidWithUserDetails{
    bidDetailsId: number,
    productId: number,
    bidAmount: number,
    userEmail: string,
    userDetails: UserDetails
}