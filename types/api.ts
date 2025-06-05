export type User = {
  name: string;
  email: string;
  source: string;
};

export enum MissionType {
  Flight = "Flight",
  Hotel = "Hotel",
  Car = "Car",
}

export enum NotificationType {
  Email = "Email",
  Text = "Text",
  None = "None",
}

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
