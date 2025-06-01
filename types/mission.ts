export enum MissionStatus {
  Working = "Working",
  Attention = "Attention",
  Success = "Success",
}

export type Mission = {
  status: MissionStatus;
  createdAt: string;
  mission: string;
  traveler: string;
  details: string;
};
