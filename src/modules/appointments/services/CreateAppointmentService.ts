import { startOfHour } from "date-fns";
import { inject, injectable } from "tsyringe";
import Appointment from "../infra/typeorm/entities/Appointment";

import IAppointmentsRepository from "../repositories/IAppointmentsRepository";

import AppError from "@shared/errors/AppError";

interface IRequest {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject("AppointmentsRepository")
    private appoinmentsRepository: IAppointmentsRepository
  ) {}

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
