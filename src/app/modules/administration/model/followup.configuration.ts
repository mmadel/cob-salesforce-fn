export interface FollowupConfiguration {
    id?:number | null,
    firstTimeGood?: number | null,
    firstTimeNeutral?: number | null,
    firstTimeNotWorth?: number | null

    nextTimeGood?: number | null,
    nextTimeNeutral?: number | null,
    nextTimeNotWorth?: number | null
    clinicId?: number | null;
}