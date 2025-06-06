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
  Initiating = "initiating",
  Unknown = "evaluated_unknown",
  Canceled = "canceled",
  CanceledByUser = "cancelled_by_user",
  Failure = "evaluated_failure",
  FailedInitiation = "failed_initiation",
  FailedTwimlGen = "failed_twiml_generation",
  FailedBrigeConn = "failed_bridge_connect",
  Success = "evaluated_success",
  Completed = "completed",
}

export type Mission = {
  id: number;
  twilio_call_id: string;
  status: MissionStatus;
  created_at: string; // ISO date string
  call_mission_display_name: string;
  traveler_name: string;
  route: string;
  call_duration: number;
  airline: string;
  user_id: number;
  api_key_name: string;
  call_mission: string;
};

export type DetailedMission = {
  id: number;
  status: MissionStatus;
  created_at: string;
  call_mission: string;
  traveler_name: string;
  travel_route: string;
  call_duration_seconds: number;
  confirmation_code: string;
  airline: string;
  custom_prompt: string; // JSON string of CustomPrompt
  processed_json: string; // JSON string of ProcessedJson
  call_evaluation: string;
  call_transcript: string; // JSON string of TranscriptMessage[]
  elevenlabs_conversation_id: string;
  twilio_call_id: string;
  api_key_name: string;
};

// For deserialized subfields:
export type CustomPrompt = {
  callMission: string;
  callParams: Record<string, any>;
  confirmationCode: string;
  airlineId: string;
  current_flight: {
    flight_number: string;
    departure_airport: string;
    departure_airport_city: string;
    arrival_airport: string;
    arrival_airport_city: string;
    departure_date: string;
    departure_time: string;
  };
  traveler: {
    firstName: string;
    middleName: string;
    lastName: string;
    dob: string;
    gender: string;
    email: string;
    phoneNumber: string;
    eticketNumber: string;
  };
  person_calling: null | any;
  payment: {
    max_allowed_budget: number;
    credit_card_number: string;
    cvc: string;
    expiry_date: string;
    cardholder_name: string;
    cardholder_address: string;
  };
  voice_id: null | string;
  voice_gender: string;
  agent_id: null | string;
};

export type ProcessedJson = {
  call_mission_agent: string;
  call_mission_ivr_script: string;
  airline_name: string;
  airline_iata: string;
  airline_phone_number: string;
  confirmation_code_original: string;
  confirmation_number_agent: string;
  confirmation_number_ivr: string;
  current_flight: {
    flight_number: string;
    departure_airport_iata: string;
    departure_airport_city: string;
    arrival_airport_iata: string;
    arrival_airport_city: string;
    departure_date: string;
    departure_time: string;
    arrival_date: string | null;
    arrival_time: string | null;
  };
  traveler: {
    firstName: string;
    middleName: string;
    lastName: string;
    date_of_birth_original: string;
    date_of_birth_spoken: string;
    gender: string;
    email_original: string;
    email_spoken: string;
    phone_number_original: string;
    phone_number_spoken: string;
    eticket_number_original: string;
    eticket_number_spoken: string;
  };
  payment: {
    max_allowed_budget: string;
    cardholder_name: string;
    cardholder_address: string;
    credit_card_number_original: string;
    cvc_original: string;
    expiry_date_original: string;
    credit_card_number_spoken: string;
    cvc_spoken: string;
    expiry_date_spoken: string;
  };
};

export type TranscriptMessage = {
  role: "user" | "agent";
  message: string;
  time_in_call_secs: number;
};
