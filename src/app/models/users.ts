export class User {

  constructor(
    public email: string,
    public user_password: string,
    //public token: string,

  ) { }

}

export class UserResponse {

  constructor(
    public access_token: string,
    public user: AuthData,

  ) { }

}

export class AuthData {

  constructor(
    public user_id: number,
    public role_id: string,
  ) { }

}

export class ClientDashboard {

  constructor(
    public genset_pannel: number[],
    public online_status: number,
    public generator_id: number,
    public generator_name: string,

  ) { }

}

export class ClientDashboardTable {

  constructor(
    public generator_id: number,
    public fuel: number,
    public coolant: number,
    public charger_ac_failure: number,
    public load: number,
    public failed_to_start: number,
    public common_alarm: number,
  ) { }

}

export class ListAccount {

  constructor(
    public account_id: number,
    public account_name: string,
    public email: string,
    public phone_number: string,
    public account_creation_date: Date,
  ) { }

}

export class ListGeneratorData {

  constructor(
    public datetime: Date,
    public average_current: number,
    public l1_l2_voltage: number,
    public line_1_n_voltage: number,
    public line_1_current: number,
    public l2_l3_voltage: number,
    public line_2_n_voltage: number,
    public line_2_current: number,
    public line_3_current: number,
    public l3_l1_voltage: number,
    public frequency: number,
    public recent_fault_code: number,
    public active_fault_type: number,
    public emergency_stop_status: number,
    public generator_state: number,
    public operation_mode: number,
    public battery_voltage: number,
    public coolant_temperature: number,
    public engine_speed: number,
    public day_fuel_volume: number,
    public bulk_fuel_tank_volume: number,
    public no_of_engine_starts: number,

  ) { }
}

export class ListGenerator {

  constructor(
    public generator_id: number,
    public user_id: number,
    public generator_type: string,
    public generator_serial_number: string,
    public generator_creation_date: Date,
    public generator_modification_date: Date,
    public generator_modified_by: number,
    public is_active: boolean,
    public is_suspended: number,
    public soft_deleted: number,
    public generator_description: string,
    public generator_name: string,
    public generator_address: string,

  ) { }

}