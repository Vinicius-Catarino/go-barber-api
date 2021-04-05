import { Router } from "express";
import { parseISO } from "date-fns";

import CreateAppointmentService from "@modules/appointments/services/CreateAppointmentService";

import AppointmentsRepository from "@modules/appointments/infra/typeorm/repositories/AppointmentsRepository";

import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";

const appointmentsRouter = Router();

const appoinmentsRepository = new AppointmentsRepository();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get("/", async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post("/", async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const CreateAppointment = new CreateAppointmentService(appoinmentsRepository);

  const appointment = await CreateAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});
export default appointmentsRouter;
