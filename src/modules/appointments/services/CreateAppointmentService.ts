import { startOfHour } from "date-fns";

import Appointment from "../infra/typeorm/entities/Appointment";

import IAppointmentsRepository from "../repositories/IAppointmentsRepository";

import AppError from "@shared/errors/AppError";

interface IRequest {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  constructor(private appoinmentsRepository: IAppointmentsRepository) {}

  public async execute({ date, provider_id }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appoinmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw new AppError("This appointment is alredy booked");
    }

    const appointment = await this.appoinmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
