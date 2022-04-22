import appointments from "../models/AppointmentModel.js";
class AppointmentController {
	store(request, response) {
		return response.send({ message: "Stored" });
	}
}

export default AppointmentController;