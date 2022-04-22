import appointments from "../models/AppointmentModel.js";
import appointmentAvailable from "../services/UsageRules.js";
import crypto from "crypto";
import { format} from "date-fns";
import { appointmentSchema } from "../validators/SchemaValidator.js";

class AppointmentController {
	getAllAppointments(request, response) {
		response.json({ items: appointments });
	}
	store(request, response) {
		try{
			const appointmentValidation = appointmentSchema.validate( request.body, { abortEarly: false});
			if (appointmentValidation.error) {
				return response.status(400).json({ error: appointmentValidation.error.details.map( ({ message }) => message ), message: "Invalid data",});
			}
			const { date, hour, name, birthDate } = request.body;
			const appointment = {
				id: crypto.randomUUID(),
				accomplished: false,
				status: "",
				date: format(new Date(date), "yyyy/MM/dd"),
				birthDate: format(new Date(birthDate), "yyyy/MM/dd"),
				hour,
				name,
			};
			const availableDate = appointmentAvailable(appointment.date, appointment.hour, appointments);
			if(availableDate === "available"){
				appointments.push(appointment);
				return response.status(200).json({ message: "Appointment created" });
			}
			return response.status(403).json(availableDate);
		} catch(error){
			console.log(error);
			response.status(500).json({ message: "Server error" });
		}
	}
	getDayAppointments(request, response) {
		response.json({message: "Day Appointments"});	
	}
}

export default AppointmentController;